import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, TextInput, Alert, Modal, TouchableWithoutFeedback } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useFocusEffect, useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import styles from '../styles/styles'; // Ensure the path is correct
import { fetchEvents } from '../api/allevents.api';
import constantStyles from "../../../../app/(tabs)/constants/styles"
import { headerstyles } from '../../../../app/(tabs)/constants/styles';
import Icon from "react-native-vector-icons/MaterialIcons";
import { STRINGS, ERROR_MESSAGES } from '../constants/string';

// Event type definition
type Event = {
  id: string;
  eventTitle: string;
  date: string;
  time: string;
  location: string;
  description: string;
  customerData?: {
    name: string;
    email: string;
    phone: string;
    numTickets: string;
  };
};

// Props type definition for AllEvents component
type AllEventsProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

// Header component definition
const Header: React.FC<{ title: string; onSearch?: (query: string) => void; generatePDF?: () => void; }> = ({ title, onSearch, generatePDF }) => {
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
          placeholder="Search..."
        />
      ) : (
        <Text style={headerstyles.headerText}>{title}</Text>
      )}
      <View style={headerstyles.headerIcons}>
        <TouchableOpacity onPress={handleSearchIconClick}>
          <MaterialIcons
            name={isSearching ? "close" : "search"}
            size={25}
            color="#000"
            style={{ marginRight: 16 }}
          />
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


// EventCard component
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const handleShare = async () => {
    try {
      const htmlContent = `
        <h1>${event.eventTitle}</h1>
        <p>${event.date}</p>
        <p>${event.time}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
      `;
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert(ERROR_MESSAGES.sharingError);
      }
    } catch (error) {
      Alert.alert(ERROR_MESSAGES.pdfCreationError);
    }
  };

  const handlePrint = async () => {
    try {
      const htmlContent = `
        <h1>${event.eventTitle}</h1>
        <p>${event.date}</p>
        <p>${event.time}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
      `;
      await Print.printAsync({ html: htmlContent });
    } catch (error) {
      Alert.alert(ERROR_MESSAGES.printingError);
    }
  };

  return (
    <View style={constantStyles.constantbox}>
      <View style={styles.cardHeader}>
        <Text style={styles.eventTitle}>{event.eventTitle}</Text>
        <Text style={styles.eventDay}>{event.time}</Text>
      </View>
      <Text style={styles.namePhoneText}>
        {event.customerData?.name || 'No Name'} {event.customerData?.phone || 'No Phone'}
      </Text>
      <View style={styles.cardBody}>
        <View style={styles.eventInfo}>
          <FontAwesome name="calendar" size={20} color="#051650" />
          <Text style={styles.eventText}>{event.date}</Text>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>Register</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.eventInfo}>
          <FontAwesome name="map-marker" size={20} color="#051650" />
          <Text style={styles.eventText}>{event.location}</Text>
        </View>
        <Text style={styles.eventDescription}>{event.description}</Text>
      </View>
      <View style={styles.cardFooter}>
        <View style={constantStyles.footerIcons}>
          <TouchableOpacity onPress={handlePrint}>
            <MaterialIcons name="print" size={24} color="black" style={constantStyles.printIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <MaterialCommunityIcons name="share" size={24} color="black" style={constantStyles.shareIcon} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// AllEvents component
const AllEvents: React.FC<AllEventsProps> = ({ navigation }) => {
  const [events, setEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [locationQuery, setLocationQuery] = useState<string>('');
  const [dateQuery, setDateQuery] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  const navigate = useNavigation(); // Use the navigation hook

  const [isSortModalVisible, setIsSortModalVisible] = useState(false);

  const toggleSortModal = () => {
    console.warn("aaaaa")
    setIsSortModalVisible(!isSortModalVisible);
  };

  useFocusEffect(
    useCallback(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setFilteredEvents(data); // Initialize filteredEvents with all events
    };

    loadEvents();
  }, [])
)

  useEffect(() => {
    if (searchQuery === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event => {
        const title = event.eventTitle ? event.eventTitle.toLowerCase() : '';
        const location = event.location ? event.location.toLowerCase() : '';
        return title.includes(searchQuery.toLowerCase()) ||
          location.includes(searchQuery.toLowerCase());
      });
      setFilteredEvents(filtered);
    }
  }, [searchQuery, events]);


  const sortByName = () => {
    const sortedByName = [...events].sort((a, b) =>
      a.eventTitle.localeCompare(b.eventTitle)
    );
    setEvents(sortedByName);
  };

  const sortByDate = () => {
    const sortedByDate = [...events].sort((a, b) =>
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    setEvents(sortedByDate);
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

  const handlePrint = async () => {
    try {
      const htmlContent = `
        <h1>All Events</h1>
        ${filteredEvents.map(event => `
          <h2>${event.eventTitle}</h2>
          <p>${event.date}</p>
          <p>${event.time}</p>
          <p>${event.location}</p>
          <p>${event.description}</p>
        `).join('')}
      `;
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert(ERROR_MESSAGES.sharingError);
      }
    } catch (error) {
      Alert.alert(ERROR_MESSAGES.pdfCreationError);
    }
  };

  return (
    <View style={styles.container}>
      
      <Header
        title="All Events"
        onSearch={(query) => setSearchQuery(query)}
        generatePDF={handlePrint}
      />
      <View style={constantStyles.listHeaderText}>
        <Text style={constantStyles.listText}>Events List</Text>
        <View style={constantStyles.sortByContainer}>
          <TouchableOpacity style={constantStyles.sortByContainer} onPress={toggleSortModal}>
            <Text style={constantStyles.sortByText}>Sort By</Text>
            <Icon name="sort" size={24} color="#000" />
          </TouchableOpacity>
         </View>
        </View>
      {/* <Modal
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
                  setIsSortModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{STRINGS.sortByName}</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionButton}
                onPress={() => {
                  sortByDate();
                  setIsSortModalVisible(false);
                }}
              >
                <Text style={styles.optionText}>{STRINGS.sortByDate}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal> */}
      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={constantStyles.footerButton} onPress={() => navigation.navigate("CreateEvent")}>
        <Text style={constantStyles.footerButtonText}>{STRINGS.registerButton}</Text>
      </TouchableOpacity>
      
      {renderSortModal()}
    </View>
  );
};

export default AllEvents;
