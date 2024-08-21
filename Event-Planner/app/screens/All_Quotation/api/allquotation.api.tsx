// allquotation.api.tsx
export const fetchQuotations = async () => {
    try {
      const response = await fetch("http://localhost:3000/demoQuotation");
      const data = await response.json();
  
      const mappedQuotations = data.map((item: any) => {
        const firstItem = item.items[0] || {};
  
        return {
          id: item.id,
          name: item.customerName,
          amount: parseFloat(firstItem.payableAmount) || 0,
          balance: parseFloat(firstItem.balance) || 0,
          date: new Date(item.quotationDate).toLocaleDateString(),
          status: item.status || 'Unknown',
        };
      });
  
      return mappedQuotations;
    } catch (error) {
      console.error("Failed to fetch quotations:", error);
      return [];
    }
  };
  