import axios from "axios";

export const fetchQuotations = async () => {
  try {
    const response = await axios.get("http://localhost:3000/demoQuotation");
    const data = response.data;

    if (!Array.isArray(data)) {
      throw new Error("Data is not an array");
    }

    const mappedQuotations = data.map((item: any) => {
      const firstItem =
        item.items && Array.isArray(item.items) && item.items[0]
          ? item.items[0]
          : {};

      return {
        id: item.id || "N/A",
        name: item.customerName || "Unknown",
        phoneNumber: item.phoneNumber || "N/A", // Add phone number
        amount: parseFloat(firstItem.payableAmount) || 0,
        balance: parseFloat(firstItem.balance) || 0,
        date: item.quotationDate
          ? new Date(item.quotationDate).toLocaleDateString()
          : "N/A",
        status: item.status || "Unknown",
      };
    });

    return mappedQuotations;
  } catch (error) {
    console.error("Failed to fetch quotations:", error);
    return [];
  }
};
