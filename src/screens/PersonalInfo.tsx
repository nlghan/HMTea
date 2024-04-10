import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
// import CustomIcon from '../components/CustomIcon';

// Initialize Firebase with your Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwirHS7SLtA9blevL6K1M7YGr59Dy96Aw",
    projectId: "hmtea-82dc0",
    storageBucket: "hmtea-82dc0.appspot.com",
    messagingSenderId: "916037871147",
    appId: "1:916037871147:android:d40830a41ae50f4282ec6e",
};

// Check if Firebase app is already initialized
let firebaseApp: FirebaseApp | undefined;
if (!firebaseApp) {
    firebaseApp = initializeApp(firebaseConfig);
}

const PersonalInfo = ({navigation}:any) => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');

    const handlePersonalInfo = () => {
        // Validate the inputs
        if (!fullName || !phoneNumber || !address) {
            Alert.alert('Error', 'Please fill in all fields.');
            return;
        }
    
        // Validate phone number format
        const phoneNumberRegex = /^\d+$/;
        if (!phoneNumberRegex.test(phoneNumber)) {
            Alert.alert('Error', 'Phone number must contain only digits.');
            return;
        }
    
        // Proceed with your logic to save the personal information
        // You can use Firebase or any other backend service for this purpose
    
        // After saving, you can navigate to another screen or perform any other action
    };

    return (
        <>
            <View style={styles.container}>
                <View style={styles.title}>
                    <Text style={styles.text1}>Personal Info</Text>
                </View>
                <View style={styles.input}>
                    <View style={styles.textInput}>
                        <TextInput
                            style={styles.text3}
                            placeholder='Full Name'
                            placeholderTextColor={'#B4BBCB'}
                            onChangeText={text => setFullName(text)}
                            value={fullName} />
                    </View>
                    <View style={styles.textInput}>
                        <TextInput
                            style={styles.text3}
                            placeholder='Phone Number'
                            placeholderTextColor={'#B4BBCB'}
                            onChangeText={text => setPhoneNumber(text)}
                            value={phoneNumber} />
                    </View>
                    <View style={styles.textInput}>
                        <TextInput
                            style={styles.text3}
                            placeholder='Address'
                            placeholderTextColor={'#B4BBCB'}
                            onChangeText={text => setAddress(text)}
                            value={address} />
                    </View>
                </View>
                <TouchableOpacity style={styles.registerButton} onPress={handlePersonalInfo}>
                    <Text style={styles.registerText}>Save Info</Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: 15,
    },
    title: {
        marginTop: 80,
    },
    text1: {
        color: '#2C683F',
        fontSize: 30,
        fontFamily: 'Inder-Regular',
    },
    input: {
        marginTop: 80,
    },
    textInput: {
        borderWidth: 1.5,
        borderRadius: 4,
        width: 380,
        height: 45,
        borderColor: 'lightgray',
        marginBottom: 15,
    },
    text3: {
        color: '#2C683F',
        paddingLeft: 15,
    },
    registerButton: {
        backgroundColor: '#4AA366',
        borderRadius: 4,
        width: 380,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 35,
    },
    registerText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});

export default PersonalInfo;
