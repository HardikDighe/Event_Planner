import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Card, IconButton } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

// Expo dependencies
import * as Sharing from "expo-sharing";
import * as FileSystem from "expo-file-system";
import * as Print from "expo-print";

// Type definition for Vendor
type Vendor = {
  id: number;
  name: string;
  phone: string;
  address: string;
};

// Sample vendor data
const vendors: Vendor[] = [
  {
    id: 1,
    name: "Rohan More",
    phone: "+91 9856325698",
    address: "AB Road, Indore 452002",
  },
  // More vendors...
];

const Header: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Function to generate and share PDF
  const generatePDF = async () => {
    try {
      const html = `
        <html>
          <body>
            <h1>Vendor List</h1>
            <ul>
              ${vendors
                .map(
                  (vendor) => `
                <li>
                  <strong>${vendor.name}</strong><br />
                  ${vendor.phone}<br />
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
      <TouchableOpacity onPress={() => {}}>
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
        <Text style={styles.vendorName}>{vendor.name}</Text>
        <View style={styles.phoneRow}>
          <Text>{vendor.phone}</Text>
          <TouchableOpacity
            style={styles.viewDetailsButton}
            onPress={() => setShowDetails(!showDetails)}
          >
            <Text style={styles.viewDetailsButtonText}>View Details</Text>
          </TouchableOpacity>
        </View>
        {showDetails && (
          <View style={styles.detailsContainer}>
            <Text style={styles.addressText}>{vendor.address}</Text>
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

const VendorListScreen: React.FC = () => {
  const [filteredVendors, setFilteredVendors] = useState<Vendor[]>(vendors);

  const handleSearch = (query: string) => {
    const lowercasedQuery = query.toLowerCase();
    setFilteredVendors(
      vendors.filter((vendor) =>
        vendor.name.toLowerCase().includes(lowercasedQuery)
      )
    );
  };

  return (
    <View style={styles.container}>
      <Header onSearch={handleSearch} />
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>Vendor List</Text>
        <TouchableOpacity style={styles.sortButton}>
          <Text style={styles.sortText}>Sort By</Text>
          <IconButton icon="sort" size={20} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        {filteredVendors.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.registerButton}>
        <Text style={styles.registerButtonText}>+ Register Vendor</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: "space-between",
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Arial",
    color: "#051650",
    textAlign: "left",
    flex: 1,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    padding: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
    width: 150,
    marginRight: 16,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    marginRight: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  vendorName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  phoneRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  viewDetailsButton: {
    padding: 8,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
  },
  viewDetailsButtonText: {
    color: "#051650",
  },
  detailsContainer: {
    marginTop: 8,
  },
  addressText: {
    fontSize: 16,
    color: "#333",
  },
  cardActions: {
    justifyContent: "center",
  },
  iconButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  registerButton: {
    padding: 16,
    backgroundColor: "#051650",
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default VendorListScreen;