// Navigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AllEvents from '../components/AllEvents';
import RegisterEvent from '../../RegisterEvent/components/CustomerDetails';
RegisterEvent
const Stack = createNativeStackNavigator();

const AllEventsNaviagtion = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="AllEvents">
        <Stack.Screen 
          name="AllEvents" 
          component={AllEvents} 
        />
        <Stack.Screen 
          name="RegisterEvent" 
          component={RegisterEvent} 
         
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AllEventsNaviagtion;
