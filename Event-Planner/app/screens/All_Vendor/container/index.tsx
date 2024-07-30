import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import VendorListScreen from "../../../../app/screens/All_Vendor/components/AllVendor";

const App = () => {
  return (
    <PaperProvider>
      <VendorListScreen />
    </PaperProvider>
  );
};

export default App;