// index.tsx
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateInvoice from "../../CreateInvoice/components/CreateInvoice";
import AddItem from "../../../screens/AddItem/components/AddItem";
import { RootStackParamList } from "../../../(tabs)/constants/types"; // Adjust the import path
import AllInvoices from "../../../screens/All_Invoice/components/AllInvoice";
import { TouchableOpacity } from "react-native-gesture-handler";
import { TouchableOpacityBase } from "react-native";

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="AllInvoices">
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
        <Stack.Screen name="AddItem" component={AddItem} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
