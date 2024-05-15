import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, TextInput, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useStore } from '../store/store';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';
import { getAuth, signOut } from 'firebase/auth';

const Information = ({ navigation, route }: { navigation: any, route: any }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const user = useStore((state: any) => state.user);
  const pushListsToFirestore = useStore((state: any) => state.pushListsToFirestore);

  const languageFromStore = useStore((state: any) => state.language); // Get language from useStore


  useEffect(() => {
    // Load user info if available
    // Load user info if available
    const loadUserInfo = async () => {
      // Load user info from Firestore if user is logged in
      if (user) {
        const db = getFirestore();
        const userDocRef = doc(db, 'user', user);
        const docSnap = await getDoc(userDocRef);
        if (docSnap.exists()) {
          const userData = docSnap.data()?.Information;
          if (userData) {
            // Kiểm tra xem các trường thông tin đã được định nghĩa trong userData không
            if (userData.fullName) {
              setFullName(userData.fullName);
            }
            if (userData.address) {
              setAddress(userData.address);
            }
            if (userData.phoneNumber) {
              setPhoneNumber(userData.phoneNumber);
            }
          }
        }
      }
    };
    loadUserInfo();
  }, [user, languageFromStore]);



  const saveUserInfo = async () => {
    // Update user info in the store and push to Firestore
    useStore.setState({ fullName, address, phoneNumber }); // Update store state
    pushListsToFirestore(); // Push to Firestore
  };

  const handleHome = () => {
    navigation.navigate('Tab');
  };

  const handeAddress = () => {
    navigation.push('Infor')
  }
  const handleCart = () => {
    navigation.navigate('Cart');

  };
  const handleFavorites = () => {
    navigation.navigate('Favorite');
  };
  const handleLogin = () => {
    navigation.navigate('Login');
  };
  const handleHistory = () => {
    navigation.navigate('History');
  };

  const handleLogout = async () => {
    const auth = getAuth();
    try {
      await signOut(auth);
      // Điều hướng đến màn hình đăng nhập hoặc màn hình chính tùy thuộc vào luồng ứng dụng của bạn
      navigation.navigate('Login'); // Thay 'Login' bằng tên màn hình đăng nhập của bạn
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleFavorite = () => {
    navigation.navigate('Favorite');
  };

  const handleOrder = () => {
    navigation.navigate('Cart');
  };



  const { t } = useTranslation(); // Use useTranslation hook


  useEffect(() => {
    i18n.changeLanguage(languageFromStore);
  }, [languageFromStore]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <ScrollView style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={handleHome} >
              <Icon name='chevron-left' size={25} />
            </TouchableOpacity>
            <Text style={styles.text}>HMTea</Text>
            <Text style={styles.text}>   </Text>

          </View>
          <Text style={styles.myAccountText}>{t('myAccount')}</Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.accountInfo} behavior="padding">
              <View style={styles.profileContainer}>
                <View>
                  <Image style={styles.avt} source={require('../assets/app_images/resume.png')} />
                </View>
                <View style={styles.userInfo}>
                  <TextInput
                    style={styles.input}
                    placeholder={t('fullName')}
                    value={fullName}
                    onChangeText={setFullName}
                  />
                  <Text style={styles.infoText}>Email: {user || 'Not logged in'}</Text>

                </View>
                <View style={styles.iconContainer}>
                  <Icon name='edit-square' size={25} color={'white'} />
                </View>
              </View>
              <View style={styles.infoContainer}>
                <View style={styles.iconContainer}>
                  <Icon name='location-on' size={30} color={'lightgreen'} />
                </View>
                <View style={styles.textContainer}>
                  <TextInput
                    style={styles.input2}
                    placeholder={t('address')}
                    placeholderTextColor="gray"
                    value={address}
                    onChangeText={setAddress}
                  />
                  <TextInput
                    style={styles.input2}
                    placeholder={t('phone')}
                    placeholderTextColor="gray"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                  />
                </View>
                <TouchableOpacity style={styles.saveButton} onPress={saveUserInfo}>
                  <Text style={styles.saveText}>{t('save')}</Text>
                </TouchableOpacity>
              </View>
            </KeyboardAvoidingView>
          </TouchableWithoutFeedback>

          <View />
          <TouchableOpacity onPress={handeAddress}>
            <View style={styles.dividerContainer}>
              <Icon name='location-on' size={30} />
              <Text style={styles.myAccountText1}>{t('address')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity onPress={handleOrder}>
            <View style={styles.dividerContainer}>
              <Icon name='shopping-cart' size={30} />
              <Text style={styles.myAccountText1}>{t('order')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleFavorite}>
            <View style={styles.dividerContainer}>
              <Icon name='favorite' size={30} />
              <Text style={styles.myAccountText1}>{t('favor')}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={handleHistory}>
            <View style={styles.dividerContainer}>
              <Icon name='notifications' size={30} />
              <Text style={styles.myAccountText1}>{t('noti')}</Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.dividerContainer} onPress={handleLogout}>
            <Icon name='logout' size={30} />
            <Text style={styles.myAccountText1}>{t('logout')}</Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>

  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 55,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  headerIcon: {
    width: 30,
    height: 30,
    marginRight: 10,
  },
  headerText: {
    fontSize: 24,
  },
  text: {
    color: '#2C683F',
    fontSize: 40,
    fontFamily: 'Lobster-Regular',
    alignItems: 'center'
  },
  avt: {
    width: 40,
    height: 40
  },
  boder: {
    borderRadius: 50,
  },
  iconHeader: {
    width: 23,
    height: 23,
  },
  iconEdit: {
    width: 20,
    height: 20,
  },
  iconMarker: {
    marginLeft: 20,
    marginBottom: 15,
    width: 30,
    height: 30,
  },
  myAccountText: {
    fontSize: 18,
    marginLeft: '5%',
    marginTop: '5%',
    color: 'black',
  },
  accountInfo: {
    backgroundColor: '#4AA366',
    marginTop: '2%',
    padding: '5%',
    marginHorizontal: '2%',
    height: 270,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 10,
  },
  userInfo: {
    flex: 1,
    marginBottom: 5,
    marginLeft: 10,

  },
  userInfoText: {
    color: '#ffffff',
    fontSize: 18,
  },
  infoContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    marginTop: 20,
    height: '45%',
    alignItems: 'center',
  },
  iconContainer: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10
  },

  textContainer: {
    flex: 1,
    marginLeft: 15,
  },
  change: {
    height: 30,
    width: 70,
    borderColor: 'red',
    borderRadius: 20,
  },
  textChange: {
    color: 'red',
    fontSize: 18,
  },
  infoText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 5,
    marginLeft: 5,
  },
  dividerContainer:
  {
    flexDirection: 'row',
    marginTop: 17,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    marginHorizontal: 15,
    paddingBottom: 5,
  },
  myAccountText1: {
    fontSize: 18,
    marginLeft: 15,
    marginTop: 10,
    color: 'gray',
  },
  input: {
    height: 40,
    marginBottom: 10,
    fontSize: 18
  },
  input2: {
    height: 40,
    color: 'black',
    marginBottom: 5,
    fontSize: 18
  },
  saveButton: {
    alignItems: 'center',
    padding: 20,
    marginTop: 5,
  },
  saveText: {
    color: 'red'
  }
});

export default Information;
