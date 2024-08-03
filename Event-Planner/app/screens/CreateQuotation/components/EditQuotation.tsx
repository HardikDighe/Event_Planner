import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView, Alert, Modal } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';

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
    const [quotationDetails, setQuotationDetails] = useState<any>(null); // Change to a more specific type if possible
    const [editItemModalVisible, setEditItemModalVisible] = useState(false);
    const [currentItemIndex, setCurrentItemIndex] = useState<number | null>(null);
    const [currentItem, setCurrentItem] = useState({
        itemName: '',
        itemQuantity: '',
        itemPrice: '',
        itemDiscount: '',
        itemTotalPrice: '',
        itemMisc: '',
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
            Alert.alert('Error', 'Failed to generate or share the PDF.');
        }
    };

    useEffect(() => {
        const fetchQuotationDetails = async () => {
            try {
                const response = await fetch(`http://192.168.0.108:3000/quotation/${quotationId}`);
                const data = await response.json();
                setQuotationDetails(data);
            } catch (error) {
                console.error('Failed to fetch quotation details:', error);
                Alert.alert('Error', 'Failed to fetch quotation details. Using demo data.');
                setQuotationDetails({
                    customerName: 'Demo Customer',
                    phoneNumber: '1234567890',
                    address: 'Demo Address',
                    emailId: 'demo@example.com',
                    gstin: '12ABCDE3456FZ1',
                    quotationDate: new Date(),
                    venueDetails: 'Demo Venue',
                    items: [
                        { itemName: 'Item 1', itemQuantity: '1', itemPrice: '100', itemDiscount: '0', itemTotalPrice: '100', itemMisc: 'None' },
                        { itemName: 'Item 2', itemQuantity: '2', itemPrice: '200', itemDiscount: '20', itemTotalPrice: '360', itemMisc: 'None' }
                    ],
                });
            }
        };

        fetchQuotationDetails();
    }, [quotationId]);

    const handleItemEdit = (index: number) => {
        if (!quotationDetails) return;

        setCurrentItemIndex(index);
        setCurrentItem(quotationDetails.items[index]);
        setEditItemModalVisible(true);
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

        setModalVisible(true);
        try {
            const response = await fetch(`http://192.168.0.108:3000/quotation/${quotationId}`, {
                method: 'PUT',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(quotationDetails),
            });

            if (response.ok) {
                // Optionally show success modal or message
            } else {
                Alert.alert('Error', 'Failed to update quotation.');
            }
        } catch (error) {
            console.error('Failed to update quotation:', error);
            Alert.alert('Error', 'An error occurred while updating the quotation.');
        }
    };

    if (!quotationDetails) {
        return (
            <View style={styles.loadingContainer}>
                <Text>Loading...</Text>
            </View>
        );
    }


    return (
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

            <TouchableOpacity style={styles.button} onPress={handleSave}>
                <Text style={styles.buttonText}>Save</Text>
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
                        {/* <TouchableOpacity style={styles.modalButton} onPress={handleEdit} >
                            <Text style={styles.modalButtonText}>Edit</Text>
                        </TouchableOpacity> */}
                        <TouchableOpacity style={styles.modalButton} >
                            <Text style={styles.modalButtonText}>Delete</Text>
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
                            value={String(currentItem.itemQuantity)}
                            onChangeText={(text) => setCurrentItem({ ...currentItem, itemQuantity: Number(text) })}
                            keyboardType="numeric"
                        />
                        <FloatingLabelInput
                            label="Price"
                            value={String(currentItem.itemPrice)}
                            onChangeText={(text) => setCurrentItem({ ...currentItem, itemPrice: Number(text) })}
                            keyboardType="numeric"
                        />
                        <FloatingLabelInput
                            label="Discount"
                            value={String(currentItem.itemDiscount)}
                            onChangeText={(text) => setCurrentItem({ ...currentItem, itemDiscount: Number(text) })}
                            keyboardType="numeric"
                        />
                        <FloatingLabelInput
                            label="Total Price"
                             value={String(currentItem.itemTotalPrice)}
                            onChangeText={(text) => setCurrentItem({ ...currentItem, itemTotalPrice: Number(text) })}
                            keyboardType="numeric"
                        />
                        <FloatingLabelInput
                            label="Misc"
                            value={currentItem.itemMisc}
                            onChangeText={(text) => setCurrentItem({ ...currentItem, itemMisc: text })}
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
    );
};

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: 'white',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    field: {
        marginBottom: 15,
    },
    input: {
        borderWidth: 1,
        // borderColor: '#ccc',
        padding: 10,
        borderRadius: 4,
        fontSize: 16,
    },
    inputFocused: {
        borderColor: '#007BFF',        
    },
    button: {
        backgroundColor: '#007BFF',
        padding: 15,
        borderRadius: 4,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: '#fff',
        borderRadius: 4,
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
        backgroundColor: '#00008B',
        borderRadius: 5,
        marginVertical: 5,
        width: '100%',
        alignItems: 'center',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default EditQuotation;
