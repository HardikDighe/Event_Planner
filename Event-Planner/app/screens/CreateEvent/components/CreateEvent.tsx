import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  ScrollView,
  Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "../../../../../Event-Planner/app/screens/CreateEvent/styles/styles";
import { RootStackParamList } from "../../../../app/(tabs)/types"; // Adjust the import path
import { saveCreateEvent } from "../api/createevent.api";
import DateTimePicker from "@react-native-community/datetimepicker";

// Define the type for navigation
type CreateEventNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CreateEvent"
>;

const CreateEvent = () => {
  const [eventTitle, setEventTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [eventDetails, setEventDetails] = useState("");
  const [focusedField, setFocusedField] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const [venueDate, setVenueDate] = useState(new Date());
  const [venueTime, setVenueTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  const navigation = useNavigation<CreateEventNavigationProp>(); // Typed navigation
  type CreateEventRouteProp = RouteProp<RootStackParamList, "CreateEvent">;

  const [customerData, setCustomerData] = useState<any>(null);
  const route = useRoute<CreateEventRouteProp>(); // Typed rout
  // const route = useRoute(); // Access the route to get the passed parameters

  // const [data, setData] = useState<any>(null); // State to store the passed data
  useEffect(() => {
    if (route.params?.data) {
      setCustomerData(route.params.data);
    }
  }, [route.params?.data]);

  const validateFields = () => {
    const newErrors: { [key: string]: string } = {};

    if (!eventTitle) newErrors.eventTitle = "Event Title is required";
    if (!date) newErrors.date = "Date is required";
    if (!time) newErrors.time = "Time is required";
    if (!location) newErrors.location = "Location is required";
    if (!eventDetails) newErrors.eventDetails = "Event Details are required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateEvent = async () => {
    if (!validateFields()) {
      Alert.alert("Validation Error", "Please fill out all required fields.");
      return;
    }

    const eventDetailsData = {
      eventTitle,
      date,
      time,
      location,
      eventDetails,
      customerData,
    };
    const isSuccess = await saveCreateEvent(eventDetailsData);
    if (isSuccess) {
      navigation.navigate("AllEvents");
    } else {
      Alert.alert("Error", "Failed to create the event. Please try again.");
    }
    // console.warn(isSuccess);
    // // if (isSuccess) {
    // //   navigation.navigate('AllEvents');
    // // }
    // navigation.navigate("AllEvents");
  };

  const handleRegisterNavigate = () => {
    navigation.navigate("CustomerDetails"); // Correctly typed navigation
  };

  const handleDateChange = (
    event: React.SyntheticEvent<any>,
    selectedDate?: Date
  ) => {
    setShowDatePicker(false);
    if (selectedDate) {
      setVenueDate(selectedDate);
    }
  };

  const handleTimeChange = (event: Event, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime) {
      setVenueTime(selectedTime);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Event Registration</Text>
      <View style={styles.inputContainer}>
        {(focusedField === "eventTitle" || eventTitle) && (
          <Text style={styles.floatingLabel}>Event Title</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder={
            focusedField !== "eventTitle" && !eventTitle ? "Event Title" : ""
          }
          value={eventTitle}
          onChangeText={setEventTitle}
          onFocus={() => setFocusedField("eventTitle")}
          onBlur={() => setFocusedField("")}
        />
        {errors.eventTitle && (
          <Text style={styles.errorText}>{errors.eventTitle}</Text>
        )}
      </View>
      <View style={styles.row}>
        <View style={styles.inputContainer}>
          {(focusedField === "date" || date) && (
            <Text style={styles.floatingLabel}>Date</Text>
          )}
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder={focusedField !== "date" && !date ? "Date" : ""}
            value={date}
            onChangeText={setDate}
            onFocus={() => setFocusedField("date")}
            onBlur={() => setFocusedField("")}
          />
          {errors.date && <Text style={styles.errorText}>{errors.date}</Text>}
        </View>
        <View style={styles.inputContainer}>
          {(focusedField === "time" || time) && (
            <Text style={styles.floatingLabel}>Time</Text>
          )}
          <TextInput
            style={[styles.input, styles.halfInput]}
            placeholder={focusedField !== "time" && !time ? "Time" : ""}
            value={time}
            onChangeText={setTime}
            onFocus={() => setFocusedField("time")}
            onBlur={() => setFocusedField("")}
          />
          {errors.time && <Text style={styles.errorText}>{errors.time}</Text>}
        </View>

        {/* 
<TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.label}>Venue Date: {venueDate.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={venueDate}
                        mode="date"
                        display="default"
                        onChange={() => handleDateChange}
                    />
                )}

                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                    <Text style={styles.label}>Venue Time: {venueTime.toTimeString().slice(0, 5)}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker
                        value={venueTime}
                        mode="time"
                        display="default"
                        onChange={() => handleTimeChange}
                    />
                )} */}
      </View>
      <View style={styles.inputContainer}>
        {(focusedField === "location" || location) && (
          <Text style={styles.floatingLabel}>Location</Text>
        )}
        <TextInput
          style={styles.input}
          placeholder={
            focusedField !== "location" && !location ? "Location" : ""
          }
          value={location}
          onChangeText={setLocation}
          onFocus={() => setFocusedField("location")}
          onBlur={() => setFocusedField("")}
        />
        {errors.location && (
          <Text style={styles.errorText}>{errors.location}</Text>
        )}
      </View>
      <View style={styles.inputContainer}>
        {(focusedField === "eventDetails" || eventDetails) && (
          <Text style={styles.floatingLabel}>Event Details</Text>
        )}
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder={
            focusedField !== "eventDetails" && !eventDetails
              ? "Event Details"
              : ""
          }
          value={eventDetails}
          onChangeText={setEventDetails}
          onFocus={() => setFocusedField("eventDetails")}
          onBlur={() => setFocusedField("")}
          multiline
        />
        {errors.eventDetails && (
          <Text style={styles.errorText}>{errors.eventDetails}</Text>
        )}
      </View>

      {/* +Register Button */}
      <TouchableOpacity onPress={handleRegisterNavigate}>
        <Text style={styles.registerText}>+ Registration Form</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleCreateEvent}>
        <Text style={styles.buttonText}>Create Event</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default CreateEvent;
