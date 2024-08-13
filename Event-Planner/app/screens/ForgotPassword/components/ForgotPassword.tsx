import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ label, value, onChangeText, secureTextEntry = false, keyboardType = 'default' }) => {
  const [isSecure, setIsSecure] = useState(secureTextEntry);
  const isFocused = value.length > 0;

  const toggleSecureTextEntry = () => {
    setIsSecure(!isSecure);
  };

  return (
    <View style={styles.inputContainer}>
      {isFocused && <Text style={styles.floatingLabel}>{label}</Text>}
      <TextInput
        style={styles.input}
        placeholder={!isFocused ? label : ''}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        keyboardType={keyboardType}
      />
      {secureTextEntry && (
        <TouchableOpacity style={styles.eyeIcon} onPress={toggleSecureTextEntry}>
          <MaterialIcons name={isSecure ? 'visibility' : 'visibility-off'} size={20} color="gray" />
        </TouchableOpacity>
      )}
    </View>
  );
};

interface ForgotPasswordProps {
  navigation: any;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');

  const isValidEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSendOtp = () => {
    if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
      return;
    }
    console.log("Sending OTP to:", email);
    setOtpSent(true);
    setEmailError('');
  };

  const getPasswordError = (password: string): string[] => {
    const errors: string[] = [];
    if (password.length < 8) {
      errors.push('Password must be at least 8 characters long');
    }
    return errors;
  };

  const handleResetPassword = () => {
    const passwordValidationErrors = getPasswordError(newPassword);
    if (passwordValidationErrors.length > 0) {
      setNewPasswordError(passwordValidationErrors.join('\n'));
      return;
    }
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match!");
      return;
    }
    console.log("Resetting password for:", email);
    navigation.navigate('Login');
  };

  const handlePrint = async () => {
    try {
      const htmlContent = `
        <h1>All Events</h1>
        <!-- Your HTML content for the PDF goes here -->
      `;
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, { mimeType: 'application/pdf', dialogTitle: 'Share your PDF' });
      } else {
        Alert.alert('Error', 'Sharing is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating or sharing the PDF');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      {!otpSent ? (
        <>
          <FloatingLabelInput
            label="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
          <TouchableOpacity style={styles.button} onPress={handleSendOtp}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <FloatingLabelInput
            label="Enter OTP"
            value={otp}
            onChangeText={setOtp}
            keyboardType="numeric"
          />
          <FloatingLabelInput
            label="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={true}
          />
          {newPasswordError ? <Text style={styles.errorText}>{newPasswordError}</Text> : null}
          <FloatingLabelInput
            label="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={true}
          />
          <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
            <Text style={styles.buttonText}>Reset Password</Text>
          </TouchableOpacity>
        </>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.linkText}>Back to Login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 40,
    fontSize: 16,
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 10,
  },
  floatingLabel: {
    position: 'absolute',
    left: 20,
    top: -10,
    fontSize: 12,
    color: 'black',
    backgroundColor: 'white',
    paddingHorizontal: 5,
    zIndex: 1,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: 10,
  },
  button: {
    backgroundColor: "#051650",
    padding: 10,
    alignItems: "center",
    marginBottom: 10,
    borderRadius: 10,
    width: '100%',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  linkText: {
    color: "#051650",
    textAlign: "center",
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
  shareButton: {
    marginTop: 20,
  },
});

export default ForgotPassword;