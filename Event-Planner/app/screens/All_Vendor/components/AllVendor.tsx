import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,Modal,TouchableWithoutFeedback
} from "react-native";
import { Card, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";
import { fetchAllVendors } from "../api/allvendor.api";
import styles from "../../../../../Event-Planner/app/screens/All_Vendor/styles/styles";
import { RootStackParamList } from "../../../../app/(tabs)/types";
import { StackNavigationProp } from "@react-navigation/stack";
import { FaMobileAlt } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

// Type definition for Vendor
type Item = {
  itemName: string;
  quantity: string;
  price: string;
  discount: string;
  payableAmount: string;
  paidAmount: string;
  balance: string;
  miscellaneous: string;
};

type Vendor = {
  id: number;
  vendorName: string;
  phoneNumber: string;
  address: string;
  gstNumber: string;
  items: Item[];
};

// Header Component
const Header: React.FC<{
  onSearch: (query: string) => void;
  allVendorData: Vendor[];
}> = ({ onSearch, allVendorData }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [searchQuery, setSearchQuery] = useState("");

  // Function to generate and share PDF
  const generatePDF = async () => {
    try {
      const html = `
        <html>
          <body>
            <h1>Vendor List</h1>
            <ul>
              ${allVendorData
                .map(
                  (vendor) => `
                <li>
                  <strong>${vendor.vendorName}</strong><br />
                  ${vendor.phoneNumber}<br />
                  ${vendor.address}
                </li>
              `
                )
                .join("")}
            </ul>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html });

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri, {
          mimeType: "application/pdf",
          dialogTitle: "Share PDF",
        });
      } else {
        alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <IconButton icon="arrow-left" size={24} />
      </TouchableOpacity>
      <Text style={styles.headerText}>All Vendors</Text>
      <View style={styles.headerIcons}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text);
            onSearch(text);
          }}
        />
        <TouchableOpacity onPress={generatePDF}>
          <IconButton icon="file-pdf-box" size={24} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

// VendorCard Component
const VendorCard: React.FC<{ vendor: Vendor }> = ({ vendor }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Function to share content
  const shareContent = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + "sample.txt";
      await FileSystem.writeAsStringAsync(fileUri, "Hello, World!");

      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri, {
          mimeType: "text/plain",
          dialogTitle: "Share Content",
        });
      } else {
        alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Error sharing content:", error);
    }
  };

  // Function to print content
  const printContent = async () => {
    try {
      const html = `
        <html>
          <body>
            <h1>Invoice</h1>
            <p>Details about the vendor...</p>
          </body>
        </html>
      `;

      await Print.printAsync({ html });
    } catch (error) {
      console.error("Error printing content:", error);
    }
  };

  return (
    <Card style={styles.card}>
      <Card.Content>
        <Text style={styles.vendorName}>{vendor.vendorName}</Text>
        <View style={styles.phoneRow}>
          <View style={styles.phoneAndAddressContainer}>
            <Text>
              <FaMobileAlt style={styles.icon} />
              {vendor.phoneNumber}
            </Text>
            <Text style={styles.addressText}>
              <FaLocationDot style={styles.icon} />
              {vendor.address}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => setShowDetails(!showDetails)}
          >
            <Text style={styles.viewDetailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
        {showDetails && (
          <View style={styles.detailsContainer}>
            {vendor.items.map((item, index) => (
              <View key={index} style={styles.itemContainer}>
                <Text style={styles.detailsText}>
                  Item Name: {item.itemName || "N/A"}
                </Text>
                <Text style={styles.detailsText}>
                  Quantity: {item.quantity || "N/A"}
                </Text>
                <Text style={styles.detailsText}>
                  Price: {item.price || "N/A"}
                </Text>
                <Text style={styles.detailsText}>
                  Discount: {item.discount || "N/A"}
                </Text>
                <Text style={styles.detailsText}>
                  Payable Amount: {item.payableAmount || "N/A"}
                </Text>
                <Text style={styles.detailsText}>
                  Paid Amount: {item.paidAmount || "N/A"}
                </Text>
                <Text style={styles.detailsText}>
                  Balance: {item.balance || "N/A"}
                </Text>
                <Text style={styles.detailsText}>
                  Miscellaneous: {item.miscellaneous || "N/A"}
                </Text>
              </View>
            ))}
          </View>
        )}
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <View style={styles.iconButtons}>
          <IconButton icon="printer" onPress={printContent} />
          <IconButton icon="share" onPress={shareContent} />
        </View>
      </Card.Actions>
    </Card>
  );
};

// VendorListScreen Component
const VendorListScreen: React.FC = () => {
  const [allVendorData, setAllVendorData] = useState<Vendor[]>([]);
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>([]);
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  useEffect(() => {
    const loadAllVendorData = async () => {
      const data = await fetchAllVendors();
      console.log("Fetched Vendor Data:", data); // Log the fetched data to see if it includes the necessary fields
      if (data !== null) {
        setAllVendorData(data);
        setFilteredVendors(data);
      } else {
        Alert.alert("Error", "All vendors not loaded.");
      }
    };
    loadAllVendorData();
  }, []);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    setFilteredVendors(
      allVendorData.filter((vendor) =>
        vendor.vendorName?.toLowerCase().includes(lowercasedQuery)
      )
    );
  };

  const toggleSortModal = () => {
    setIsSortModalVisible(!isSortModalVisible);
  };

  const sortByName = () => {
    const sortedByName = [...allVendorData].sort((a, b) =>
      a.vendorName.localeCompare(b.vendorName)
    );
    setFilteredVendors(sortedByName);
  };

  const renderSortModal = () => (
    <Modal
      transparent={true}
      visible={isSortModalVisible}
      onRequestClose={toggleSortModal}
      animationType="slide"
    >
      <TouchableWithoutFeedback onPress={toggleSortModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              sortByName();
              toggleSortModal();
            }}
          >
            <Text style={styles.optionText}>By Name</Text>
          </TouchableOpacity>
          {/* <TouchableOpacity
            style={styles.optionButton}
            onPress={() => {
              sortByDate();
              toggleSortModal();
            }}
          >
            <Text style={styles.optionText}>By Date</Text>
          </TouchableOpacity> */}
        </View>
      </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <View style={styles.container}>
      <Header onSearch={handleSearch} allVendorData={allVendorData} />
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Vendor List</Text>
        <TouchableOpacity style={styles.sortButton} onPress={toggleSortModal}>
          <Text style={styles.sortText}>Sort By</Text>
        </TouchableOpacity>
      </View>
      <ScrollView>
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </ScrollView>
      <TouchableOpacity
        style={styles.registerButton}
        onPress={() => navigation.navigate("VendorRegistration")}
      >
        <Text style={styles.registerButtonText}>+ Register Vendor</Text>
      </TouchableOpacity>

      {renderSortModal()}
    </View>
  );
};

export default VendorListScreen;
