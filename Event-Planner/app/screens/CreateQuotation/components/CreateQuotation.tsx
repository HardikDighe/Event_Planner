import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Animated, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import DateTimePicker from '@react-native-community/datetimepicker';
import { StackNavigationProp } from '@react-navigation/stack';
import styles from '../../../../app/screens/CreateQuotation/styles/styles';
import { saveQuotation } from '../api/createquotation.api';
import { fetchQuotationId } from '../api/getQuotationId.api';

interface FloatingLabelInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: string;
}
interface Item {
    itemName: string;
    itemQuantity: number;
    itemPrice: number;
    itemDiscount: number;
    itemTotalPrice: number;
    itemMisc: string;
}
type RouteParams = {
    newItem?: Item;
};
type RootStackParamList = {
    SelectInvoiceFormat: {
        customerName: string;
        phoneNumber: string;
        address: string;
        emailId: string;
        gstin: string;
        quotationDate: Date;
        venueDate: Date;
        venueTime: Date;
        venueDetails: string;
        items: Item[];
    };
    ViewInvoice: {
        customerName: string;
        phoneNumber: string;
        address: string;
        emailId: string;
        gstin: string;
        quotationDate: Date;
        venueDate: Date;
        venueTime: Date;
        venueDetails: string;
        items: Item[];
    };
    EditQuotation: {
        quotationId: string;
    };
    AddItem: undefined;
};



// FloatingLabelInput as a functional component with typed props
const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ label, value, onChangeText, keyboardType }) => {

    const [isFocused, setIsFocused] = useState(false);
    const animatedIsFocused = useRef(new Animated.Value(value ? 1 : 0)).current;

    useEffect(() => {
        Animated.timing(animatedIsFocused, {
            toValue: isFocused || value ? 1 : 0,
            duration: 200,
            useNativeDriver: false,
        }).start();
    }, [isFocused, value]);

    const labelStyle = {
        position: 'absolute',
        left: 10,
        top: animatedIsFocused.interpolate({
            inputRange: [0, 1],
            outputRange: [18, -8],
        }),

        backgroundColor: '#fff',

        paddingHorizontal: 2,
    };

    return (
        <View style={styles.field}>
            <Animated.Text style={labelStyle}>
                {label}
            </Animated.Text>
            <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}

            />
        </View>
    );
};


type SelectInvoiceFormatNavigationProp = StackNavigationProp<RootStackParamList, 'SelectInvoiceFormat'>;


interface Props {
    navigation: SelectInvoiceFormatNavigationProp;
}

interface CreateQuotationProps { }

