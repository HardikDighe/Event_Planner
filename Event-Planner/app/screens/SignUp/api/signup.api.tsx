import axios from 'axios';
import { Constants } from '../constants/string'; 

export const signupUser = async (userData) => {
  try {
    const response = await axios.post(Constants.SIGNUP_API_ENDPOINT, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to signup. Please try again later.');
  }
};
