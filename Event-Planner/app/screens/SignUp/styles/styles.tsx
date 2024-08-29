import { StyleSheet } from 'react-native';
import { DefaultTheme } from 'react-native-paper';
import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor:'white'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  inputHalf: {
    flex: 1,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  input: {
    width: '100%',
    marginBottom: 10,
  },
 
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    marginBottom: 10,
  },
  eyeIcon: {
    position: 'absolute',
    right: 15,
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#051650',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  modalSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
  },
  modalText: {
    fontSize: 16,
    marginTop: 5,
    lineHeight: 22,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#051650',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: 'black',
  },
  checkboxLabel: {
    fontSize: 16,
  },
  termsLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
});


export default styles;

// theme.ts


export 
const theme = {
  ...MD3LightTheme, // or MD3DarkTheme if you prefer dark mode
  colors: {
    ...MD3LightTheme.colors, // Extend with default light theme colors
    primary: 'black', // Adjust primary color
    onPrimary: 'white', // Text color on primary background
    surface: 'white', // Background color for surfaces
    onSurface: 'black', // Text color on surface background
    outline: 'black', // Outline color
    placeholder: 'gray', // Placeholder color
    text: 'black', // Text color
  },
};

//export theme;

