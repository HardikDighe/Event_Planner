// import React, { useState } from 'react';
// import { View, Text, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
// import Icon from 'react-native-vector-icons/FontAwesome';
// import { TextInput as PaperTextInput, Provider as PaperProvider } from 'react-native-paper';
// import styles from '../styles/styles';
// import { useNavigation } from '@react-navigation/native';
// import { StackNavigationProp } from '@react-navigation/stack';
// import { RootStackParamList } from '../../../../app/(tabs)/constants/types'; 
// import { Strings } from '../constants/string';
// import { signupUser } from '../api/signup.api';
// import { theme } from '../styles/styles';

// // The rest of your SignupScreen code...


// type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

// const SignupScreen: React.FC = () => {
//   const navigation = useNavigation<SignupScreenNavigationProp>();
//   const [firstName, setFirstName] = useState<string>('');
//   const [lastName, setLastName] = useState<string>('');
//   const [phoneNumber, setPhoneNumber] = useState<string>('');
//   const [email, setEmail] = useState<string>('');
//   const [address, setAddress] = useState<string>('');
//   const [firmName, setFirmName] = useState<string>('');
//   const [gstin, setGstin] = useState<string>('');
//   const [password, setPassword] = useState<string>('');
//   const [confirmPassword, setConfirmPassword] = useState<string>('');
//   const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
//   const [confirmPasswordVisible, setConfirmPasswordVisible] = useState<boolean>(false);
//   const [emailError, setEmailError] = useState<string>('');
//   const [phoneError, setPhoneError] = useState<string>('');
//   const [passwordError, setPasswordError] = useState<string>('');
//   const [confirmPasswordError, setConfirmPasswordError] = useState<string>('');
//   const [privacyPolicyAccepted, setPrivacyPolicyAccepted] = useState(false);
//   const [modalVisible, setModalVisible] = useState(false);
  
//   const handleSignup = async () => {
//     let valid = true;
  
//     // Reset error messages
//     setEmailError('');
//     setPhoneError('');
//     setPasswordError('');
//     setConfirmPasswordError('');
  
//     // Email validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       setEmailError(Strings.emailError);
//       valid = false;
//     }
  
//     // Phone number validation
//     const phoneRegex = /^\d{10}$/;
//     if (!phoneRegex.test(phoneNumber)) {
//       setPhoneError(Strings.phoneError);
//       valid = false;
//     }
  
//     // Password validation
//     const passwordRegex = /^(?=.*[!@#$%^&*])(?=.*\d.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
//     if (!passwordRegex.test(password)) {
//       setPasswordError(Strings.passwordError);
//       valid = false;
//     }
  
//     // Confirm password validation
//     if (password !== confirmPassword) {
//       setConfirmPasswordError(Strings.confirmPasswordError);
//       valid = false;
//     }
  
//     // Privacy policy check
//     if (!privacyPolicyAccepted) {
//       Alert.alert(Strings.privacyPolicyError);
//       valid = false;
//     }
  
//     if (valid) {
//       try {
//         const userData = {
//           firstName,
//           lastName,
//           phoneNumber,
//           email,
//           address,
//           firmName,
//           gstin,
//           password,
//           confirmPassword,
//         };
  
//         const data = await signupUser(userData);
  
//         // Handle successful signup
//         Alert.alert('Success', Strings.signupSuccess);
  
//         // Navigate to the Login page after successful signup
//         navigation.navigate('Login');
//       } catch (error) {
//         // Handle errors from the server or network
//         Alert.alert(Strings.signupError);
//       }
//     }
//   };
  
//   return (
//     <PaperProvider>
//       <ScrollView contentContainerStyle={styles.container}>
//         <Text style={styles.title}>{Strings.signupTitle}</Text>

