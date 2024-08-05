import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput as PaperTextInput, Provider as PaperProvider } from 'react-native-paper';
import styles from '../styles/styles'; // Importing the styles

const SignupScreen: React.FC = () => {
  const [firstName, setFirstName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [firmName, setFirmName] = useState<string>('');
  const [gstin, setGstin] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<string>('');
  const [phoneError, setPhoneError] = useState<string>('');
  const [passwordError, setPasswordError] = useState<string>('');
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');

  const handleSignup = () => {
    let valid = true;

    // Reset error messages
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address');
      valid = false;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError('Please enter a valid 10-digit phone number');
      valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError('Password must be at least 8 characters long, contain at least one special character, and contain at least two numbers');
      valid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    }

    if (valid) {
      console.log('Signup button pressed');
      // Proceed with signup logic
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Signup to your Account</Text>

        <View style={styles.row}>
          <PaperTextInput
            label="First Name"
            value={firstName}
            onChangeText={setFirstName}
            style={styles.inputHalf}
            mode="outlined"
          />
          <PaperTextInput
            label="Last Name"
            value={lastName}
            onChangeText={setLastName}
            style={styles.inputHalf}
            mode="outlined"
          />
        </View>
        <PaperTextInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
          error={!!phoneError}
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        <PaperTextInput
          label="Email ID"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          error={!!emailError}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <PaperTextInput
          label="Address"
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          mode="outlined"
        />
        <PaperTextInput
          label="Firm Name"
          value={firmName}
          onChangeText={setFirmName}
          style={styles.input}
          mode="outlined"
        />
        <PaperTextInput
          label="GSTIN No."
          value={gstin}
          onChangeText={setGstin}
          style={styles.input}
          mode="outlined"
        />
        <View style={styles.passwordContainer}>
          <PaperTextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry={!passwordVisible}
            error={!!passwordError}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIcon}
          >
            <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
        <View style={styles.passwordContainer}>
          <PaperTextInput
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
            mode="outlined"
            secureTextEntry={!confirmPasswordVisible}
            error={!!confirmPasswordError}
          />
          <TouchableOpacity
            onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            style={styles.eyeIcon}
          >
            <Icon name={confirmPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />
          </TouchableOpacity>
        </View>
        {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Signup</Text>
        </TouchableOpacity>
      </ScrollView>
    </PaperProvider>
  );
};

export default SignupScreen;
