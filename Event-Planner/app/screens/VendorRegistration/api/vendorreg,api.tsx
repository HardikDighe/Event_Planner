import axios, { AxiosError } from "axios";
import { Item } from "../../../../app/(tabs)/constants/types";
import { API_BASE_URL } from "@/app/(tabs)/constants/constant.api";
import { ENDPOINTS } from "../constants/string";
export interface VendorData {
  vendorName: string;
  phoneNumber: string;
  address: string;
  gstNumber: string;
  items: Item[];
}

export const saveVendorData = async (vendorData: VendorData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}${ENDPOINTS.getVendors}`,
      vendorData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Vendor data saved successfully:", response.data);
    return { success: true, data: response.data };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      console.error("Axios error:", error.response?.data || error.message);
      return {
        success: false,
        error:
          error.response?.data || "An error occurred while saving vendor data.",
      };
    } else if (error instanceof Error) {
      // General error handling
      console.error("General error:", error.message);
      return { success: false, error: error.message };
    } else {
      // Fallback for unexpected error types
      console.error("Unexpected error:", error);
      return { success: false, error: "An unexpected error occurred." };
    }
  }
};
