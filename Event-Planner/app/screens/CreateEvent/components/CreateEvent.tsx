import React, { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../../../../../Event-Planner/app/screens/CreateEvent/styles/styles';
import { RootStackParamList } from '../../../../app/(tabs)/types'; // Adjust the import path
import { saveCreateEvent } from '../api/createevent.api';

// Define the type for navigation
type CreateEventNavigationProp = StackNavigationProp<RootStackParamList, 'CreateEvent'>;

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [eventDetails, setEventDetails] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const navigation = useNavigation<CreateEventNavigationProp>(); // Typed navigation
  type CreateEventRouteProp = RouteProp<RootStackParamList, 'CreateEvent'>;

  const [customerData, setCustomerData] = useState<any>(null);
  const route = useRoute<CreateEventRouteProp>(); // Typed rout
  // const route = useRoute(); // Access the route to get the passed parameters

  // const [data, setData] = useState<any>(null); // State to store the passed data
  useEffect(() => {
    if (route.params?.data) {
      setCustomerData(route.params.data);
    }
  }, [route.params?.data]);
  const handleCreateEvent = async () => {
    const eventDetailsData ={
            eventTitle,
             date,
             time,
             location,
             eventDetails,
             customerData
           }
    const isSuccess = await saveCreateEvent(eventDetailsData);
        console.warn(isSuccess);
        // if (isSuccess) {
        //   navigation.navigate('AllEvents');
        // }
        navigation.navigate('AllEvents');
  };

  const handleRegisterNavigate = () => {
    navigation.navigate('CustomerDetails'); // Correctly typed navigation
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Event Registration</Text>
      <View style={styles.inputContainer}>
        {(focusedField === 'eventTitle' || eventTitle) && <Text style={styles.floatingLabel}>Event Title</Text>}
        <TextInput
          style={styles.input}
          placeholder={focusedField !== 'eventTitle' && !eventTitle ? 'Event Title' : ''}
          value={eventTitle}
          onChangeText={setEventTitle}
          onFocus={() => setFocusedField('eventTitle')}
          onBlur={() => setFocusedField('')}
        />
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          {(focusedField === 'date' || date) && <Text style={styles.floatingLabel}>Date</Text>}
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder={focusedField !== 'date' && !date ? 'Date' : ''}
            value={date}
            onChangeText={setDate}
            onFocus={() => setFocusedField('date')}
            onBlur={() => setFocusedField('')}
          />
        </View>
        <View style={styles.inputContainer}>
          {(focusedField === 'time' || time) && <Text style={styles.floatingLabel}>Time</Text>}
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder={focusedField !== 'time' && !time ? 'Time' : ''}
            value={time}
            onChangeText={setTime}
            onFocus={() => setFocusedField('time')}
            onBlur={() => setFocusedField('')}
          />
        </View>
      </View>
      <View style={styles.inputContainer}>
        {(focusedField === 'location' || location) && <Text style={styles.floatingLabel}>Location</Text>}
        <TextInput
          style={styles.input}
          placeholder={focusedField !== 'location' && !location ? 'Location' : ''}
          value={location}
          onChangeText={setLocation}
          onFocus={() => setFocusedField('location')}
          onBlur={() => setFocusedField('')}
        />
      </View>
      <View style={styles.inputContainer}>
        {(focusedField === 'eventDetails' || eventDetails) && <Text style={styles.floatingLabel}>Event Details</Text>}
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder={focusedField !== 'eventDetails' && !eventDetails ? 'Event Details' : ''}
          value={eventDetails}
          onChangeText={setEventDetails}
          onFocus={() => setFocusedField('eventDetails')}
          onBlur={() => setFocusedField('')}
          multiline
        />
      </View>
      
      {/* +Register Button */}
      <TouchableOpacity onPress={handleRegisterNavigate}>
        <Text style={styles.registerText}>+ Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateEvent;
