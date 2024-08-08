import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import styles from "../../../../../Event-Planner/app/screens/VendorRegistration/styles/styles"; // Import styles from the new file

interface Props {
  navigation: NavigationProp<any>;
}

const VendorRegistration: React.FC<Props> = ({ navigation }) => {
  const [vendorName, setVendorName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [gstNumber, setGstNumber] = useState("");

  const [vendorNameFocused, setVendorNameFocused] = useState(false);
  const [phoneNumberFocused, setPhoneNumberFocused] = useState(false);
  const [addressFocused, setAddressFocused] = useState(false);
  const [gstNumberFocused, setGstNumberFocused] = useState(false);

  const [phoneNumberError, setPhoneNumberError] = useState("");

  const handleSave = async () => {
    // Validate the phone number field
    if (!phoneNumber) {
      setPhoneNumberError("Phone number is required.");
      return;
    }

    // Clear the error message if validation passes
    setPhoneNumberError("");

    const vendorData = {
      vendorName,
      phoneNumber,
      address,
      gstNumber,
    };

    try {
      const response = await fetch("http://localhost:3000/Vendor", { // Use the correct backend server URL
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(vendorData),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log("Vendor data saved successfully:", jsonResponse);
        Alert.alert("Success", "Vendor data saved successfully.");
        navigation.goBack(); // Navigate back to the previous screen
      } else {
        const errorResponse = await response.json();
        console.error("Error saving vendor data:", errorResponse);
        Alert.alert("Error", "Failed to save vendor data.");
      }
    } catch (error) {
      console.error("Error saving vendor data:", error);
      Alert.alert("Error", "An error occurred while saving vendor data.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label="Vendor Name"
        value={vendorName}
        onChangeText={setVendorName}
        style={[styles.input, vendorNameFocused && styles.focusedInput]}
        onFocus={() => setVendorNameFocused(true)}
        onBlur={() => setVendorNameFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />
      <TextInput
        label="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        keyboardType="phone-pad"
        style={[styles.input, phoneNumberFocused && styles.focusedInput]}
        onFocus={() => setPhoneNumberFocused(true)}
        onBlur={() => setPhoneNumberFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
        error={!!phoneNumberError}
      />
      {phoneNumberError ? (
        <Text style={styles.errorText}>{phoneNumberError}</Text>
      ) : null}
      <TextInput
        label="Address"
        value={address}
        onChangeText={setAddress}
        style={[styles.input, addressFocused && styles.focusedInput]}
        onFocus={() => setAddressFocused(true)}
        onBlur={() => setAddressFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />
      <TextInput
        label="GSTIN No."
        value={gstNumber}
        onChangeText={setGstNumber}
        style={[styles.input, gstNumberFocused && styles.focusedInput]}
        onFocus={() => setGstNumberFocused(true)}
        onBlur={() => setGstNumberFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("AddItem")}>
        <Text style={[styles.addItemText, { color: "#051650" }]}>
          + Add Item
        </Text>
      </TouchableOpacity>

      {/* Spacer to push the Save button to the bottom */}
      <View style={styles.spacer} />

      <TouchableOpacity
        onPress={handleSave}
        style={styles.button}
      >
        <Text style={styles.saveButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VendorRegistration;
