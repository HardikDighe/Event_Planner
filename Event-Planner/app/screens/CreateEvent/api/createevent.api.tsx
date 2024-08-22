import axios from 'axios';
import { Alert } from 'react-native';
import { API_BASE_URL, ENDPOINTS, ERROR_MESSAGES, ALERT_MESSAGES } from '../constants/string'; // Adjust the import path

export const saveCreateEvent = async (eventData: {
  eventTitle: string;
  date: string;
  time: string;
  location: string;
  eventDetails: string;
  customerData: Object;
}): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.createEvent}`, eventData);

    if (response.status === 200 || response.status === 201) {
      Alert.alert('Success', ALERT_MESSAGES.createEventSuccess(eventData.eventTitle, eventData.date, eventData.time, eventData.location));
      return true;
    } else {
      Alert.alert('Error', ERROR_MESSAGES.createEventError);
      return false;
    }
  } catch (error) {
    Alert.alert('Error', ERROR_MESSAGES.createEventError);
    return false;
  }
};
