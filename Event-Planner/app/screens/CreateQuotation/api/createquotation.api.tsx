import { Alert } from 'react-native';

export const saveQuotation = async (quotationData: Object): Promise<boolean> => {
    try {
        const response = await fetch('http://localhost:3000/demoQuotation', {
            method: 'POST',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quotationData),
        });

        if (response.ok) {
            // API call was successful
            return true;  // Return true if the response is successful
        } else {
            Alert.alert('Error', 'Failed to save quotation.');
            return false;  // Return false if the response is not successful
        }
    } catch (error) {
        Alert.alert('Error', 'An error occurred while saving the quotation.');
        return false;  // Return false if an error occurs
    }
};
