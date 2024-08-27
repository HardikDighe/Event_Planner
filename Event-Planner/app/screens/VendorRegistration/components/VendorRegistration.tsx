import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import styles from "../../../../../Event-Planner/app/screens/VendorRegistration/styles/styles";
import strings from "../../../../app/screens/VendorRegistration/constants/string";
import {
  saveVendorData,
  VendorData,
} from "../../../../app/screens/VendorRegistration/api/vendorreg,api"; // Import the API function
import { RootStackParamList, Item } from "@/app/(tabs)/constants/types";

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

  const [vendorNameError, setVendorNameError] = useState("");
  const [phoneNumberError, setPhoneNumberError] = useState("");
  const [addressError, setAddressError] = useState("");

  const [items, setItems] = useState<Item[]>([]);
  const route = useRoute<RouteProp<RootStackParamList, "VendorRegistration">>();

  useEffect(() => {
    if (route.params?.newItem) {
      const newItem = route.params.newItem;
      if (newItem) {
        setItems((prevItems) => [...prevItems, newItem]);
      }
    }
  }, [route.params?.newItem]);

  const handleSave = async () => {
    let hasError = false;

    if (!vendorName) {
      setVendorNameError(strings.errors.vendorNameRequired);
      hasError = true;
    } else {
      setVendorNameError("");
    }

    if (!phoneNumber) {
      setPhoneNumberError(strings.errors.phoneNumberRequired);
      hasError = true;
    } else {
      setPhoneNumberError("");
    }

    if (!address) {
      setAddressError(strings.errors.addressRequired);
      hasError = true;
    } else {
      setAddressError("");
    }

    if (hasError) return;

    const vendorData: VendorData = {
      vendorName,
      phoneNumber,
      address,
      gstNumber,
      items,
    };

    const result = await saveVendorData(vendorData);

    if (result.success) {
      Alert.alert("Success", strings.alerts.success);
      navigation.goBack();
    } else {
      Alert.alert("Error", result.error || strings.alerts.error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        label={strings.labels.vendorName}
        value={vendorName}
        onChangeText={setVendorName}
        style={[styles.input, vendorNameFocused && styles.focusedInput]}
        onFocus={() => setVendorNameFocused(true)}
        onBlur={() => setVendorNameFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
        error={!!vendorNameError}
      />
      {vendorNameError ? (
        <Text style={styles.errorText}>{vendorNameError}</Text>
      ) : null}

      <TextInput
        label={strings.labels.phoneNumber}
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
        label={strings.labels.address}
        value={address}
        onChangeText={setAddress}
        style={[styles.input, addressFocused && styles.focusedInput]}
        onFocus={() => setAddressFocused(true)}
        onBlur={() => setAddressFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
        error={!!addressError}
      />
      {addressError ? (
        <Text style={styles.errorText}>{addressError}</Text>
      ) : null}

      <TextInput
        label={strings.labels.gstNumber}
        value={gstNumber}
        onChangeText={setGstNumber}
        keyboardType="numeric"
        style={[styles.input, gstNumberFocused && styles.focusedInput]}
        onFocus={() => setGstNumberFocused(true)}
        onBlur={() => setGstNumberFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />
      <TouchableOpacity
        onPress={() =>
          navigation.navigate("AddItem", { fromScreen: "VendorRegistration" })
        }
      >
        <Text style={[styles.addItemText, { color: "#051650" }]}>
          {strings.buttons.addItem}
        </Text>
      </TouchableOpacity>

      <View style={styles.spacer} />

      <TouchableOpacity onPress={handleSave} style={styles.button}>
        <Text style={styles.saveButtonText}>{strings.buttons.submit}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default VendorRegistration;
