import axios from 'axios';
import { Alert } from 'react-native';
import { ENDPOINTS, ERROR_MESSAGES, ALERT_MESSAGES } from '../constants/string';
import { API_BASE_URL } from '@/app/(tabs)/constants/constant.api';


export const saveQuotation = async (quotationData: Object): Promise<boolean> => {
    try {
        const response = await axios.post(`${API_BASE_URL}${ENDPOINTS.saveQuotation}`, quotationData);
        if (response.status === 200 || response.status === 201) {
            return true; // Return true if the response is successful
        } else {
            Alert.alert('Error', ERROR_MESSAGES.saveError);
            return false;
        }
    } catch (error) {
        Alert.alert('Error', ALERT_MESSAGES.saveQuotationError);
        return false;
    }
};

export const deleteQuotation = async (quotationId: string): Promise<boolean> => {
    try {
        const response = await axios.delete(`${API_BASE_URL}${ENDPOINTS.deleteQuotation(quotationId)}`);
        if (response.status === 200) {
            console.log('Quotation deleted successfully.');
            return true;
        } else {
            console.error(ERROR_MESSAGES.deleteQuotation);
            return false;
        }
    } catch (error) {
        console.error(ALERT_MESSAGES.deleteQuotationError, error);
        return false;
    }
};

export const fetchQuotationDetails = async (quotationId: string) => {
    try {
        const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.fetchQuotationDetails(quotationId)}`);
        if (response.status === 200) {
            return response.data;
        } else {
            console.error(ERROR_MESSAGES.fetchQuotationDetails);
            return null;
        }
    } catch (error) {
        console.error(ALERT_MESSAGES.fetchQuotationDetailsError, error);
        return null;
    }
};

export const fetchQuotationId = async (): Promise<number | null> => {
    try {
        const response = await axios.get(`${API_BASE_URL}${ENDPOINTS.fetchQuotationId}`);
        if (response.status === 200) {
            return response.data as number;
        } else {
            console.error(ERROR_MESSAGES.fetchQuotationId);
            return null;
        }
    } catch (error) {
        console.error(ALERT_MESSAGES.fetchQuotationIdError, error);
        return null;
    }
};

export const updateQuotation = async (quotationId: string | number, quotationDetails: any): Promise<boolean> => {
    try {
        const response = await axios.put(`${API_BASE_URL}${ENDPOINTS.updateQuotation(quotationId)}`, quotationDetails);
        if (response.status === 200) {
            console.log('Quotation updated successfully');
            return true;
        } else {
            console.error(ERROR_MESSAGES.updateQuotation);
            return false;
        }
    } catch (error) {
        console.error(ALERT_MESSAGES.updateQuotationError, error);
        return false;
    }
};
