import React, { useState, useEffect } from 'react';
import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next'; // Import hook useTranslation
import i18n from '../i18n/i18n';
import { useStore } from '../store/store'; // Import useStore hook

const Header = () => {
    const navigation = useNavigation();
    const { t } = useTranslation(); // Use useTranslation hook
    const languageFromStore = useStore((state: any) => state.language); // Get language from useStore

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    useEffect(() => {
        // Update i18n language to match language from useStore
        i18n.changeLanguage(languageFromStore);
    }, [languageFromStore]);

    const handleContactPress = () => {
        Linking.openURL('https://www.facebook.com/people/HMTea/61558009175942/?mibextid=qi2Omg&rdid=L7vgP2gyIRVzx3eK');
    };

    const handleAvatarPress = () => {
        // Chuyển trang "Infor"
        navigation.navigate('Infor' as never);
    };

    const handlePolicyPress = () => {
        Linking.openURL('https://www.termsfeed.com/live/b2f9beb7-206c-48ac-9865-74d02a752721?fbclid=IwZXh0bgNhZW0CMTAAAR1UxrPhiNK1bRX82Z0hnAjmrpcChQFcdxO05IYA46VJdt947-FPNa1KQBw_aem_AaeUp7Nfg6zy1SCszF0KGgSa7WyZNWBHDQxsYvvb7vpXu_ImQn3FUUe_ODOuIguBzyDgwbITjYxxsA1CmUdgaRtG');
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
                <Image style={styles.avt} source={require('../assets/app_images/profile.png')} />
            </TouchableOpacity>

            {/* Menu items */}
            {isMenuOpen && (
                <View style={styles.categoriesContainer}>
                    <TouchableOpacity style={styles.menuItem} onPress={handlePolicyPress}>
                        <Icon name="security" size={24} color="#2C683F" />
                        <Text style={styles.menuText}>{t('privacyPolicy')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="assignment" size={24} color="#2C683F" />
                        <Text style={styles.menuText}>{t('termsAndConditions')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem}>
                        <Icon name="language" size={24} color="#2C683F" />
                        <Text style={styles.menuText}>{t('language')}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.menuItem} onPress={handleContactPress}>
                        <Icon name="support" size={24} color="#2C683F" />
                        <Text style={styles.menuText}>{t('contact')}</Text>
                    </TouchableOpacity>
                    <View style={styles.footerMenu}>
                        <Text style={styles.menuTextFooter}>{t('version')}</Text>
                        <Text style={styles.menuTextFooter}>{t('builtBy')}</Text>
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
        width: 40,
        height: 40,
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
