import express from 'express';
import { body, validationResult } from 'express-validator';
import Paste from '../models/Paste.js';
import { authenticate } from '../middleware/auth.js';
import crypto from 'crypto';

const router = express.Router();

// Generate unique ID for paste
const generateUniqueId = () => {
  return crypto.randomBytes(8).toString('hex');
};

// @route   GET /api/pastes
// @desc    Get all pastes for authenticated user
// @access  Private
router.get('/', authenticate, async (req, res) => {
  try {
    const { search, draft } = req.query;
    const query = { user: req.user._id };

    // Filter drafts if requested
    if (draft === 'true') {
      query.isDraft = true;
    } else if (draft === 'false') {
      query.isDraft = false;
    }

    let pastes = await Paste.find(query)
      .sort({ createdAt: -1 })
      .select('-viewHistory');

    // Filter by search term if provided
    if (search) {
      const searchLower = search.toLowerCase();
      pastes = pastes.filter(paste => 
        paste.title.toLowerCase().includes(searchLower) ||
        paste.content.toLowerCase().includes(searchLower)
      );
    }

    // Filter out expired pastes
    pastes = pastes.filter(paste => !paste.isExpired());

    res.json({
      success: true,
      count: pastes.length,
      pastes
    });
  } catch (error) {
    console.error('Get pastes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching pastes',
      error: error.message
    });
  }
});

// @route   GET /api/pastes/:id
// @desc    Get single paste by ID or uniqueId
// @access  Private (or Public if shareable)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Try to find by uniqueId first (for shareable links)
    let paste = await Paste.findOne({ uniqueId: id });
    
    // If not found, try MongoDB _id
    if (!paste) {
      paste = await Paste.findById(id);
    }

    if (!paste) {
      return res.status(404).json({
        success: false,
        message: 'Paste not found'
      });
    }

    // Check if expired
    if (paste.isExpired()) {
      return res.status(410).json({
        success: false,
        message: 'This paste has expired'
      });
    }
    
    // Increment views (get IP from request)
    const ipAddress = req.ip || req.connection.remoteAddress;
    await paste.incrementViews(ipAddress);

    // Populate user info (only username)
    await paste.populate('user', 'username');

    res.json({
      success: true,
      paste
    });
  } catch (error) {
    console.error('Get paste error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching paste',
      error: error.message
    });
  }
});

// @route   POST /api/pastes
// @desc    Create a new paste
// @access  Private
router.post('/', authenticate, [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('content')
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ max: 100000 })
    .withMessage('Content cannot exceed 100,000 characters'),
  body('isDraft')
    .optional()
    .isBoolean()
    .withMessage('isDraft must be a boolean'),
  body('expiresAt')
    .optional()
    .isISO8601()
    .withMessage('expiresAt must be a valid date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { title, content, isDraft = false, expiresAt, uniqueId } = req.body;

    // Check if uniqueId is provided and if it already exists
    let finalUniqueId = uniqueId || generateUniqueId();
    
    if (uniqueId) {
      const existingPaste = await Paste.findOne({ uniqueId });
      if (existingPaste) {
        return res.status(409).json({
          success: false,
          message: 'A paste with this ID already exists. Please choose a different ID.',
          existingPaste: {
            id: existingPaste._id,
            title: existingPaste.title,
            uniqueId: existingPaste.uniqueId
          }
        });
      }
    } else {
      // Ensure generated ID is unique
      let isUnique = false;
      while (!isUnique) {
        const exists = await Paste.findOne({ uniqueId: finalUniqueId });
        if (!exists) {
          isUnique = true;
        } else {
          finalUniqueId = generateUniqueId();
        }
      }
    }

    // Validate expiresAt is in the future
    let expiresAtDate = null;
    if (expiresAt) {
      expiresAtDate = new Date(expiresAt);
      if (expiresAtDate <= new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Expiration date must be in the future'
        });
      }
    }

    const paste = new Paste({
      user: req.user._id,
      title,
      content,
      uniqueId: finalUniqueId,
      isDraft,
      expiresAt: expiresAtDate
    });

    await paste.save();

    res.status(201).json({
      success: true,
      message: isDraft ? 'Draft saved successfully' : 'Paste created successfully',
      paste
    });
  } catch (error) {
    console.error('Create paste error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while creating paste',
      error: error.message
    });
  }
});

