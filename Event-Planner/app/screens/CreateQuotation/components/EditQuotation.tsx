import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import styles from '../../../../app/screens/CreateQuotation/styles/styles';
import { fetchQuotationDetails, deleteQuotation, updateQuotation } from '../api/Quotation.api';
import { ERROR_MESSAGES, STRINGS } from '../constants/string';
import { Item } from '@/app/(tabs)/types';
interface FloatingLabelInputProps {
    label: string;
    value: string;
    onChangeText: (text: string) => void;
    keyboardType?: string;
}

const FloatingLabelInput: React.FC<FloatingLabelInputProps> = ({ label, value, onChangeText, keyboardType }) => {
    const [isFocused, setIsFocused] = useState(false);

    const labelStyle = {
        position: 'absolute',
        left: 10,
        top: isFocused || value ? -8 : 18,
        fontSize: isFocused || value ? 12 : 16,
        color: isFocused || value ? '#000' : '#aaa',
        backgroundColor: '#fff',
        paddingHorizontal: 2,
    };

    return (
        <View style={styles.field}>
            <Text style={labelStyle}>{label}</Text>
            <TextInput
                style={[styles.input, isFocused && styles.inputFocused]}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                keyboardType={keyboardType}
            />
        </View>
    );
};

type EditQuotationRouteParams = {
    quotationId: string; // or another type if necessary
};

