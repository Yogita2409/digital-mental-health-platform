import { projectId, publicAnonKey } from './supabase/info';

const API_BASE_URL = `https://${projectId}.supabase.co/functions/v1/make-server-5913c255`;

// Generic API request function
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${publicAnonKey}`,
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API Error (${response.status}):`, errorText);
    throw new Error(`API Error: ${response.status} - ${errorText}`);
  }

  return response.json();
}

// Database operations for emergency resources
export const emergencyAPI = {
  // Save a user's emergency contact
  async saveEmergencyContact(userId: string, contact: any) {
    return apiRequest('/emergency-contacts', {
      method: 'POST',
      body: JSON.stringify({ userId, contact }),
    });
  },

  // Get user's emergency contacts
  async getEmergencyContacts(userId: string) {
    return apiRequest(`/emergency-contacts/${userId}`);
  },

  // Save user's preferred emergency settings
  async saveEmergencySettings(userId: string, settings: any) {
    return apiRequest('/emergency-settings', {
      method: 'POST',
      body: JSON.stringify({ userId, settings }),
    });
  },
};

// Example of how to use the KV store for any data
export const kvAPI = {
  // Store any key-value data
  async set(key: string, value: any) {
    return apiRequest('/kv/set', {
      method: 'POST',
      body: JSON.stringify({ key, value }),
    });
  },

  // Get data by key
  async get(key: string) {
    return apiRequest(`/kv/get/${key}`);
  },

  // Get multiple keys at once
  async getMultiple(keys: string[]) {
    return apiRequest('/kv/get-multiple', {
      method: 'POST',
      body: JSON.stringify({ keys }),
    });
  },

  // Get all keys with a prefix (useful for user-specific data)
  async getByPrefix(prefix: string) {
    return apiRequest(`/kv/prefix/${prefix}`);
  },
};

// Health check
export async function checkAPIHealth() {
  try {
    return await apiRequest('/health');
  } catch (error) {
    console.error('API Health Check Failed:', error);
    throw error;
  }
}