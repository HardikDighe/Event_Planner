// DashboardScreen.tsx
import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { RootStackParamList } from "../../../../app/(tabs)/constants/types";
import styles from "../../../../app/screens/Dashboard/styles/style"; // Import the styles from styles.tsx

type Props = StackScreenProps<RootStackParamList, "Dashboard">;

const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  return (
    <ScrollView style={styles.container}>
      {/* Reports Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Reports</Text>
        <View style={styles.row}>
            {/* All Quotations */}
            <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate("AllQuotations")}
          >
            <View style={styles.iconBackground}>
              <MaterialIcons
                name="request-quote"
                size={36}
                color="#4682B4"
                style={styles.icon}
              />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>All</Text>
              <Text style={styles.tileText}>Quotations</Text>
            </View>
          </TouchableOpacity>
          {/* All Invoices */}
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate("AllInvoices")}
          >
            <View style={styles.iconBackground}>
              <MaterialIcons
                name="description"
                size={36}
                color="#FF6347"
                style={styles.icon}
              />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>All</Text>
              <Text style={styles.tileText}>Invoices</Text>
            </View>
          </TouchableOpacity>

        

          {/* All Events */}
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate("AllEvents")}
          >
            <View style={styles.iconBackground}>
              <MaterialIcons
                name="event"
                size={36}
                color="#32CD32"
                style={styles.icon}
              />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>All</Text>
              <Text style={styles.tileText}>Events</Text>
            </View>
          </TouchableOpacity>

          {/* All Vendors */}
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate("AllVendors")}
          >
            <View style={styles.iconBackground}>
              <MaterialIcons
                name="people"
                size={36}
                color="#FFD700"
                style={styles.icon}
              />
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
          {/* Create Quotation */}
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate("CreateQuotation")}
          >
            <View style={styles.iconBackground}>
              <MaterialIcons
                name="add-circle-outline"
                size={36}
                color="#FF4500"
                style={styles.icon}
              />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>Create</Text>
              <Text style={styles.tileText}>Quotation</Text>
            </View>
          </TouchableOpacity>

          {/* Event Registration */}
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate("CreateEvent")}
          >
            <View style={styles.iconBackground}>
              <MaterialIcons
                name="post-add"
                size={36}
                color="#1E90FF"
                style={styles.icon}
              />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>Create</Text>
              <Text style={styles.tileText}>Event</Text>
            </View>
          </TouchableOpacity>

          {/* Vendor Registration */}
          <TouchableOpacity
            style={styles.tile}
            onPress={() => navigation.navigate("VendorRegistration")}
          >
            <View style={styles.iconBackground}>
              <MaterialIcons
                name="person-add"
                size={36}
                color="#8A2BE2"
                style={styles.icon}
              />
            </View>
            <View style={styles.tileTextContainer}>
              <Text style={styles.tileText}>Vendor</Text>
              <Text style={styles.tileText}>Registration</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* <RevenueGraph />  */}
    </ScrollView>
  );
};

export default DashboardScreen;
