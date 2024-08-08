import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
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
import styles from "../../../../../Event-Planner/app/screens/All_Quotation/styles/styles"; // Import the styles

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
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
    }
  };

  return (
    <View style={styles.headerContainer}>
      {isSearching ? (
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search Quotations"
        />
      ) : (
        <Text style={styles.headerText}>All Quotations</Text>
      )}
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={handleSearchIconClick}>
          <Icon
            name={isSearching ? "close" : "search"}
            size={24}
            color="#000"
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleGeneratePDF}>
          <Icon name="picture-as-pdf" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const AllQuotation: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [filteredQuotations, setFilteredQuotations] =
    useState<Quotation[]>(quotations);

  const handleSearch = (query: string) => {
    if (query.trim() === "") {
      setFilteredQuotations(quotations);
    } else {
      setFilteredQuotations(
        quotations.filter((quotation) =>
          quotation.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  return (
    <View style={styles.container}>
      <Header quotations={filteredQuotations} onSearch={handleSearch} />
      <View style={styles.quotationsHeader}>
        <Text style={styles.quotationsListText}>Quotations List</Text>
        <View style={styles.sortByContainer}>
          <Text style={styles.sortByText}>Sort By</Text>
          <Icon name="sort" size={24} color="#000" />
        </View>
      </View>
      <FlatList
        data={filteredQuotations}
        renderItem={({ item }) => <QuotationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
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

export default AllQuotation;
