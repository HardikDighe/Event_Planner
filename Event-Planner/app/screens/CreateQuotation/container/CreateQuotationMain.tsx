import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CreateQuotation from '../../../../app/screens/CreateQuotation/components/CreateQuotation';
import AddItem from '../../../../app/screens/AddItem/components/AddItem';
import EditQuotation from '../../../../app/screens/CreateQuotation/components/EditQuotation';
import SelectInvoiceFormat from '../../../../app/screens/CreateQuotation/components/SelectInvoiceFromat';

const Stack = createStackNavigator();

const CreateQuotationMain = () => {
    return (
        <NavigationContainer independent={true}>
            <Stack.Navigator initialRouteName="CreateQuotation">
                <Stack.Screen name="CreateQuotation" component={CreateQuotation} options={{headerShown:false}}/>
                <Stack.Screen name="AddItem" component={AddItem} />
               
                <Stack.Screen name="EditQuotation" component={EditQuotation} />
                <Stack.Screen name="SelectInvoiceFormat" component={SelectInvoiceFormat} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default CreateQuotationMain;
