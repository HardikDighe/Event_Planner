

const strings = {
    labels: {
      vendorName: "Vendor Name",
      phoneNumber: "Phone Number",
      address: "Address",
      gstNumber: "GSTIN No.",
    },
    errors: {
      phoneNumberRequired: "Phone number is required.",
      vendorNameRequired: "Vendor name is required.",
      addressRequired: "Address is required.",
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

  