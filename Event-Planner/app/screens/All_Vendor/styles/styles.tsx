import { StyleSheet } from "react-native";

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
  headerText: {
    fontSize: 24,
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
  },
  phoneRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
  addressText: {
    fontSize: 16,
    color: "#333",
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
    padding: 16,
    backgroundColor: "#051650",
    alignItems: "center",
    justifyContent: "center",
  },
  registerButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default styles;
