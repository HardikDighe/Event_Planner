import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import DashNavigation from '../components/DashboardNavigation';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <DashNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
