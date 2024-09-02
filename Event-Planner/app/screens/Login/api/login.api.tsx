import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { ERROR_MESSAGE, API_URL, ENDPOINT } from '../constants/string';

// Function to log in the user and store the token
export const loginUser = async (email: string, password: string) => {
  try {
    const response = await axios.post(
      `${API_URL}${ENDPOINT}`,
      { email, password },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    const token = response.data.token; // Assuming the token is returned as response.data.token

    // Store the token in AsyncStorage
    await AsyncStorage.setItem('authToken', token);

    // Set the token in Axios default headers
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    return response.data;
  } catch (error) {
    throw new Error(ERROR_MESSAGE.networkError);
  }
};

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
