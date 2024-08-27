import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
  },
  inputContainer: {
    marginVertical: 10,
    position: "relative",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
  },
  floatingLabel: {
    position: "absolute",
    left: 10,
    top: -10,
    backgroundColor: "#fff",
    paddingHorizontal: 5,
    fontSize: 12,
    color: "black",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 5,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#051650",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginVertical: 10,
    alignSelf: "stretch",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerText: {
    color: "#051650",
  },
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dark background
  },
  modalContainer: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  label: {
    fontSize: 14, // Font size for the label
    fontWeight: "bold", // Bold text
    color: "#333", // Dark gray color
    padding: 10, // Padding around the text
    backgroundColor: "#f0f0f0", // Light gray background
    borderRadius: 5, // Rounded corners
    textAlign: "left", // Center text
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginTop: 5,
  },
});

export default styles;
