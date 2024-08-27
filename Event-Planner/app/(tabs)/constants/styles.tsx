// styles.tsx
import { StyleSheet } from "react-native";

const constantStyles = StyleSheet.create({
  
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
  
})
export default constantStyles;
