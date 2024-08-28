// styles.tsx
import { StyleSheet } from "react-native";

const constantStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  constantbox: {
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
  footerIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  printIcon: {
    marginRight: 10,
  },
  shareIcon: {
    marginLeft: 10,
  },
  footerButton: {
    backgroundColor: "#051650",
    padding: 8,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 16,
  },
  
  footerButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
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
  dateBalanceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flex: 1,
  },
  amount: {
    fontSize: 16,
    color: "#03AC13",
    fontWeight: "bold",
  },
  listHeaderText: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 16,
  },
  listText: {
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
  
})

export default constantStyles;

export const constantSortedByModalStyles = StyleSheet.create({
  
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
})
// export const constantSortedByModalStyles;
export const headerstyles = StyleSheet.create({
  headerText: {
    fontSize: 24,
    fontFamily: "Arial",
    color: "#051650",
    flex: 1,
    textAlign: "left",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
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
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
})