import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SettingsScreen from './Setting';
import EditProfileScreen from '../../../../app/screens/EditProfile/components/EditProfile';
import ChangePasswordScreen from '../../../../app/screens/ChangePassword/components/ChangePassword';
import PrivacyPolicyScreen from '../../../../app/screens/PrivacyPolicy/components/PrivacyPolicy';

const Stack = createNativeStackNavigator();

const SettingNavigation: React.FC = () => {
    return (
        <Stack.Navigator initialRouteName="Settings">
            <Stack.Screen
                name="Settings"
                component={SettingsScreen}
                options={{ title: 'Settings' }} // Customize header options as needed
            />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{ title: 'Edit Profile' }}
            />
            <Stack.Screen
                name="ChangePassword"
                component={ChangePasswordScreen}
                options={{ title: 'Change Password' }}
            />
            <Stack.Screen
                name="PrivacyPolicy"
                component={PrivacyPolicyScreen}
                options={{ title: 'Privacy Policy' }}
            />
        </Stack.Navigator>
    );
};

export default SettingNavigation;
