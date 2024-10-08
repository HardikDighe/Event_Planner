import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
const initialNotifications = [
  { id: '1', title: 'Notification Title', date: '12 Aug, 9:00 PM', description: 'An event description is a piece of text or copy, outlining the details of your event' },
  { id: '2', title: 'Notification Title', date: '12 Aug, 9:00 PM', description: 'An event description is a piece of text or copy, outlining the details of your event' },
  { id: '3', title: 'Notification Title', date: '12 Aug, 9:00 PM', description: 'An event description is a piece of text or copy, outlining the details of your event' },
  { id: '4', title: 'Notification Title', date: '12 Aug, 9:00 PM', description: 'An event description is a piece of text or copy, outlining the details of your event' },
  { id: '5', title: 'Notification Title', date: '12 Aug, 9:00 PM', description: 'An event description is a piece of text or copy, outlining the details of your event' },
];
const NotificationScreen = () => {
  const [notifications, setNotifications] = useState(initialNotifications);
  const [modalVisible, setModalVisible] = useState(false);
  // Function to clear all notifications
  const clearAllNotifications = () => {
    setNotifications([]);
    setModalVisible(false);
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
        ListEmptyComponent={<Text style={styles.emptyText}>No notifications</Text>}
      />
      <TouchableOpacity style={styles.clearAllButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.clearAllText}>Clear All</Text>
      </TouchableOpacity>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Clear All Notifications</Text>
            <Text style={styles.modalMessage}>Are you sure you want to permanently delete all notifications?</Text>
            <View style={styles.modalButtons}>
              <Pressable style={styles.modalButtonCancel} onPress={() => setModalVisible(false)}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
              <Pressable style={styles.modalButtonDelete} onPress={clearAllNotifications}>
                <Text style={styles.modalButtonText}>Permanently Delete</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 8,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1A1A1A',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: '#4F4F4F',
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  modalButtonCancel: {
    backgroundColor: '#051650',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonDelete: {
    backgroundColor: '#FF4D4D',
    padding: 10,
    borderRadius: 8,
    width: '45%',
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
export default NotificationScreen;