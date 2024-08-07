import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
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
  noUnderlineInput: {
    flex: 1,
    backgroundColor: "white",
    borderBottomWidth: 0,
    borderRadius: 8,
    height: 40,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    alignSelf: "center",
  },
  combinedFieldsContainer: {
    backgroundColor: "#f0f0f0",
    padding: 8,
    borderRadius: 8,
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  rowLabel: {
    width: 120,
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    paddingVertical: 12,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "lightgray",
    width: 200,
    alignSelf: "center",
  },
  focusedInput: {
    borderColor: "blue",
  },
  buttonText: {
    color: "black",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  currencySymbol: {
    fontSize: 18,
    marginRight: 5,
    color: "black",
  },
  payableAmountBorder: {
    borderColor: "#01e606", // Parrot green color
    borderWidth: 2,
    backgroundColor: "#CFFDBC",
  },
});
