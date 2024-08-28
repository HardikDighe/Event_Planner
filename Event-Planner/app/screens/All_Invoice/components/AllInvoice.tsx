import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Button,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "../../../../..//Event-Planner/app/screens/All_Invoice/styles/styles"; // Import styles
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import { fetchInvoices, Invoice } from "../../../screens/All_Invoice/api/allinvoice.api"; // Import the fetch function and types
import {
  HEADER_TITLE,
  SEARCH_PLACEHOLDER,
  TOTAL_SALES_TEXT,
  CREATE_INVOICE_BUTTON_TEXT,
  INVOICES_LIST_TEXT,
  SORT_BY_TEXT,
  PRINT_ERROR,
  SHARE_ERROR,
  GENERATE_PDF_ERROR,
} from "../../../../app/screens/All_Invoice/constants/string"; // Import the strings
import { FaMobileAlt } from "react-icons/fa";
import constantStyles from "../../../../app/(tabs)/constants/styles"


type RootStackParamList = {
  AllInvoices: undefined;
  CreateInvoice: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllInvoices"
>;

const AllInvoices: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalBalance, setTotalBalance] = useState<number>(0);
  const [modalVisible, setModalVisible] = useState(false);

  // Fetch data from API
  useEffect(() => {
    const loadInvoices = async () => {
      try {
        const fetchedInvoices = await fetchInvoices();
        setInvoices(fetchedInvoices);
        let balanceSum: number = 0;
        fetchedInvoices.forEach(invoice => {
          const amount = Number(invoice.amount);
          balanceSum += amount;
        });
        setTotalBalance(balanceSum);
      } catch (error) {
        console.error("Failed to load invoices:", error);
      }
    };
    loadInvoices();
  }, []);

  const handleSearchIconClick = () => {
    setModalVisible(true);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <Header onSearch={handleSearch} />
      <View style={styles.invoicesHeader}>
        <Text style={styles.invoicesListText}>{INVOICES_LIST_TEXT}</Text>
        <View style={styles.sortByContainer}>
          <Text style={styles.sortByText}>{SORT_BY_TEXT}</Text>
          <Icon name="sort" size={24} color="#051650" />
        </View>
      </View>
      <View style={styles.totalSalesContainer}>
        <Text style={styles.totalSales}>{TOTAL_SALES_TEXT}</Text>
        <Text style={styles.totalAmount}>{totalBalance.toLocaleString()}</Text>
      </View>
      
      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <InvoiceItem item={item} />}
      />
      <TouchableOpacity
        style={constantStyles.footerButton}
        onPress={() => navigation.navigate("CreateInvoice")}
      >
        <Text style={constantStyles.footerButtonText}>{CREATE_INVOICE_BUTTON_TEXT}</Text>
      </TouchableOpacity>
    </View>
  );
};

const InvoiceItem: React.FC<{ item: Invoice }> = ({ item }) => {
  const handlePrint = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: `
          <h1>Invoice #${item.id}</h1>
          <p>Name: ${item.name}</p>
          <p>Phone Number: ${item.phoneNumber}</p> <!-- Added phone number -->
          <p>Amount: ₹${item.amount.toLocaleString()}</p>
          <p>Balance: ₹${item.balance.toLocaleString()}</p>
          <p>Date: ${item.date}</p>
          <p>Status: ${item.status}</p>
        `,
      });
      await Print.printAsync({ uri });
    } catch (error) {
      console.error(PRINT_ERROR, error);
    }
  };

  const handleShare = async () => {
    try {
      const { uri } = await Print.printToFileAsync({
        html: `
          <h1>Invoice #${item.id}</h1>
          <p>Name: ${item.name}</p>
          <p>Phone Number: ${item.phoneNumber}</p> <!-- Added phone number -->
          <p>Amount: ₹${item.amount.toLocaleString()}</p>
          <p>Balance: ₹${item.balance.toLocaleString()}</p>
          <p>Date: ${item.date}</p>
          <p>Status: ${item.status}</p>
        `,
      });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error(SHARE_ERROR, error);
    }
  };

  return (
    <View style={constantStyles.constantbox}>
      <View style={styles.row}>
        <View style={styles.statusContainer}>
          <Text style={styles.status}>{item.status}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.nameAmountContainer}>
          <View style={styles.namePhoneNumberContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phoneNumber}><FaMobileAlt style={styles.icon1} />{item.phoneNumber}</Text>
          </View>
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
        <TouchableOpacity onPress={handlePrint} style={constantStyles
          .footerIcons}>
          <MaterialIcons name="print" size={24} color="black" style={constantStyles
            .printIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={constantStyles
          .footerIcons}>
          <MaterialCommunityIcons name="share" size={24} style={constantStyles
            .shareIcon} />
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
    }
  };

  return (
    <View style={styles.headerContainer}>
      {isSearching ? (
        <TextInput
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder={SEARCH_PLACEHOLDER}
        />
      ) : (
        <Text style={styles.headerText}>{HEADER_TITLE}</Text>
      )}
      <View style={styles.headerIcons}>
        <TouchableOpacity onPress={handleSearchIconClick}>
          <Icon
            name={isSearching ? "close" : "search"}
            size={24}
            color="#051650"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="picture-as-pdf" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllInvoices;
