import { Alert } from "react-native";
export const updateQuotation = async (quotationId: string | number, quotationDetails: any): Promise<boolean> => {
    try {
        const response = await fetch(`http://192.168.0.143:3000/demoQuotation/${quotationId}`, {
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
