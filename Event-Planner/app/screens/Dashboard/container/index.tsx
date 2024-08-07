
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DashboardScreen from '../../../../app/screens/Dashboard/components/Dashboard';
import DrawerContent from '../../DrawerContent/components/DrawerContent'; // Adjust the path to your DrawerContent
import { RootStackParamList, RootDrawerParamList } from '../../../../app/screens/Dashboard/components/types';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen name="Dashboard" component={DashboardScreen} />
      {/* Add more screens here as needed */}
    </Drawer.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={DrawerNavigator} // Use the Drawer Navigator here
          options={{ headerShown: false }} // Hide the header for the drawer navigator
        />
        {/* Add more stack screens here as needed */}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
