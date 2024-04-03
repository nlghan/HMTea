import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth, createUserWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import CustomIcon from '../components/CustomIcon';

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

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        const auth = getAuth(firebaseApp);
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        setEmailError('');
        setPasswordError('');

        if (!email || !emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        // Check if password is empty
        if (!password) {
            setPasswordError('Please enter your password.');
            return;
        }
        if (!confirmPassword) {
            setPasswordError('Please enter your password.');
            return;
        }

        // Kiểm tra xem email đã tồn tại chưa
        fetchSignInMethodsForEmail(auth, email)
            .then((signInMethods) => {
                if (signInMethods.length > 0) {
                    // Email đã tồn tại
                    Alert.alert('Error', 'Email already exists. Please use another email.');
                } else {
                    // Đăng ký nếu email chưa tồn tại
                    createUserWithEmailAndPassword(auth, email, password)
                        .then((userCredential) => {
                            // Registered
                            if (userCredential.user) {
                                console.log('Register Successful:', userCredential.user.email);
                                Alert.alert('Register Successful');
                                // Navigate to another screen or do something else
                            } else {
                                console.error('Register Failed: User cannot be created');
                                Alert.alert('Register Failed', 'User cannot be created');
                            }
                        })
                        .catch((error) => {
                            // Handle Errors here.
                            console.error('Register Failed:', error.message);
                            Alert.alert('Register Failed', error.message);
                        });
                }
            })
            .catch((error) => {
                console.error('Error checking email:', error.message);
                Alert.alert('Error', 'An error occurred while checking email.');
            });
    };

    // Function to toggle password visibility for the first input
    const toggleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    // Function to toggle password visibility for the second input
    const toggleShowPassword2 = () => {
        setShowPassword2(!showPassword2);
    };

    return (
        <>
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.text1}>HMTea</Text>
                <Text style={styles.text2}>Create an Account</Text>
                <Text style={styles.text7}>Connect with us today!</Text>
            </View>
            <View style={styles.input}>
                <View style={[styles.textInput, emailError ? styles.errorInput : null]}>
                    <TextInput
                        style={styles.text3}
                        placeholder='Email'
                        placeholderTextColor={'#B4BBCB'}
                        onChangeText={text => setEmail(text)}
                        value={email} />
                </View>
                {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                <View style={[styles.textInput2, passwordError ? styles.errorInput : null]}>
                    <TextInput
                        style={styles.text3}
                        placeholder='Password'
                        placeholderTextColor={'#B4BBCB'}
                        secureTextEntry={!showPassword1} // Toggle secureTextEntry based on showPassword1 state
                        onChangeText={text => setPassword(text)}
                        value={password} />
                    <TouchableOpacity onPress={toggleShowPassword1}>
                        <Icon name={showPassword1 ? 'visibility-off' : 'visibility'} size={25} color="#2C683F" style={styles.icon} />
                    </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                <View style={[styles.textInput2, passwordError ? styles.errorInput : null]}>
                    <TextInput
                        style={styles.text3}
                        placeholder='Confirm Password'
                        placeholderTextColor={'#B4BBCB'}
                        secureTextEntry={!showPassword2} // Toggle secureTextEntry based on showPassword2 state
                        onChangeText={text => setConfirmPassword(text)}
                        value={confirmPassword} />
                    <TouchableOpacity onPress={toggleShowPassword2}>
                        <Icon name={showPassword2 ? 'visibility-off' : 'visibility'} size={25} color="#2C683F" style={styles.icon} />
                    </TouchableOpacity>
                </View>
                {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            </View>
            <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                <Text style={styles.registerText}>Sign Up</Text>
            </TouchableOpacity>
            <View style={styles.line}>
                <Text style={styles.lineText}>_________________________________________</Text>
            </View>
            <View style={styles.footer}>
                <Text style={styles.text5}>Already have an account?</Text>
                <Text style={styles.text6}>Login</Text>
            </View>
        </View></>
    );
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        margin: 15,
    },
    title: {
        marginTop: 80,
    },
    text1: {
        color: '#2C683F',
        fontSize: 80,
        fontFamily: 'Lobster-Regular',
    },
    text2: {
        color: 'black',
        textAlign: 'center',
        fontFamily: 'Inder-Regular',
        fontSize: 30,
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
    textInput2: {
        borderWidth: 2,
        borderRadius: 4,
        width: 380,
        height: 45,
        borderColor: 'lightgray',
        marginBottom: 15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text3: {
        color: '#2C683F',
        paddingLeft: 15,
    },
    icon: {
        paddingRight: 10,
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
    line: {
        marginTop: 60,
    },
    lineText: {
        color: '#D9D9D9',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
        width: '100%',
    },
    text5: {
        fontFamily: 'Inter-Regular',
        fontSize: 17,
        color: '#36454F',
    },
    text6: {
        fontFamily: 'Inter-Bold',
        fontSize: 17,
        color: '#4AA366',
        paddingLeft: 40,
    },
    text7:{
        color: '#999EA1',
        fontSize: 14,
        fontFamily: 'Inder-Regular',
        paddingTop:10,
        fontWeight: '500'
    },
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom:10,
        paddingBottom:10
    },
});

export default Register;
