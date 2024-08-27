import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Platform,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import {
  useNavigation,
  NavigationProp,
  useRoute,
  RouteProp,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { TextInput as PaperInput } from "react-native-paper";
import { RootStackParamList } from "../../../(tabs)/types"; // Adjust the import path
import styles from "../../../../../Event-Planner/app/screens/CreateInvoice/styles/styles";
import axios from "axios";
interface FormData {
  customer: string;
  phoneNumber: string;
  address: string;
  emailId: string;
  gstinNumber: string;
  dateTime: Date;
  venueDetails: string;
  invoiceNumber: string;
  items: Item[];
}
interface Item {
  itemName: string;
  quantity: string;
  price: string;
  discount: string;
  payableAmount: string;
  miscellaneous: string;
}

const CreateInvoice: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Typed navigation prop
  const route = useRoute<RouteProp<{ params: { newItem?: Item } }, "params">>();

  const [customer, setCustomer] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");

  const [address, setAddress] = useState<string>("");
  const [emailId, setEmailId] = useState<string>("");
  const [gstinNumber, setGstinNumber] = useState<string>("");
  const [dateTime, setDateTime] = useState<Date>(new Date());
  const [venueDetails, setVenueDetails] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("01");
  const [items, setItems] = useState<Item[]>([]); // State for items

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);

  // State for validation
  const [customerError, setCustomerError] = useState<boolean>(false);
  const [phoneNumberError, setPhoneNumberError] = useState<boolean>(false);

  const [formData, setFormData] = useState<FormData>({
    customer: "",
    phoneNumber: "",
    address: "",
    emailId: "",
    gstinNumber: "",
    dateTime: new Date(),
    venueDetails: "",
    invoiceNumber: "01",
    items: items,
  });



  const handleInputChange = (name: keyof FormData, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateChange = (
    event: DateTimePickerEvent,
    selectedDate?: Date
  ) => {
    const currentDate = selectedDate || formData.dateTime;
    setShowDatePicker(false);
    setFormData({ ...formData, dateTime: currentDate });
  };
  useEffect(() => {
    if (route.params?.newItem) {
      const newItem = route.params.newItem;
      if (newItem) {
        setItems((prevItems) => [...prevItems, newItem]);
      }
    }
  }, [route.params?.newItem]);

  const handleSave = async () => {
    let valid = true;

    if (!customer.trim()) {
      setCustomerError(true);
      valid = false;
    } else {
      setCustomerError(false);
    }

    const phoneNumberPattern = /^\d{10}$/;
    if (!phoneNumberPattern.test(phoneNumber.trim())) {
      setPhoneNumberError(true);
      valid = false;
    } else {
      setPhoneNumberError(false);
    }

    if (!valid) {
      return;
    }

    const formData = {
      customer,
      phoneNumber,
      address,
      emailId,
      gstinNumber,
      dateTime,
      venueDetails,
      invoiceNumber,
      items,
    };

    try {
      const response = await axios.post(
        "http://localhost:3000/CreateInvoice",
        formData
      );
      console.log("Invoice saved:", response.data);
      navigation.goBack(); // Navigate back after saving
    } catch (error) {
      console.error("Error saving invoice:", error);
    }
  };

  const handleViewAsPDF = async () => {
    const html = `
      <html>
        <body>
          <h1>Invoice</h1>
          <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
          <p><strong>Customer:</strong> ${customer}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Email ID:</strong> ${emailId}</p>
          <p><strong>GSTIN Number:</strong> ${gstinNumber}</p>
          <p><strong>Date & Time:</strong> ${dateTime.toDateString()}</p>
          <p><strong>Venue Details:</strong> ${venueDetails}</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      console.log("PDF generated at:", uri);
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Error generating or sharing PDF:", error);
    }
  };
  const handleShare = async () => {
    const html = `
      <html>
        <body>
          <h1>Invoice</h1>
          <p><strong>Invoice Number:</strong> ${invoiceNumber}</p>
          <p><strong>Customer:</strong> ${customer}</p>
          <p><strong>Phone Number:</strong> ${phoneNumber}</p>
          <p><strong>Address:</strong> ${address}</p>
          <p><strong>Email ID:</strong> ${emailId}</p>
          <p><strong>GSTIN Number:</strong> ${gstinNumber}</p>
          <p><strong>Date & Time:</strong> ${dateTime.toDateString()}</p>
          <p><strong>Venue Details:</strong> ${venueDetails}</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        console.log("Sharing is not available on this platform");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

  const handleAddItem = () => {
    navigation.navigate("AddItem", { fromScreen: "CreateInvoice" });
  };

  const handleBack = () => {
    navigation.goBack(); // Navigate back to the previous screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#051650" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Invoice</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-social" size={24} color="#051650" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Invoice Number</Text>
            <Picker
              selectedValue={invoiceNumber}
              onValueChange={(itemValue) => setInvoiceNumber(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="01" value="01" />
              <Picker.Item label="02" value="02" />
              <Picker.Item label="03" value="03" />
              {/* Add more options as needed */}
            </Picker>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Date</Text>
            <TouchableOpacity
              style={styles.dateButton}
              onPress={() => setShowDatePicker(true)}
            >
              <Text style={styles.dateText}>{dateTime.toDateString()}</Text>
            </TouchableOpacity>
            {showDatePicker && (
              <DateTimePicker
                value={dateTime}
                mode="date"
                display="default"
                onChange={(event, selectedDate) => {
                  const currentDate = selectedDate || dateTime;
                  setShowDatePicker(false);
                  setDateTime(currentDate);
                }}
              />
            )}
          </View>
        </View>
        <View style={styles.form}>
          <PaperInput
            mode="outlined"
            label="Customer"
            value={customer}
            onChangeText={setCustomer}
            style={[
              styles.input,
              customerError && { borderColor: "red" }, // Apply red border if error
            ]}
            theme={{
              colors: {
                text: "#051650",
                primary: customerError ? "red" : "#051650",
                background: "white",
              },
            }}
          />
          {customerError && (
            <Text style={{ color: "red", marginBottom: 8 }}>
              This is a required field.
            </Text>
          )}
          <PaperInput
            mode="outlined"
            label="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
            style={[
              styles.input,
              phoneNumberError && { borderColor: "red" }, // Apply red border if error
            ]}
            theme={{
              colors: {
                text: "#051650",
                primary: phoneNumberError ? "red" : "#051650",
                background: "white",
              },
            }}
          />
          {phoneNumberError && (
            <Text style={{ color: "red", marginBottom: 8 }}>
              Enter a 10 digits Mobile Number
            </Text>
          )}
          <PaperInput
            mode="outlined"
            label="Address"
            value={address}
            onChangeText={setAddress}
            style={styles.input}
            theme={{
              colors: {
                text: "#051650",
                primary: "#051650",
                background: "white",
              },
            }}
          />
          <PaperInput
            mode="outlined"
            label="Email Id"
            value={emailId}
            onChangeText={setEmailId}
            keyboardType="email-address"
            style={styles.input}
            theme={{
              colors: {
                text: "#051650",
                primary: "#051650",
                background: "white",
              },
            }}
          />
          <PaperInput
            mode="outlined"
            label="GSTIN Number"
            value={gstinNumber}
            onChangeText={setGstinNumber}
            style={styles.input}
            theme={{
              colors: {
                text: "#051650",
                primary: "#051650",
                background: "white",
              },
            }}
          />
          <PaperInput
            mode="outlined"
            label="Date and Time"
            value={formData.dateTime.toLocaleString()} // Showing date and time
            style={styles.input}
            editable={false} // Make it non-editable
            theme={{
              colors: {
                text: "#051650",
                primary: "#051650",
                background: "white",
              },
            }}
          />
          <PaperInput
            mode="outlined"
            label="Venue Details"
            value={venueDetails}
            onChangeText={setVenueDetails}
            style={styles.input}
            theme={{
              colors: {
                text: "#051650",
                primary: "#051650",
                background: "white",
              },
            }}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.addItemButton}
            onPress={handleAddItem}
          >
            <Text style={styles.addItemButtonText}>+Add Item</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.pdfButton} onPress={handleViewAsPDF}>
            <Text style={styles.pdfButtonText}>View as PDF</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

export default CreateInvoice;

