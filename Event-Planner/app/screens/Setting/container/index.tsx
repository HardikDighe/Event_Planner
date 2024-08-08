import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import SettingNavigation from '../components/SettingNavigation';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SettingNavigation />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
