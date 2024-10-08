import { StyleSheet } from 'react-native';
import { SortedByModalStyles } from "@/app/(tabs)/constants/styles";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "white",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
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
  

  ...SortedByModalStyles
  
});

export default styles;
