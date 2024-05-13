import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { getAuth, signInWithCredential, GoogleAuthProvider, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import { useStore } from '../store/store';
import { getFirestore, collection, addDoc, setDoc, getDoc, doc } from 'firebase/firestore';
import LanguageSwitch from '../components/LanguageSwitch';
import { useTranslation } from 'react-i18next'; // Import hook useTranslation
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['new NativeEventEmitter']); // Ignore log notification by message
LogBox.ignoreAllLogs(); 


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

const initializeFirebaseApp = () => {

    if (!firebaseApp) {
        firebaseApp = initializeApp(firebaseConfig, 'HMTEA');
        GoogleSignin.configure({
            webClientId: '916037871147-pkjb846hn759hllqd0e7mu02oc0s6nlk.apps.googleusercontent.com',
        });
    }

};

// Call this once when the app starts
initializeFirebaseApp();

const Login = ({ navigation }: any) => {
    const { t, i18n } = useTranslation(); // Use useTranslation hook
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword1, setShowPassword1] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const login = useStore((state: any) => state.login);
    const [language, setLanguage] = useState('en');
    const clear = useStore((state: any) => state.clearListsOnLogin);
    const pushListsToFirestore = useStore((state: any) => state.pushListsToFirestore);

    useEffect(() => {
        const loadSavedLoginCredentials = async () => {
            try {
                const savedEmail = await AsyncStorage.getItem('savedEmail');
                const savedPassword = await AsyncStorage.getItem('savedPassword');
                const savedRememberMe = await AsyncStorage.getItem('savedRememberMe');

                if (savedRememberMe === 'true' && savedEmail && savedPassword) {
                    setEmail(savedEmail);
                    setPassword(savedPassword);
                    setRememberMe(true);
                }
            } catch (error) {
                console.error('Error loading saved login credentials:', error);
            }
        };


        loadSavedLoginCredentials();
    }, [])

    async function onGoogleButtonPress() {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            
            // Xóa thông tin đăng nhập trước đó từ AsyncStorage
            await AsyncStorage.removeItem('savedEmail');
            await AsyncStorage.removeItem('savedPassword');
            await AsyncStorage.removeItem('savedRememberMe');
    
            // Thực hiện đăng nhập bằng Google
            const { idToken, user } = await GoogleSignin.signIn();
            const googleCredential = GoogleAuthProvider.credential(idToken);
            const auth = getAuth();
            await signInWithCredential(auth, googleCredential);
    
            // Lưu email của người dùng đăng nhập bằng Google vào Firestore
            const db = getFirestore();
            const userDocRef = doc(db, 'user', user.email);
    
            // Kiểm tra xem người dùng đã tồn tại trong Firestore chưa
            const userDoc = await getDoc(userDocRef);
    
            if (userDoc.exists()) {
                console.log('User already exists in Firestore:', userDoc.data());
            } else {
                console.log('User does not exist in Firestore. Adding user...');
                // Thêm thông tin người dùng vào Firestore
                const userData = {
                    email: user.email,
                    // Các thông tin khác của người dùng nếu có
                };
    
                try {
                    await setDoc(userDocRef, userData);
                    console.log('User added to Firestore successfully');
                } catch (error) {
                    console.error('Error adding user to Firestore:', error);
                }
            }
            // Cập nhật thông tin người dùng trong store sau khi đăng nhập thành công
            login(user.email, language);
    
            // Nếu đăng nhập thành công, điều hướng người dùng đến màn hình Tab
            navigation.navigate('Tab');
        } catch (error: any) {
            console.error('Google sign-in failed:', error);
            Alert.alert('Google sign-in failed', error.message);
        }
    }
    
    
    
    const handleSignUp = () => {
        navigation.navigate('Register')
    }
    const handleLogin = async () => {
        const auth = getAuth(firebaseApp);
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        // Reset previous errors
        setEmailError('');
        setPasswordError('');

        // Check if email is empty or not valid
        if (!email || !emailRegex.test(email)) {
            setEmailError('Please enter a valid email address.');
            return;
        }

        // Check if password is empty
        if (!password) {
            setPasswordError('Please enter your password.');
            return;
        }

        signInWithEmailAndPassword(auth, email, password)
            .then(async (userCredential) => {

                if (userCredential.user) {
                    console.log('Login Successful:', userCredential.user.email);
                    Alert.alert('Login Successful');
                    // Save login credentials if "Remember Me" is checked
                    if (rememberMe) {
                        saveLoginCredentials();
                    }
                    // Check if user exists in Firestore
                    const db = getFirestore();
                    const userDocRef = doc(db, 'user', email);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        console.log('User already exists in Firestore:', userDoc.data());
                    } else {
                        console.log('User does not exist in Firestore. Adding user...');
                        // Thêm thông tin người dùng vào Firestore
                        const userData = {
                            email: userCredential.user.email,
                            // Các thông tin khác của người dùng nếu có
                        };

                        try {
                            await setDoc(userDocRef, userData);
                            console.log('User added to Firestore successfully');
                        } catch (error) {
                            console.error('Error adding user to Firestore:', error);
                        }
                    }
                    login(userCredential.user.email, language)
                    navigation.navigate('Tab', { userEmail: userCredential.user.email })
                } else {
                    console.error('Login Failed: User does not exist');
                    Alert.alert('Login Failed', 'User does not exist');
                }
            
            })
            .catch((error) => {
                console.error('Login Failed:', error.message);
                Alert.alert('Login Failed', error.message);
            });
        
    };

    const changeLanguage = (lang: string) => {
        setLanguage(lang);
        i18n.changeLanguage(lang); // Change language in i18n
    };

    const toggleShowPassword1 = () => {
        setShowPassword1(!showPassword1);
    };

    const toggleRememberMe = () => {
        setRememberMe(!rememberMe);
    };

    const saveLoginCredentials = async () => {
        try {
            await AsyncStorage.setItem('savedEmail', email);
            await AsyncStorage.setItem('savedPassword', password);
            await AsyncStorage.setItem('savedRememberMe', rememberMe ? 'true' : 'false');
        } catch (error) {
            console.error('Error saving login credentials:', error);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <LanguageSwitch language={language} changeLanguage={changeLanguage} />

                <View style={styles.title}>
                    <Text style={styles.text1}>HMTea</Text>
                    <Text style={styles.text2}>{t('welcome')}</Text>
                </View>
                <View style={styles.input}>
                    <View style={[styles.textInput, emailError ? styles.errorInput : null]}>
                        <TextInput
                            style={styles.text3}
                            placeholder='Email'
                            placeholderTextColor={'#B4BBCB'}
                            onChangeText={text => setEmail(text)}
                            value={email}
                            keyboardType='email-address'
                        />
                    </View>
                    {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
                    <View style={[styles.textInput2, passwordError ? styles.errorInput : null]}>
                        <TextInput
                            style={styles.text3}
                            placeholder='Password'
                            placeholderTextColor={'#B4BBCB'}
                            secureTextEntry={!showPassword1} // Toggle secureTextEntry based on showPassword1 state
                            onChangeText={text => setPassword(text)}
                            value={password}
                        />
                        <TouchableOpacity onPress={toggleShowPassword1}>
                            <Icon name={showPassword1 ? 'visibility-off' : 'visibility'} size={25} color="#2C683F" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                    {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
                </View>
                <View style={styles.rememberMeContainer}>
                    <Text style={styles.rememberMeText}>{t('rememberMe')}</Text>
                    <TouchableOpacity onPress={toggleRememberMe} style={styles.checkbox}>
                        {rememberMe ? (
                            <Icon name="check-box" size={24} color="#2C683F" />
                        ) : (
                            <Icon name="check-box-outline-blank" size={24} color="#2C683F" />
                        )}

                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginText}>{t('login')}</Text>
                </TouchableOpacity>
                <View style= {styles.or}>
                <Text style={styles.text7}>Or</Text>
                </View>
                <TouchableOpacity style={styles.googleLoginButtonContainer} onPress={onGoogleButtonPress}>
                    <GoogleSigninButton 
                    style={styles.googleLoginButton}
                    size={GoogleSigninButton.Size.Wide}
                color={GoogleSigninButton.Color.Dark} />
                </TouchableOpacity>
                <View style={styles.line}>
                    <Text style={styles.lineText}>_________________________________________</Text>
                </View>
                <View style={styles.footer}>
                    <Text style={styles.text5}>{t('account')}</Text>
                    <TouchableOpacity style={styles.signup} onPress={handleSignUp}>
                        <Text style={styles.text6}>{t('signUp')}</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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
        fontSize: 25,
        width: '100%'
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
    rememberMeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 380,
        marginBottom: 15,
    },
    checkbox: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    rememberMeText: {
        color: '#2C683F',
        fontSize: 16,
        paddingLeft: 10,
        paddingRight:20
    },
    text4: {
        color: '#4D5661',
        fontSize: 17,
        fontWeight: '500',
        fontFamily: 'Inter-SemiBold',
    },
    loginButton: {
        backgroundColor: '#4AA366',
        borderRadius: 4,
        width: 380,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    loginText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
    line: {
        marginTop: 50,
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
    errorInput: {
        borderColor: 'red',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        paddingBottom: 10
    },
    signup: {

    },
    googleLoginButtonContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 10,
        width: '98%',
       
    },
    googleLoginButton: {
        backgroundColor: '#FFFFFF',
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#000000',
        height: 55,
        width: '100%',
        paddingHorizontal: 100
    },
    googleLoginIcon: {
        marginRight: 10,
    },
    googleLoginText: {
        color: '#000000',
        fontSize: 18,
    },
    languageContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
    },
    languageText: {
        fontSize: 16,
        color: '#2C683F',
        marginHorizontal: 10,
    },
    activeLanguage: {
        fontWeight: 'bold',
    },
    or:{
        width: '100%',
        justifyContent: 'center',
        alignItems:'center',
    },
    text7:{
        fontSize: 15,
        paddingTop: 10,
        color: '#2C683F',
        justifyContent: 'center',
        alignItems:'center'

    }

});

export default Login;
