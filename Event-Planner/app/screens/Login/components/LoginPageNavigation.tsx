
// LoginPageNavigation.js
import React from 'react';
import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';

const Stack = createStackNavigator();

const LoginPageNavigation = () => {
  return (
    <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginPage}
        options={{ headerShown: false }} // Hide header for the Login screen
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={{ title: 'Forgot Password' }} // Customize header for ForgotPassword screen
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginPageNavigation;
