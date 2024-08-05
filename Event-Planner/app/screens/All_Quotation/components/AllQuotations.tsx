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
  CreateQuotation: undefined; // Add your CreateQuotation screen here
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
        <TouchableOpacity
          style={styles.sortByContainer}
          onPress={() => {
            // Sort logic here
          }}
        >
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
        onPress={() => navigation.navigate("CreateQuotation")}
      >
        <Text style={styles.createQuotationButtonText}>+ Create Quotation</Text>
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
  quotationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  quotationsListText: {
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
  quotationItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statusContainer: {
    backgroundColor: "#d3d3d3",
    padding: 4,
    borderRadius: 4,
  },
  status: {
    fontSize: 12,
    color: "#000",
  },
  nameAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#051650",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "lightgreen",
  },
  dateBalanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  date: {
    fontSize: 14,
    color: "#000",
  },
  balanceInput: {
    backgroundColor: "#bbdffb",
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
    marginTop: 16,
  },
  iconContainer: {
    marginHorizontal: 8,
  },
  icon: {
    color: "#000",
  },
  createQuotationButton: {
    backgroundColor: "#051650",
    padding: 16,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  createQuotationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AllQuotation;
