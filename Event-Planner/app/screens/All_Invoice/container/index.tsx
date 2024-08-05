import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllInvoices from "../../../../app/screens/All_Invoice/components/AllInvoice"; // Adjust the import path if needed
import CreateInvoice from "../../../../app/screens/All_Invoice/components/CreateInvoice"; // Adjust the import path if needed

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="AllInvoices"
          component={AllInvoices}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="CreateInvoice"
          component={CreateInvoice}
          options={{ headerShown: false }}
        />
        {/* Add other screens here */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
