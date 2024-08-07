import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { RootStackParamList } from '../../../../app/screens/Dashboard/components/types';
import RevenueGraph from '../../RevenueGraph/components/RevenueGraph'; // Import the new component

type Props = StackScreenProps<RootStackParamList, 'Dashboard'>;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Reports Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reports</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="description" size={36} color="#FF6347" style={styles.icon} />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>All</Text>
              <Text style={styles.tileText}>Invoices</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="request-quote" size={36} color="#4682B4" style={styles.icon} />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>All</Text>
              <Text style={styles.tileText}>Quotations</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="event" size={36} color="#32CD32" style={styles.icon} />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>All</Text>
              <Text style={styles.tileText}>Events</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="people" size={36} color="#FFD700" style={styles.icon} />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>All</Text>
              <Text style={styles.tileText}>Vendors</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Quick Links Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Links</Text>
        <View style={styles.row}>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="add-circle-outline" size={36} color="#FF4500" style={styles.icon} />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>Create</Text>
              <Text style={styles.tileText}>Quotation</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tile}>
            <View style={styles.iconBackground}>
              <MaterialIcons name="post-add" size={36} color="#1E90FF" style={styles.icon} />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>Event</Text>
              <Text style={styles.tileText}>Registration</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate("VendorRegisteration")}
          >
            <View style={styles.iconBackground}>
              <MaterialIcons name="person-add" size={36} color="#8A2BE2" style={styles.icon} />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>Vendor</Text>
              <Text style={styles.tileText}>Registration</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Revenue Graph Section */}
      <RevenueGraph /> {/* Use the new component */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tile: {
    width: "22%",
    alignItems: "center",
    marginBottom: 10,
  },
  tileTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  tileText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    alignSelf: "center",
  },
});

export default DashboardScreen;