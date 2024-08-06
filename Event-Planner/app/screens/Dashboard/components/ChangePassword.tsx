import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const ChangePassword = () => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [messageColor, setMessageColor] = useState('red');

    const handleChangePassword = () => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        if (!passwordRegex.test(newPassword)) {
            setMessage('Password must be at least 8 characters long and include at least one uppercase letter, one number, and one special character');
            setMessageColor('red');
        } else if (newPassword !== confirmPassword) {
            setMessage('Passwords do not match');
            setMessageColor('red');
        } else {
            setMessage('Password changed successfully');
            setMessageColor('green');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Change Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Current Password"
                secureTextEntry
                value={currentPassword}
                onChangeText={setCurrentPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="New Password"
                secureTextEntry
                value={newPassword}
                onChangeText={setNewPassword}
            />
            <TextInput
                style={styles.input}
                placeholder="Confirm New Password"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Change Password</Text>
            </TouchableOpacity>
            {message ? <Text style={[styles.message, { color: messageColor }]}>{message}</Text> : null}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 12,
        paddingLeft: 8,
    },
    button: {
        backgroundColor: '#051650',
        padding: 10,
        alignItems: 'center',
        borderRadius: 5,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    message: {
        marginTop: 16,
        fontSize: 16,
    },
});

export default ChangePassword;
//
