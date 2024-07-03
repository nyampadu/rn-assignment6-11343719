import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView } from 'react-native';

export default function CheckoutPage({ checkoutItems, removeItemFromCheckout, navigation }) {
    const total = checkoutItems.reduce((sum, item) => sum + parseFloat(item.price.slice(1)) * item.quantity, 0);

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.header}>
                    <TouchableOpacity style={styles.headerBackButton} onPress={() => navigation.navigate('Main')}>
                        <Text style={styles.headerBackText}>← Checkout</Text>
                    </TouchableOpacity>
                </View>
                {checkoutItems.map(item => (
                    <View key={item.id} style={styles.checkoutItem}>
                        <Image source={item.image} style={styles.checkoutImage} />
                        <View style={styles.itemDetails}>
                            <Text style={styles.checkoutName}>{item.name}</Text>
                            <Text style={styles.checkoutCategory}>{item.description}</Text>
                            <Text style={styles.checkoutPrice}>{item.price}</Text>
                            <Text style={styles.checkoutQuantity}>Quantity: {item.quantity}</Text>
                        </View>
                        <TouchableOpacity style={styles.removeButton} onPress={() => removeItemFromCheckout(item.id)}>
                            <Image source={require('./remove.png')} style={styles.removeIcon} />
                        </TouchableOpacity>
                    </View>
                ))}
                <Text style={styles.total}>Est. Total ${total.toFixed(2)}</Text>
                <TouchableOpacity style={styles.checkoutButton} onPress={() => navigation.navigate('Main')}>
                    <Text style={styles.checkoutButtonText}>Checkout</Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 20,
    },
    headerBackButton: {
        marginRight: 10,
    },
    headerBackText: {
        fontSize: 18,
        color: '#000',
    },
    contentContainer: {
        paddingBottom: 20,
    },
    checkoutItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    checkoutImage: {
        width: 80,
        height: 80,
        marginRight: 20,
    },
    itemDetails: {
        flex: 1,
    },
    checkoutName: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkoutCategory: {
        fontSize: 16,
        color: '#888',
    },
    checkoutPrice: {
        fontSize: 16,
        color: '#888',
    },
    checkoutQuantity: {
        fontSize: 14,
        color: '#888',
    },
    removeButton: {
        padding: 10,
    },
    removeIcon: {
        width: 24,
        height: 24,
    },
    total: {
        fontSize: 20,
        fontWeight: 'bold',
        marginVertical: 20,
        textAlign: 'center',
    },
    checkoutButton: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    checkoutButtonText: {
        color: '#fff',
        fontSize: 18,
    },
});
