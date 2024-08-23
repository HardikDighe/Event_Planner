import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import styles from '../styles/styles';

// Sample event data
const events = [
  {
    id: '1',
    title: 'Event Title 1',
    date: '12 August, 9:00 PM',
    day: 'Wednesday',
    location: 'AB Road, Indore 452002',
    description: 'An event description is a piece of text or copy, outlining the details of your event',
    name: 'Hardik',
    phone: '9356805115',
  },
  {
    id: '2',
    title: 'Event Title 2',
    date: '13 August, 10:00 AM',
    day: 'Thursday',
    location: 'CD Road, Indore 452003',
    description: 'Another event description with different details.',
    name: 'Hardik',
    phone: '9356805115',
  },
  {
    id: '3',
    title: 'Event Title 3',
    date: '14 August, 5:00 PM',
    day: 'Friday',
    location: 'EF Road, Indore 452004',
    description: 'Yet another event description with unique information.',
    name: 'Hardik',
    phone: '9356805115',
  },
];

// Event type definition
type Event = {
  id: string;
  title: string;
  date: string;
  day: string;
  location: string;
  description: string;
  name: string;
  phone: string;
};

// EventCard component
const EventCard: React.FC<{ event: Event }> = ({ event }) => {
  const handleShare = async () => {
    try {
      const htmlContent = `
        <h1>${event.title}</h1>
        <p>${event.date}</p>
        <p>${event.day}</p>
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
        <h1>${event.title}</h1>
        <p>${event.date}</p>
        <p>${event.day}</p>
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
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDay}>{event.day}</Text>
      </View>
      <Text style={styles.namePhoneText}>{event.name} {event.phone}</Text>
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

// Navigation prop type definition
type AllEventsProps = {
  navigation: {
    navigate: (screen: string) => void;
  };
};

// AllEvents component
const AllEvents: React.FC<AllEventsProps> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredEvents, setFilteredEvents] = useState<Event[]>(events);
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredEvents(events);
    } else {
      const filtered = events.filter(event =>
        event.title.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredEvents(filtered);
    }
  };

  const handlePrint = async () => {
    try {
      const htmlContent = `
        <h1>All Events</h1>
        ${filteredEvents.map(event => `
          <h2>${event.title}</h2>
          <p>${event.date}</p>
          <p>${event.day}</p>
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
        <TouchableOpacity>
          <MaterialIcons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>All Events</Text>
        <View style={styles.searchContainer}>
          {showSearchBar && (
            <TextInput
              style={styles.searchBar}
              placeholder="Search events..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
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
