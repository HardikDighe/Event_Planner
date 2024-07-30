import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Provider as PaperProvider } from "react-native-paper"; // Import PaperProvider
import AddItem from "../../../../app/screens/AddItem/components/AddItem";

const Stack = createStackNavigator();

const App = () => {
  return (
    <PaperProvider>
      {/* Wrap NavigationContainer with PaperProvider */}
      <NavigationContainer independent={true}>
        <Stack.Navigator initialRouteName="Add Item">
          <Stack.Screen
            name="AddItem"
            component={AddItem}
            options={{
              headerStyle: {
                backgroundColor: "light gray", // Correct color definition
              },
              headerTintColor: "#051650",
              headerTitleStyle: {
                fontFamily: "Arial Regular",
              },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;