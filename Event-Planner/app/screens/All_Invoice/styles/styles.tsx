// styles.tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
 

  
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  totalSalesContainer: {
    alignItems: "center", // Center the content horizontally
    marginVertical: 16, // Adjust spacing as needed
  },
  totalSales: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  totalAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#051650",
    marginTop: 4, // Adjust spacing as needed
  },
  invoicesHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  invoicesListText: {
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
  phoneNumber: { // Added phone number styles
    fontSize: 14,
    color:  '#051650',
  },
  invoiceItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  statusContainer: {
    backgroundColor: "#e0f7fa",
    borderRadius: 4,
    padding: 8,
  },
  status: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#00796b",
  },
  nameAmountContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  namePhoneNumberContainer: {  // Added to group name and phone number
    flexDirection: "column",
  },
  name: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
 
  dateBalanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  date: {
    fontSize: 14,
    color: "#000",
  },
  balanceInput: {
    backgroundColor: "#f5f5f5",
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
    marginTop: 8,
  },
  iconContainer: {
    marginHorizontal: 16,
  },
  icon: {
    color: "#051650",
  },
  createInvoiceButton: {
    backgroundColor: '#051650',
    padding: 8,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
    alignSelf: 'center',
    width: '100%',
  },
  createInvoiceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    flex: 1,
  },
  icon1:{
    color:"#051650",
  }
});

export default styles;
