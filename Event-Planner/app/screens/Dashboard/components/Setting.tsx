import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const navigation = useNavigation();
    const [isPushEnabled, setIsPushEnabled] = React.useState(false);
    const [isPromotionsEnabled, setIsPromotionsEnabled] = React.useState(false);
    const [isAppUpdatesEnabled, setIsAppUpdatesEnabled] = React.useState(false);

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Settings</Text>
            </View>
            
            {/* Profile Section */}
            <View style={styles.profileSection}>
                <Text style={styles.profileName}>ABC</Text>
            </View>
            
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
                    <Text>Promotions</Text>
                    <Switch
                        value={isPromotionsEnabled}
                        onValueChange={setIsPromotionsEnabled}
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

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#051650',
    },
    headerTitle: {
        color: '#FFF',
        fontSize: 18,
        marginLeft: 16,
    },
    profileSection: {
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#F5F5F5',
    },
    profileName: {
        fontSize: 18,
    },
    section: {
        padding: 16,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 12,
        borderBottomWidth: 1,
        borderBottomColor: '#E0E0E0',
    },
});

export default SettingsScreen;
