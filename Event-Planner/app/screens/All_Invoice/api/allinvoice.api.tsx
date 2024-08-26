import axios from 'axios';

export type Invoice = {
  id: string;
  name: string;
  amount: number;
  balance: number;
  date: string;
  status: string;
  phoneNumber: string; // Added phone number field
};

export const fetchInvoices = async (): Promise<Invoice[]> => {
  try {
    const response = await axios.get("http://localhost:3000/CreateInvoice");
    const data = response.data;

    // Map the data to the required format
    return data.map((invoice: any) => {
      const firstItem = invoice.items && invoice.items[0];
      return {
        id: invoice.id,
        name: invoice.customer || "Unknown",
        amount: firstItem ? parseFloat(firstItem.payableAmount) : 0,
        balance: firstItem ? parseFloat(firstItem.balance) : 0,
        date: new Date(invoice.dateTime).toLocaleDateString(),
        status: "Approved", // You can set status as required
        phoneNumber: invoice.phoneNumber || "", // Include phone number
      };
    });
  } catch (error) {
    console.error("Failed to fetch invoices:", error);
    throw error;
  }
};
