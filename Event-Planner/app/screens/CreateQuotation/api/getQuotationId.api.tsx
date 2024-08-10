

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
