// import axios from 'axios';
// import { SIGNUP_API_ENDPOINT } from '../constants/string';
// import { API_BASE_URL } from '@/app/(tabs)/constants/constant.api';

// interface UserData {
//   firstName: string;
//   lastName: string;
//   phoneNumber: string;
//   email: string;
//   address: string;
//   firmName: string;
//   gstin: string;
//   password: string;
//   confirmPassword: string;
// }

// export const signupUser = async (userData: UserData): Promise<any> => {
//   const apiUrl = `${API_BASE_URL}${SIGNUP_API_ENDPOINT}`;
//   try {
//     console.log(`API URL: ${apiUrl}`); // Log the full API URL
//     const response = await axios.post(apiUrl, userData, {
//       headers: { 'Content-Type': 'application/json' },
//     });

//     // Check response data structure
//     if (response && response.data) {
//       return response.data;
//     } else {
//       throw new Error('Unexpected response structure');
//     }
//   } catch (error) {
//     // Enhanced error logging
//     if (axios.isAxiosError(error)) {
//       console.error('Signup API Error:', error.response?.data || error.message);
//       throw new Error(error.response?.data?.message || 'Failed to signup. Please try again later.');
//     } else {
//       console.error('Signup API Error:', error);
//       throw new Error('An unexpected error occurred. Please try again later.');
//     }
//   }
// };




import axios from 'axios';
import { SIGNUP_API_ENDPOINT } from '../constants/string';
import { API_BASE_URL } from '@/app/(tabs)/constants/constant.api';


export const signupUser = async (firstName: string,lastName: string,phoneNumber: string,email: string, address: string,firmName: string,gstin: string,password: string,confirmPassword: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${SIGNUP_API_ENDPOINT}`,
      { firstName,lastName,phoneNumber,email,address,firmName,gstin, password ,confirmPassword},
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );
    return response.data;
  
} catch (error) {
      throw new Error('Failed to signup. Please try again later.');
    }
  }