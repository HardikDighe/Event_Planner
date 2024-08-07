import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from '../../../../../Event-Planner/app/screens/EditProfile/styles/styles';  // Import the styles

const EditProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleSave = () => {
        // Handle saving profile changes
        console.log('Profile updated:', { name, email });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Edit Profile</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditProfile;
