
import SignupScreen from '../../app/screens/SignUp/components/SignupScreen';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';


const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <SignupScreen/>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;