import axios from 'axios';
import { BASE_API_URL } from './config';

// Function to check if a user exists
export const addUser = async (email) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/addUser`, { email });
    return response.data; // Assuming response contains { isUser: true/false }
  } catch (error) {
    console.error('Error checking user status:', error);
    throw error;
  }
};

// Function to get upcoming payment for a specific property
export const getUpcomingPayment = async (userPropertyId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/upcomingPayment`, {
      params: { pre_homer_id: userPropertyId },
    });
    return response.data; // Assuming response contains upcoming payment data
  } catch (error) {
    console.error('Error fetching upcoming payment:', error);
    throw error;
  }
};

// Function to get user profile
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getUserProfile`, {
      params: { _id: userId },
    });
    return response.data; // Assuming response contains user profile data
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Function to update user profile data
export const updateUserProfileData = async (profileData) => {
  try {
    const response = await axios.put(`${BASE_API_URL}/updateUserProfileData`, profileData, {
      headers: { 'Content-Type': 'application/json' },
    });
    return response.data; // Assuming response contains updated profile data or status
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Function to get notifications for a specific user property
export const getNotification = async (id) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getNotification`, {
      params: { pre_homer_id: id },
    });
    return response.data; // Assuming response contains notification data
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

// Function to get property details
export const getProperty = async (propertyId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getProperty`, {
      params: { property_id: propertyId },
    });
    return response.data; // Assuming response contains property data
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};

// Function to get property by user id details


export const getPropertyByPreHomerId = async (id) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getPropertyByPreHomerId`, {
      params: { _id: id },
    });
    return response.data; // Assuming response contains property data
  } catch (error) {
    console.error('Error fetching property details:', error);
    throw error;
  }
};

// Function to get payment details for a specific user property
export const getPaymentDetail = async (userPropertyId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/paymentDetail`, {
      params: { pre_homer_id: userPropertyId },
    });
    return response.data; // Assuming response contains payment detail data
  } catch (error) {
    console.error('Error fetching payment details:', error);
    throw error;
  }
};

// Function to get user notifications for a specific user property
export const getUserNotification = async (userPropertyId) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/getUserNotification`, {
      params: { pre_homer_id: userPropertyId },
    });
    return response.data; // Assuming response contains user notification data
  } catch (error) {
    console.error('Error fetching user notifications:', error);
    throw error;
  }
};

// Function to get user property price
export const getUserPropertyPrice = async (pre_homer_id) => {
  try {
    const response = await axios.get(`${BASE_API_URL}/userPropertyPrice`, {
      params: { pre_homer_id },
    });
    return response.data; // Assuming response contains user property price data
  } catch (error) {
    console.error('Error fetching user property price:', error);
    throw error;
  }
};
