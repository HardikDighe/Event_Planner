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

export const deleteQuotation= async (quotationId: string): Promise<boolean> => {
    try {
        const response = await fetch(`http://192.168.0.143:3000/demoQuotation/${quotationId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            console.log('Quotation deleted successfully.');
            return true;
        } else {
            console.error('Failed to delete quotation.');
            return false;
        }
    } catch (error) {
        console.error('An error occurred while deleting the quotation:', error);
        return false;
    }
};

export const fetchQuotationDetails = async (quotationId: string) => {
    try {
        const response = await fetch(`http://localhost:3000/demoQuotation/${quotationId}`);
        if (response.ok) {
            const data = await response.json();
            // console.log('Fetched Data:', data); // Debugging line
            return data;
        } else {
            console.error('Failed to fetch quotation details');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching the quotation details:', error);
        return null;
    }
};



export const fetchQuotationId = async (): Promise<number | null> => {
    try {
        const response = await fetch(`http://localhost:3000/demoQuotation/quotationId}`);
        if (response.ok) {
            const Id: number = await response.json();
            return Id;
        } else {
            console.error('Failed to fetch Quotation Id');
            return null;
        }
    } catch (error) {
        console.error('An error occurred while fetching the quotation Id:', error);
        return null;
    }
};

export const updateQuotation = async (quotationId: string | number, quotationDetails: any): Promise<boolean> => {
    try {
        const response = await fetch(`http://localhost:3000/demoQuotation/${quotationId}`, {
            method: 'PUT',
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quotationDetails),
        });

        if (response.ok) {
            // Successfully updated the quotation
            console.log('Quotation updated successfully');
            return true;
        } else {
            console.error('Failed to update quotation');
            return false;
        }
    } catch (error) {
        console.error('An error occurred while updating the quotation:', error);
        return false;
    }
};
