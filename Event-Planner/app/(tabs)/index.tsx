// index.tsx

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllQuotation from "../screens/All_Quotation/components/AllQuotations";
import CreateQuotation from "../../app/screens/CreateQuotation/components/CreateQuotation";
import { createStackNavigator } from "@react-navigation/stack";
import AddItem from "../../app/screens/AddItem/components/AddItem";
import EditQuotation from "../screens/CreateQuotation/components/EditQuotation";
import SelectInvoiceFormat from "../../app/screens/CreateQuotation/components/SelectInvoiceFromat";
import { RootDrawerParamList } from "../../app/screens/Dashboard/components/types";

// Define the type for the root stack parameters
type RootStackParamList = {
  AllQuotation: undefined;
  CreateQuotation: undefined;
  EditQuotation: undefined;
  SelectInvoiceFormat: undefined;
  AddItem: undefined;
};

// Create the stack navigator
const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="AllQuotation">
        <Stack.Screen
          name="AllQuotation"
          component={AllQuotation}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateQuotation"
          component={CreateQuotation}
          options={{ title: "Create Quotation" }} // Optionally set options for the new screen
        />
      </Stack.Navigator>
      <Stack.Screen name="EditQuotation" component={EditQuotation} />
      <Stack.Screen
        name="SelectInvoiceFormat"
        component={SelectInvoiceFormat}
      />
      <Stack.Screen name="AddItem" component={AddItem} />
    </NavigationContainer>
  );
};

export default App;
