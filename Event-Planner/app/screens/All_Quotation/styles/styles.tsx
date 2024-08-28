import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 24,
    fontFamily: "Arial",
    color: "#051650",
    flex: 1,
    textAlign: "left",
  },
  searchInput: {
    flex: 1,
    fontSize: 18,
    paddingHorizontal: 8,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  quotationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  // headerText: {
  //   fontSize: 24,
  //   fontFamily: "Arial",
  //   color: "#051650",
  //   flex: 1,
  //   textAlign: "left",
  // },
  quotationsListText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#051650",
  },
  sortByContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortByText: {
    fontSize: 16,
    color: "#000",
    marginRight: 8,
    fontWeight: "bold",
  },
  quotationItem: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    elevation: 2,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statusContainer: {
    backgroundColor: "#d3d3d3",
    padding: 4,
    borderRadius: 4,
  },
  status: {
    fontSize: 12,
    color: "#000",
  },
  nameAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#051650",
  },
  amount: {
    fontSize: 16,
    fontWeight: "bold",
    color: "lightgreen",
  },
  dateBalanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  date: {
    fontSize: 14,
    color: "#000",
  },
  balanceInput: {
    backgroundColor: "grey",
    borderRadius: 4,
    paddingHorizontal: 8,
    fontSize: 14,
    color: "#051650",
    borderColor: "#ddd",
    borderWidth: 1,
    width: 120,
    textAlign: "right",
  },
  icons: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  iconContainer: {
    marginHorizontal: 8,
  },
  icon: {
    color: "#000",
  },
  createQuotationButton: {
    backgroundColor: "#051650",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
 
  createQuotationButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  namePhoneNumberContainer: {  // Added to group name and phone number
    flexDirection: "column",
  },
  phoneNumber: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  icon1:{
    color:"#051650",
  }
  
,
  modalContainer: {
    flex: 1, 
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: '25%', // Adjust this value to move the modal up or down
    marginRight: 15,  // Adjust this value to move the modal left or right
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 150,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  optionButton: {
    padding: 16,
  },
  optionText: {
    fontSize: 18,
  },
});

export default styles;
