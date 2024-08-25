import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
    textAlign: "left",
    padding: 10,
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#051650",
    flex: 1,
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
  // addItemButton: {
  //   marginEnd: 250,
  //   backgroundColor: "#bbdffb",
  //   paddingHorizontal: 20,
  //   paddingVertical: 5,
  //   borderRadius: 30,
  //   borderColor: "#000000", // Black border color
  //   borderWidth: 1,
  //   height: 40,
  //   width: 200,
  // },
  // addItemButtonText: {
  //   color: "#051650",
  //   fontSize: 16,
  //   textAlign: "center",

  // },
  // buttonContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-between",
  // },
  // pdfButton: {
  //   paddingVertical: 12,
  //   paddingHorizontal: 24,
  //   backgroundColor: "#bbdffb",
  //   borderRadius: 0,
  //   flex: 1,
  //   justifyContent: "center",
  //   alignItems: "center",
  //   marginBottom: 5,
  //   marginTop: 15,
  // },

  // saveButton: {
  //   alignItems: "center",
  //   justifyContent: "center",
  //   padding: 16,
  //   backgroundColor: "#051650",
  //   borderRadius: 0,
  //   paddingHorizontal: 24,
  //   paddingVertical: 18,
  //   flex: 1,
  //   marginBottom: 5,
  //   marginTop: 15,
  // },

  // pdfButtonText: {
  //   color: "darkred",
  //   fontSize: 16,
  //   textAlign: "center",
  // },
  // saveButtonText: {
  //   color: "white",
  //   fontSize: 16,
  //   textAlign: "center",
  // },
});

export default styles;
