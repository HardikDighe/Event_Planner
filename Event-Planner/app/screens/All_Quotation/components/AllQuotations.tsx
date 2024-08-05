// AllQuotation.tsx

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
  AllQuotation: undefined;
  CreateQuotation: undefined; // Add the new screen here
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllQuotation"
>;

type Quotation = {
  id: string;
  name: string;
  amount: number;
  balance: number;
  date: string;
  status: string;
};

const quotations: Quotation[] = [
  {
    id: "1",
    name: "Rohan More",
    amount: 82500,
    balance: 14500,
    date: "21/05/2024",
    status: "PayIn:1",
  },
  // ... (other quotations)
];

const QuotationItem: React.FC<{ item: Quotation }> = ({ item }) => {
  const handlePrint = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: `
          <h1>Quotation #${item.id}</h1>
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
          <h1>Quotation #${item.id}</h1>
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
    <View style={styles.quotationItem}>
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

const Header: React.FC<{
  quotations: Quotation[];
  onSearch: (query: string) => void;
}> = ({ quotations, onSearch }) => {
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
          <h1>All Quotations</h1>
          ${quotations
            .map(
              (quotation) => `
                <h2>Quotation #${quotation.id}</h2>
                <p>Status: ${quotation.status}</p>
                <p>Name: ${quotation.name}</p>
                <p>Amount: ₹${quotation.amount.toLocaleString()}</p>
                <p>Balance: ₹${quotation.balance.toLocaleString()}</p>
                <p>Date: ${quotation.date}</p>
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
        <Text style={styles.headerText}>All Quotations</Text>
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

const AllQuotation: React.FC = () => {
  const [filteredQuotations, setFilteredQuotations] = useState(quotations);
  const navigation = useNavigation<NavigationProp>();

  const handleSearch = (query: string) => {
    const filtered = quotations.filter((quotation) =>
      quotation.name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredQuotations(filtered);
  };

  return (
    <View style={styles.container}>
      <Header quotations={quotations} onSearch={handleSearch} />
      <View style={styles.quotationsHeader}>
        <Text style={styles.quotationsListText}>Quotations List</Text>
        <TouchableOpacity style={styles.sortByContainer}>
          <Text style={styles.sortByText}>Sort By</Text>
          <Icon name="sort" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredQuotations}
        renderItem={({ item }) => <QuotationItem item={item} />}
        keyExtractor={(item) => item.id}
      />
      <TouchableOpacity
        style={styles.createQuotationButton}
        onPress={() => navigation.navigate("CreateQuotation")} // Navigate to Create Quotation
      >
        <Text style={styles.createQuotationButtonText}>Create Quotation</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  quotationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#f5f5f5",
  },
  quotationsListText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sortByContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortByText: {
    fontSize: 16,
    marginRight: 8,
  },
  quotationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#f5f5f5",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statusContainer: {
    flex: 1,
  },
  status: {
    fontSize: 16,
    fontWeight: "bold",
  },
  nameAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  amount: {
    fontSize: 18,
    fontWeight: "bold",
  },
  dateBalanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  date: {
    fontSize: 16,
  },
  balanceInput: {
    fontSize: 16,
    color: "#000",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
  },
  iconContainer: {
    padding: 8,
  },
  icon: {
    color: "#000",
  },
  createQuotationButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 50,
  },
  createQuotationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AllQuotation;
