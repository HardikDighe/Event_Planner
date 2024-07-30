import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AllInvoices from "../../../../app/screens/All_Invoice/components/AllInvoice"; // Adjust the path if necessary

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator>
        <Stack.Screen
          name="AllInvoices"
          component={AllInvoices}
          options={{ headerShown: false }} // Hide the default header
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;