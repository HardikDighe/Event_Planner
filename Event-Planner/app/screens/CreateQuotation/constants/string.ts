export const HEADERS = {
    "Content-Type": "application/json"
};
export const ERROR_MESSAGES = {
    saveFailed: 'Failed to save quotation.',
    saveError: 'An error occurred while saving the quotation.',
    shareError:'Error, An error occurred while sharing the file.',
    deleteQuotation: 'Failed to delete quotation.',
    GenerateFailed:'Failed to generate or share PDF:',
    fetchQuotationDetails: 'Failed to fetch quotation details.',
    fetchQuotationId: 'Failed to fetch Quotation Id.',
    updateQuotation: 'Failed to update quotation.',
    loadIdFailed:'Error, Failed to load quotation ID.'
};


export const ENDPOINTS = {
    saveQuotation: '/demoQuotation',
    deleteQuotation: (quotationId: string) => `/demoQuotation/${quotationId}`,
    fetchQuotationDetails: (quotationId: string) => `/demoQuotation/${quotationId}`,
    fetchQuotationId: '/demoQuotation/quotationId',
    updateQuotation: (quotationId: string | number) => `/demoQuotation/${quotationId}`,
};

export const ALERT_MESSAGES = {
    saveQuotationError: 'An error occurred while saving the quotation.',
    deleteQuotationError: 'An error occurred while deleting the quotation.',
    fetchQuotationDetailsError: 'An error occurred while fetching the quotation details.',
    fetchQuotationIdError: 'An error occurred while fetching the quotation Id.',
    updateQuotationError: 'An error occurred while updating the quotation.',
};

export const STRINGS = {
    successTitle: "Success",
    successMessage: "Quotation saved successfully!",
    shareButtonText: "Share",
    editButtonText: "Edit",
    deleteButtonText: "Delete",
    closeButtonText: "Close",
    addItemButtonText: "+ Add Item",
    convertToInvoiceButtonText: "Convert to Invoice",
    saveButtonText: "Save",
    quotationNumberLabel: "Quotation Number",
    dateLabel: "Date:",
    enterCustomerName: "Enter Customer Name",
    enterPhoneNumber: "Enter Phone Number",
    enterAddress: "Enter Address",
    enterEmailId: "Enter Email ID",
    enterGSTIN: "Enter GSTIN",
    venueDateLabel: "Venue Date:",
    venueTimeLabel: "Venue Time:",
    enterVenueDetails: "Enter Venue Details",
    thankYouMassage:'Thank you for choosing us!'
    // Add more strings as needed
};

