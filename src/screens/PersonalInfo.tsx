import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';
import { initializeApp } from '@firebase/app';
import { useStore } from '../store/store';
import Icon from 'react-native-vector-icons/MaterialIcons';

// interface InformationProps {
//   iconName: string; // Icon path
//   fontName: string; // Font family
// }
// const firebaseConfig = {
//     apiKey: "AIzaSyBwirHS7SLtA9blevL6K1M7YGr59Dy96Aw",
//     projectId: "hmtea-82dc0",
//     storageBucket: "hmtea-82dc0.appspot.com",
//     messagingSenderId: "916037871147",
//     appId: "1:916037871147:android:d40830a41ae50f4282ec6e",
// };

// const app = initializeApp(firebaseConfig);

const Information = ({ navigation, route }: { navigation: any, route: any }) => {
  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const user = useStore((state: any) => state.user);

  const handleHome = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const loadUserInfo = async () => {
      const auth = getAuth();
      const db = getFirestore();

      let userEmailFromParams = null;
      const { userEmail } = route.params || {};
      
      if (userEmail) {
        userEmailFromParams = userEmail;
        setCurrentUserEmail(userEmailFromParams);
      } else {
        userEmailFromParams = auth.currentUser?.email;
        if (userEmailFromParams) {
          setCurrentUserEmail(userEmailFromParams);
        }
      }

      if (userEmailFromParams) {
        const userDocRef = doc(db, 'user', userEmailFromParams);
        const docSnap = await getDoc(userDocRef);
        
        if (docSnap.exists()) {
          const userData = docSnap.data()?.Information;
          if (userData) {
            setFullName(userData[0] || '');
            setAddress(userData[1] || '');
            setPhoneNumber(userData[2] || '');
          }
        }
      }

      // return auth.onAuthStateChanged(user => {
      //   if (user) {
      //     // Nếu user đang đăng nhập, lấy email và cập nhật state
      //     setCurrentUserEmail(user.email);
      //   } else {
      //     // Nếu không, đặt email về null hoặc giá trị mặc định khác
      //     setCurrentUserEmail(null);
      //   }
      // });
    };

    loadUserInfo();
    
  }, [route.params]);
  
  

  const saveUserInfo = async () => {
    const auth = getAuth();
    const db = getFirestore();
    let userEmailFromParams = null;
      const { userEmail } = route.params || {};
      userEmailFromParams = userEmail;
        setCurrentUserEmail(userEmailFromParams);
      if (userEmail) {
        userEmailFromParams = userEmail;
        setCurrentUserEmail(userEmailFromParams);
      } else {
        userEmailFromParams = auth.currentUser?.email;
        if (userEmailFromParams) {
          setCurrentUserEmail(userEmailFromParams);
        }
      }   
  
    if (userEmail) {
      const userDocRef = doc(db, 'user', userEmail); // Đặt tên collection là 'users' (hoặc tùy chỉnh theo tên bạn đã sử dụng)
      
      await setDoc(userDocRef, {
        Information: [fullName, address, phoneNumber],
      });
    }
  };
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.container}>
      <View style={styles.header}>
            <TouchableOpacity onPress={handleHome} >
                <Icon name='chevron-left' size={25}/>
            </TouchableOpacity> 
                    
            <Text style={styles.text}>HMTea</Text> 
            <Text style={styles.text}>   </Text>  
                    
      </View>
      <Text style={styles.myAccountText}>My Account</Text>
      <View style={styles.accountInfo}>
        <View style={styles.profileContainer}>
          <View>
          <Image style={styles.avt} source={require('../assets/app_images/avt_1.png')} />
          </View>        
          <View style={styles.userInfo}>
            <TextInput
                style={styles.input}
                placeholder="Full name"
                value={fullName}
                onChangeText={setFullName}
              />
            <Text style={styles.infoText}>Email: {currentUserEmail || 'Not logged in'}</Text>
            
          </View>
          <View style={styles.iconContainer}>
          <Icon name='edit-square' size={25} color={'white'}/>
          </View>
        </View>
        <View style={styles.infoContainer}>   
          <View style={styles.iconContainer}>
          <Icon name='location-on' size={30} color={'lightgreen'}  /> 
          </View>      
          <View style={styles.textContainer}>
            <TextInput
                  style={styles.input2}
                  placeholder="Address"
                  value={address}
                  onChangeText={setAddress}
                />
            <TextInput
                style={styles.input2}
                placeholder="Phone Number"
                value={phoneNumber}
                onChangeText={setPhoneNumber}
              />
          </View>
          <TouchableOpacity style={styles.saveButton} onPress={saveUserInfo}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
        </View>
      </View>
      <View style={styles.divider} />
        <View style={styles.dividerContainer}>
        <Icon name='location-on' size={30}/>
          <Text style={styles.myAccountText1}>My Delivery Address</Text>
        </View>
        <View style={styles.dividerContainer}>
        <Icon name='notifications' size={30}/>
          <Text style={styles.myAccountText1}>Notifications</Text>
        </View>
        <View style={styles.dividerContainer}>
        <Icon name='shopping-cart' size={30}/>
          <Text style={styles.myAccountText1}>My Orders</Text>
        </View>
        <View style={styles.dividerContainer}>
        <Icon name='favorite' size={30}/>
          <Text style={styles.myAccountText1}>My Favourites</Text>
        </View>
        <View style={styles.dividerContainer}>
        <Icon name='settings' size={30}/>
          <Text style={styles.myAccountText1}>Settings</Text>          
        </View>
        <View style={styles.dividerContainer}>
        <Icon name='logout' size={30}/>
          <Text style={styles.myAccountText1}>Logout</Text>          
        </View>
    </View>
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
    width: 50,
    height: 50,  
    borderRadius: 25,      
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
  iconMarker:{
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
    // borderRadius: 0,
    marginHorizontal: '2%',
    height: '30%',
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

  },
  userInfoText: {
    color: '#ffffff',
    fontSize: 16,
    
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
  },
  
  textContainer: {
    flex: 1,
    marginLeft: 20, 
       
  },
  change: {
   height: 30,
   width: 70,
   borderColor: 'red',
   borderRadius: 20,
  },
  textChange: {
    color: 'red',
    fontSize: 14,
  },
  infoText: {
    color: 'white',
    fontSize: 16,
    marginBottom: 5,
  },
  divider: {
    // height: 1,
    // backgroundColor: '#DADADA',
    // marginTop: '5%',
  },
  dividerContainer:
  {    
    flexDirection: 'row',
    marginTop: 17,
    borderBottomColor: '#CCCCCC',
    borderBottomWidth: 1,
    marginHorizontal: 15,   
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
  },
  input2: {
    height: 40,
    color: 'black', 
    marginBottom: 5,    
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
