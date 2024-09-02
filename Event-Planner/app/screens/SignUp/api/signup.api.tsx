import axios from 'axios';
import { SIGNUP_API_ENDPOINT } from '../constants/string';
import { API_BASE_URL } from '@/app/(tabs)/constants/constant.api';

export const signupUser = async (userData:any) => {
  try {
    const response = await axios.post(`${API_BASE_URL}${SIGNUP_API_ENDPOINT}`, userData);
    return response.data;
  } catch (error) {
    throw new Error('Failed to signup. Please try again later.');
  }
};
