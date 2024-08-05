import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

// Define types for navigation
type RootStackParamList = {
  AllInvoices: undefined;
  CreateInvoice: undefined;
  // Add other screens here if you have them
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllInvoices"
>;

type Invoice = {
  id: string;
  name: string;
  amount: number;
  balance: number;
  date: string;
  status: string;
};

const invoices: Invoice[] = [
  {
    id: "1",
    name: "Rohan More",
    amount: 82500,
    balance: 14500,
    date: "21/05/2024",
    status: "Approved",
  },
  // ... (other invoices)
];

const InvoiceItem: React.FC<{ item: Invoice }> = ({ item }) => {
  const handlePrint = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: `
          <h1>Invoice #${item.id}</h1>
          <p>Name: ${item.name}</p>
          <p>Amount: ₹${item.amount.toLocaleString()}</p>
          <p>Balance: ₹${item.balance.toLocaleString()}</p>
          <p>Date: ${item.date}</p>
          <p>Status: ${item.status}</p>
        `,
      });
      await Print.printAsync({ uri });
    } catch (error) {
      console.error("Failed to print:", error);
    }
  };

  const handleShare = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: `
          <h1>Invoice #${item.id}</h1>
          <p>Name: ${item.name}</p>
          <p>Amount: ₹${item.amount.toLocaleString()}</p>
          <p>Balance: ₹${item.balance.toLocaleString()}</p>
          <p>Date: ${item.date}</p>
          <p>Status: ${item.status}</p>
        `,
      });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Failed to share:", error);
    }
  };

  return (
    <View style={styles.invoiceItem}>
      <View style={styles.row}>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.nameAmountContainer}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.amount}>₹{item.amount.toLocaleString()}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.dateBalanceContainer}>
          <Text style={styles.date}>
            Sale #{item.id} | {item.date}
          </Text>
          <TextInput
            style={styles.balanceInput}
            value={`Balance: ₹${item.balance.toLocaleString()}`}
            editable={false}
          />
        </View>
      </View>
      <View style={styles.icons}>
        <TouchableOpacity onPress={handlePrint} style={styles.iconContainer}>
          <Feather name="printer" size={24} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={styles.iconContainer}>
          <MaterialCommunityIcons name="share" size={24} style={styles.icon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Header: React.FC<{ onSearch: (query: string) => void }> = ({
  onSearch,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchIconClick = () => {
    setIsSearching((prev) => !prev);
    if (isSearching) {
      onSearch(searchQuery);
    } else {
      onSearch("");
    }
  };

  const handleGeneratePDF = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: `
          <h1>All Invoices</h1>
          ${invoices
            .map(
              (invoice) => `
                <h2>Invoice #${invoice.id}</h2>
                <p>Status: ${invoice.status}</p>
                <p>Name: ${invoice.name}</p>
                <p>Amount: ₹${invoice.amount.toLocaleString()}</p>
                <p>Balance: ₹${invoice.balance.toLocaleString()}</p>
                <p>Date: ${invoice.date}</p>
              `
            )
            .join("")}
        `,
      });
      await Print.printAsync({ uri });
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => {}}>
        <Icon name="arrow-back" size={24} color="#000" />
      </TouchableOpacity>
      {isSearching ? (
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      ) : (
        <Text style={styles.headerText}>All Invoices</Text>
      )}
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={handleSearchIconClick}>
          <Icon name="search" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGeneratePDF}>
          <Icon name="picture-as-pdf" size={24} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AllInvoices: React.FC = () => {
  const [filteredInvoices, setFilteredInvoices] = useState(invoices);
  const navigation = useNavigation<NavigationProp>();

  const handleSearch = (query: string) => {
    const filtered = invoices.filter((invoice) =>
      invoice.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredInvoices(filtered);
  };

  return (
    <View style={styles.container}>
      <Header onSearch={handleSearch} />
      <View style={styles.totalSalesContainer}>
        <Text style={styles.totalSales}>Total Sales</Text>
        <Text style={styles.totalAmount}>₹82,500</Text>
      </View>
      <View style={styles.invoicesHeader}>
        <Text style={styles.invoicesListText}>Invoices List</Text>
        <TouchableOpacity style={styles.sortByContainer}>
          <Text style={styles.sortByText}>Sort By</Text>
          <Icon name="sort" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredInvoices}
        renderItem={({ item }) => <InvoiceItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.createInvoiceButton}
        onPress={() => navigation.navigate("CreateInvoice")}
      >
        <Text style={styles.createInvoiceButtonText}>+ Create Invoice</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Arial",
    color: "#051650",
    flex: 1,
    textAlign: "left",
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalSalesContainer: {
    alignItems: "center", // Center the content horizontally
    marginVertical: 16, // Adjust spacing as needed
  },
  totalSales: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#051650",
    marginTop: 4, // Adjust spacing as needed
  },
  invoicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  invoicesListText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#051650",
  },
  sortByContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortByText: {
    fontSize: 16,
    color: "#000",
    marginRight: 8,
    fontWeight: "bold",
  },
  invoiceItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusContainer: {
    backgroundColor: "#e0f7fa",
    borderRadius: 4,
    padding: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00796b",
  },
  nameAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  name: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
  amount: {
    fontSize: 16,
    color: "#03AC13",
    fontWeight: "bold",
  },
  dateBalanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: "#000",
  },
  balanceInput: {
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "#051650",
    borderColor: "#ddd",
    borderWidth: 1,
    width: 120,
    textAlign: "right",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 8,
  },
  iconContainer: {
    marginHorizontal: 16,
  },
  icon: {
    color: "#051650",
  },
  createInvoiceButton: {
    position: "absolute",
    bottom: 15,
    left: "13%",
    backgroundColor: "#051650",
    paddingVertical: 8,
    paddingHorizontal: 100, // Adjusted for a better button size
    borderRadius: 8,
  },

  createInvoiceButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    alignItems: "center",
  },
});

export default AllInvoices;
//
