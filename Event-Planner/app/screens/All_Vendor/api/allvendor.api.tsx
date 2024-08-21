import axios from 'axios';
import { Alert } from 'react-native';
import { API_BASE_URL, ENDPOINTS, ERROR_MESSAGES, ALERT_MESSAGES } from '../../VendorRegistration/constants/string';

export const fetchAllVendors = async (): Promise<any[]> => {
    try {
        const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.getVendors}`);
        if (response.status === 200) {
            return response.data;
        } else {
            Alert.alert('Error', ERROR_MESSAGES.fetchVendorsError);
            return [];
        }
    } catch (error) {
        Alert.alert('Error', ALERT_MESSAGES.fetchVendorsError);
        return [];
    }
};