// @route   PUT /api/pastes/:id
// @desc    Update a paste
// @access  Private
router.put('/:id', authenticate, [
  body('title')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Title cannot exceed 200 characters'),
  body('content')
    .optional()
    .isLength({ max: 100000 })
    .withMessage('Content cannot exceed 100,000 characters'),
  body('isDraft')
    .optional()
    .isBoolean()
    .withMessage('isDraft must be a boolean'),
  body('expiresAt')
    .optional()
    .isISO8601()
    .withMessage('expiresAt must be a valid date')
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const { id } = req.params;
    const paste = await Paste.findById(id);

    if (!paste) {
      return res.status(404).json({
        success: false,
        message: 'Paste not found'
      });
    }

    // Check if user owns this paste
    if (paste.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to update this paste'
      });
    }

    // Check if expired
    if (paste.isExpired()) {
      return res.status(410).json({
        success: false,
        message: 'Cannot update an expired paste'
      });
    }

    // Update fields
    if (req.body.title !== undefined) paste.title = req.body.title;
    if (req.body.content !== undefined) paste.content = req.body.content;
    if (req.body.isDraft !== undefined) paste.isDraft = req.body.isDraft;
    
    if (req.body.expiresAt !== undefined) {
      const expiresAtDate = new Date(req.body.expiresAt);
      if (expiresAtDate <= new Date()) {
        return res.status(400).json({
          success: false,
          message: 'Expiration date must be in the future'
        });
      }
      paste.expiresAt = expiresAtDate;
    }

    await paste.save();

    res.json({
      success: true,
      message: 'Paste updated successfully',
      paste
    });
  } catch (error) {
    console.error('Update paste error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating paste',
      error: error.message
    });
  }
});

// @route   DELETE /api/pastes/:id
// @desc    Delete a paste
// @access  Private
router.delete('/:id', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const paste = await Paste.findById(id);

    if (!paste) {
      return res.status(404).json({
        success: false,
        message: 'Paste not found'
      });
    }

    // Check if user owns this paste
    if (paste.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to delete this paste'
      });
    }

    await Paste.findByIdAndDelete(id);

    res.json({
      success: true,
      message: 'Paste deleted successfully'
    });
  } catch (error) {
    console.error('Delete paste error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while deleting paste',
      error: error.message
    });
  }
});

// @route   POST /api/pastes/:id/auto-save
// @desc    Auto-save draft
// @access  Private
router.post('/:id/auto-save', authenticate, [
  body('title').optional().trim(),
  body('content').optional()
], async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;

    let paste = await Paste.findById(id);

    if (paste) {
      // Update existing paste
      if (paste.user.toString() !== req.user._id.toString()) {
        return res.status(403).json({
          success: false,
          message: 'Not authorized'
        });
      }
      
      if (title !== undefined) paste.title = title;
      if (content !== undefined) paste.content = content;
      paste.isDraft = true;
      await paste.save();
    } else {
      // Create new draft
      paste = new Paste({
        user: req.user._id,
        title: title || 'Untitled',
        content: content || '',
        uniqueId: generateUniqueId(),
        isDraft: true
      });
      await paste.save();
    }

    res.json({
      success: true,
      message: 'Draft auto-saved',
      paste: {
        id: paste._id,
        title: paste.title,
        content: paste.content,
        isDraft: paste.isDraft
      }
    });
  } catch (error) {
    console.error('Auto-save error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while auto-saving',
      error: error.message
    });
  }
});

// @route   GET /api/pastes/:id/analytics
// @desc    Get paste analytics
// @access  Private
router.get('/:id/analytics', authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const paste = await Paste.findById(id);

    if (!paste) {
      return res.status(404).json({
        success: false,
        message: 'Paste not found'
      });
    }

    // Check if user owns this paste
    if (paste.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    res.json({
      success: true,
      analytics: {
        totalViews: paste.views,
        viewHistory: paste.viewHistory,
        createdAt: paste.createdAt,
        expiresAt: paste.expiresAt,
        isExpired: paste.isExpired()
      }
    });
  } catch (error) {
    console.error('Analytics error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching analytics',
      error: error.message
    });
  }
});

export default router;
