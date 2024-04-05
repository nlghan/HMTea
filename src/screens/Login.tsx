import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View, Alert, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { FirebaseApp, initializeApp } from 'firebase/app';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  }
};

// Call this once when the app starts
initializeFirebaseApp();

const Login = ({ navigation }: any) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    // Load saved login credentials if "Remember Me" was checked before
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
  }, []);

  const handleSignUp = () => {
    navigation.navigate('Register');
  };

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
      .then((userCredential) => {
        // Signed in
        if (userCredential.user) {
          console.log('Login Successful:', userCredential.user.email);
          Alert.alert('Login Successful');
          // Save login credentials if "Remember Me" is checked
          if (rememberMe) {
            saveLoginCredentials();
          }
          navigation.navigate('Tab');
        } else {
          console.error('Login Failed: User does not exist');
          Alert.alert('Login Failed', 'User does not exist');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        console.error('Login Failed:', error.message);
        Alert.alert('Login Failed', error.message);
      });
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
        <View style={styles.title}>
          <Text style={styles.text1}>HMTea</Text>
          <Text style={styles.text2}>Welcome Back!</Text>
        </View>
        <View style={styles.input}>
          <View style={[styles.textInput, emailError ? styles.errorInput : null]}>
            <TextInput
              style={styles.text3}
              placeholder='Email'
              placeholderTextColor={'#B4BBCB'}
              onChangeText={text => setEmail(text)}
              value={email}
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
          <Text style={styles.rememberMeText}>Remember Me</Text>
          <TouchableOpacity onPress={toggleRememberMe} style={styles.checkbox}>
            {rememberMe ? (
              <Icon name="check-box" size={24} color="#2C683F" />
            ) : (
              <Icon name="check-box-outline-blank" size={24} color="#2C683F" />
            )}

          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.line}>
          <Text style={styles.lineText}>_________________________________________</Text>
        </View>
        <View style={styles.footer}>
          <Text style={styles.text5}>No account?</Text>
          <TouchableOpacity style={styles.signup} onPress={handleSignUp}>
            <Text style={styles.text6}>Sign up</Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
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
    paddingRight: 10,
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
    marginTop: 80,
  },
  loginText: {
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
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    paddingBottom: 10,
  },
  signup: {

  }
});

export default Login;
