import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackNavigationProp } from "@react-navigation/stack";
import { headerstyles } from "../../../../app/(tabs)/constants/styles";
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
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  // Fetch data from API
  useFocusEffect(
    useCallback(() => {
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
    }, [])
  )

  const toggleSortModal = () => {
    console.warn("aaaaa")
    setIsSortModalVisible(!isSortModalVisible);
  };

  const sortByName = () => {
    const sortedByName = [...invoices].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setInvoices(sortedByName);
  };

  const sortByDate = () => {
    const sortedByDate = [...invoices].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setInvoices(sortedByDate);
  };

  // Filter invoices based on search query
  const filteredInvoices = invoices.filter((invoice) =>
    invoice.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
            <TouchableOpacity
              style={styles.optionButton}
              onPress={() => {
                sortByDate();
                toggleSortModal();
              }}
            >
              <Text style={styles.optionText}>By Date</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );

  return (
    <View style={styles.container}>
      {/* Header with search functionality */}
      <Header onSearch={(query) => setSearchQuery(query)} allInvoiceData={[]} />

      <View style={styles.invoicesHeader}>
        <Text style={styles.invoicesListText}>{INVOICES_LIST_TEXT}</Text>
        <TouchableOpacity style={styles.sortByContainer} onPress={toggleSortModal}>
          <Text style={styles.sortByText}>{SORT_BY_TEXT}</Text>
          <Icon name="sort" size={24} color="#051650" />
        </TouchableOpacity>
      </View>

      <View style={styles.totalSalesContainer}>
        <Text style={styles.totalSales}>{TOTAL_SALES_TEXT}</Text>
        <Text style={styles.totalAmount}>{totalBalance.toLocaleString()}</Text>
      </View>

      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <InvoiceItem item={item} />}
      />

      <TouchableOpacity
        style={constantStyles.footerButton}
        onPress={() => navigation.navigate("CreateInvoice")}
      >
        <Text style={constantStyles.footerButtonText}>{CREATE_INVOICE_BUTTON_TEXT}</Text>
      </TouchableOpacity>

      {renderSortModal()}
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
          <Text style={constantStyles.amount}>₹{item.amount.toLocaleString()}</Text>
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
        <TouchableOpacity onPress={handlePrint} style={constantStyles.footerIcons}>
          <MaterialIcons name="print" size={24} color="black" style={constantStyles.printIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare} style={constantStyles.footerIcons}>
          <MaterialCommunityIcons name="share" size={24} style={constantStyles.shareIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Header: React.FC<{
  onSearch: (query: string) => void;
  allInvoiceData: Invoice[];
}> = ({ onSearch, allInvoiceData }) => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchIconClick = () => {
    setIsSearching((prev) => !prev);
    if (isSearching) {
      onSearch(""); // Clear search when closing the search input
      setSearchQuery(""); // Clear search query
    }
  };
  // Function to generate and share PDF
  const generatePDF = async () => {
    try {
      const html = `
          <html>
            <body>
              <h1>Vendor List</h1>
              <ul>
                ${allInvoiceData
          .map(
            (Invoice) => `
                  <li>
                    <strong>${Invoice.name}</strong><br />
                    ${Invoice.phoneNumber}<br />
                    ${Invoice.amount}<br />
                    ${Invoice.balance}<br />
                    ${Invoice.date}<br />
                    ${Invoice.status}<br />
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
        Alert.alert("Sharing is not available on this device");
      }
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };

  return (
    <View style={headerstyles.headerContainer}>
      {isSearching ? (
        <TextInput
          style={headerstyles.searchInput}
          value={searchQuery}
          onChangeText={(text) => {
            setSearchQuery(text); // Update search query
            onSearch(text); // Pass query to the parent component
          }}
          placeholder="Search Invoices"
        />
      ) : (
        <Text style={headerstyles.headerText}>All Invoices</Text>
      )}
      <View style={headerstyles.headerIcons}>
        <TouchableOpacity onPress={handleSearchIconClick}>
          <Icon
            name={isSearching ? "close" : "search"}
            size={25}
            color="#000"
            style={{ marginRight: 16 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={generatePDF}>
          <Icon name="picture-as-pdf" size={24} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AllInvoices;
