import React from 'react';
import { DrawerContentScrollView, DrawerContentComponentProps } from '@react-navigation/drawer';
import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import styles from '../../../../../Event-Planner/app/screens/DrawerContent/styles/styles'; // Import styles from the new file

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
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('Quotation')}>
            <Ionicons name="file-tray-stacked-outline" size={24} color="black" />
            <Text style={styles.itemText}>Quotation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('AllEvents')}>
            <Ionicons name="calendar-outline" size={24} color="black" />
            <Text style={styles.itemText}>All Events</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('AllVendors')}>
            <Ionicons name="people-outline" size={24} color="black" />
            <Text style={styles.itemText}>All Vendors</Text>
          </TouchableOpacity>
        </View>

        {/* Add Vendors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Add Vendors</Text>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('VendorRegistration')}>
            <Ionicons name="person-add-outline" size={24} color="black" />
            <Text style={styles.itemText}>Vendor Registration</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.item} onPress={() => props.navigation.navigate('ServiceRegistration')}>
            <Ionicons name="construct-outline" size={24} color="black" />
            <Text style={styles.itemText}>Service Registration</Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
};

export default DrawerContent;
