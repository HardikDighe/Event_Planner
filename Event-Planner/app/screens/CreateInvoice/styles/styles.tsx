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
    marginHorizontal: 10, // Adjust horizontal margin if needed
  },
  
  addItemButton: {
    backgroundColor: "#bbdffb",
    paddingHorizontal: 20,
    paddingVertical: 10, // Adjusted padding for better button height
    borderRadius: 30,
    borderColor: "#000000", // Black border color
    borderWidth: 1,
    height: 40,
    marginEnd: 10, // Adjust spacing between buttons
    marginTop:-10,
  
  },


  addItemButtonText: {
    color: "#051650",
    fontSize: 16,
    textAlign: "center",
  },
  
  pdfButton: {
  height: 70,
    paddingHorizontal: 70, // Adjust horizontal margin if needed
    backgroundColor: "#bbdffb",
    borderRadius: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40, // Added margin-top for better spacing between buttons
    
    
    marginEnd: 0, // Adjust spacing between buttons
    marginLeft: -120, // Added margin-left
  },
  pdfButtonText: {
    color: "darkred",
    fontSize: 16,
    textAlign: "center",
  },
  saveButton: {
    paddingHorizontal: 70, // Adjust horizontal margin if needed

    backgroundColor: "#051650",
    borderRadius: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40, // Added margin-top for better spacing between buttons
   
  },

  saveButtonText: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
  },

 


});

export default styles;