const CreateQuotation: React.FC<Props> = () => {
    // const navigation = useNavigation();
    const navigation = useNavigation<SelectInvoiceFormatNavigationProp>();
    const route = useRoute();

    const [quotationId, setQuotationId] = useState(Number);
    const [customerName, setCustomerName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [emailId, setEmailId] = useState('');
    const [gstin, setGstin] = useState('');
    const [venueDate, setVenueDate] = useState(new Date());
    const [venueTime, setVenueTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [quotationDate, setQuotationDate] = useState(new Date());
    const [venueDetails, setVenueDetails] = useState('');
    //const [items, setItems] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

    const route1 = useRoute<RouteProp<RootStackParamList, 'SelectInvoiceFormat'>>();

    const [items, setItems] = useState<Item[]>([]);

    useEffect(() => {
        if (route.params?.newItem) {
            setItems(prevItems => [...prevItems, route.params.newItem]);
        }
    }, [route.params?.newItem]);
    useEffect(() => {
        setQuotationDate;
        const loadQuotationId = async () => {
            const id = await fetchQuotationId();
            if (id !== null) {
                setQuotationId(id);
            } else {
                Alert.alert('Error', 'Failed to load quotation ID.');
            }
        };
        loadQuotationId();
    }, []);

    const handleSharePDF = async () => {
        const htmlContent = `
    <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    padding: 20px;
                }
                h1 {
                    color: #000;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-bottom: 20px;
                }
                th, td {
                    border: 1px solid #ddd;
                    padding: 8px;
                    text-align: left;
                }
                th {
                    background-color: #f2f2f2;
                }
            </style>
        </head>
        <body> 
            <h1>Quotation Details</h1>
            <table>
                <tr>
                    <th>Customer Name</th>
                    <td>${customerName}</td>
                </tr>
                <tr>
                    <th>Phone Number</th>
                    <td>${phoneNumber}</td>
                </tr>
                <tr>
                    <th>Address</th>
                    <td>${address}</td>
                </tr>
                <tr>
                    <th>Email ID</th>
                    <td>${emailId}</td>
                </tr>
                <tr>
                    <th>GSTIN</th>
                    <td>${gstin}</td>
                </tr>
                <tr>
                    <th>Quotation Date</th>
                    <td>${quotationDate.toDateString()}</td>
                </tr>
                <tr>
                    <th>Venue Date</th>
                    <td>${venueDate.toDateString()}</td>
                </tr>
                <tr>
                    <th>Venue Time</th>
                    <td>${venueTime.toTimeString().slice(0, 5)}</td>
                </tr>
                <tr>
                    <th>Venue Details</th>
                    <td>${venueDetails}</td>
                </tr>
            </table>

            <h2>Items</h2>
            <table>
                <tr>
                    <th>Item Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Total Price</th>
                    <th>Misc</th>
                </tr>
                ${items.map(item => `
                    <tr>
                        <td>${item.itemName}</td>
                        <td>${item.itemQuantity}</td>
                        <td>${item.itemPrice}</td>
                        <td>${item.itemDiscount}</td>
                        <td>${item.itemTotalPrice}</td>
                        <td>${item.itemMisc}</td>
                    </tr>
                `).join('')}
            </table>
        </body>
    </html>
`;


        try {
            const pdfResponse = await Print.printToFileAsync({
                html: htmlContent,
                width: 612,  // 8.5in (in points, 1in = 72 points)
                height: 792, // 11in (in points, 1in = 72 points)
                base64: false, // Set to true if you want to get base64
            });

            const { uri } = pdfResponse;
            console.log('PDF saved to:', uri);
            await shareAsync(uri);
        } catch (error) {
            console.error('Failed to generate or share PDF:', error);
            Alert.alert('Error', 'Failed to generate or share PDF. Please try again.');
        }
    };

    const handleDateChange = (event: React.SyntheticEvent<any>, selectedDate?: Date) => {
        setShowDatePicker(false);
        if (selectedDate) {
            setVenueDate(selectedDate);
        }
    };

    const handleSharePDF1 = () => {
        navigation.navigate('SelectInvoiceFormat', {
            customerName,
            phoneNumber,
            address,
            emailId,
            gstin,
            quotationDate,
            venueDate,
            venueTime,
            venueDetails,
            items
        });
    };

    const handleTimeChange = (event: Event, selectedTime?: Date) => {
        setShowTimePicker(false);
        if (selectedTime) {
            setVenueTime(selectedTime);
        }
    };

    const addItem = () => {
        navigation.navigate('AddItem');
    };

    const handleSave1 = async () => {
        navigation.navigate('ViewInvoice', {
            customerName, phoneNumber, address, emailId, gstin, quotationDate, venueDate, venueTime, venueDetails, items
        });
    };

    const handleEdit = () => {
        setModalVisible(false);
        navigation.navigate('EditQuotation', { quotationId: 'quotationIdHere' });
    };

    const quotationData = {
        customerName,
        phoneNumber,
        address,
        emailId,
        gstin,
        quotationDate,
        venueDate,
        venueTime,
        venueDetails,
        items, 
    };
    const handleSave = async () => {
        const isSuccess = await saveQuotation(quotationData);
    if (isSuccess) {
        setModalVisible(true);  // Show the modal if the save was successful
    }
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Create Quotation</Text>

                <View style={styles.topField}>
                    <View style={styles.halfField}>
                        <Text style={styles.label1}>Quotation Number</Text>
                        <Text style={styles.label1}>{quotationId}</Text>
                    </View>

                    <View style={{ width: 1, backgroundColor: '#ccc' }} />

                    <View style={styles.halfField}>
                        <Text style={styles.label1}>Date:</Text>
                        <Text>{quotationDate.toDateString()}</Text>
                    </View>
                </View>

                <FloatingLabelInput
                    label="Enter Customer Name"
                    value={customerName}
                    onChangeText={setCustomerName}
                />
                <FloatingLabelInput
                    label="Enter Phone Number"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                 <FloatingLabelInput
                label="Enter Address"
                value={address}
                onChangeText={setAddress}
                //keyboardType="email-address"
            />
                <FloatingLabelInput
                    label="Enter Email ID"
                    value={emailId}
                    onChangeText={setEmailId}
                    keyboardType="email-address"
                />
                <FloatingLabelInput
                    label="Enter GSTIN"
                    value={gstin}
                    onChangeText={setGstin}
                />

                <TouchableOpacity onPress={() => setShowDatePicker(true)}>
                    <Text style={styles.label}>Venue Date: {venueDate.toDateString()}</Text>
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        value={venueDate}
                        mode="date"
                        display="default"
                        onChange={() => handleDateChange}
                    />
                )}

                {/* Venue Time Picker */}
                <TouchableOpacity onPress={() => setShowTimePicker(true)}>
                    <Text style={styles.label}>Venue Time: {venueTime.toTimeString().slice(0, 5)}</Text>
                </TouchableOpacity>
                {showTimePicker && (
                    <DateTimePicker
                        value={venueTime}
                        mode="time"
                        display="default"
                        onChange={() => handleTimeChange}
                    />
                )}

                <FloatingLabelInput
                    label="Enter Venue Details"
                    value={venueDetails}
                    onChangeText={setVenueDetails}
                />

                {items.map((item, index) => (
                    <View key={index} style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10 }}>
                        <Text style={{ fontSize: 18 }}>{item.itemName}</Text>
                        <Text>Quantity: {item.itemQuantity}</Text>
                        <Text>Rate: {item.itemPrice}</Text>
                        <Text>Total: {item.itemTotalPrice}</Text>
                    </View>
                ))}

                <TouchableOpacity style={styles.linkButton} onPress={addItem}>
                    <Text style={styles.linkButtonText}>+ Add Item</Text>
                </TouchableOpacity>

                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Success</Text>
                            <Text style={styles.modalMessage}>Quotation saved successfully!</Text>
                            <TouchableOpacity style={styles.modalButton} onPress={handleSharePDF}>
                                <Text style={styles.modalButtonText}>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={handleEdit} >
                                <Text style={styles.modalButtonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} >
                                <Text style={styles.modalButtonText}>Delete</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.modalButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>

            <View style={styles.buttonsContainer}>
                <TouchableOpacity style={styles.button} onPress={handleSharePDF1}>
                    <Text style={styles.buttonText}>Convert to Invoice</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleSave}>
                    <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CreateQuotation;
