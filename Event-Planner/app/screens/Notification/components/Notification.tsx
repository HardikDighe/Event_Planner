
import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
const initialNotifications = [
  { id: '1', title: 'Notification Title', date: '12 Aug, 9:00 PM', description: 'An event description is a piece of text or copy, outlining the details of your event' },
  { id: '2', title: 'Notification Title', date: '12 Aug, 9:00 PM', description: 'An event description is a piece of text or copy, outlining the details of your event' },
  { id: '3', title: 'Notification Title', date: '12 Aug, 9:00 PM', description: 'An event description is a piece of text or copy, outlining the details of your event' },
  { id: '4', title: 'Notification Title', date: '12 Aug, 9:00 PM', description: 'An event description is a piece of text or copy, outlining the details of your event' },
  { id: '5', title: 'Notification Title', date: '12 Aug, 9:00 PM', description: 'An event description is a piece of text or copy, outlining the details of your event' },
];
const NotificationScreen = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  // Function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => (
          <View style={styles.notificationContainer}>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.date}>{item.date}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </View>
        )}
        keyExtractor={(item) => item.id}
        // Display a message if there are no notifications
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications</Text>}
      />
      <TouchableOpacity style={styles.clearAllButton} onPress={clearAllNotifications}>
        <Text style={styles.clearAllText}>Clear All</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    paddingTop: 8,
  },
  notificationContainer: {
    backgroundColor: '#F2F2F2',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    color: '#707070',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#4F4F4F',
  },
  clearAllButton: {
    backgroundColor: '#001F54',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 16,
  },
  clearAllText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#707070',
    marginVertical: 20,
  },
});
export default NotificationScreen;