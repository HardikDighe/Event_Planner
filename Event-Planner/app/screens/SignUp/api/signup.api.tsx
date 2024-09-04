import axios from 'axios';
import { SIGNUP_API_ENDPOINT } from '../constants/string';
import { API_BASE_URL } from '@/app/(tabs)/constants/constant.api';

interface UserData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  address: string;
  firmName: string;
  gstin: string;
  password: string;
  confirmPassword: string;
}

export const signupUser = async (userData: UserData): Promise<any> => {
  try {
    const response = await axios.post(`${API_BASE_URL}${SIGNUP_API_ENDPOINT}`, userData,{
      headers: { 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to signup. Please try again later.');
  }
};
