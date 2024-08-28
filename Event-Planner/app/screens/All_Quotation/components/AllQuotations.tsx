import React, { useCallback, useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import * as Sharing from "expo-sharing";
import * as Print from "expo-print";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import styles from "../../../../../Event-Planner/app/screens/All_Quotation/styles/styles"; // Import the styles
import { fetchQuotations } from "../../All_Quotation/api/allquotation.api"; // Import the API function
import { headerstyles } from "../../../../app/(tabs)/constants/styles";
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
import constantStyles from "../../../../app/(tabs)/constants/styles";

// Define types for navigation
type RootStackParamList = {
  AllQuotation: undefined;
  CreateQuotation: undefined;
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList, "AllQuotation">;

type Quotation = {
  id: string;
  name: string;
  phoneNumber: string; // Added phoneNumber field
  amount: number;
  balance: number;
  date: string;
  status: string;
};

const Header: React.FC<{ title: string; onSearch?: (query: string) => void; generatePDF?: () => void }> = ({
  title,
  onSearch,
  generatePDF,
}) => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchIconClick = () => {
    setIsSearching((prev) => !prev);
    if (isSearching) {
      onSearch?.(""); // Clear search when closing the search input
      setSearchQuery(""); // Clear search query
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
            onSearch?.(text); // Pass query to the parent component
          }}
          placeholder={SEARCH_PLACEHOLDER}
        />
      ) : (
        <Text style={headerstyles.headerText}>{title}</Text>
      )}
      <View style={headerstyles.headerIcons}>
        <TouchableOpacity onPress={handleSearchIconClick}>
          <MaterialIcons name={isSearching ? "close" : "search"} size={25} color="#000" style={{ marginRight: 16 }} />
        </TouchableOpacity>
        {generatePDF && (
          <TouchableOpacity onPress={generatePDF}>
            <MaterialIcons name="picture-as-pdf" size={24} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const AllQuotation: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [filteredQuotations, setFilteredQuotations] = useState<Quotation[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  const handlePrint = async () => {
    try {
      const htmlContent = `
        <h1>All Quotations</h1>
        ${filteredQuotations
          .map(
            (quotation) => `
          <h2>${quotation.name}</h2>
          <p>${quotation.date}</p>
          <p>${quotation.amount}</p>
          <p>${quotation.phoneNumber}</p>
          <p>${quotation.balance}</p>
        `
          )
          .join("")}
      `;
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert("Sharing not available", "Sharing is not available on this device.");
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while creating the PDF");
    }
  };

  // Fetch data from your API
  useFocusEffect(
    useCallback(() => {
    const loadQuotations = async () => {
      const data = await fetchQuotations();
      setQuotations(data);
      setFilteredQuotations(data);
    };

    loadQuotations();
  }, [])
)

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim() === EMPTY_SEARCH_QUERY) {
      setFilteredQuotations(quotations); // Reset to all quotations if query is empty
    } else {
      setFilteredQuotations(
        quotations.filter((quotation) => quotation.name.toLowerCase().includes(query.toLowerCase()))
      );
    }
  };

  const toggleSortModal = () => {
    setIsSortModalVisible(!isSortModalVisible);
  };

  const sortByName = () => {
    const sortedByName = [...filteredQuotations].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredQuotations(sortedByName);
  };

  const sortByDate = () => {
    const sortedByDate = [...filteredQuotations].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    setFilteredQuotations(sortedByDate);
  };

  const renderSortModal = () => (
    <Modal transparent={true} visible={isSortModalVisible} onRequestClose={toggleSortModal} animationType="slide">
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
            <Text style={constantStyles.amount}>₹{item.amount.toLocaleString()}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={constantStyles.dateBalanceContainer}>
            <Text style={styles.date}>
              Sale #{item.id} | {item.date}
            </Text>
            <TextInput
              style={constantStyles.balanceInput}
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
  const renderQuotation = ({ item }: { item: Quotation }) => <QuotationItem item={item} />;

  return (
    <View style={styles.container}>
      <Header title={HEADER_TITLE} onSearch={handleSearch} generatePDF={handlePrint} />
      <View style={constantStyles.listHeaderText}>
        <Text style={constantStyles.listText}>{QUOTATIONS_LIST_TEXT}</Text>
        <View style={constantStyles.sortByContainer}>
          <TouchableOpacity style={constantStyles.sortByContainer} onPress={toggleSortModal}>
            <Text style={constantStyles.sortByText}>Sort By</Text>
            <Icon name="sort" size={24} color="#000" />
          </TouchableOpacity>
         
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
