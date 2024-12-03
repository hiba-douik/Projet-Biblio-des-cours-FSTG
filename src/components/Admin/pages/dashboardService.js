// src/services/dashboardService.ts
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;
const token = localStorage.getItem('token');

export const dashboardService = {
  async getUserCount() {
    try {
      const response = await axios.get(`${API_URL}/api/user/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching user count', error);
      return 0;
    }
  },

  async getDocumentCount() {
    try {
      const response = await axios.get(`${API_URL}/api/admin/document/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching document count', error);
      return 0;
    }
  },

  async getBibliothequeCount() {
    try {
      const response = await axios.get(`${API_URL}/api/admin/bibliotique/all`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching bibliotheque count', error);
      return 0;
    }
  },

  async getTypeCount() {
    try {
      const response = await axios.get(`${API_URL}/api/admin/type`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching type count', error);
      return 0;
    }
  }
};