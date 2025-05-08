// api.js
import axios from 'axios';
import { BASE_API_URL } from './config';

// Set up axios with the base URL
const apiClient = axios.create({
  baseURL: BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Sample API methods

// GET request
export const fetchData = async (endpoint) => {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

// POST request
export const postData = async (endpoint, data) => {
  try {
    const response = await apiClient.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

// PUT request
export const updateData = async (endpoint, data) => {
  try {
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

// DELETE request
export const deleteData = async (endpoint) => {
  try {
    const response = await apiClient.delete(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};


// Function to edit role
export const editRole = async (_id, role) => {
  try {
    const endpoint = `/editRole?_id=${_id}&role=${role}`;
    const data = { _id, role };
    const response = await apiClient.put(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('Error editing role:', error);
    throw error;
  }
};