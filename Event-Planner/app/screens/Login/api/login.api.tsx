import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ERROR_MESSAGE, ENDPOINT } from '../constants/string';
import { API_BASE_URL } from '@/app/(tabs)/constants/constant.api';

// Function to log in the user and store the token
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${ENDPOINT}`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' }
      }
    );

    const token = response.data.token; // Assuming the token is returned as response.data.token

    // Store the token in AsyncStorage
    await AsyncStorage.setItem('authToken', token);

    // Set the token in Axios default headers
     axios.defaults.headers.common['Authorization'] = `Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ5b2dlc2gxMjM0QGdtYWlsLmNvbSIsImlhdCI6MTcyNTQyNjQxMCwiZXhwIjoxNzI1NDMwMDEwfQ.sxi5Zl7izO9QwNbNLxWWqAIIotlBkbX35bunoUsIK0PYG08BWnbaelFfmF3Dkf4lvhxe50yCoLwZc2Oh43Wx3w`;

    return response.data;
  } catch (error) {
    throw new Error(ERROR_MESSAGE.networkError);
  }
};

// Function to sign up a new user
// export const signUpUser = async (email: string, password: string) => {
//   try {
//     const response = await axios.post(
//       `${API_BASE_URL}${ENDPOINTS.signup}`,
//       { email, password },
//       {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true,
//       }
//     );

//     return response.data;
//   } catch (error) {
//     throw new Error(ERROR_MESSAGE.networkError);
//   }
// };

// Function to get the token from AsyncStorage
export const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem('authToken');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.warn('Token not found, redirecting to login');
      // Handle the redirection inside a component or use context
      // E.g., trigger navigation from a React component
    }
  } catch (error) {
    console.error('Error retrieving the token:', error);
    // Handle the error accordingly
  }
};
