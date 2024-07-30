import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Print from "expo-print";
import { AntDesign, Ionicons } from "@expo/vector-icons";

interface FormData {
  customer: string;
  phoneNumber: string;
  address: string;
  emailId: string;
  gstinNumber: string;
  dateTime: Date;
  venueDetails: string;
}

const CreateInvoice: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    customer: "",
    phoneNumber: "",
    address: "",
    emailId: "",
    gstinNumber: "",
    dateTime: new Date(),
    venueDetails: "",
  });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

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

  const handleSave = () => {
    console.log("Invoice saved:", formData);
  };

  const handleViewAsPDF = async () => {
    const html = `
      <h1>Invoice</h1>
      <p><strong>Customer:</strong> ${formData.customer}</p>
      <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
      <p><strong>Address:</strong> ${formData.address}</p>
      <p><strong>Email ID:</strong> ${formData.emailId}</p>
      <p><strong>GSTIN Number:</strong> ${formData.gstinNumber}</p>
      <p><strong>Date & Time:</strong> ${formData.dateTime.toDateString()}</p>
      <p><strong>Venue Details:</strong> ${formData.venueDetails}</p>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      console.log("PDF generated at:", uri);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  const handleShare = async () => {
    try {
      const result = await Share.share({
        message: "Check out this invoice",
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log("Shared with activity type: ", result.activityType);
        } else {
          console.log("Shared");
        }
      } else if (result.action === Share.dismissedAction) {
        console.log("Dismissed");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error sharing: ", error.message);
      } else {
        console.error("Error sharing: ", error);
      }
    }
  };

  const handleAddItem = () => {
    console.log("Add item clicked");
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Create Invoice</Text>
        <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
          <Ionicons name="share-social" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.body}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Invoice Number</Text>
            <Text style={styles.value}>02</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Date</Text>
            <Text style={styles.value}>28/05/2024</Text>
          </View>
        </View>
        <View style={styles.form}>
          <Text style={styles.label}>Customer</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === "customer" && styles.inputFocused,
            ]}
            placeholder="Enter customer name"
            value={formData.customer}
            onChangeText={(text) => handleInputChange("customer", text)}
            onFocus={() => setFocusedField("customer")}
            onBlur={() => setFocusedField(null)}
          />
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === "phoneNumber" && styles.inputFocused,
            ]}
            placeholder="Enter phone number"
            keyboardType="phone-pad"
            value={formData.phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
            onFocus={() => setFocusedField("phoneNumber")}
            onBlur={() => setFocusedField(null)}
          />
          <Text style={styles.label}>Address</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === "address" && styles.inputFocused,
            ]}
            placeholder="Enter address"
            value={formData.address}
            onChangeText={(text) => handleInputChange("address", text)}
            onFocus={() => setFocusedField("address")}
            onBlur={() => setFocusedField(null)}
          />
          <Text style={styles.label}>Email Id</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === "emailId" && styles.inputFocused,
            ]}
            placeholder="Enter email ID"
            keyboardType="email-address"
            value={formData.emailId}
            onChangeText={(text) => handleInputChange("emailId", text)}
            onFocus={() => setFocusedField("emailId")}
            onBlur={() => setFocusedField(null)}
          />
          <Text style={styles.label}>GSTIN Number</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === "gstinNumber" && styles.inputFocused,
            ]}
            placeholder="Enter GSTIN number"
            value={formData.gstinNumber}
            onChangeText={(text) => handleInputChange("gstinNumber", text)}
            onFocus={() => setFocusedField("gstinNumber")}
            onBlur={() => setFocusedField(null)}
          />
          <Text style={styles.label}>Date & Time</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>
              {formData.dateTime.toDateString()}
            </Text>
          </TouchableOpacity>
          {showDatePicker && (
            <DateTimePicker
              value={formData.dateTime}
              mode="date"
              display="default"
              onChange={handleDateChange}
            />
          )}
          <Text style={styles.label}>Venue Details</Text>
          <TextInput
            style={[
              styles.input,
              focusedField === "venueDetails" && styles.inputFocused,
            ]}
            placeholder="Enter venue details"
            value={formData.venueDetails}
            onChangeText={(text) => handleInputChange("venueDetails", text)}
            onFocus={() => setFocusedField("venueDetails")}
            onBlur={() => setFocusedField(null)}
          />
          <TouchableOpacity
            style={styles.addItemButton}
            onPress={handleAddItem}
          >
            <Text style={styles.addItemText}>+Add Item</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.viewAsPdfButton]}
            onPress={handleViewAsPDF}
          >
            <Text style={[styles.buttonText, styles.viewAsPdfButtonText]}>
              View as PDF
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.button, styles.saveButton]}
            onPress={handleSave}
          >
            <Text style={[styles.buttonText, styles.saveButtonText]}>Save</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#2c3e50",
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  backButton: {
    padding: 5,
  },
  shareButton: {
    padding: 5,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  body: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
  },
  form: {
    marginBottom: 32,
  },
  input: {
    backgroundColor: "#fff",
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  inputFocused: {
    borderColor: "#007BFF",
    borderWidth: 2,
  },
  dateButton: {
    backgroundColor: "#fff",
    borderColor: "#ced4da",
    borderWidth: 1,
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    alignItems: "center",
  },
  dateText: {
    fontSize: 16,
    color: "#333",
  },
  addItemButton: {
    backgroundColor: "#f5f5f5",
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 30,
    padding: 12,
    alignItems: "center",
    marginBottom: 16,
    paddingHorizontal: 10,
    width: 200,
    justifyContent: "center",
    alignSelf: "center",
  },
  addItemText: {
    fontSize: 16,
    color: "#333",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
  },
  viewAsPdfButton: {
    backgroundColor: "#fff",
  },
  viewAsPdfButtonText: {
    color: "red",
  },
  saveButton: {
    backgroundColor: "#051650",
  },
  saveButtonText: {
    color: "#fff",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateInvoice;
