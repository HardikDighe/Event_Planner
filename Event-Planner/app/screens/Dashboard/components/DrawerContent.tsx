import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Make sure you have this installed

const DrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        {/* Header Section */}
        <View style={styles.header}>
          <Text style={styles.vendorName}>Event-Planner</Text>
        </View>

        {/* Dashboard Section */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Dashboard')}>
            <Ionicons name="home-outline" size={24} color="black" />
            <Text style={styles.itemText}>Dashboard</Text>
          </TouchableOpacity>
          <View style={styles.separator} />
        </View>

        {/* My Business Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>My Business</Text>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Invoices')}>
            <Ionicons name="file-tray-outline" size={24} color="black" />
            <Text style={styles.itemText}>Invoices</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Quotation')}>
            <Ionicons name="document-text-outline" size={24} color="black" />
            <Text style={styles.itemText}>Quotation</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('AllEvents')}>
            <Ionicons name="calendar-outline" size={24} color="black" />
            <Text style={styles.itemText}>All Events</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('AllVendors')}>
            <Ionicons name="people-outline" size={24} color="black" />
            <Text style={styles.itemText}>All Vendors</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>

        {/* Add Vendors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Vendors</Text>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('VendorRegistration')}>
            <Ionicons name="person-add-outline" size={24} color="black" />
            <Text style={styles.itemText}>Vendor Registration</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('ServiceRegistration')}>
            <Ionicons name="list-outline" size={24} color="black" />
            <Text style={styles.itemText}>Service Registration</Text>
            <Ionicons name="chevron-forward-outline" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    backgroundColor: '#f4f4f4',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  vendorName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  section: {
    marginVertical: 8,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  itemText: {
    fontSize: 16,
    marginLeft: 8, // Adjust the margin to control space between the icon and text
  },
  separator: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 8,
  },
});

export default DrawerContent;