//         <View style={styles.row}>
//           <PaperTextInput
//             label={Strings.firstNameLabel}
//             value={firstName}
//             onChangeText={setFirstName}
//             style={styles.inputHalf}
//             mode="outlined"
//             theme={theme}
//           />
//           <PaperTextInput
//             label={Strings.lastNameLabel}
//             value={lastName}
//             onChangeText={setLastName}
//             style={styles.inputHalf}
//             mode="outlined"
//             theme={theme}
//           />
//         </View>
//         <PaperTextInput
//           label={Strings.phoneNumberLabel}
//           value={phoneNumber}
//           onChangeText={setPhoneNumber}
//           style={styles.input}
//           mode="outlined"
//           keyboardType="phone-pad"
//           error={!!phoneError}
//           theme={theme}
//         />
//         {phoneError ? <Text style={styles.errorText}>{phoneError}</Text> : null}
//         <PaperTextInput
//           label={Strings.emailLabel}
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//           mode="outlined"
//           keyboardType="email-address"
//           error={!!emailError}
//           theme={theme}
//         />
//         {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
//         <PaperTextInput
//           label={Strings.addressLabel}
//           value={address}
//           onChangeText={setAddress}
//           style={styles.input}
//           mode="outlined"
//           theme={theme}
//         />
//         <PaperTextInput
//           label={Strings.firmNameLabel}
//           value={firmName}
//           onChangeText={setFirmName}
//           style={styles.input}
//           mode="outlined"
//           theme={theme}
//         />
//         <PaperTextInput
//           label={Strings.gstinLabel}
//           value={gstin}
//           onChangeText={setGstin}
//           style={styles.input}
//           mode="outlined"
//           theme={theme}
//         />
//         <View style={styles.passwordContainer}>
//           <PaperTextInput
//             label={Strings.passwordLabel}
//             value={password}
//             onChangeText={setPassword}
//             style={styles.input}
//             mode="outlined"
//             secureTextEntry={!passwordVisible}
//             error={!!passwordError}
//             theme={theme}
//           />
//           <TouchableOpacity
//             onPress={() => setPasswordVisible(!passwordVisible)}
//             style={styles.eyeIcon}
//           >
//             <Icon name={passwordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />
//           </TouchableOpacity>
//         </View>
//         {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
//         <View style={styles.passwordContainer}>
//           <PaperTextInput
//             label={Strings.confirmPasswordLabel}
//             value={confirmPassword}
//             onChangeText={setConfirmPassword}
//             style={styles.input}
//             mode="outlined"
//             secureTextEntry={!confirmPasswordVisible}
//             error={!!confirmPasswordError}
//             theme={theme}
//           />
//           <TouchableOpacity
//             onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
//             style={styles.eyeIcon}
//           >
//             <Icon name={confirmPasswordVisible ? 'eye-slash' : 'eye'} size={20} color="#000" />
//           </TouchableOpacity>
//         </View>
//         {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}

//         <View style={styles.checkboxContainer}>
//           <TouchableOpacity
//             onPress={() => setPrivacyPolicyAccepted(!privacyPolicyAccepted)}
//             style={[styles.checkbox, privacyPolicyAccepted && styles.checkboxChecked]}
//           >
//             {privacyPolicyAccepted && <Icon name="check" size={20} color="white" />}
//           </TouchableOpacity>
//           <Text style={styles.checkboxLabel}>
//             I agree to the{' '}
//             <Text style={styles.termsLink} onPress={() => setModalVisible(true)}>
//               Terms and Conditions
//             </Text>
//           </Text>
//         </View>

//         {/* Modal for Terms and Conditions */}
//         <Modal
//           visible={modalVisible}
//           transparent={true}
//           animationType="slide"
//           onRequestClose={() => setModalVisible(false)}
//         >
//           <ScrollView>
//             <View style={styles.modalContainer}>
//               <View style={styles.modalContent}>
//                 <Text style={styles.modalTitle}>{Strings.termsAndConditionsTitle}</Text>
//                 <Text style={styles.modalSectionTitle}>{Strings.introductionTitle}</Text>
//                 <Text style={styles.modalText}>{Strings.introductionText}</Text>
//                 <Text style={styles.modalSectionTitle}>{Strings.accountRegistrationTitle}</Text>
//                 <Text style={styles.modalText}>{Strings.accountRegistrationText}</Text>
//                 <Text style={styles.modalSectionTitle}>{Strings.userConductTitle}</Text>
//                 <Text style={styles.modalText}>{Strings.userConductText}</Text>
//                 <Text style={styles.modalSectionTitle}>{Strings.eventManagementTitle}</Text>
//                 <Text style={styles.modalText}>{Strings.eventManagementText}</Text>
//                 <Text style={styles.modalSectionTitle}>{Strings.privacyProtectionTitle}</Text>
//                 <Text style={styles.modalText}>{Strings.privacyProtectionText}</Text>
                
