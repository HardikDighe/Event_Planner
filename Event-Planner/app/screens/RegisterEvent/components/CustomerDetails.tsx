import React, { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
  Switch,
} from "react-native";
import { useNavigation, NavigationProp } from "@react-navigation/native";
import styles from "../styles/styles"; // Import the styles
import { RootStackParamList } from "../../../(tabs)/types"; // Adjust the import path as necessary
import CreateEvent from "../../CreateEvent/components/CreateEvent";

const RegisterEvent: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [numTickets, setNumTickets] = useState<string>("");
  // const [isChecked, setIsChecked] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string>("");
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleRegister = async () => {
    let valid = true;
    const newErrors = {
      name: "",
      email: "",
      phone: "",
    };

    if (!name) {
      newErrors.name = "Name is required.";
      valid = false;
    }
    if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address.";
      valid = false;
    }
    if (!validatePhone(phone)) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
      valid = false;
    }

    setErrors(newErrors);

    if (valid) {
      const data: any = {
        name,
        email,
        phone,
        numTickets,
      };
      navigation.navigate("CreateEvent", { data: data });
    }
  };

  const validateEmail = (email: string): boolean => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (phone: string): boolean => {
    const re = /^\d{10}$/;
    return re.test(String(phone));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Customer Details</Text>
      <View style={styles.inputContainer}>
        {(focusedField === "name" || name) && (
          <Text style={styles.floatingLabel}>Name</Text>
        )}
        <TextInput
          style={[styles.input, errors.name ? styles.inputError : {}]}
          placeholder={focusedField !== "name" && !name ? "Name" : ""}
          value={name}
          onChangeText={setName}
          onFocus={() => setFocusedField("name")}
          onBlur={() => setFocusedField("")}
        />
        {errors.name ? (
          <Text style={styles.errorText}>{errors.name}</Text>
        ) : null}
      </View>
      <View style={styles.inputContainer}>
        {(focusedField === "email" || email) && (
          <Text style={styles.floatingLabel}>Email</Text>
        )}
        <TextInput
          style={[styles.input, errors.email ? styles.inputError : {}]}
          placeholder={focusedField !== "email" && !email ? "Email" : ""}
          value={email}
          onChangeText={setEmail}
          onFocus={() => setFocusedField("email")}
          onBlur={() => setFocusedField("")}
          keyboardType="email-address"
        />
        {errors.email ? (
          <Text style={styles.errorText}>{errors.email}</Text>
        ) : null}
      </View>
      <View style={styles.inputContainer}>
        {(focusedField === "phone" || phone) && (
          <Text style={styles.floatingLabel}>Phone</Text>
        )}
        <TextInput
          style={[styles.input, errors.phone ? styles.inputError : {}]}
          placeholder={focusedField !== "phone" && !phone ? "Phone" : ""}
          value={phone}
          onChangeText={setPhone}
          onFocus={() => setFocusedField("phone")}
          onBlur={() => setFocusedField("")}
          keyboardType="phone-pad"
        />
        {errors.phone ? (
          <Text style={styles.errorText}>{errors.phone}</Text>
        ) : null}
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
      <TouchableOpacity style={styles.button} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default RegisterEvent;
