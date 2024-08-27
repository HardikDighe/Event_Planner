import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  searchBar: {
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
    width: 150,
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  eventsList: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  sortByButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortByText: {
    fontSize: 16,
    marginRight: 5,
  },
  namePhoneText: {
    fontSize: 16,
    color: '#051650',
    marginTop: 5,
  },
  card: {
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
    elevation: 1,
    borderWidth: 2,
    borderColor: 'gray',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  eventDay: {
    fontSize: 16,
    color: 'gray',
  },
  cardBody: {
    marginTop: 10,
  },
  eventInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  eventText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'gray',
    flex: 1,
  },
  eventDescription: {
    marginTop: 10,
    fontSize: 14,
    color: '#051650',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  registerButton: {
    backgroundColor: '#D0E8FF',
    padding: 5,
    borderRadius: 5,
    marginLeft: 10,
  },
  registerButtonText: {
    color: '#051650',
    fontWeight: '500',
    fontSize: 10,
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
  registerEventButton: {
    backgroundColor: '#051650',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 10,
  },
  registerEventButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },




  
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: '23%', // Adjust this value to move the modal up or down
    marginRight: 15,  // Adjust this value to move the modal left or right
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 150,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  sortOption: {
    padding: 15,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  eventCard: {
    padding: 15,
    marginVertical: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },


  dropdownContainer: {
    width: 300,
    marginRight: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },







  // modalContainer: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor: 'rgba(0, 0, 0, 0.5)',
  // },
  // modalContent: {
  //   width: 300,
  //   padding: 20,
  //   backgroundColor: 'white',
  //   borderRadius: 8,
  // },
  optionButton: {
    padding: 16,
  },
  optionText: {
    fontSize: 18,
  },
  cancelButton: {
    padding: 16,
    marginTop: 10,
    backgroundColor: '#ddd',
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelText: {
    fontSize: 18,
    color: '#333',
  },

});

export default styles;
