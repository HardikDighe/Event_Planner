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
