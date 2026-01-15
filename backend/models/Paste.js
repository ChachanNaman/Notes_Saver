import mongoose from 'mongoose';

const pasteSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
    maxlength: [200, 'Title cannot exceed 200 characters']
  },
  content: {
    type: String,
    required: [true, 'Content is required'],
    maxlength: [100000, 'Content cannot exceed 100,000 characters']
  },
  uniqueId: {
    type: String,
    required: true,
    unique: true
  },
  isDraft: {
    type: Boolean,
    default: false
  },
  expiresAt: {
    type: Date,
    default: null
  },
  views: {
    type: Number,
    default: 0
  },
  viewHistory: [{
    viewedAt: {
      type: Date,
      default: Date.now
    },
    ipAddress: {
      type: String,
      default: null
    }
  }]
}, {
  timestamps: true
});

// Index for faster queries
pasteSchema.index({ user: 1, createdAt: -1 });
// uniqueId already has unique: true which creates an index, so we don't need to add it again
pasteSchema.index({ expiresAt: 1 });

// Method to check if paste is expired
pasteSchema.methods.isExpired = function() {
  if (!this.expiresAt) {
    return false;
  }
  return new Date() > this.expiresAt;
};

// Method to increment views
pasteSchema.methods.incrementViews = async function(ipAddress = null) {
  this.views += 1;
  this.viewHistory.push({
    viewedAt: new Date(),
    ipAddress: ipAddress
  });
  await this.save();
};

const Paste = mongoose.model('Paste', pasteSchema);

export default Paste;
