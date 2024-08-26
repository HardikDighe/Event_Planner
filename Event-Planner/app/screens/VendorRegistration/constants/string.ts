

const strings = {
    labels: {
      vendorName: "Vendor Name",
      phoneNumber: "Phone Number",
      address: "Address",
      gstNumber: "GSTIN No.",
    },
    errors: {
      phoneNumberRequired: "Phone number is required.",
      gstNumberInvalid: "GST number must be exactly 15 digits.",
    },
    alerts: {
      success: "Vendor data saved successfully.",
      error: "Failed to save vendor data.",
      savingError: "An error occurred while saving vendor data.",
    },
    buttons: {
      addItem: "+ Add Item",
      submit: "Submit",
    },
  };
  
  export default strings;

  // apiConfig.ts
export const API_BASE_URL = 'http://localhost:3000';

export const ENDPOINTS = {
  getVendors: '/AllVendors',
  // Add other endpoints here
};

export const ERROR_MESSAGES = {
  fetchVendorsError: 'Failed to fetch vendors. Please try again.',
};

export const ALERT_MESSAGES = {
  fetchVendorsError: 'There was an error while fetching vendors.',
};

  