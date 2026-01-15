// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper function to get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('token');
};

// Helper function to set auth token
const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Helper function to remove auth token
const removeToken = () => {
  localStorage.removeItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    ...options,
    headers: {
      ...getAuthHeaders(),
      ...options.headers
    }
  };
  
  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'An error occurred');
    }

    return data;
  } catch (error) {
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (username, email, password) => {
    const data = await apiRequest('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password })
    });
    
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  login: async (email, password) => {
    const data = await apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    if (data.token) {
      setToken(data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  logout: () => {
    removeToken();
    localStorage.removeItem('user');
  },

  getCurrentUser: async () => {
    return await apiRequest('/auth/me');
  },

  isAuthenticated: () => {
    return !!getToken();
  },

  getUser: () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  }
};

// Paste API
export const pasteAPI = {
  getAll: async (search = '', draft = null) => {
    const params = new URLSearchParams();
    if (search) params.append('search', search);
    if (draft !== null) params.append('draft', draft);
    
    const queryString = params.toString();
    const endpoint = `/pastes${queryString ? `?${queryString}` : ''}`;
    
    return await apiRequest(endpoint);
  },

  getById: async (id) => {
    return await apiRequest(`/pastes/${id}`);
  },

  create: async (pasteData) => {
    return await apiRequest('/pastes', {
      method: 'POST',
      body: JSON.stringify(pasteData)
    });
  },

  update: async (id, pasteData) => {
    return await apiRequest(`/pastes/${id}`, {
      method: 'PUT',
      body: JSON.stringify(pasteData)
    });
  },

  delete: async (id) => {
    return await apiRequest(`/pastes/${id}`, {
      method: 'DELETE'
    });
  },

  autoSave: async (id, title, content) => {
    return await apiRequest(`/pastes/${id}/auto-save`, {
      method: 'POST',
      body: JSON.stringify({ title, content })
    });
  },

  getAnalytics: async (id) => {
    return await apiRequest(`/pastes/${id}/analytics`);
  }
};

export { getToken, setToken, removeToken };
