import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllQuotation from "../../../screens/All_Quotation/components/AllQuotations";

// Define the type for the root stack parameters
type RootStackParamList = {
  AllQuotation: undefined;
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
