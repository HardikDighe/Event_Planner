import React from 'react';
import { View, Text, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../../../../../Event-Planner/app/screens/Setting/styles/styles';  // Import the styles
import {RootStackParamList} from "../../../(tabs)/constants/types"

// Define the type for navigation
type SettingsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Settings'>;

const SettingsScreen = () => {
    const navigation = useNavigation<SettingsScreenNavigationProp>(); // Typed navigation
    const [isPushEnabled, setIsPushEnabled] = React.useState(false);
    const [isPromotionsEnabled, setIsPromotionsEnabled] = React.useState(false);
    const [isAppUpdatesEnabled, setIsAppUpdatesEnabled] = React.useState(false);

    return (
        <View style={styles.container}>
            {/* Header */}
            {/* <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View> */}
            
            {/* Profile Section */}
            {/* <View style={styles.profileSection}>
                <Text style={styles.profileName}>ABC</Text>
            </View> */}
            
            {/* Account Settings */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Account Settings</Text>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('EditProfile')}>
                    <Text>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('ChangePassword')}>
                    <Text>Change your password</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('PrivacyPolicy')}>
                    <Text>Privacy Policy</Text>
                </TouchableOpacity>
            </View>

            {/* Notification Settings */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Notification Settings</Text>
                <View style={styles.item}>
                    <Text>Push Notification</Text>
                    <Switch
                        value={isPushEnabled}
                        onValueChange={setIsPushEnabled}
                    />
                </View>
              
                <View style={styles.item}>
                    <Text>App Updates</Text>
                    <Switch
                        value={isAppUpdatesEnabled}
                        onValueChange={setIsAppUpdatesEnabled}
                    />
                </View>
            </View>
        </View>
    );
};

export default SettingsScreen;
