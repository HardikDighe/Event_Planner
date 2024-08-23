// styles.tsx
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  section: {
    margin: 10,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  tile: {
    width: "22%",
    alignItems: "center",
    marginBottom: 10,
  },
  tileTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  tileText: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  iconBackground: {
    width: 60,
    height: 60,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    alignSelf: "center",
  },
});

export default styles;
