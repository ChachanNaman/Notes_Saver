import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { toast } from 'sonner';
import { pasteAPI } from '../utils/api';

const initialState = {
  pastes: [],
  loading: false,
  error: null
}

// Async thunks for API calls
export const fetchPastes = createAsyncThunk(
  'paste/fetchPastes',
  async ({ search = '', draft = null } = {}, { rejectWithValue }) => {
    try {
      const response = await pasteAPI.getAll(search, draft);
      return response.pastes || [];
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createPaste = createAsyncThunk(
  'paste/createPaste',
  async (pasteData, { rejectWithValue }) => {
    try {
      const response = await pasteAPI.create(pasteData);
      
      // Check if paste ID already exists
      if (response.message && response.message.includes('already exists')) {
        toast.warning(response.message);
        throw new Error(response.message);
      }
      
      toast.success(response.message || 'Paste Created Successfully');
      return response.paste;
    } catch (error) {
      toast.error(error.message || 'Failed to create paste');
      return rejectWithValue(error.message);
    }
  }
);

export const updatePaste = createAsyncThunk(
  'paste/updatePaste',
  async ({ id, pasteData }, { rejectWithValue }) => {
    try {
      const response = await pasteAPI.update(id, pasteData);
      toast.success(response.message || 'Paste Updated');
      return response.paste;
    } catch (error) {
      toast.error(error.message || 'Failed to update paste');
      return rejectWithValue(error.message);
    }
  }
);

export const deletePaste = createAsyncThunk(
  'paste/deletePaste',
  async (id, { rejectWithValue }) => {
    try {
      await pasteAPI.delete(id);
      toast.success('Paste deleted successfully');
      return id;
    } catch (error) {
      toast.error(error.message || 'Failed to delete paste');
      return rejectWithValue(error.message);
    }
  }
);

export const autoSaveDraft = createAsyncThunk(
  'paste/autoSaveDraft',
  async ({ id, title, content }, { rejectWithValue }) => {
    try {
      if (id) {
        const response = await pasteAPI.autoSave(id, title, content);
        return response.paste;
      } else {
        // Create new draft if no id
        const response = await pasteAPI.create({ title, content, isDraft: true });
        return response.paste;
      }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const pasteSlice = createSlice({
  name: 'paste',
  initialState,
  reducers: {
    setPastes: (state, action) => {
      state.pastes = action.payload;
    },
    resetAllPastes: (state) => {
      state.pastes = [];
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch pastes
    builder
      .addCase(fetchPastes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPastes.fulfilled, (state, action) => {
        state.loading = false;
        state.pastes = action.payload;
      })
      .addCase(fetchPastes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Create paste
    builder
      .addCase(createPaste.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createPaste.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.pastes.unshift(action.payload);
        }
      })
      .addCase(createPaste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Update paste
    builder
      .addCase(updatePaste.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updatePaste.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          const index = state.pastes.findIndex(p => p._id === action.payload._id);
          if (index >= 0) {
            state.pastes[index] = action.payload;
          }
        }
      })
      .addCase(updatePaste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Delete paste
    builder
      .addCase(deletePaste.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deletePaste.fulfilled, (state, action) => {
        state.loading = false;
        state.pastes = state.pastes.filter(p => p._id !== action.payload);
      })
      .addCase(deletePaste.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });

    // Auto-save draft
    builder
      .addCase(autoSaveDraft.fulfilled, (state, action) => {
        if (action.payload) {
          const index = state.pastes.findIndex(p => p._id === action.payload.id);
          if (index >= 0) {
            state.pastes[index] = { ...state.pastes[index], ...action.payload };
          } else {
            state.pastes.unshift(action.payload);
          }
        }
      });
  }
})

// Action creators
export const { setPastes, resetAllPastes, clearError } = pasteSlice.actions

export default pasteSlice.reducer
