import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AllEvents from './AllEvents';
import RegisterEvent from './RegisterEvent';

type RootStackParamList = {
  AllEvents: undefined;
  RegisterEvent: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AllEventsNavigation = () => {
  return (
    <NavigationContainer>
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

export default AllEventsNavigation;
