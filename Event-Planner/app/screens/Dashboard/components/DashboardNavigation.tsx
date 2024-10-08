import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Adjust based on your icon library
import DashboardScreen from '../../../../app/screens/Dashboard/components/Dashboard';
import SettingNavigation from '../../../../app/screens/Setting/components/SettingNavigation'; // Adjust the path to your SettingNavigation
import DrawerContent from '../../DrawerContent/components/DrawerContent'; // Adjust the path to your DrawerContent
import { RootStackParamList, RootDrawerParamList } from '../../../../app/(tabs)/constants/types';
import NotificationScreen from '../../Notification/components/Notification';
import AllInvoices from '../../All_Invoice/components/AllInvoice';
import AllQuotation from '../../All_Quotation/components/AllQuotations';
import VendorListScreen from '../../All_Vendor/components/AllVendor';
import VendorRegistration from '../../VendorRegistration/components/VendorRegistration';
import AddItem from '../../AddItem/components/AddItem';
import CustomerDetails from '../../RegisterEvent/components/CustomerDetails';
import CreateInvoice from '../../CreateInvoice/components/CreateInvoice';
import CreateQuotation from '../../CreateQuotation/components/CreateQuotation';
import EditQuotation from '../../CreateQuotation/components/EditQuotation';
import SelectInvoiceFormat from '../../CreateQuotation/components/SelectInvoiceFromat';
// import AllEventsNaviagtion from '../../All-Events/components/AllEventsNavigation';
import AllEvents from '../../All-Events/components/AllEvents';
import CreateEvent from '../../CreateEvent/components/CreateEvent';


const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<RootDrawerParamList>();

const DrawerNavigator: React.FC = () => {
  return (
    <Drawer.Navigator drawerContent={(props) => <DrawerContent {...props} />}>
      <Drawer.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={({ navigation }) => ({
          headerShown: true,
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <TouchableOpacity onPress={() => navigation.navigate('Settings')} style={{ marginRight: 25 }}>
                <FontAwesome name="cogs" size={24} color="black" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate('Notifications')} style={{ marginRight: 10 }}>
                <FontAwesome name="bell" size={24} color="black" />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      <Drawer.Screen
      name='Invoices'
      component={AllInvoices}
      />
      <Drawer.Screen
      name='Quotation'
      component={AllQuotation}
      />
      <Drawer.Screen
      name='All_Events'
      component={AllEvents}
      options={{ headerShown:false}}
      />
      <Drawer.Screen
      name='All_Vendors'
      component={VendorListScreen}
      options={{ headerShown:true }}
     
      />
      <Drawer.Screen
      name='Vendor_Registration'
      component={VendorRegistration}
      options={{ headerShown:false}}
      />
    </Drawer.Navigator>
  );
};

const DashNavigation: React.FC = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Dashboard">
        <Stack.Screen
          name="Dashboard"
          component={DrawerNavigator} // Use DrawerNavigator here
          options={{ headerShown: false }} // Ensure header is hidden for DrawerNavigator
        />
        <Stack.Screen
          name="Settings"
          component={SettingNavigation} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown: false }} // Optionally hide header if using custom header in SettingNavigation
        />
         <Stack.Screen
          name="Notifications"
          component={NotificationScreen} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown: true }} // Optionally hide header if using custom header in SettingNavigation
        />
         <Stack.Screen
          name="AllInvoices"
          component={AllInvoices} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown: true }} // Optionally hide header if using custom header in SettingNavigation
        />
         <Stack.Screen
          name="AllQuotations"
          component={AllQuotation} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown: true }} // Optionally hide header if using custom header in SettingNavigation
        />
         <Stack.Screen
          name="CreateQuotation"
          component={CreateQuotation} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown: true }} // Optionally hide header if using custom header in SettingNavigation
        />
        <Stack.Screen
          name="EditQuotation"
          component={EditQuotation} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown: true }} // Optionally hide header if using custom header in SettingNavigation
        />
         <Stack.Screen
          name="SelectInvoiceFormat"
          component={SelectInvoiceFormat} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown: true }} // Optionally hide header if using custom header in SettingNavigation
        />
         <Stack.Screen
          name="AllVendors"
          component={VendorListScreen} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown: true}} // Optionally hide header if using custom header in SettingNavigation
        />
          <Stack.Screen
          name="VendorRegistration"
          component={VendorRegistration} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown:true  }} // Optionally hide header if using custom header in SettingNavigation
        />
          <Stack.Screen
          name="AddItem"
          component={AddItem} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown:true  }} // Optionally hide header if using custom header in SettingNavigation
        />
        <Stack.Screen
          name="CreateEvent"
          component={CreateEvent} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown:true  }} // Optionally hide header if using custom header in SettingNavigation
        />
        <Stack.Screen
          name="CreateInvoice"
          component={CreateInvoice} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown:false  }} // Optionally hide header if using custom header in SettingNavigation
        />
        <Stack.Screen
          name="AllEvents"
          component={AllEvents} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown:true}} // Optionally hide header if using custom header in SettingNavigation
        />
         <Stack.Screen
          name="CustomerDetails"
          component={CustomerDetails} // Ensure SettingNavigation is a stack navigator
          options={{ headerShown:true}} // Optionally hide header if using custom header in SettingNavigation
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default DashNavigation;
