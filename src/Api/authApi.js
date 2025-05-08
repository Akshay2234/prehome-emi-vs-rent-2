import axios from 'axios';
import { BASE_API_URL } from './config';

// Function to check if a user exists
export const addUser = async (email) => {
  try {
    console.log(email)
    const response = await axios.post(`${BASE_API_URL}/addUser`, { email });
    return response.data; // Assuming response contains { isUser: true/false }
  } catch (error) {
    console.error('Error checking user status:', error);
    throw error;
  }
};

// Function to verify OTP
export const otpVerify = async (email, otp) => {
  try {
    // Since it's a GET request, parameters are passed in the URL
    const response = await axios.get(`${BASE_API_URL}/otpVerify`, {
      params: { email, otp }, // Pass email and otp as query parameters
    });
    return response.data; // Assuming response contains verification result
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

// Function to verify password
export const passwordVerified = async (_id, password) => {
  try {
    const response = await axios.put(`${BASE_API_URL}/passwordVerified`, {
      _id,
      password,
    });
    return response.data; // Assuming response contains the result of password verification
  } catch (error) {
    console.error('Error verifying password:', error);
    throw error;
  }
};


// Function for google sign in
export const ContinueWithGmail = async (email,name,verified_email) => {
  try {
    const response = await axios.post(`${BASE_API_URL}/continueWithGmail`, { email,name,verified_email });
    return response.data; // Assuming response contains { isUser: true/false }
  } catch (error) {
    console.error('Error checking user status:', error);
    throw error;
  }
};