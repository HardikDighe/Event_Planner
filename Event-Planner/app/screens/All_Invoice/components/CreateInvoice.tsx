import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Share,
} from "react-native";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import * as Print from "expo-print";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { TextInput as PaperInput } from "react-native-paper";

interface FormData {
  customer: string;
  phoneNumber: string;
  address: string;
  emailId: string;
  gstinNumber: string;
  dateTime: Date;
  venueDetails: string;
  invoiceNumber: string;
}

const CreateInvoice: React.FC = () => {
  const navigation = useNavigation(); // Get navigation object

  const [formData, setFormData] = useState<FormData>({
    customer: "",
    phoneNumber: "",
    address: "",
    emailId: "",
    gstinNumber: "",
    dateTime: new Date(),
    venueDetails: "",
    invoiceNumber: "01",
  });

  const [showDatePicker, setShowDatePicker] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  const handleInputChange = (name: keyof FormData, value: string) => {
    if (name === "dateTime") {
      const dateValue = new Date(value);
      setFormData({ ...formData, [name]: dateValue });
    } else {
      setFormData({ ...formData, [name]: value });
    }
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
      <p><strong>Invoice Number:</strong> ${formData.invoiceNumber}</p>
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

  const handleBack = () => {
    navigation.goBack(); // Navigate back to previous screen
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
              selectedValue={formData.invoiceNumber}
              onValueChange={(itemValue) =>
                handleInputChange("invoiceNumber", itemValue)
              }
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
          </View>
        </View>
        <View style={styles.form}>
          <PaperInput
            mode="outlined"
            label="Customer"
            value={formData.customer}
            onChangeText={(text) => handleInputChange("customer", text)}
            style={[
              styles.input,
              focusedField === "customer" && styles.inputFocused,
            ]}
            onFocus={() => setFocusedField("customer")}
            onBlur={() => setFocusedField(null)}
          />
          <PaperInput
            mode="outlined"
            label="Phone Number"
            value={formData.phoneNumber}
            onChangeText={(text) => handleInputChange("phoneNumber", text)}
            keyboardType="phone-pad"
            style={[
              styles.input,
              focusedField === "phoneNumber" && styles.inputFocused,
            ]}
            onFocus={() => setFocusedField("phoneNumber")}
            onBlur={() => setFocusedField(null)}
          />
          <PaperInput
            mode="outlined"
            label="Address"
            value={formData.address}
            onChangeText={(text) => handleInputChange("address", text)}
            style={[
              styles.input,
              focusedField === "address" && styles.inputFocused,
            ]}
            onFocus={() => setFocusedField("address")}
            onBlur={() => setFocusedField(null)}
          />
          <PaperInput
            mode="outlined"
            label="Email Id"
            value={formData.emailId}
            onChangeText={(text) => handleInputChange("emailId", text)}
            keyboardType="email-address"
            style={[
              styles.input,
              focusedField === "emailId" && styles.inputFocused,
            ]}
            onFocus={() => setFocusedField("emailId")}
            onBlur={() => setFocusedField(null)}
          />
          <PaperInput
            mode="outlined"
            label="GSTIN Number"
            value={formData.gstinNumber}
            onChangeText={(text) => handleInputChange("gstinNumber", text)}
            style={[
              styles.input,
              focusedField === "gstinNumber" && styles.inputFocused,
            ]}
            onFocus={() => setFocusedField("gstinNumber")}
            onBlur={() => setFocusedField(null)}
          />
          <Text style={styles.label}>Date & Time</Text>
          <PaperInput
            style={[
              styles.input,
              focusedField === "dateTime" && styles.inputFocused,
            ]}
            value={formData.dateTime.toDateString()} // Convert Date to string
            onChangeText={(text) => handleInputChange("dateTime", text)}
            onFocus={() => setFocusedField("dateTime")}
            onBlur={() => setFocusedField(null)}
          />
          <PaperInput
            mode="outlined"
            label="Venue Details"
            value={formData.venueDetails}
            onChangeText={(text) => handleInputChange("venueDetails", text)}
            style={[
              styles.input,
              focusedField === "venueDetails" && styles.inputFocused,
            ]}
            onFocus={() => setFocusedField("venueDetails")}
            onBlur={() => setFocusedField(null)}
          />
          <View style={styles.addItemWrapper}>
            <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
              <Text style={styles.addButtonText}>+Add Item</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={[styles.saveButton, styles.footerButton]} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.pdfButton, styles.footerButton]} onPress={handleViewAsPDF}>
          <Text style={styles.pdfButtonText}>View as PDF</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    color: "#051650",
  },
  shareButton: {
    marginLeft: "auto",
  },
  body: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#051650",
  },
  picker: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
  },
  dateButton: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#f5f5f5",
  },
  dateText: {
    fontSize: 16,
  },
  form: {
    marginBottom: 20,
  },
  input: {
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  inputFocused: {
    borderColor: "#051650",
  },
  addItemWrapper: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  addButton: {
    backgroundColor: "#051650",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "#f5f5f5",
    padding: 10,
  },
  footerButton: {
    flex: 1,
    marginHorizontal: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButton: {
    paddingVertical: 15,
    paddingHorizontal: 44,
    backgroundColor: "#051650",
    borderRadius: 4,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  pdfButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#051650",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pdfButtonText: {
    color: "darkred",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CreateInvoice;
