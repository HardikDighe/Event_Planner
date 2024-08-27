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

  const [itemNameError, setItemNameError] = useState("");
  const [quantityError, setQuantityError] = useState("");
  const [priceError, setPriceError] = useState("");
  const [paidAmountFocused, setPaidAmountFocused] = useState(false);
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
    let isValid = true;

    if (!itemName.trim()) {
      setItemNameError(STRINGS.errors.itemNameError);
      isValid = false;
    } else {
      setItemNameError("");
    }

    if (!quantity || isNaN(Number(quantity)) || Number(quantity) <= 0) {
      setQuantityError(STRINGS.errors.quantityError);
      isValid = false;
    } else {
      setQuantityError("");
    }

    if (!price || isNaN(Number(price)) || Number(price) <= 0) {
      setPriceError(STRINGS.errors.priceError);
      isValid = false;
    } else {
      setPriceError("");
    }

    if (!isValid) {
      return;
    }

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
        style={styles.input}
        onFocus={() => setItemNameError("")}
        mode="outlined"
        theme={{
          colors: {
            text: itemNameError ? "red" : "black",
            primary: itemNameError ? "red" : "black",
            background: "white",
          },
        }}
      />
      {itemNameError ? (
        <Text style={{ color: "red", marginTop: 5 }}>{itemNameError}</Text>
      ) : null}

      <TextInput
        label={STRINGS.labels.quantity}
        value={quantity}
        onChangeText={handleQuantityChange}
        style={styles.input}
        onFocus={() => setQuantityError("")}
        mode="outlined"
        keyboardType="numeric"
        theme={{
          colors: {
            text: quantityError ? "red" : "black",
            primary: quantityError ? "red" : "black",
            background: "white",
          },
        }}
      />
      {quantityError ? (
        <Text style={{ color: "red", marginTop: 5 }}>{quantityError}</Text>
      ) : null}

      <TextInput
        label={STRINGS.labels.price}
        value={price}
        onChangeText={handlePriceChange}
        style={styles.input}
        onFocus={() => setPriceError("")}
        mode="outlined"
        keyboardType="numeric"
        theme={{
          colors: {
            text: priceError ? "red" : "black",
            primary: priceError ? "red" : "black",
            background: "white",
          },
        }}
      />
      {priceError ? (
        <Text style={{ color: "red", marginTop: 5 }}>{priceError}</Text>
      ) : null}

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
              editable={false}
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
              onFocus={() => setPaidAmountFocused(true)}
              onBlur={() => setPaidAmountFocused(false)}
              style={styles.noUnderlineInput}
              underlineColor="transparent"
              theme={{
                colors: {
                  text: paidAmountFocused ? "black" : "gray",
                  primary: paidAmountFocused ? "black" : "gray",
                  background: "white",
                },
              }}
              keyboardType="numeric"
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
            />
          </View>
        </View>
      </View>

      <TextInput
        label={STRINGS.labels.miscellaneous}
        value={miscellaneous}
        onChangeText={handleMiscellaneousChange}
        style={styles.input}
        onFocus={() => setMiscellaneousFocused(true)}
        onBlur={() => setMiscellaneousFocused(false)}
        mode="outlined"
        keyboardType="numeric"
        theme={{
          colors: {
            text: miscellaneousFocused ? "black" : "gray",
            primary: miscellaneousFocused ? "black" : "gray",
            background: "white",
          },
        }}
      />

      <TouchableOpacity
        style={[styles.button, styles.button]}
        onPress={handleSaveItem}
      >
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AddItem;
