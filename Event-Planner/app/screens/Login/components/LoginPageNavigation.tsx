import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './LoginPage';
import ForgotPassword from './ForgotPassword';
import SignupScreen from '../../../../app/screens/SignUp/components/SignupScreen'; // Import the SignUp component
import DashboardScreen from '../../Dashboard/components/Dashboard';
import { RootStackParamList } from '../../../(tabs)/types';


const Stack = createStackNavigator<RootStackParamList>();

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
        <Stack.Screen
          name="SignUp"
          component={SignupScreen}
          options={{ title: 'Sign Up' }} // Customize header for SignUp screen
        />
        <Stack.Screen
          name="Dashboard"
          component={DashboardScreen}
          options={{ headerShown: false }} // Hide header for Dashboard screen if needed
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default LoginPageNavigation;
