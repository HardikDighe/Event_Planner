import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: "#f5f5f5",
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#051650",
  },
  shareButton: {
    padding: 8,
  },
  body: {
    padding: 16,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  column: {
    flex: 1,
    marginHorizontal: 8,
  },
  label: {
    fontSize: 16,
    color: "#051650",
    marginBottom: 8,
  },
  picker: {
    height: 50,
    width: "100%",
    color: "#051650",
  },
  dateButton: {
    padding: 8,
    backgroundColor: "#f5f5f5",
    borderRadius: 4,
  },
  dateText: {
    fontSize: 16,
    color: "#051650",
  },
  form: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 16,
  },
  inputFocused: {
    borderColor: "#051650",
    borderWidth: 2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    flex: 1,
    padding: 12,
    borderRadius: 4,
    backgroundColor: "#051650",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 4,
  },
  pdfButton: {
    backgroundColor: "#e63946",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default styles;
