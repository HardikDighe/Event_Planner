import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { NavigationProp, RouteProp, useRoute } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { styles } from "../../../../app/screens/AddItem/styles/styles";
import { STRINGS } from "../../../../app/screens/AddItem/constants/string"; // Import the strings

interface Props {
  navigation: NavigationProp<any>;
}

const AddItem: React.FC<Props> = ({ navigation }) => {
  const route =
    useRoute<RouteProp<{ params: { fromScreen?: string } }, "params">>();

  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [payableAmount, setPayableAmount] = useState("");
  const [miscellaneous, setMiscellaneous] = useState("");
  const [paidAmount, setPaidAmount] = useState("");
  const [balance, setBalance] = useState("");

  const [itemNameFocused, setItemNameFocused] = useState(false);
  const [quantityFocused, setQuantityFocused] = useState(false);
  const [priceFocused, setPriceFocused] = useState(false);
  const [miscellaneousFocused, setMiscellaneousFocused] = useState(false);
  const [paidAmountFocused, setPaidAmountFocused] = useState(false);

  useEffect(() => {
    if (!isNaN(parseFloat(quantity)) && !isNaN(parseFloat(price))) {
      const calculatedTotalAmount = parseFloat(quantity) * parseFloat(price);
      setTotalAmount(calculatedTotalAmount.toString());
    } else {
      setTotalAmount("");
    }
  }, [quantity, price]);

  useEffect(() => {
    const parsedTotalAmount = parseFloat(totalAmount) || 0;
    const parsedDiscountPercentage = parseFloat(discount) || 0;
    const parsedMiscellaneous = parseFloat(miscellaneous) || 0;

    const discountAmount = (parsedDiscountPercentage / 100) * parsedTotalAmount;
    let calculatedPayableAmount =
      parsedTotalAmount - discountAmount + parsedMiscellaneous;
    calculatedPayableAmount = Math.max(calculatedPayableAmount, 0);

    setPayableAmount(calculatedPayableAmount.toString());
  }, [totalAmount, discount, miscellaneous]);

  useEffect(() => {
    const parsedPayableAmount = parseFloat(payableAmount) || 0;
    const parsedPaidAmount = parseFloat(paidAmount) || 0;

    const calculatedBalance = parsedPayableAmount - parsedPaidAmount;
    setBalance(calculatedBalance.toString());
  }, [payableAmount, paidAmount]);

  const handleQuantityChange = (value: string) => setQuantity(value);
  const handlePriceChange = (value: string) => setPrice(value);
  const handleDiscountChange = (value: string) => setDiscount(value);
  const handleMiscellaneousChange = (value: string) => setMiscellaneous(value);
  const handlePaidAmountChange = (value: string) => setPaidAmount(value);

  const handleSaveItem = () => {
    const newItem = {
      itemName,
      quantity,
      price,
      discount,
      payableAmount,
      paidAmount,
      balance,
      miscellaneous,
    };
    const fromScreen = route.params?.fromScreen;
    if (fromScreen === "CreateInvoice") {
      navigation.navigate("CreateInvoice", { newItem });
    } else if (fromScreen === "CreateQuotation") {
      navigation.navigate("CreateQuotation", { newItem });
    } else if (fromScreen === "VendorRegistration") {
      navigation.navigate("VendorRegistration", { newItem });
    } else {
      navigation.goBack();
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label={STRINGS.labels.name}
        value={itemName}
        onChangeText={setItemName}
        style={[
          styles.input,
          itemNameFocused && styles.focusedInput,
          { color: itemNameFocused ? "black" : "rgba(0, 0, 0, 0.54)" },
        ]}
        onFocus={() => setItemNameFocused(true)}
        onBlur={() => setItemNameFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />
      <TextInput
        label={STRINGS.labels.quantity}
        value={quantity}
        onChangeText={handleQuantityChange}
        style={[styles.input, quantityFocused && styles.focusedInput]}
        onFocus={() => setQuantityFocused(true)}
        onBlur={() => setQuantityFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />
      <TextInput
        label={STRINGS.labels.price}
        value={price}
        onChangeText={handlePriceChange}
        style={[styles.input, priceFocused && styles.focusedInput]}
        onFocus={() => setPriceFocused(true)}
        onBlur={() => setPriceFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />

      <View style={styles.combinedFieldsContainer}>
        <View style={styles.row}>
          <Text style={styles.rowLabel}>{STRINGS.labels.totalAmount}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>
              {STRINGS.placeholders.currencySymbol}
            </Text>
            <TextInput
              value={totalAmount}
              style={styles.noUnderlineInput}
              underlineColor="transparent"
              theme={{
                colors: {
                  text: "black",
                  primary: "black",
                  background: "white",
                },
              }}
              editable={false}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>{STRINGS.labels.discount}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>
              {STRINGS.placeholders.currencySymbol}
            </Text>
            <TextInput
              value={discount}
              onChangeText={handleDiscountChange}
              style={styles.noUnderlineInput}
              underlineColor="transparent"
              theme={{
                colors: {
                  text: "black",
                  primary: "black",
                  background: "white",
                },
              }}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>{STRINGS.labels.payableAmount}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>
              {STRINGS.placeholders.currencySymbol}
            </Text>
            <TextInput
              value={payableAmount === "0" ? "" : payableAmount}
              style={[
                styles.noUnderlineInput,
                parseFloat(payableAmount) > 0 && styles.payableAmountBorder,
              ]}
              underlineColor="transparent"
              theme={{
                colors: {
                  text: "black",
                  primary: "black",
                  background: "white",
                },
              }}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>{STRINGS.labels.paidAmount}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>
              {STRINGS.placeholders.currencySymbol}
            </Text>
            <TextInput
              value={paidAmount}
              onChangeText={handlePaidAmountChange}
              style={[
                styles.noUnderlineInput,
                paidAmountFocused && styles.focusedInput,
              ]}
              underlineColor="transparent"
              onFocus={() => setPaidAmountFocused(true)}
              onBlur={() => setPaidAmountFocused(false)}
              theme={{
                colors: {
                  text: "black",
                  primary: "black",
                  background: "white",
                },
              }}
            />
          </View>
        </View>

        <View style={styles.row}>
          <Text style={styles.rowLabel}>{STRINGS.labels.balance}</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>
              {STRINGS.placeholders.currencySymbol}
            </Text>
            <TextInput
              value={balance === "0" ? "" : balance}
              style={styles.noUnderlineInput}
              underlineColor="transparent"
              theme={{
                colors: {
                  text: "black",
                  primary: "black",
                  background: "white",
                },
              }}
              editable={false}
            />
          </View>
        </View>
      </View>

      <TextInput
        label={STRINGS.labels.miscellaneous}
        value={miscellaneous}
        onChangeText={handleMiscellaneousChange}
        style={[styles.input, miscellaneousFocused && styles.focusedInput]}
        onFocus={() => setMiscellaneousFocused(true)}
        onBlur={() => setMiscellaneousFocused(false)}
        mode="outlined"
        theme={{
          colors: { text: "black", primary: "black", background: "white" },
        }}
      />

      <TouchableOpacity style={styles.button} onPress={handleSaveItem}>
        <Text style={styles.buttonText}>Add Item</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddItem;
