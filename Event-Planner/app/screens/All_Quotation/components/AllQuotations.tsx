import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,Modal, TouchableWithoutFeedback
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
// import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "../../../../../Event-Planner/app/screens/All_Quotation/styles/styles"; // Import the styles
import { fetchQuotations } from "../../All_Quotation/api/allquotation.api"; // Import the API function

import {
  HEADER_TITLE,
  SEARCH_PLACEHOLDER,
  QUOTATIONS_LIST_TEXT,
  SORT_BY_TEXT,
  CREATE_QUOTATION_BUTTON_TEXT,
  PRINT_ERROR,
  SHARE_ERROR,
  GENERATE_PDF_ERROR,
  EMPTY_SEARCH_QUERY,
} from "../../All_Quotation/constants/string"; // Import the strings
import { FaMobileAlt } from "react-icons/fa";
import constantStyles from "../../../../app/(tabs)/constants/styles"

// Define types for navigation
type RootStackParamList = {
  AllQuotation: undefined;
  CreateQuotation: undefined;
};

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllQuotation"
>;

type Quotation = {
  id: string;
  name: string;
  phoneNumber: string; // Added phoneNumber field
  amount: number;
  balance: number;
  date: string;
  status: string;
};

const AllQuotation: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [filteredQuotations, setFilteredQuotations] = useState<Quotation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);


  // Fetch data from your API
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchQuotations();
      setQuotations(data);
      setFilteredQuotations(data);
    };

    fetchData();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === EMPTY_SEARCH_QUERY) {
      setFilteredQuotations(quotations); // Reset to all quotations if query is empty
    } else {
      setFilteredQuotations(
        quotations.filter((quotation) =>
          quotation.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };


  const toggleSortModal = () => {
    setIsSortModalVisible(!isSortModalVisible);
  };

  const sortByName = () => {
    const sortedByName = [...quotations].sort((a, b) =>
      a.name.localeCompare(b.name)
    );
    setFilteredQuotations(sortedByName);
  };

  const sortByDate = () => {
    const sortedByDate = [...quotations].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setFilteredQuotations(sortedByDate);
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

  const QuotationItem: React.FC<{ item: Quotation }> = ({ item }) => {
    const handlePrint = async () => {
      try {
        const { uri } = await Print.printToFileAsync({
          html: `
            <h1>Quotation #${item.id}</h1>
            <p>Name: ${item.name}</p>
            <p>Phone: ${item.phoneNumber}</p> <!-- Added phone number -->
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
            <h1>Quotation #${item.id}</h1>
            <p>Name: ${item.name}</p>
            <p>Phone: ${item.phoneNumber}</p> <!-- Added phone number -->
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
              <Text style={styles.phoneNumber}><FaMobileAlt style={styles.icon1} />{item.phoneNumber}</Text> {/* Display phone number */}
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
          <TouchableOpacity onPress={handlePrint} style={constantStyles.footerIcons}>
            <MaterialIcons name="print" size={24} color="black" style={constantStyles.printIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare} style={constantStyles.footerIcons}>
            <MaterialCommunityIcons
              name="share"
              size={24}
              style={constantStyles.shareIcon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const Header: React.FC<{ onSearch: (query: string) => void }> = ({
    onSearch,
  }) => {
    const [isSearching, setIsSearching] = useState(false);

    const handleSearchIconClick = () => {
      setIsSearching((prev) => !prev);
      if (!isSearching) {
        onSearch(EMPTY_SEARCH_QUERY); // Clear search when closing the search input
      }
    };

    const handleGeneratePDF = async () => {
      try {
        const { uri } = await Print.printToFileAsync({
          html: `
            <h1>${HEADER_TITLE}</h1>
            ${filteredQuotations
              .map(
                (quotation) => `
                  <h2>Quotation #${quotation.id}</h2>
                  <p>Status: ${quotation.status}</p>
                  <p>Name: ${quotation.name}</p>
                  <p>Phone: ${quotation.phoneNumber}</p> <!-- Added phone number -->
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
        console.error(GENERATE_PDF_ERROR, error);
      }
    };

    return (
      <View style={styles.headerContainer}>
        {isSearching ? (
          <TextInput
            style={styles.searchInput}
            value={searchQuery}
            onChangeText={onSearch}
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

  return (
    <View style={styles.container}>
      <Header onSearch={handleSearch} />
      <View style={styles.quotationsHeader}>
        <Text style={styles.quotationsListText}>{QUOTATIONS_LIST_TEXT}</Text>
        <View style={styles.sortByContainer}>
        <TouchableOpacity style={styles.sortByContainer} onPress={toggleSortModal}>
          <Text style={styles.sortByText}>Sort By</Text>
          <Icon name="sort" size={24} color="#000" />
        </TouchableOpacity>
          {/* <Text style={styles.sortByText}>{SORT_BY_TEXT}</Text>
          <Icon name="sort" size={24} color="#000" /> */}
        </View>
      </View>
      <FlatList
        data={filteredQuotations}
        renderItem={({ item }) => <QuotationItem item={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
      />
      <TouchableOpacity
        style={constantStyles.footerButton}
        onPress={() => navigation.navigate("CreateQuotation")}
      >
        <Text style={constantStyles.footerButtonText}>{CREATE_QUOTATION_BUTTON_TEXT}</Text>
      </TouchableOpacity>
      
      {renderSortModal()}
    </View>
  );
};

export default AllQuotation;
