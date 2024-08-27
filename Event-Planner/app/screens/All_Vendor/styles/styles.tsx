import { StyleSheet } from "react-native";
import { constantSortedByModalStyles } from "@/app/(tabs)/constants/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingBottom: 8,
    paddingHorizontal: 16,
    paddingTop: 16,
    justifyContent: "space-between",
  },
  phoneAndAddressContainer: {
    marginTop: 8,
    marginBottom: 8,
  },
  itemContainer: {
    // Add this style
    padding: 8,
    marginVertical: 4,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "#e8f0f8",
  },
  headerText: {
    fontSize: 20,
    fontFamily: "Arial",
    color: "#051650",
    textAlign: "left",
    flex: 1,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    padding: 4,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
    width: 150,
    marginRight: 16,
  },
  listHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  detailsText: {
    fontSize: 14,
    color: "#051650",
  },
  listTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  sortButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  sortText: {
    marginRight: 4,
    fontSize: 16,
    fontWeight: "bold",
  },
  card: {
    marginBottom: 16,
    backgroundColor: "white",
  },
  vendorName: {
    fontSize: 18,
    fontWeight: "bold",
    marginLeft: -14,
  },
  phoneRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: -20,
  },
  viewDetailsButton: {
    padding: 8,
    backgroundColor: "#E5E5E5",
    borderRadius: 4,
  },
  viewDetailsButtonText: {
    color: "#051650",
  },
  detailsContainer: {
    marginTop: 8,
  },

  itemLabel: {
    flex: 1, // Takes up 50% of the container
    fontWeight: "bold",
    color: "#051650",
  },
  itemValue: {
    flex: 2, // Takes up the remaining 50%
    color: "#333",
  },
  addressText: {
    fontSize: 16,
    color: "#333",
    marginTop: 5,
    
  },
  cardActions: {
    justifyContent: "center",
  },
  iconButtons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
  },
  registerButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: "#051650",
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  icon: {
    color: "#051650",
  },

  ...constantSortedByModalStyles
});

export default styles;
