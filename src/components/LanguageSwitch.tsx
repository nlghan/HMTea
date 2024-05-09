import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const LanguageSwitch = ({ language, changeLanguage }: any) => {
    const toggleLanguage = () => {
        // Toggle between 'en', 'vi', and 'fr' languages
        const newLanguage = language === 'en' ? 'vi' : language === 'vi' ? 'fr' : 'en';
        // Call the changeLanguage function with the new language
        changeLanguage(newLanguage);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={toggleLanguage}>
                <Text style={[styles.languageText, language === 'en' ? styles.activeLanguage :styles.activeLanguage]}>
                    {language === 'en' ? 'English' : language === 'vi' ? 'Tiếng Việt' : 'Français'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end', // Align to the right side of the screen
        paddingRight: 10, // Add some right padding for spacing
        //backgroundColor: 'lightyellow',
        marginLeft: 295
    },
    languageText: {
        fontSize: 16,
        color: '#2C683F',
        marginHorizontal: 10,
        width: 90
    },
    activeLanguage: {
        fontWeight: 'bold',
    },
});

export default LanguageSwitch;
