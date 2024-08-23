import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Animated, Modal, TextStyle } from 'react-native';
const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    topField: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 15,
        paddingHorizontal: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#DCDCDC',
        backgroundColor: "#F0F0F0",
        borderRadius: 7,
    },
    halfField: {
        flex: 1,
        marginRight: 10,
        justifyContent: 'center',
    },
    label1: {
        fontSize: 16,
        marginBottom: 5,
        color: '#333',
    },
    field: {
        marginBottom: 15,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 10,
    } as TextStyle,
    inputFocused: {
        borderColor: '#007BFF' // Highlight border color when focused
    } as TextStyle,
    label: {
        fontSize: 14,         // Font size for the label
        fontWeight: 'bold',   // Bold text
        color: '#333',        // Dark gray color
        padding: 10,          // Padding around the text
        backgroundColor: '#f0f0f0', // Light gray background
        borderRadius: 5,      // Rounded corners
        textAlign: 'left',  // Center text
        marginBottom:22
      },
    errorMasaage: {
        color: 'red',
        marginTop: -25,
        marginBottom:10
    },
    buttonsContainer: {
        //marginTop: 100,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#051650',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        marginBottom:10,
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    linkButton: {
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 5,
        borderColor: '#00008B',
        backgroundColor: 'transparent',
        alignSelf: 'flex-start',
    },
    linkButtonText: {
        color: '#051650',
        fontSize: 16,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: '#fff',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalMessage: {
        fontSize: 16,
        marginBottom: 20,
    },
    modalButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#051650',
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        textAlign: 'center',
        fontSize: 16,
    },
    itemContainer: {
        marginBottom: 15,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    itemButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    editButton: {
        backgroundColor: '#28a745',
        padding: 10,
        borderRadius: 4,
    },
    deleteButton: {
        backgroundColor: '#dc3545',
        padding: 10,
        borderRadius: 4,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    swiper: {
        height: 550,
        backgroundColor: "grey"
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    previewContainer: {
        width: '110%',
        borderRadius: 10,
        backgroundColor: 'white',
        padding: 15,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 0 },
        elevation: 5, flex: 1
    },
    previewTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10
    },
    previewSubtitle: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'left',
        marginBottom: 10,
        marginTop: 20,

    },
    previewSubTitle: {
        fontSize: 16,
        textAlign: 'left',
        marginBottom: 10,
        marginTop: 20
    },
    table: {
        width: '100%',
        // borderCollapse: 'collapse',
        marginBottom: 20,
        borderWidth: 1,
    },
    tableRow: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        // borderBottomColor: '#ddd',
        paddingVertical: 8
    },
    tableHeader: {
        fontWeight: 'bold',
        flex: 1,

    },
    tableCell: {
        flex: 1,
        paddingHorizontal: 4,
    },
    summaryContainer: {
        marginTop: 10,
    },
    summaryText: {
        fontSize: 16,
        textAlign: 'right',
        fontWeight: 'bold'
    },
    shareButton: {
        backgroundColor: '#051650',
        padding: 15,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    shareButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold'
    },
    footerText: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold'
    },
    logo: {
        width: 100,
        height: 100,
        alignSelf: 'center',
        marginBottom: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    invoiceDetails: {
        marginBottom: 20,
    },
    invoiceNumber: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    invoiceDate: {
        fontSize: 16,
    },
    items: {
        marginBottom: 20,
    },
    totals: {
        marginTop: 10,
        borderBottomWidth: 1,
        borderStyle: 'dashed'
    },
    subtotal: {
        fontSize: 17,
        flex: 1,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        flex: 1
    },
//     labelStyle :{
//     position: 'absolute',
//     left: 10,
//     // top: animatedIsFocused.interpolate({
//     //     inputRange: [0, 1],
//     //     outputRange: [18, -8],
//     // }),
//     backgroundColor: '#fff',
//     paddingHorizontal: 2,
//    }
});
export default styles;