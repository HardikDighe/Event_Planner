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