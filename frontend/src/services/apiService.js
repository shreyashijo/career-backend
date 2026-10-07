/**
 * API Service Layer for CareerGuide
 * Connected to Spring Boot Backend
 */

const API_BASE_URL = 'http://localhost:8081/api';

export const apiService = {

  async getProfile() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/students/profile`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `Server error: ${response.status}`
        };
      }

      return data;

    } catch (err) {
      console.error('Error fetching profile:', err);

      return {
        success: false,
        error: err.message
      };
    }
  },

  async saveProfile(profileData) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/students/profile`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify(profileData)
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json();

    } catch (err) {
      console.error('Error saving profile:', err);

      return {
        success: false,
        error: err.message
      };
    }
  },

  async evaluateRecommendations({
    profile,
    skills,
    interests,
    answers
  }) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/recommendations/evaluate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            profile,
            skills,
            interests,
            answers
          })
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json();

    } catch (err) {
      console.error(
        'Error evaluating recommendations:',
        err
      );

      return {
        success: false,
        error: err.message
      };
    }
  },

  async getLatestRecommendations() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/recommendations/latest`,
        {
          credentials: 'include'
        }
      );

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      return await response.json();

    } catch (err) {
      console.error(
        'Error fetching recommendations:',
        err
      );

      return {
        success: false,
        error: err.message
      };
    }
  },

  async registerUser({ fullName, email, password }) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            fullName,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Registration failed'
        );
      }

      return data;

    } catch (err) {
      console.error('Registration error:', err);

      return {
        success: false,
        error: err.message
      };
    }
  },

  async loginUser({ email, password }) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/login`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Login failed'
        );
      }

      return data;

    } catch (err) {
      console.error('Login error:', err);

      return {
        success: false,
        error: err.message
      };
    }
  },

  async getCurrentUser() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/me`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Not authenticated'
        };
      }

      return data;

    } catch (err) {
      console.error('Session check error:', err);

      return {
        success: false,
        error: 'Unable to connect to the server'
      };
    }
  },

  async logoutUser() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/logout`,
        {
          method: 'POST',
          credentials: 'include'
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Logout failed'
        );
      }

      return data;

    } catch (err) {
      console.error('Logout error:', err);

      return {
        success: false,
        error: err.message
      };
    }
  },

  async forgotPassword({ email }) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/forgot-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ email })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Failed to request password reset'
        );
      }

      return data;

    } catch (err) {
      console.error('Forgot password error:', err);

      return {
        success: false,
        error: err.message
      };
    }
  },

  async resetPassword(token, newPassword) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/reset-password`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            token,
            newPassword
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Invalid or expired password reset token.'
        };
      }

      return data;

    } catch (err) {
      console.error('Reset password error:', err);

      return {
        success: false,
        error: 'Network error. Please try again.'
      };
    }
  },

  async getRoadmapProgress(careerId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/roadmap?careerId=${encodeURIComponent(careerId)}`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Failed to load roadmap progress'
        };
      }

      return data;

    } catch (err) {
      console.error('Error fetching roadmap progress:', err);

      return {
        success: false,
        error: 'Network error loading roadmap progress'
      };
    }
  },

  async saveRoadmapProgress(careerId, completedTasks) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/roadmap/save`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({
            careerId,
            completedTasks
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Failed to save roadmap progress'
        };
      }

      return data;

    } catch (err) {
      console.error('Error saving roadmap progress:', err);

      return {
        success: false,
        error: 'Network error saving roadmap progress'
      };
    }
  },

  async getDashboard() {
    try {
      const response = await fetch(
        `${API_BASE_URL}/dashboard`,
        {
          method: 'GET',
          credentials: 'include'
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || `Server error: ${response.status}`
        };
      }

      return data;

    } catch (err) {
      console.error('Error fetching dashboard:', err);

      return {
        success: false,
        error: 'Network error loading dashboard'
      };
    }
  },

  async startRoadmap(careerId) {
    try {
      const response = await fetch(
        `${API_BASE_URL}/roadmap/start`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          body: JSON.stringify({ careerId })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        return {
          success: false,
          error: data.message || 'Failed to start roadmap'
        };
      }

      return data;

    } catch (err) {
      console.error('Error starting roadmap:', err);

      return {
        success: false,
        error: 'Network error starting roadmap'
      };
    }
  }
};