import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import {RouteProp, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import * as Print from 'expo-print';
import { shareAsync } from 'expo-sharing';
import { ToWords } from 'to-words';
import { RootStackParamList } from "../../../(tabs)/types";
import styles from '../../../../app/screens/CreateQuotation/styles/styles';
import { ERROR_MESSAGES, STRINGS } from '../constants/string';

type SelectInvoiceFormatRouteProp = RouteProp<RootStackParamList, 'SelectInvoiceFormat'>;

const SelectInvoiceFormat = () => {
    const route = useRoute<SelectInvoiceFormatRouteProp>();

    const {
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
    } = route.params; // Destructure the data from route.params
    const [currentFormat, setCurrentFormat] = useState(0);
    const toWords = new ToWords();
    const totalPrice = items.reduce((total, item) => total + Number(item.payableAmount), 0);
    const totalDiscount = items.reduce((total, item) => total + Number(item.discount), 0);
    let words = toWords.convert(totalPrice);
    const formats = [
        {
            title: 'Format 1',
            generateHtml: () => `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Invoice Format 1</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
                        }
                        .container {
                            width: 80%;
                            margin: 20px auto;
                            padding: 20px;
                            border: 1px solid #ddd;
                        }
                        .header, .footer {
                            text-align: center;
                        }
                        .header img {
                            width: 100px;
                        }
                        .details, .summary, .footer {
                            margin: 20px 0;
                        }
                        .details .left, .details .right {
                            width: 50%;
                            display: inline-block;
                            vertical-align: top;
                        }
                        .table {
                            width: 100%;
                            border-collapse: collapse;
                            margin: 20px 0;
                        }
                        .table th, .table td {
                            border: 1px solid #ddd;
                            padding: 10px;
                            text-align: left;
                        }
                        .table th {
                            background-color: #f5f5f5;
                        }
                        .summary .total {
                            text-align: right;
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <img src="logo.png" alt="Company Logo">
                            <h1>Company Name</h1>
                            <p>Company Address | Contact Details</p>
                        </div>
                        <div class="details">
                            <div class="left">
                                <h2>Customer Details</h2>
                                <p>Name: ${customerName}</p>
                                <p>Address: ${address}</p>
                                <p>Contact: ${emailId}</p>
                            </div>
                            <div class="right">
                                <h2>Invoice Details</h2>
                                <p>Invoice #: 12345</p>
                                <p>Date: ${quotationDate.toDateString()}</p>
                            </div>
                        </div>
                        <table class="table">
                            <thead>
                                <tr>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${items.map(item => `
                                    <tr>
                                        <td>${item.itemName}</td>
                                        <td>${item.quantity}</td>
                                        <td>${item.discount}</td>
                                        <td>${item.payableAmount}</td>
                                    </tr>`).join('')}
                            </tbody>
                        </table>
                        <div class="summary">
                            <p class="total">Subtotal: ${totalPrice}</p>
                            <p class="total">Total Discount: ${totalDiscount}</p>
                            <p class="total"><strong>Grand Total: ${totalPrice - totalDiscount}</strong></p>
                        </div>
                        <div class="footer">
                            <p>Additional notes or terms and conditions</p>
                        </div>
                    </div>
                </body>
                </html>
            `,
            renderPreview: () => (
                <View style={styles.previewContainer}>
                    <Text style={styles.previewTitle}>Invoice - 1</Text>
                    <View style={{
                        flexDirection: 'row', flex: 0.5,
                        //borderCollapse: 'collapse',
                        marginBottom: 5
                    }}>
                        <View style={{
                            flexDirection: 'column', flex: 1, borderBottomWidth: 1,
                            borderBottomColor: '#ddd',
                            paddingVertical: 8
                        }}>
                            <Text style={{ flex: 1 }}>Bill To</Text>
                            <Text style={{ flex: 1, fontWeight: 'bold' }}>{customerName}</Text>
                        </View>

                        <View style={{ flex: 1, alignItems: 'flex-end' }}>
                            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={{}}>Invoice No.</Text>
                                <Text style={{ fontWeight: 'bold' }}>0</Text>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'column' }}>
                                <Text style={{}}>Quotation Date</Text>
                                <Text style={{ fontWeight: 'bold' }}>{quotationDate.toDateString()}</Text>
                            </View>
                        </View>
                    </View>
                    <Text style={[styles.previewSubtitle, { color: 'blue' }]}>Items</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Item Name</Text>
                            <Text style={styles.tableHeader}>Quantity</Text>
                            <Text style={styles.tableHeader}>Price</Text>
                            <Text style={styles.tableHeader}>Discount</Text>
                            <Text style={styles.tableHeader}>Total Price</Text>
                        </View>
                        {items.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{item.itemName}</Text>
                                <Text style={styles.tableCell}>{item.quantity}</Text>
                                <Text style={styles.tableCell}>{item.price}</Text>
                                <Text style={styles.tableCell}>{item.discount}</Text>
                                <Text style={styles.tableCell}>{item.payableAmount}</Text>

                            </View>
                        ))}
                    </View>
                    <View style={[styles.summaryContainer, { borderWidth: 1, padding: 5 }]}>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[styles.summaryText, { color: 'blue' }]}>Total Price:</Text>
                            <Text style={[styles.summaryText, { alignContent: 'flex-end', flex: 1, color: 'blue' }]}>{totalPrice}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <Text style={styles.summaryText}>Total Discount:</Text>
                            <Text style={[styles.summaryText, { alignContent: 'flex-end', flex: 1 }]}>{totalDiscount}</Text>
                        </View>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: 22 }}>
                        <Text style={{ fontWeight: 'bold' }}>Terms & Conditions : </Text>
                        <Text>{STRINGS.thankYouMassage}</Text>
                    </View>
                </View>
            )
        },
        {
            title: 'Format 2',
            generateHtml: () => `
                <html>
                    <head>
                        <style>
                            body { font-family: 'Courier New', Courier, monospace; padding: 20px; background-color: #f5f5f5; }
                            h1 { color: #000; text-align: center; text-decoration: underline; }
                            .header, .footer { text-align: center; margin-bottom: 20px; }
                            .details, .items { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                            .details th, .details td, .items th, .items td { border: 1px solid #000; padding: 8px; text-align: left; }
                            .details th { background-color: #ccc; }
                            .items th { background-color: #333; color: #fff; }
                        </style>
                    </head>
                    <body>
                        <h1>Quotation Details - Format 2</h1>
                        <div class="header">
                            <p>Quotation for: ${customerName}</p>
                            <p>Date: ${quotationDate.toDateString()}</p>
                        </div>
                        <table class="details">
                            <tr><th>Customer Name</th><td>${customerName}</td></tr>
                            <tr><th>Phone Number</th><td>${phoneNumber}</td></tr>
                            <tr><th>Address</th><td>${address}</td></tr>
                            <tr><th>Email ID</th><td>${emailId}</td></tr>
                            <tr><th>GSTIN</th><td>${gstin}</td></tr>
                            <tr><th>Venue Date</th><td>${venueDate.toDateString()}</td></tr>
                            <tr><th>Venue Time</th><td>${venueTime.toTimeString().slice(0, 5)}</td></tr>
                            <tr><th>Venue Details</th><td>${venueDetails}</td></tr>
                        </table>
                        <h2 class="header">Items</h2>
                        <table class="items">
                            <tr><th>Item Name</th><th>Quantity</th><th>Price</th><th>Discount</th><th>Total Price</th><th>Misc</th></tr>
                            ${items.map(item => `
                                <tr>
                                    <td>${item.itemName}</td>
                                    <td>${item.quantity}</td>
                                    <td>${item.price}</td>
                                    <td>${item.discount}</td>
                                    <td>${item.payableAmount}</td>
                                    <td>${item.miscellaneous}</td>
                                </tr>`).join('')}
                        </table>
                        <div class="summary">
                            <p class="total">Total Price: ${totalPrice}</p>
                            <p class="total">Total Discount: ${totalDiscount}</p>
                        </div>
                        <div class="footer">
                            <p>Thank you for choosing us!</p>
                        </div>
                    </body>
                </html>
            `,
            renderPreview: () => (
                <View style={styles.previewContainer}>
                    <Text style={styles.previewTitle}>Invoice Details - 2</Text>
                    <Text style={styles.previewSubTitle}>Quotation for: {customerName}</Text>
                    <Text style={styles.previewSubTitle}>Date: {quotationDate.toDateString()}</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Phone Number</Text>
                            <Text style={styles.tableCell}>{phoneNumber}</Text>
                        </View>
                    </View>
                    <Text style={styles.previewSubtitle}>Items</Text>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={styles.tableHeader}>Item Name</Text>
                            <Text style={styles.tableHeader}>Quantity</Text>
                            <Text style={styles.tableHeader}>Price</Text>
                            <Text style={styles.tableHeader}>Discount</Text>
                            <Text style={styles.tableHeader}>Total Price</Text>

                        </View>
                        {items.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{item.itemName}</Text>
                                <Text style={styles.tableCell}>{item.quantity}</Text>
                                <Text style={styles.tableCell}>{item.price}</Text>
                                <Text style={styles.tableCell}>{item.discount}</Text>
                                <Text style={styles.tableCell}>{item.payableAmount}</Text>

                            </View>
                        ))}
                    </View>
                    <View style={styles.summaryContainer}>
                        <Text style={styles.summaryText}>Total Price: {totalPrice}</Text>
                        <Text style={styles.summaryText}>Total Discount: {totalDiscount}</Text>
                    </View>
                    <Text style={styles.footerText}>{STRINGS.thankYouMassage}</Text>
                </View>
            )

        }, {
            title: 'Format 3',
            generateHtml: () => `

             < !DOCTYPE html>
        <html lang="en">
            <head>
                <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                        <title>Invoice</title>
                        <style>
                            body {
                                font - family: Arial, sans-serif;
                        }
                            .invoice-container {
                                width: 80%;
                            margin: 0 auto;
                            border: 1px solid #ddd;
                            padding: 20px;
                            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                        }
                            .invoice-header, .invoice-footer {
                                text - align: center;
                        }
                            .invoice-header h2 {
                                margin: 0;
                            font-size: 1.5em;
                        }
                            .invoice-details {
                                margin: 20px 0;
                        }
                            .invoice-details div {
                                margin: 5px 0;
                        }
                            table {
                                width: 100%;
                            border-collapse: collapse;
                        }
                            thead, tfoot {
                                border - top: 2px dashed black;
                            border-bottom: 2px dashed black;
                        }
                            th, td {
                                padding: 10px;
                            text-align: left;
        }
                            th {
                                background - color: #f9f9f9;
        }
                            .total-row th, .total-row td {
                                font - weight: bold;
        }
                            .text-right {
                                text - align: right;
        }
                            .text-center {
                                text - align: center;
        }
                            .invoice-footer {
                                margin - top: 20px;
        }
                            .dashed-bottom {
                                border - bottom: 2px dashed black;
        }
                        </style>
                    </head>
                    <body>
                        <div class="invoice-container">
                            <div class="invoice-header">
                                <h2>Invoice - 3</h2>
                                <div>event planner</div>
                                <div>Ph.No.: 9175197214</div>
                                <div>Tax Invoice</div>
                            </div>
                            <hr style="border-top: 2px dashed black;">
                                <div class="invoice-details">
                                    <div><strong>Yog</strong></div>
                                    <div>Ph.No.: 9876543210</div>
                                    <div class="text-right">Date: 22/07/2024</div>
                                    <div class="text-right">Invoice No: 3</div>
                                </div>
                                <table>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Name</th>
                                            <th>Qty</th>
                                            <th>Price</th>
                                            <th class="text-right">Amount</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Sample Item</td>
                                            <td>1</td>
                                            <td>100.00</td>
                                            <td class="text-right">100.00</td>
                                        </tr>

                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td colspan="4" class="text-right"><strong>Total</strong></td>
                                            <td class="text-right"><strong>100.00</strong></td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" class="text-right"><strong>Discount</strong></td>
                                            <td class="text-right"><strong>0.00</strong></td>
                                        </tr>
                                        <tr>
                                            <td colspan="4" class="text-right"><strong>Balance</strong></td>
                                            <td class="text-right"><strong>100.00</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                                <div class="invoice-footer">
                                    <div><strong>Terms & Conditions</strong></div>
                                    <div>Thank you for doing business with us.</div>
                                </div>
                        </div>
                    </body>
                </html>
            `,

            renderPreview: () => (


                <View style={styles.previewContainer}>
                    {/* <Image source={require('./invoice_logo.png')} style={styles.logo} /> */}
                    <Text style={styles.header}>Invoice - 3</Text>

                    {/* Invoice details section */}
                    <View style={{ flexDirection: 'row', }}>
                        <View style={{ flexDirection: 'column', alignContent: 'flex-end', flex: 1 }}>
                            <Text style={{ fontWeight: 'bold' }}>Yog</Text>
                            <Text>9876543210</Text>
                        </View>
                        <View style={[styles.invoiceDetails, { flexDirection: 'column', alignContent: 'flex-end' }]}>
                            <Text style={styles.invoiceNumber}>Invoice No.: 1</Text>
                            <Text style={styles.invoiceDate}>Date: {quotationDate.toDateString()}</Text>
                        </View>
                    </View>




                    {/* Items section */}
                    <View style={[styles.items, { borderTopWidth: 1, borderBottomWidth: 1, borderStyle: 'dashed' }]}>
                        <View style={[styles.tableRow, { borderBottomWidth: 1, borderStyle: 'dashed' }]}>
                            <Text style={styles.tableHeader}>Item Name</Text>
                            <Text style={styles.tableHeader}>Quantity</Text>
                            <Text style={styles.tableHeader}>Price</Text>
                            <Text style={styles.tableHeader}>Discount</Text>
                            <Text style={styles.tableHeader}>Total Price</Text>

                        </View>
                        {items.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{item.itemName}</Text>
                                <Text style={styles.tableCell}>{item.quantity}</Text>
                                <Text style={styles.tableCell}>{item.price}</Text>
                                <Text style={styles.tableCell}>{item.discount}</Text>
                                <Text style={styles.tableCell}>{item.payableAmount}</Text>

                            </View>
                        ))}
                    </View>

                    {/* Totals section */}
                    <View style={styles.totals}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.subtotal}>Total Discount:</Text>
                            <Text style={[styles.subtotal, { textAlign: 'right' }]}>₹{totalDiscount}</Text>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <Text style={styles.total}>Total:</Text>
                            <Text style={[styles.total, { textAlign: 'right' }]}>₹{totalPrice}</Text>
                        </View>

                    </View>
                    <View style={{
                        marginTop: 15
                    }}>
                        <Text style={{ fontWeight: 'bold' }}>Terms and Conditions</Text>
                        <Text style={{}}>{STRINGS.thankYouMassage}</Text>
                    </View>
                </View>
            )
        },
        {
            title: 'Format 4',
            generateHtml: () => `
                <!DOCTYPE html>
                <html>
                    <head>
                        <title>Select Invoice Format</title>
                        <style>
                            body {
                                font - family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
}

                            .container {
                                width: 100%;
                            padding: 20px;
                            background-color: #fff;
}

                            .invoice {
                                border: 1px solid #ddd;
                            padding: 20px;
}

                            .invoice-header {
                                display: flex;
                            justify-content: space-between;
                            margin-bottom: 20px;
}

                            .invoice-items {
                                border - collapse: collapse;
                            width: 100%;
                            margin-bottom: 20px;
                            color:'white';
                            backgroundColor:'black';
}

                            .invoice-items th, .invoice-items td {
                                border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
}

                            .invoice-items th {
                                background - color: #f2f2f2;
}

                            .invoice-footer {
                                display: flex;
                            justify-content: space-between;
                            align-items: center;
}

                            .invoice-footer-left {
                                font - weight: bold;
}

                            .invoice-footer-right {
                                display: flex;
                            flex-direction: column;
}

                            .total {
                                font - weight: bold;
}

                            .discount {
                                color: purple;
}
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Select Invoice Format</h1>
                            <div class="invoice">
                                <h2>Invoice - 4</h2>
                                <div class="invoice-header">
                                    <div>
                                        Bill To<br>
                                            John Doe
                                    </div>
                                    <div>
                                        Invoice No. 1<br>
                                            Quotation Date<br>
                                                Tue Jul 30 2024
                                            </div>
                                    </div>
                                    <h3>Items</h3>
                                    <table class="invoice-items">
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Discount</th>
                                            <th>Total Price</th>
                                        </tr>
                                        <tr>
                                            <td>Item 1</td>
                                            <td>1</td>
                                            <td>100</td>
                                            <td>10</td>
                                            <td>90</td>
                                        </tr>
                                        <tr>
                                            <td>Item 2</td>
                                            <td>2</td>
                                            <td>200</td>
                                            <td>20</td>
                                            <td>180</td>
                                        </tr>
                                    </table>
                                    <div class="invoice-footer">
                                        <div class="invoice-footer-left">
                                            Invoice Amount in Words<br>
                                                Two Hundred Seventy
                                        </div>
                                        <div class="invoice-footer-right">
                                            <div>Total:</div>
                                            <div class="total">270</div>
                                            <div>Total Discount:</div>
                                            <div class="discount total">30</div>
                                            <div class="total">Total:</div>
                                            <div class="total">270</div>
                                        </div>
                                    </div>
                                    <p>Thank you for choosing us!</p>
                                </div>
                                <button>Share Invoice</button>
                            </div>
                    </body>
                </html>

                `,
            renderPreview: () => (
                <View style={styles.previewContainer}>
                    <Text style={styles.previewTitle}>Invoice - 4</Text>
                    <View style={{
                        flexDirection: 'row',
                        flex: 0.4,
                        // marginBottom: 2,
                        borderBottomWidth: 1,
                        borderBottomColor: '#ddd',
                        paddingVertical: 4
                    }}>
                        <View style={{
                            flex: 0.8,
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <Text style={{}}>Bill To</Text>
                            <Text style={{ fontWeight: 'bold' }}>{customerName}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text>Invoice No.</Text>
                                <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>1</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Text>Quotation Date</Text>
                                <Text style={{ fontWeight: 'bold' }}>{quotationDate.toDateString()}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.previewSubtitle}>Items</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, { backgroundColor: 'purple' }]}>
                            <Text style={styles.tableHeader}>Item Name</Text>
                            <Text style={styles.tableHeader}>Quantity</Text>
                            <Text style={styles.tableHeader}>Price</Text>
                            <Text style={styles.tableHeader}>Discount</Text>
                            <Text style={styles.tableHeader}>Total Price</Text>

                        </View>
                        {items.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{item.itemName}</Text>
                                <Text style={styles.tableCell}>{item.quantity}</Text>
                                <Text style={styles.tableCell}>{item.price}</Text>
                                <Text style={styles.tableCell}>{item.discount}</Text>
                                <Text style={styles.tableCell}>{item.payableAmount}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={{ flex: 1, }}>
                            <Text>Invoice Amount in Words</Text>
                            <Text style={{ fontWeight: 'bold' }}>{words}</Text>
                            <Text style={{ marginTop: 11 }}>{STRINGS.thankYouMassage}</Text>
                        </View>
                        <View style={{ flex: 0.8, borderWidth: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                <Text style={styles.subtotal}>Total :</Text>
                                <Text style={[styles.subtotal, { textAlign: 'right' }]}>₹{totalDiscount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                <Text style={styles.subtotal}>Total Discount :</Text>
                                <Text style={[styles.subtotal, { textAlign: 'right', alignContent: 'center' }]}>₹{totalDiscount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'purple', borderTopWidth: 2 }}>
                                <Text style={styles.total}>Total:</Text>
                                <Text style={[styles.total, { textAlign: 'right' }]}>₹{totalPrice}</Text>
                            </View>
                        </View>
                    </View>

                </View>

            )
        },
        {
            title: 'Format 5',
            generateHtml: () => `
            <!DOCTYPE html>
                <html>
                    <head>
                        <title>Select Invoice Format</title>
                        <style>
                            body {
                                font - family: Arial, sans-serif;
                            margin: 0;
                            padding: 0;
}

                            .container {
                                width: 100%;
                            padding: 20px;
                            background-color: #fff;
}

                            .invoice {
                                border: 1px solid #ddd;
                            padding: 20px;
}

                            .invoice-header {
                                display: flex;
                            justify-content: space-between;
                            margin-bottom: 20px;
}

                            .invoice-items {
                                border - collapse: collapse;
                            width: 100%;
                            margin-bottom: 20px;
                            color:'white';
                            backgroundColor:'black';
}

                            .invoice-items th, .invoice-items td {
                                border: 1px solid #ddd;
                            padding: 8px;
                            text-align: left;
}

                            .invoice-items th {
                                background - color: #f2f2f2;
}

                            .invoice-footer {
                                display: flex;
                            justify-content: space-between;
                            align-items: center;
}

                            .invoice-footer-left {
                                font - weight: bold;
}

                            .invoice-footer-right {
                                display: flex;
                            flex-direction: column;
}

                            .total {
                                font - weight: bold;
}

                            .discount {
                                color: purple;
}
                        </style>
                    </head>
                    <body>
                        <div class="container">
                            <h1>Select Invoice Format</h1>
                            <div class="invoice">
                                <h2>Invoice - 4</h2>
                                <div class="invoice-header">
                                    <div>
                                        Bill To<br>
                                            John Doe
                                    </div>
                                    <div>
                                        Invoice No. 1<br>
                                            Quotation Date<br>
                                                Tue Jul 30 2024
                                            </div>
                                    </div>
                                    <h3>Items</h3>
                                    <table class="invoice-items">
                                        <tr>
                                            <th>Item Name</th>
                                            <th>Quantity</th>
                                            <th>Price</th>
                                            <th>Discount</th>
                                            <th>Total Price</th>
                                        </tr>
                                        <tr>
                                            <td>Item 1</td>
                                            <td>1</td>
                                            <td>100</td>
                                            <td>10</td>
                                            <td>90</td>
                                        </tr>
                                        <tr>
                                            <td>Item 2</td>
                                            <td>2</td>
                                            <td>200</td>
                                            <td>20</td>
                                            <td>180</td>
                                        </tr>
                                    </table>
                                    <div class="invoice-footer">
                                        <div class="invoice-footer-left">
                                            Invoice Amount in Words<br>
                                                Two Hundred Seventy
                                        </div>
                                        <div class="invoice-footer-right">
                                            <div>Total:</div>
                                            <div class="total">270</div>
                                            <div>Total Discount:</div>
                                            <div class="discount total">30</div>
                                            <div class="total">Total:</div>
                                            <div class="total">270</div>
                                        </div>
                                    </div>
                                    <p>Thank you for choosing us!</p>
                                </div>
                                <button>Share Invoice</button>
                            </div>
                    </body>
                </html>

                `,
            renderPreview: () => (
                <View style={styles.previewContainer}>

                    <View style={{ flexDirection: 'row', marginBottom: 10 }}>
                        <Text style={{ backgroundColor: 'skyblue', flex: 0.5, fontSize: 20, fontWeight: 'bold' }}>Invoice - 5</Text>
                    </View>
                    <Text>Event Planner</Text>
                    <Text>Phone</Text>
                    <Text>{phoneNumber}</Text>
                    <View style={{
                        flexDirection: 'row',
                        flex: 0.4,
                        // marginBottom: 2,
                        borderTopWidth: 1,
                        // borderBottomColor: 'black',
                        paddingVertical: 4
                    }}>
                        <View style={{
                            flex: 0.8,
                            flexDirection: 'column',
                            justifyContent: 'center'
                        }}>
                            <Text style={{}}>Bill To</Text>
                            <Text style={{ fontWeight: 'bold' }}>{customerName}</Text>
                        </View>

                        <View style={{
                            flex: 1,
                            justifyContent: 'center',
                            alignItems: 'flex-start'
                        }}>
                            <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
                                <Text>Invoice No.</Text>
                                <Text style={{ fontWeight: 'bold', marginLeft: 5 }}>1</Text>
                            </View>
                            <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Text>Quotation Date</Text>
                                <Text style={{ fontWeight: 'bold' }}>{quotationDate.toDateString()}</Text>
                            </View>
                        </View>
                    </View>

                    <Text style={styles.previewSubtitle}>Items</Text>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, { backgroundColor: 'skyblue' }]}>
                            <Text style={styles.tableHeader}>Item Name</Text>
                            <Text style={styles.tableHeader}>Quantity</Text>
                            <Text style={styles.tableHeader}>Price</Text>
                            <Text style={styles.tableHeader}>Discount</Text>
                            <Text style={styles.tableHeader}>Total Price</Text>
                        </View>
                        {items.map((item, index) => (
                            <View key={index} style={styles.tableRow}>
                                <Text style={styles.tableCell}>{item.itemName}</Text>
                                <Text style={styles.tableCell}>{item.quantity}</Text>
                                <Text style={styles.tableCell}>{item.price}</Text>
                                <Text style={styles.tableCell}>{item.discount}</Text>
                                <Text style={styles.tableCell}>{item.payableAmount}</Text>
                            </View>
                        ))}
                    </View>
                    <View style={[{ flexDirection: 'row' }]}>
                        <View style={{ flex: 1, }}>
                            <Text>Invoice Amount in Words</Text>
                            <Text style={{ fontWeight: 'bold' }}>{words}</Text>
                            <Text style={{ marginTop: 11 }}>{STRINGS.thankYouMassage}</Text>
                        </View>
                        <View style={{ flex: 0.8, borderWidth: 1 }}>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                <Text style={styles.subtotal}>Total :</Text>
                                <Text style={[styles.subtotal, { textAlign: 'right' }]}>₹{totalDiscount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', }}>
                                <Text style={styles.subtotal}>Total Discount :</Text>
                                <Text style={[styles.subtotal, { textAlign: 'right', alignContent: 'center' }]}>₹{totalDiscount}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: 'skyblue', borderTopWidth: 2 }}>
                                <Text style={styles.total}>Total:</Text>
                                <Text style={[styles.total, { textAlign: 'right' }]}>₹{totalPrice}</Text>
                            </View>
                        </View>
                    </View>

                </View>

            )
        }
    ];

    const handleShare = async () => {
        try {
            const htmlContent = formats[currentFormat].generateHtml();
            const { uri } = await Print.printToFileAsync({ html: htmlContent });
            await shareAsync(uri);
        } catch (error) {
            Alert.alert(ERROR_MESSAGES.shareError);
        }
    };

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Text style={styles.headerText}>Select Invoice Format</Text>
            <Swiper
                style={styles.swiper}
                loop={false}
                showsPagination={true}
                onIndexChanged={index => setCurrentFormat(index)}
            >
                {formats.map((format, index) => (
                    <View key={index} style={styles.slide}>
                        {format.renderPreview()}
                    </View>
                ))}
            </Swiper>
            <TouchableOpacity style={styles.shareButton} onPress={handleShare}>
                <Text style={styles.shareButtonText}>Share Invoice</Text>
            </TouchableOpacity>
        </ScrollView>
    );
};

export default SelectInvoiceFormat;
