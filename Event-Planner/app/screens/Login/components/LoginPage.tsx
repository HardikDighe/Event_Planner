import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios'; // Import axios for making API calls
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon from react-native-vector-icons
import styles from '../styles/styles';
import { fetchUsers } from '../api/login.api';
import { ERROR_MESSAGE, STRINGS } from '../constants/string';

interface FloatingLabelInputProps {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  error?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({
  label,
  value,
  onChangeText,
  secureTextEntry = false,
  keyboardType = 'default',
  error,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);
  const togglePasswordVisibility = () => setIsPasswordVisible(!isPasswordVisible);

  return (
    <View style={styles.inputContainer}>
      <Text
        style={[
          styles.label,
          {
            top: isFocused || value ? -10 : 12,
            left: isFocused || value ? 10 : 15,
            fontSize: isFocused || value ? 12 : 16,
            color: isFocused || value ? 'black' : 'gray',
            backgroundColor: isFocused || value ? 'white' : 'transparent',
            paddingHorizontal: isFocused || value ? 5 : 0,
          },
        ]}
      >
        {label}
      </Text>
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { borderColor: isFocused ? '#2196F3' : 'gray' }]}
          value={value}
          onChangeText={onChangeText}
          onFocus={handleFocus}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry && !isPasswordVisible}
          keyboardType={keyboardType}
          placeholder={''}
          placeholderTextColor={'transparent'}
        />
        {secureTextEntry && (
          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.eyeIcon}>
            <Icon name={isPasswordVisible ? 'eye' : 'eye-slash'} size={20} color="gray" />
          </TouchableOpacity>
        )}
      </View>
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};

const isValidEmail = (email: string): boolean => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const getPasswordError = (password: string): string[] => {
  const errors: string[] = [];

  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }

  if (!/(?=.*\d)/.test(password)) {
    errors.push('Password must contain at least one digit');
  }

  if (!/(?=.*[a-z])/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }

  if (!/(?=.*[A-Z])/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }

  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one symbol (!@#$%^&*(),.?":{}|<>)');
  }

  return errors;
};

interface LoginPageProps {
  navigation: {
    navigate: (screen: string, params?: any) => void;
  };
}

const LoginPage: React.FC<LoginPageProps> = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
  const [loginError, setLoginError] = useState('');

  const handleLogin = async () => {
    let valid = true;

    if (!isValidEmail(email)) {
      setEmailError('Invalid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    const passwordValidationErrors = getPasswordError(password);
    if (passwordValidationErrors.length > 0) {
      setPasswordErrors(passwordValidationErrors);
      valid = false;
    } else {
      setPasswordErrors([]);
    }

    if (valid) {
      try {
        const users = await fetchUsers();

        const user = users.find((user: any) => user.email === email && user.password === password);

        if (user) {
          // Successful login
          setLoginError('');
          navigation.navigate('Dashboard', { email, password });
        } else {
          // Invalid email or password
          setLoginError(STRINGS.signUpPrompt);
        }
      } catch (error) {
        console.error(error);
        setLoginError(ERROR_MESSAGE.networkError);
      }
    }
  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.mainSection}>
          <Text style={styles.title}>{STRINGS.loginTitle}</Text>
          <FloatingLabelInput
            label="Enter your email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            error={emailError}
          />
          <FloatingLabelInput
            label="Enter your password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
          />
          {passwordErrors.length > 0 && (
            <View style={{ marginBottom: 10 }}>
              {passwordErrors.map((error, index) => (
                <Text key={index} style={styles.errorText}>
                  {error}
                </Text>
              ))}
            </View>
          )}
          {loginError ? (
            <Text style={styles.errorText}>{loginError}</Text>
          ) : null}
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>{STRINGS.loginButton}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleForgotPassword}>
            <Text style={styles.linkText}>{STRINGS.forgotPassword}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
            <Text style={styles.linkText}>{STRINGS.signUpPrompt}</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <Text>{STRINGS.contactInfo}</Text>
        <Text>{STRINGS.privacyPolicy}</Text>
      </View>
    </View>
  );
};

export default LoginPage;
