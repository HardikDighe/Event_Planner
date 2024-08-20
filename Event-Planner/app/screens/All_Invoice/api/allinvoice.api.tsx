// allinvoice.api.tsx
export type Invoice = {
    id: string;
    name: string;
    amount: number;
    balance: number;
    date: string;
    status: string;
  };
  export const fetchInvoices = async (): Promise<Invoice[]> => {
    try {
      const response = await fetch("http://localhost:3000/CreateInvoice");
      const data = await response.json();
      // Map the data to the required format, ensuring that items[0] exists
      return data.map((invoice: any) => {
        const firstItem = invoice.items && invoice.items[0];
        return {
          id: invoice.id,
          name: invoice.customer || "Unknown", // Fallback to "Unknown" if customer is empty
          amount: firstItem ? parseFloat(firstItem.payableAmount) : 0,
          balance: firstItem ? parseFloat(firstItem.balance) : 0,
          date: new Date(invoice.dateTime).toLocaleDateString(),
          status: "Approved", // You can set status as required
        };
      });
    } catch (error) {
      console.error("Failed to fetch invoices:", error);
      throw error;
    }
  };