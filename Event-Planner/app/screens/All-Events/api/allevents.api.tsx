import axios from 'axios';
import { Alert } from 'react-native';
import { ENDPOINTS, ERROR_MESSAGES } from '../constants/string';
import { API_BASE_URL } from '@/app/(tabs)/constants/constant.api';

// Fetch data from the API
export const fetchEvents = async (): Promise<any[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.fetchEvents}`);
    if (response.status === 200) {
      return response.data; // Return the data if the response is successful
    } else {
      Alert.alert('Error', ERROR_MESSAGES.fetchError);
      return [];
    }
  } catch (error) {
    Alert.alert('Error', ERROR_MESSAGES.fetchError);
    return [];
  }
};
