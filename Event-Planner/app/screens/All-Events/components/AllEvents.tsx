import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import styles from '../styles/styles'; // Ensure the path is correct
import { fetchEvents } from '../api/allevents.api';

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
        Alert.alert('Sharing not available', 'Sharing is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the PDF');
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
      Alert.alert('Error', 'An error occurred while printing');
    }
  };

  return (
    <View style={styles.card}>
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
        <View style={styles.footerIcons}>
          <TouchableOpacity onPress={handlePrint}>
            <MaterialIcons name="print" size={24} color="black" style={styles.printIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleShare}>
            <MaterialCommunityIcons name="share-outline" size={24} color="black" style={styles.shareIcon} />
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

  useEffect(() => {
    const loadEvents = async () => {
      const data = await fetchEvents();
      setEvents(data);
      setFilteredEvents(data); // Initialize filteredEvents with all events
    };

    loadEvents();
  }, []);

  useEffect(() => {
    // Filter events based on search and location queries
    let filtered = events;

    if (searchQuery && locationQuery) {
      filtered = filtered.filter(event =>
        (event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.customerData?.name.toLowerCase().includes(searchQuery.toLowerCase())) &&
        event.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    } else if (searchQuery) {
      filtered = filtered.filter(event =>
        event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.customerData?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    } else if (locationQuery) {
      filtered = filtered.filter(event =>
        event.location.toLowerCase().includes(locationQuery.toLowerCase())
      );
    }

    // Remove duplicates (if there are any)
    const uniqueEvents = Array.from(new Set(filtered.map(event => event.id)))
      .map(id => {
        return filtered.find(event => event.id === id);
      })
      .filter((event): event is Event => event !== undefined); // Filter out undefined

    setFilteredEvents(uniqueEvents);
  }, [searchQuery, locationQuery, events]);

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
        Alert.alert('Sharing not available', 'Sharing is not available on this device.');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred while creating the PDF');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <MaterialIcons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Events</Text>
        <View style={styles.searchContainer}>
          {showSearchBar && (
            <>
              {/* Search by Event Title */}
              <TextInput
                style={styles.searchBar}
                placeholder="Search events..."
                value={searchQuery}
                onChangeText={setSearchQuery}
              />

              {/* Search by Location */}
              <TextInput
                style={styles.searchBar}
                placeholder="Search by location..."
                value={locationQuery}
                onChangeText={setLocationQuery}
              />

              {/* Search by Date */}
              <TextInput
                style={styles.searchBar}
                placeholder="Search by date..."
                value={dateQuery}
                onChangeText={setDateQuery}
              />
            </>
          )}

          <TouchableOpacity onPress={() => setShowSearchBar(!showSearchBar)}>
            <MaterialIcons name="search" size={28} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handlePrint}>
            <MaterialIcons name="picture-as-pdf" size={28} color="black" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.listHeader}>
        <Text style={styles.eventsList}>Events List</Text>
        <TouchableOpacity style={styles.sortByButton}>
          <Text style={styles.sortByText}>Sort By</Text>
          <MaterialIcons name="filter-list" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={filteredEvents}
        renderItem={({ item }) => <EventCard event={item} />}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity style={styles.registerEventButton} onPress={() => navigation.navigate("CreateEvent")}>
        <Text style={styles.registerEventButtonText}>+ Register Event</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default AllEvents;
