import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, Alert, Switch } from 'react-native';
const RegisterEvent = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [numTickets, setNumTickets] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const [focusedField, setFocusedField] = useState('');
  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    policies: '',
  });
  const handleRegister = () => {
    let valid = true;
    const newErrors = {
      name: '',
      email: '',
      phone: '',
      policies: '',
    };
    if (!name) {
      newErrors.name = 'Name is required.';
      valid = false;
    }
    if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email address.';
      valid = false;
    }
    if (!validatePhone(phone)) {
      newErrors.phone = 'Phone number must be exactly 10 digits.';
      valid = false;
    }
    if (!isChecked) {
      newErrors.policies = 'You must agree to the event policies and terms.';
      valid = false;
    }
    setErrors(newErrors);
    if (valid) {
      // Handle registration logic here
      Alert.alert('Registered successfully!', `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nTickets: ${numTickets}`);
    } else {
      if (!isChecked) {
        Alert.alert('Please agree to the event policies and terms.');
      }
    }
  };
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };
  const validatePhone = (phone) => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Register Event</Text>
      <View style={styles.inputContainer}>
        {(focusedField === 'name' || name) && <Text style={styles.floatingLabel}>Name</Text>}
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : {}]}
          placeholder={focusedField !== 'name' && !name ? 'Name' : ''}
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedField('name')}
          onBlur={() => setFocusedField('')}
        />
        {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        {(focusedField === 'email' || email) && <Text style={styles.floatingLabel}>Email</Text>}
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : {}]}
          placeholder={focusedField !== 'email' && !email ? 'Email' : ''}
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField('email')}
          onBlur={() => setFocusedField('')}
          keyboardType="email-address"
        />
        {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      </View>
      <View style={styles.inputContainer}>
        {(focusedField === 'phone' || phone) && <Text style={styles.floatingLabel}>Phone</Text>}
        <TextInput
          style={[styles.input, errors.phone ? styles.inputError : {}]}
          placeholder={focusedField !== 'phone' && !phone ? 'Phone' : ''}
          value={phone}
          onChangeText={setPhone}
          onFocus={() => setFocusedField('phone')}
          onBlur={() => setFocusedField('')}
          keyboardType="phone-pad"
        />
        {errors.phone ? <Text style={styles.errorText}>{errors.phone}</Text> : null}
      </View>
      <View style={styles.ticketsContainer}>
        <Text style={styles.ticketsLabel}>Number of tickets</Text>
        <TextInput
          style={styles.ticketsInput}
          placeholder=""
          value={numTickets}
          onChangeText={setNumTickets}
          keyboardType="numeric"
        />
      </View>
      <View style={styles.checkboxContainer}>
        <Switch
          value={isChecked}
          onValueChange={setIsChecked}
          trackColor={{ false: '#767577', true: '#81B0FF' }}
          thumbColor={isChecked ? '#6200EE' : '#F4F3F4'}
        />
        <Text style={styles.checkboxLabel}>Read Event Policies and Terms</Text>
      </View>
      {errors.policies ? <Text style={styles.errorText}>{errors.policies}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 10,
    position: 'relative',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  inputError: {
    borderColor: '#f00',
  },
  floatingLabel: {
    position: 'absolute',
    left: 10,
    top: -10,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    fontSize: 12,
    color: 'black',
  },
  ticketsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E8EAF6',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  ticketsLabel: {
    flex: 1,
    fontSize: 16,
  },
  ticketsInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    paddingLeft: 8,
    borderRadius: 5,
    backgroundColor: '#fff',
    flex: 0.5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#051650',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    width: '40%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#f00',
    fontSize: 12,
    marginTop: 5,
  },
});
export default RegisterEvent;