import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert,Modal } from 'react-native';
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
  const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
  const [modalVisible, setModalVisible] = useState(false); // State for modal visibility
  
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
  
    // Privacy policy check
    if (!privacyPolicyAccepted) {
      Alert.alert(Strings.privacyPolicyError);
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
  
        // Navigate to the Login page after successful signup
        navigation.navigate('Login');
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

        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            onPress={() => setPrivacyPolicyAccepted(!privacyPolicyAccepted)}
            style={[styles.checkbox, privacyPolicyAccepted && styles.checkboxChecked]}
          >
            {privacyPolicyAccepted && <Icon name="check" size={20} color="white" />}
          </TouchableOpacity>
          <Text style={styles.checkboxLabel}>
            I agree to the{' '}
            <Text style={styles.termsLink} onPress={() => setModalVisible(true)}>
              Terms and Conditions
            </Text>
          </Text>
        </View>

       

        {/* Modal for Terms and Conditions */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>Terms and Conditions for Event Planner App</Text>
              <ScrollView>
                <Text style={styles.modalSectionTitle}>1. Introduction</Text>
                <Text style={styles.modalText}>
                  Welcome to [App Name]! These Terms and Conditions govern your use of our event planner app. By downloading or using the app, you agree to comply with these terms. Please read them carefully.
                </Text>
                <Text style={styles.modalSectionTitle}>2. Account Registration and Use</Text>
                <Text style={styles.modalText}>
                  To access certain features of the app, you must create an account. You agree to provide accurate and complete information during registration and to keep this information up to date. You are responsible for maintaining the confidentiality of your account and password.
                </Text>
                <Text style={styles.modalSectionTitle}>3. User Conduct and Responsibilities</Text>
                <Text style={styles.modalText}>
                  Users agree to use the app only for lawful purposes and in a way that does not infringe the rights of, restrict, or inhibit anyone else's use and enjoyment of the app. Users are responsible for any content they post and must ensure it is not illegal, defamatory, or infringing on others' rights.
                </Text>
                <Text style={styles.modalSectionTitle}>4. Event Creation and Management</Text>
                <Text style={styles.modalText}>
                  When creating events, you agree to provide accurate information and to update this information as necessary. You are solely responsible for managing attendees and ensuring all communications comply with applicable laws and regulations.
                </Text>
                <Text style={styles.modalSectionTitle}>5. Privacy and Data Protection</Text>
                <Text style={styles.modalText}>
                  We are committed to protecting your privacy. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.
                </Text>
              </ScrollView>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>{Strings.signupButton}</Text>
        </TouchableOpacity>
      </ScrollView>
    </PaperProvider>
  );
};

export default SignupScreen;
