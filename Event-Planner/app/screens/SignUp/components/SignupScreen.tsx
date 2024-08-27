import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput as PaperTextInput, Provider as PaperProvider } from 'react-native-paper';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../app/(tabs)/constants/types'; 
import { Strings } from '../constants/string';
import { signupUser } from '../api/signup.api';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>(); // Use typed navigation
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

  const handleSignup = async () => {
    let valid = true;

    // Reset error messages
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setConfirmPasswordError('');

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError(Strings.emailError);
      valid = false;
    }

    // Phone number validation
    const phoneRegex = /^\d{10}$/;
    if (!phoneRegex.test(phoneNumber)) {
      setPhoneError(Strings.phoneError);
      valid = false;
    }

    // Password validation
    const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    if (!passwordRegex.test(password)) {
      setPasswordError(Strings.passwordError);
      valid = false;
    }

    // Confirm password validation
    if (password !== confirmPassword) {
      setConfirmPasswordError(Strings.confirmPasswordError);
      valid = false;
    }

    if (valid) {
      try {
        const userData = {
          firstName,
          lastName,
          phoneNumber,
          email,
          address,
          firmName,
          gstin,
          password,
        };

        const data = await signupUser(userData);

        // Handle successful signup
        Alert.alert('Success', Strings.signupSuccess);
      } catch (error) {
        // Handle errors from the server or network
        Alert.alert(Strings.signupError);
      }
    }
  };

  return (
    <PaperProvider>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>{Strings.signupTitle}</Text>

        <View style={styles.row}>
          <PaperTextInput
            label={Strings.firstNameLabel}
            value={firstName}
            onChangeText={setFirstName}
            style={styles.inputHalf}
            mode="outlined"
          />
          <PaperTextInput
            label={Strings.lastNameLabel}
            value={lastName}
            onChangeText={setLastName}
            style={styles.inputHalf}
            mode="outlined"
          />
        </View>
        <PaperTextInput
          label={Strings.phoneNumberLabel}
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          style={styles.input}
          mode="outlined"
          keyboardType="phone-pad"
          error={!!phoneError}
        />
        {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
        <PaperTextInput
          label={Strings.emailLabel}
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
          keyboardType="email-address"
          error={!!emailError}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <PaperTextInput
          label={Strings.addressLabel}
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          mode="outlined"
        />
        <PaperTextInput
          label={Strings.firmNameLabel}
          value={firmName}
          onChangeText={setFirmName}
          style={styles.input}
          mode="outlined"
        />
        <PaperTextInput
          label={Strings.gstinLabel}
          value={gstin}
          onChangeText={setGstin}
          style={styles.input}
          mode="outlined"
        />
        <View style={styles.passwordContainer}>
          <PaperTextInput
            label={Strings.passwordLabel}
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
            label={Strings.confirmPasswordLabel}
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
          <Text style={styles.buttonText}>{Strings.signupButton}</Text>
        </TouchableOpacity>
      </ScrollView>
    </PaperProvider>
  );
};

export default SignupScreen;
