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