//                 <TouchableOpacity
//                   style={styles.closeButton}
//                   onPress={() => setModalVisible(false)}
//                 >
//                   <Text style={styles.closeButtonText}>{Strings.closeButtonText}</Text>
//                 </TouchableOpacity>
//               </View>
//             </View>
//           </ScrollView>
//         </Modal>

//         <TouchableOpacity style={styles.button} onPress={handleSignup}>
//           <Text style={styles.buttonText}>{Strings.signupButton}</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </PaperProvider>
//   );
// };

// export default SignupScreen;


import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TextInput as PaperTextInput, Provider as PaperProvider } from 'react-native-paper';
import styles from '../styles/styles';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../app/(tabs)/constants/types';
import { Strings } from '../constants/string';
import { theme } from '../styles/styles';

type SignupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Signup'>;

const SignupScreen: React.FC = () => {
  const navigation = useNavigation<SignupScreenNavigationProp>();

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
  const [modalVisible, setModalVisible] = useState(false);

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
        const response = await fetch('http://eventproject-env.eba-7htpjghs.us-east-1.elasticbeanstalk.com/user/create_user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json', // Added this header
          },
          body: JSON.stringify({
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            firmName,
            gstin,
            password,
            confirmPassword,
          }),
        });

        // Check if the response is OK
        if (!response.ok) {
          const errorData = await response.json();
          console.error('Server error:', errorData);
          Alert.alert('Error', errorData.message || 'An error occurred during signup.');
          return;
        }

        const result = await response.json();
        Alert.alert('Success', Strings.signupSuccess);
        navigation.navigate('Login');
      } catch (error) {
        console.error('Network error:', error);
        Alert.alert('Error', 'Failed to connect to the server. Please check your internet connection or try again later.');
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
            theme={theme}
          />
          <PaperTextInput
            label={Strings.lastNameLabel}
            value={lastName}
            onChangeText={setLastName}
            style={styles.inputHalf}
            mode="outlined"
            theme={theme}
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
          theme={theme}
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
          theme={theme}
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
        <PaperTextInput
          label={Strings.addressLabel}
          value={address}
          onChangeText={setAddress}
          style={styles.input}
          mode="outlined"
          theme={theme}
        />
        <PaperTextInput
          label={Strings.firmNameLabel}
          value={firmName}
          onChangeText={setFirmName}
          style={styles.input}
          mode="outlined"
          theme={theme}
        />
        <PaperTextInput
          label={Strings.gstinLabel}
          value={gstin}
          onChangeText={setGstin}
          style={styles.input}
          mode="outlined"
          theme={theme}
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
            theme={theme}
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
            theme={theme}
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

        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="slide"
          onRequestClose={() => setModalVisible(false)}
        >
          <ScrollView>
            <View style={styles.modalContainer}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>{Strings.termsAndConditionsTitle}</Text>
                <Text style={styles.modalSectionTitle}>{Strings.introductionTitle}</Text>
                <Text style={styles.modalText}>{Strings.introductionText}</Text>
                <Text style={styles.modalSectionTitle}>{Strings.accountRegistrationTitle}</Text>
                <Text style={styles.modalText}>{Strings.accountRegistrationText}</Text>
                <Text style={styles.modalSectionTitle}>{Strings.userConductTitle}</Text>
                <Text style={styles.modalText}>{Strings.userConductText}</Text>
                <Text style={styles.modalSectionTitle}>{Strings.eventManagementTitle}</Text>
                <Text style={styles.modalText}>{Strings.eventManagementText}</Text>
                <Text style={styles.modalSectionTitle}>{Strings.privacyProtectionTitle}</Text>
                <Text style={styles.modalText}>{Strings.privacyProtectionText}</Text>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>{Strings.closeButtonText}</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
        </Modal>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>{Strings.signupButton}</Text>
        </TouchableOpacity>
        <Text >
          
          <Text onPress={() => navigation.navigate('Login')}>
          
          </Text>
        </Text>
      </ScrollView>
    </PaperProvider>
  );
};

export default SignupScreen;
