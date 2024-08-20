import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, SafeAreaView, TextInput, Alert } from 'react-native';
import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import styles from '../../../../app/screens/All-Events/styles/styles'; // Import the styles
import { STRINGS } from '../../../../app/screens/All-Events/constants/string'; // Import the strings
import { fetchEvents } from '../../../../app/screens/All-Events/api/allevents.api';

type Event = {
  id: string;
  title: string;
  date: string;
  day: string;
  location: string;
  description: string;
};


const EventCard = ({ event }: { event: Event }) => {

  const handleShare = async () => {
    try {
      const htmlContent = `
        <h1>${event.title}</h1>
        <p>${event.date}</p>
        <p>${event.day}</p>
        <p>${event.location}</p>
        <p>${event.description}</p>
      `;
      // Generate the PDF
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      // Check if sharing is available
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(uri);
      } else {
        Alert.alert(STRINGS.sharingNotAvailable, STRINGS.sharingNotAvailableMessage);
      }
    } catch (error) {
      Alert.alert(STRINGS.pdfCreationError, 'An error occurred while creating the PDF');
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
      // Initiate the printing process
      await Print.printAsync({ html: htmlContent });
    } catch (error) {
      Alert.alert(STRINGS.printingError, 'An error occurred while printing');
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <Text style={styles.eventTitle}>{event.title}</Text>
        <Text style={styles.eventDay}>{event.day}</Text>
      </View>
      <View style={styles.cardBody}>
        <View style={styles.eventInfo}>
          <FontAwesome name="calendar" size={20} color="#051650" />
          <Text style={styles.eventText}>{event.date}</Text>
          <TouchableOpacity style={styles.registerButton}>
            <Text style={styles.registerButtonText}>{STRINGS.registerButton}</Text>
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

const AllEvents = (props: { navigation: { navigate: (arg0: string) => void; }; }) => {
  const [allEventsConstant, setAllEventsConstant] = useState<Event[]>([]);
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showSearchBar, setShowSearchBar] = useState<boolean>(false);
  
    const fetchdata = async () => {
      const result = await fetchEvents();
      setAllEventsConstant(result);
      setFilteredEvents(result);
      
    }
    useEffect(() => {
      fetchdata(); // Fetch data when the component mounts
      
    }, []);


    const handleSearch = (query: string) => {
      setSearchQuery(query);
      if (query === '') {
        setFilteredEvents(allEventsConstant);
      } else {
        const filtered = allEventsConstant.filter(event =>
          event.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredEvents(filtered);
      }
    };

    const handlePrint = async () => {
      try {
        const htmlContent = `
        <h1>${STRINGS.allEventsTitle}</h1>
        ${filteredEvents.map(event => `
          <h2>${event.title}</h2>
          <p>${event.date}</p>
          <p>${event.day}</p>
          <p>${event.location}</p>
          <p>${event.description}</p>
        `).join('')}
      `;
        // Generate the PDF
        const { uri } = await Print.printToFileAsync({ html: htmlContent });
        // Check if sharing is available
        if (await Sharing.isAvailableAsync()) {
          await Sharing.shareAsync(uri);
        } else {
          Alert.alert(STRINGS.sharingNotAvailable, STRINGS.sharingNotAvailableMessage);
        }
      } catch (error) {
        Alert.alert(STRINGS.pdfCreationError, 'An error occurred while creating the PDF');
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity>
            <MaterialIcons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{STRINGS.allEventsTitle}</Text>
          <View style={styles.searchContainer}>
            {showSearchBar && (
              <TextInput
                style={styles.searchBar}
                placeholder={STRINGS.searchPlaceholder}
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
          <Text style={styles.eventsList}>{STRINGS.eventTitle} List</Text>
          <TouchableOpacity style={styles.sortByButton}>
            <Text style={styles.sortByText}>{STRINGS.sortBy}</Text>
            <MaterialIcons name="filter-list" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <FlatList
          data={filteredEvents}
          renderItem={({ item }) => <EventCard event={item} />}
          keyExtractor={item => item.id}
        />
        <TouchableOpacity style={styles.registerEventButton} onPress={() => props.navigation.navigate("RegisterEvent")}>
          <Text style={styles.registerEventButtonText}>{STRINGS.registerEventButtonText}</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  };

  export default AllEvents;