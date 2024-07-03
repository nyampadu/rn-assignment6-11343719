import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity } from 'react-native';

export default function MainPage({ navigation, addItemToCheckout, checkoutItems }) {
    const products = [
        { id: 1, name: 'Office Wear', description: 'reversible angora cardigan', price: '$120', image: require('./dress1.png') },
        { id: 2, name: 'Black', description: 'reversible angora cardigan', price: '$120', image: require('./dress2.png') },
        { id: 3, name: 'Church Wear', description: 'reversible angora cardigan', price: '$120', image: require('./dress3.png') },
        { id: 4, name: 'Lamerei', description: 'reversible angora cardigan', price: '$120', image: require('./dress4.png') },
        { id: 5, name: '21WN', description: 'reversible angora cardigan', price: '$120', image: require('./dress5.png') },
        { id: 6, name: 'Lopo', description: 'reversible angora cardigan', price: '$120', image: require('./dress6.png') },
        { id: 7, name: '21WN', description: 'reversible angora cardigan', price: '$120', image: require('./dress7.png') },
    ];

    const getQuantity = (productId) => {
        const item = checkoutItems.find(item => item.id === productId);
        return item ? ` (${item.quantity})` : '';
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    <Image source={require('./Logo.png')} style={styles.logo} />
                    <View style={styles.headerIcons}>
                        <Image source={require('./Search.png')} style={styles.icon} />
                        <TouchableOpacity onPress={() => navigation.navigate('Checkout')}>
                            <Image source={require('./shoppingBag.png')} style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>OUR STORY</Text>
                    <View style={styles.iconRow}>
                        <Image source={require('./Listview.png')} style={styles.icon} />
                        <Image source={require('./Filter.png')} style={styles.icon} />
                    </View>
                </View>
                <View style={styles.productsContainer}>
                    {products.map(product => (
                        <View key={product.id} style={styles.product}>
                            <Image source={product.image} style={styles.productImage} />
                            <Text style={styles.productName}>{product.name}</Text>
                            <Text style={styles.productDescription}>{product.description}</Text>
                            <Text style={styles.productPrice}>{product.price}{getQuantity(product.id)}</Text>
                            <TouchableOpacity style={styles.plusIconContainer} onPress={() => addItemToCheckout(product, navigation)}>
                                <Image source={require('./add_circle.png')} style={styles.plusIcon} />
                            </TouchableOpacity>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingTop: 40,
        paddingBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
    },
    logo: {
        width: 100,
        height: 40,
        resizeMode: 'contain',
    },
    headerIcons: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginLeft: 16,
    },
    contentContainer: {
        paddingTop: 110,
        paddingHorizontal: 20,
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    iconRow: {
        flexDirection: 'row',
    },
    productsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    product: {
        width: '48%',
        marginBottom: 20,
        alignItems: 'center',
        position: 'relative',
    },
    productImage: {
        width: '100%',
        height: undefined,
        aspectRatio: 2 / 3,
        marginBottom: 10,
    },
    productName: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    productDescription: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
    },
    productPrice: {
        fontSize: 16,
        color: '#888',
        textAlign: 'center',
    },
    plusIconContainer: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: '#fff',
        borderRadius: 50,
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ccc',
    },
    plusIcon: {
        width: 24,
        height: 24,
    },
});
