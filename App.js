import 'react-native-gesture-handler';
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View, Modal, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MainPage from './MainPage';
import CheckoutPage from './CheckoutPage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
    const [checkoutItems, setCheckoutItems] = useState([]);
    const [showPopup, setShowPopup] = useState(true);
    const [modalVisible, setModalVisible] = useState(false);
    const [currentItem, setCurrentItem] = useState(null);

    const addItemToCheckout = (item, navigation) => {
        const itemExists = checkoutItems.find(checkoutItem => checkoutItem.id === item.id);
        if (itemExists && showPopup) {
            setCurrentItem(item);
            setModalVisible(true);
            return;
        }
        const updatedCheckoutItems = itemExists
            ? checkoutItems.map(checkoutItem =>
                checkoutItem.id === item.id ? { ...checkoutItem, quantity: checkoutItem.quantity + 1 } : checkoutItem
            )
            : [...checkoutItems, { ...item, quantity: 1 }];
        setCheckoutItems(updatedCheckoutItems);
    };

    const confirmAddItemToCheckout = () => {
        const updatedCheckoutItems = checkoutItems.map(checkoutItem =>
            checkoutItem.id === currentItem.id ? { ...checkoutItem, quantity: checkoutItem.quantity + 1 } : checkoutItem
        );
        setCheckoutItems(updatedCheckoutItems);
        setModalVisible(false);
    };

    const removeItemFromCheckout = (itemId) => {
        const updatedCheckoutItems = checkoutItems.map(item =>
            item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        ).filter(item => item.quantity > 0);
        setCheckoutItems(updatedCheckoutItems);
    };

    function MainStack() {
        return (
            <Stack.Navigator initialRouteName="Main">
                <Stack.Screen
                    name="Main"
                    options={{ headerShown: false }}
                >
                    {props => <MainPage {...props} addItemToCheckout={addItemToCheckout} checkoutItems={checkoutItems} />}
                </Stack.Screen>
                <Stack.Screen
                    name="Checkout"
                    options={({ navigation }) => ({
                        headerLeft: () => (
                            <TouchableOpacity style={styles.headerBackButton} onPress={() => navigation.navigate('Main')}>
                                <Text style={styles.headerBackText}>← Checkout</Text>
                            </TouchableOpacity>
                        ),
                        headerTitle: '',
                        headerRight: null,
                    })}
                >
                    {props => (
                        <CheckoutPage
                            {...props}
                            checkoutItems={checkoutItems}
                            removeItemFromCheckout={removeItemFromCheckout}
                        />
                    )}
                </Stack.Screen>
            </Stack.Navigator>
        );
    }

    return (
        <NavigationContainer>
            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
                <Drawer.Screen name="Home" component={MainStack} options={{ headerShown: false }} />
                <Drawer.Screen name="Checkout" options={{ headerShown: false }}>
                    {props => (
                        <CheckoutPage
                            {...props}
                            checkoutItems={checkoutItems}
                            removeItemFromCheckout={removeItemFromCheckout}
                        />
                    )}
                </Drawer.Screen>
            </Drawer.Navigator>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>This item is already in the cart. Do you want to add more?</Text>
                    <View style={styles.modalButtonContainer}>
                        <TouchableOpacity style={styles.modalButton} onPress={confirmAddItemToCheckout}>
                            <Text style={styles.modalButtonText}>Add</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalLink} onPress={() => setShowPopup(false)}>
                            <Text style={styles.modalLinkText}>Don't show this again</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalLink} onPress={() => setModalVisible(false)}>
                            <Text style={styles.modalLinkText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </NavigationContainer>
    );
}

function CustomDrawerContent({ navigation }) {
    return (
        <View style={styles.drawerContent}>
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Text style={styles.drawerItem}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
                <Text style={styles.drawerItem}>Checkout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    headerBackButton: {
        marginLeft: 15,
        marginTop: 10,
    },
    headerBackText: {
        fontSize: 18,
        color: '#000',
    },
    drawerContent: {
        flex: 1,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: 20,
        paddingTop: 50,
    },
    drawerItem: {
        fontSize: 18,
        marginBottom: 20,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
    },
    modalButtonContainer: {
        flexDirection: 'column',
        alignItems: 'center',
    },
    modalButton: {
        backgroundColor: '#2196F3',
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalLink: {
        marginVertical: 5,
    },
    modalLinkText: {
        color: 'blue',
        textAlign: 'center',
    },
});
