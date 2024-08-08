import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import  SignupScreen from '../../app/screens/SignUp/components/SignupScreen';
import LoginPageNavigation from '../../app/screens/Login/components/LoginPageNavigation';
import   {RootStackParamList}  from './types';
import LoginPage from '../../app/screens/Login/components/LoginPage';
import ForgotPassword from '../../app/screens/Login/components/ForgotPassword';
import DashNavigation from '../screens/Dashboard/components/DashboardNavigation';
import SettingNavigation from '../screens/Setting/components/SettingNavigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <NavigationContainer independent={true}>
        <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{ headerShown: true }} // Hide header for the Login screen
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
          component={DashNavigation}
          options={{ headerShown: false }} // Customize header for SignUp screen
        />
         <Stack.Screen name="Settings" 
        component={SettingNavigation} 
        options={{headerShown:false}}
        />
      
      </Stack.Navigator>
    </NavigationContainer>

    </NavigationContainer>
  );
};

export default AppNavigator;
