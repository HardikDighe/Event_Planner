// types.ts
export type RootStackParamList = {
  Home: undefined;
  
  VendorRegisteration: undefined;
  Dashboard: undefined;
  VendorRegistration: undefined;
  AddItem: undefined;
  Auth: undefined;
  Signup: undefined;
  SignUp: undefined;
  Login: undefined;
  LoginPage: undefined;
  LoginPageNavigation: undefined;
  DrawerContent: undefined;
  AllInvoices: undefined;
  CreateInvoice: undefined;
  ForgotPassword: undefined;
  Settings:undefined;
  Notifications:undefined;
  AllQuotations:undefined;
  CreateQuotation: {
    newItem?: Item;
};
  AllEvents:undefined;
  AllVendors:undefined;
  EventRegistration:undefined;
  AllEventsNaviagtion:undefined;
  RegisterEvent:undefined;
  // EditQuotation:undefined;
  // SelectInvoiceFormat:undefined;


  
  SelectInvoiceFormat: {
    customerName: string;
    phoneNumber: string;
    address: string;
    emailId: string;
    gstin: string;
    quotationDate: Date;
    venueDate: Date;
    venueTime: Date;
    venueDetails: string;
    items: Item[];
};
ViewInvoice: {
    customerName: string;
    phoneNumber: string;
    address: string;
    emailId: string;
    gstin: string;
    quotationDate: Date;
    venueDate: Date;
    venueTime: Date;
    venueDetails: string;
    items: Item[];
};
EditQuotation: {
    quotationId: string;
};
// AddItem: undefined;

};

export type RootDrawerParamList = {
  Dashboard: undefined;
  DashboardScreen: undefined;
  Invoices: undefined;
  Quotation: undefined;
  AllEvents: undefined;
  AllVendors: undefined;
  VendorRegistration: undefined;
  ServiceRegistration: undefined;
 
};

interface Item {
  itemName: string;
  quantity: number;
  price: number;
  discount: number;
  payableAmount: number;
  miscellaneous: string;
}