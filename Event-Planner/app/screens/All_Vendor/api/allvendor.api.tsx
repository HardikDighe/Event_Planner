import axios from 'axios';
import { Alert } from 'react-native';
import { API_BASE_URL, ENDPOINTS, ERROR_MESSAGES, ALERT_MESSAGES } from '../../VendorRegistration/constants/string';

export const fetchAllVendors = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.getVendors}`);
        if (response.status === 200) {
            console.log('API Response:', response.data); // Debugging: Log the API response
            return response.data;
        } else {
            console.log('API Response Error:', response.status, response.statusText); // Debugging: Log status error
            Alert.alert('Error', ERROR_MESSAGES.fetchVendorsError);
            return [];
        }
    } catch (error) {
        console.error('API Fetch Error:', error); // Debugging: Log the actual error
        Alert.alert('Error', ALERT_MESSAGES.fetchVendorsError);
        return [];
    }
};