const EditQuotation = () => {
    const navigation = useNavigation();
    const route = useRoute();
    const { quotationId } = route.params as EditQuotationRouteParams;

    // Define and initialize state variables
    const [quotationDetails, setQuotationDetails] = useState<any>();
    const [editItemModalVisible, setEditItemModalVisible] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);
    const [currentItem, setCurrentItem] = useState({
        itemName: '',
        quantity: Number(),
        price: Number(),
        discount: Number(),
        payableAmount: Number(),
        paidAmount: Number(),
        miscellaneous: '',
    });
    const [modalVisible, setModalVisible] = useState(false);

    const handleSharePDF = async () => {
        if (!quotationDetails) return;

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
                            <td>${quotationDetails.customerName}</td>
                        </tr>
                        <tr>
                            <th>Phone Number</th>
                            <td>${quotationDetails.phoneNumber}</td>
                        </tr>
                        <tr>
                            <th>Address</th>
                            <td>${quotationDetails.address}</td>
                        </tr>
                        <tr>
                            <th>Email ID</th>
                            <td>${quotationDetails.emailId}</td>
                        </tr>
                        <tr>
                            <th>GSTIN</th>
                            <td>${quotationDetails.gstin}</td>
                        </tr>
                        <tr>
                            <th>Quotation Date</th>
                            <td>${new Date(quotationDetails.quotationDate).toDateString()}</td>
                        </tr>
                        <tr>
                            <th>Venue Details</th>
                            <td>${quotationDetails.venueDetails}</td>
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
                        ${quotationDetails.items.map(item => `
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
            // Generate PDF
            const { uri } = await Print.printToFileAsync({ html: htmlContent });

            // Share PDF
            await shareAsync(uri);
        } catch (error) {
            Alert.alert(ERROR_MESSAGES.GenerateFailed);
        }
    };

    useEffect(() => {
        const loadQuotationData = async () => {
            const data = await fetchQuotationDetails('8096'); // Replace with the actual ID
            if (data) {
                setQuotationDetails(data);
            } else {
                console.error('Failed to load quotation data');
            }
        };
        loadQuotationData();

    }, []);

    const handleItemEdit = (index: number) => {
        if (!quotationDetails) return;

        setCurrentItemIndex(index);
        setCurrentItem(quotationDetails.items[index]);
        setEditItemModalVisible(true);
    };

    const handleDelete = async (id: string) => {
        const success = await deleteQuotation(id);
        if (success) {
            // Handle successful deletion (e.g., update UI or show a success message)
            console.log('Deleted successfully');
        } else {
            // Handle failed deletion (e.g., show an error message)
            console.log('Deletion failed');
        }
    };

    const handleItemDelete = (index: number) => {
        if (!quotationDetails) return;

        const updatedItems = [...quotationDetails.items];
        updatedItems.splice(index, 1);
        setQuotationDetails({ ...quotationDetails, items: updatedItems });
    };

    const saveEditedItem = () => {
        if (currentItemIndex === null || !quotationDetails) return;

        const updatedItems = [...quotationDetails.items];
        updatedItems[currentItemIndex] = currentItem;
        setQuotationDetails({ ...quotationDetails, items: updatedItems });
        setEditItemModalVisible(false);
    };

    const handleSave = async () => {
        if (!quotationDetails) return;

        updateQuotation(quotationDetails.id, quotationDetails);
        setModalVisible(true);

    };

    if (!quotationDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Edit Quotation</Text>
                <FloatingLabelInput
                    label="Enter Customer Name"
                    value={quotationDetails.customerName}
                    onChangeText={(text) => setQuotationDetails({ ...quotationDetails, customerName: text })}
                />
                <FloatingLabelInput
                    label="Enter Phone Number"
                    value={quotationDetails.phoneNumber}
                    onChangeText={(text) => setQuotationDetails({ ...quotationDetails, phoneNumber: text })}
                    keyboardType="phone-pad"
                />
                <FloatingLabelInput
                    label="Enter Address"
                    value={quotationDetails.address}
                    onChangeText={(text) => setQuotationDetails({ ...quotationDetails, address: text })}
                />
                <FloatingLabelInput
                    label="Enter Email ID"
                    value={quotationDetails.emailId}
                    onChangeText={(text) => setQuotationDetails({ ...quotationDetails, emailId: text })}
                    keyboardType="email-address"
                />
                <FloatingLabelInput
                    label="Enter GSTIN"
                    value={quotationDetails.gstin}
                    onChangeText={(text) => setQuotationDetails({ ...quotationDetails, gstin: text })}
                />
                <FloatingLabelInput
                    label="Enter Venue Details"
                    value={quotationDetails.venueDetails}
                    onChangeText={(text) => setQuotationDetails({ ...quotationDetails, venueDetails: text })}
                />

                {quotationDetails.items.map((item, index) => (
                    <View key={index} style={styles.itemContainer}>
                        <Text>Item Name: {item.itemName}</Text>
                        <Text>Quantity: {item.itemQuantity}</Text>
                        <Text>Price: {item.itemPrice}</Text>
                        <Text>Discount: {item.itemDiscount}</Text>
                        <Text>Total Price: {item.itemTotalPrice}</Text>
                        <Text>Misc: {item.itemMisc}</Text>
                        <View style={styles.itemButtons}>
                            <TouchableOpacity onPress={() => handleItemEdit(index)} style={styles.editButton}>
                                <Text style={styles.buttonText}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleItemDelete(index)} style={styles.deleteButton}>
                                <Text style={styles.buttonText}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}



                <Modal
                    visible={modalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Success</Text>
                            <Text style={styles.modalMessage}>{STRINGS.successMessage}</Text>
                            <TouchableOpacity style={styles.modalButton} onPress={handleSharePDF}>
                                <Text style={styles.modalButtonText}>Share</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => deleteQuotation(quotationDetails.id)} >
                                <Text style={styles.modalButtonText}>{STRINGS.deleteButtonText}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButton} onPress={() => navigation.navigate('CreateQuotation')}>
                                <Text style={styles.modalButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <Modal
                    visible={editItemModalVisible}
                    transparent={true}
                    animationType="slide"
                    onRequestClose={() => setEditItemModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Edit Item</Text>
                            <FloatingLabelInput
                                label="Item Name"
                                value={currentItem.itemName}
                                onChangeText={(text) => setCurrentItem({ ...currentItem, itemName: text })}
                            />
                            <FloatingLabelInput
                                label="Quantity"
                                value={String(currentItem.quantity)}
                                onChangeText={(text) => setCurrentItem({ ...currentItem, quantity: Number(text) })}
                                keyboardType="numeric"
                            />
                            <FloatingLabelInput
                                label="Price"
                                value={String(currentItem.price)}
                                onChangeText={(text) => setCurrentItem({ ...currentItem, price: Number(text) })}
                                keyboardType="numeric"
                            />
                            <FloatingLabelInput
                                label="Discount"
                                value={String(currentItem.discount)}
                                onChangeText={(text) => setCurrentItem({ ...currentItem, discount: Number(text) })}
                                keyboardType="numeric"
                            />
                            <FloatingLabelInput
                                label="Total Price"
                                value={String(currentItem.payableAmount)}
                                onChangeText={(text) => setCurrentItem({ ...currentItem, payableAmount: Number(text) })}
                                keyboardType="numeric"
                            />
                            <FloatingLabelInput
                                label="Misc"
                                value={currentItem.miscellaneous}
                                onChangeText={(text) => setCurrentItem({ ...currentItem, miscellaneous: text })}
                            />
                            <TouchableOpacity style={styles.button} onPress={saveEditedItem}>
                                <Text style={styles.buttonText}>Save Item</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => setEditItemModalVisible(false)}>
                                <Text style={styles.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
            </TouchableOpacity>
        </View>
    );
};

export default EditQuotation;
