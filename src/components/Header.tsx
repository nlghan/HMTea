import React, { useState } from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleContactPress = () => {
        Linking.openURL('https://www.facebook.com/people/HMTea/61558009175942/?mibextid=qi2Omg&rdid=L7vgP2gyIRVzx3eK');
    };

    const handleAvatarPress = () => {        
        navigation.navigate('Info');
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
                {isMenuOpen ? (
                    <Icon name="close" size={40} color="#2C683F" />
                ) : (
                    <Icon name="coffee" size={40} color="#2C683F" />
                )}
            </TouchableOpacity>
            <View>
                <Text style={styles.text}>HMTea</Text>
            </View>
            <TouchableOpacity onPress={handleAvatarPress}>
                <Image style={styles.avt} source={require('../assets/app_images/avt_1.png')} />
            </TouchableOpacity>

            {/* Menu items */}
            {isMenuOpen && (
                <View style={styles.categoriesContainer}>
                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="security" size={24} color="#2C683F" />
                        <Text style={styles.menuText}>Privacy Policy</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="assignment" size={24} color="#2C683F" />
                        <Text style={styles.menuText}>Terms & Conditions</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="language" size={24} color="#2C683F" />
                        <Text style={styles.menuText}>Language: English</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={handleContactPress}>
                        <Icon name="support" size={24} color="#2C683F" />
                        <Text style={styles.menuText}>Contact</Text>
                    </TouchableOpacity>
                    <View style={styles.footerMenu}>
                        <Text style={styles.menuTextFooter}>Version: 0.0.1</Text>
                        <Text style={styles.menuTextFooter}>Built by: GiaHan - DiemMy</Text>
                    </View>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 55,
        paddingHorizontal: 15,
        backgroundColor: 'white',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
    },
    text: {
        color: '#2C683F',
        fontSize: 40,
        fontFamily: 'Lobster-Regular',
        alignItems: 'center'
    },
    menuButton: {
        padding: 10,
    },
    avt: {
        width: 50,
        height: 50,
        borderRadius: 25, // Add this for a circular avatar
    },
    categoriesContainer: {
        width: '72%',
        height: 800,
        position: 'absolute',
        top: 55,
        left: 0,
        zIndex: 1000,
        backgroundColor: '#b5ddc4',
        borderWidth: 1,
        borderColor: '#66dcbb80',
        borderRadius: 5,
        padding: 10,
        elevation: 3,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    },
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        height: 70
    },
    menuText: {
        marginLeft: 10,
        fontSize: 16,
        color: 'black',
        fontWeight: 'bold',
    },
    footerMenu: {
        flex: 1,
        justifyContent: 'flex-end'
    },
    menuTextFooter: {
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center'
    }
});

export default Header;
