import React, { useState, useEffect } from "react";
import { View, TouchableOpacity, Text, ScrollView } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { TextInput } from "react-native-paper";
import { styles } from "../../../../app/screens/AddItem/styles/styles";  // Import styles from the new file

interface Props {
  navigation: NavigationProp<any>;
}

const AddItem: React.FC<Props> = ({ navigation }) => {
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [totalAmount, setTotalAmount] = useState("");
  const [discount, setDiscount] = useState("");
  const [payableAmount, setPayableAmount] = useState("");
  const [miscellaneous, setMiscellaneous] = useState("");

  const [itemNameFocused, setItemNameFocused] = useState(false);
  const [quantityFocused, setQuantityFocused] = useState(false);
  const [priceFocused, setPriceFocused] = useState(false);
  const [miscellaneousFocused, setMiscellaneousFocused] = useState(false);

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
    const parsedDiscount = parseFloat(discount) || 0;
    const parsedMiscellaneous = parseFloat(miscellaneous) || 0;

    let calculatedPayableAmount =
      parsedTotalAmount - parsedDiscount + parsedMiscellaneous;

    calculatedPayableAmount = Math.max(calculatedPayableAmount, 0);

    setPayableAmount(calculatedPayableAmount.toString());
  }, [totalAmount, discount, miscellaneous]);

  const handleQuantityChange = (value: string) => {
    setQuantity(value);
  };

  const handlePriceChange = (value: string) => {
    setPrice(value);
  };

  const handleDiscountChange = (value: string) => {
    setDiscount(value);
  };

  const handleMiscellaneousChange = (value: string) => {
    setMiscellaneous(value);
  };

  const handleSaveItem = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <TextInput
        label="Name"
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
        label="Quantity"
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
        label="Price"
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
          <Text style={styles.rowLabel}>Total Amount</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
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
          <Text style={styles.rowLabel}>Discount</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
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
          <Text style={styles.rowLabel}>Payable Amount</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>₹</Text>
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
      </View>

      <TextInput
        label="Miscellaneous"
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
