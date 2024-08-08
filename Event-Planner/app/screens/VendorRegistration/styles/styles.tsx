import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  input: {
    marginBottom: 16,
    backgroundColor: "white",
    borderRadius: 500,
  },
  focusedInput: {
    borderColor: "blue",
  },
  errorText: {
    color: "red",
    marginBottom: 16,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    backgroundColor: "#051650",
  },
  saveButtonText: {
    fontSize: 16,
    color: "white",
  },
  addItemText: {
    fontSize: 16,
    color: "#051650",
    textDecorationLine: "underline",
  },
  spacer: {
    flex: 1,
  },
});

export default styles;
