// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import { getAuth } from 'firebase/auth';
// import { getFirestore, doc, getDoc } from 'firebase/firestore';
// import { initializeApp } from '@firebase/app';


// // interface InformationProps {
// //   iconName: string; // Icon path
// //   fontName: string; // Font family
// // }
// const firebaseConfig = {
//     apiKey: "AIzaSyBwirHS7SLtA9blevL6K1M7YGr59Dy96Aw",
//     projectId: "hmtea-82dc0",
//     storageBucket: "hmtea-82dc0.appspot.com",
//     messagingSenderId: "916037871147",
//     appId: "1:916037871147:android:d40830a41ae50f4282ec6e",
// };

// const app = initializeApp(firebaseConfig);
// const Information = ({navigation}:any) => {
//   const [fullName, setFullName] = useState('');
//   const [email, setEmail] = useState('');
//   const [address, setAddress] = useState('');
//   const [phoneNumber, setPhoneNumber] = useState('');

//   const handleHome = () =>{
//     navigation.goBack();
//   };
//   useEffect(() => {
//     const auth = getAuth();
//     const db = getFirestore();
//     const userEmail = auth.currentUser?.email;

//     const loadUserInfo = async () => {
//       if (userEmail) {
//         // Load email from Firebase Authentication
//         setEmail(userEmail);

//         // Load other user information from Firestore
//         const userDoc = doc(db, 'personalInfo', userEmail);
//         const docSnap = await getDoc(userDoc);
//         if (docSnap.exists()) {
//           const userData = docSnap.data();
//           if (userData) {
//             setAddress(userData.address);
//             setFullName(userData.fullName );
//             setPhoneNumber(userData.phoneNumber);            
//           }
//         }
//       }
//     };

//     loadUserInfo();
//   }, []); 

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//             <TouchableOpacity onPress={handleHome}>
//               <Image style={styles.iconHeader} source={require('../assets/app_images/angle_left.png')} />
//             </TouchableOpacity> 
                    
//             <Text style={styles.text}>HMTea</Text> 
//             <Text style={styles.text}>   </Text>  
                    
//       </View>
//       <Text style={styles.myAccountText}>My Account</Text>
//       <View style={styles.accountInfo}>
//         <View style={styles.profileContainer}>
//           <View>
//             <Image style={styles.profileImage} source={require('../assets/app_images/avt_1.png')} />
//           </View>        
//           <View style={styles.userInfo}>
//             <Text style={styles.userInfoText}>Full name: {fullName}</Text>
//             <Text style={styles.userInfoText}>Email: {email}</Text>
//           </View>
//           <View style={styles.iconContainer}>
//           <Image style={styles.iconEdit} source={require('../assets/app_images/pencil.png')} /> 
//           </View>
//         </View>
//         <View style={styles.infoContainer}>   
//           <View style={styles.iconContainer}>
//             <Image style={styles.iconMarker} source={require('../assets/app_images/marker.png')} /> 
//           </View>      
//           <View style={styles.textContainer}>
//             <Text style={styles.infoText}>Address: {address}</Text>
//             <Text style={styles.infoText}>Phone Number: {phoneNumber}</Text>
//           </View>
//           <View style={styles.change}>
//               <Text style={styles.textChange}>Change</Text>
//           </View>
//         </View>
//       </View>
//       <View style={styles.divider} />
//         <View style={styles.dividerContainer}>
//           <Image style={styles.iconDivider} source={require('../assets/app_images/marker_1.png')} />
//           <Text style={styles.myAccountText1}>My Delivery Address</Text>
//         </View>
//         <View style={styles.dividerContainer}>
//           <Image style={styles.iconDivider} source={require('../assets/app_images/cowbell.png')} />
//           <Text style={styles.myAccountText1}>Notifications</Text>
//         </View>
//         <View style={styles.dividerContainer}>
//           <Image style={styles.iconDivider} source={require('../assets/app_images/cart.png')} />
//           <Text style={styles.myAccountText1}>My Orders</Text>
//         </View>
//         <View style={styles.dividerContainer}>
//           <Image style={styles.iconDivider} source={require('../assets/app_images/favourite.png')} />
//           <Text style={styles.myAccountText1}>My Favourites</Text>
//         </View>
//         <View style={styles.dividerContainer}>
//           <Image style={styles.iconDivider} source={require('../assets/app_images/settings.png')} />
//           <Text style={styles.myAccountText1}>Settings</Text>          
//         </View>
//         <View style={styles.dividerContainer}>
//           <Image style={styles.iconDivider} source={require('../assets/app_images/logout.png')} />
//           <Text style={styles.myAccountText1}>Logout</Text>          
//         </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffffff',
//   },
//   header: {    
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     height: 55,
//     paddingHorizontal: 5,
//     backgroundColor: 'white',
//     top: 0,
//     left: 0,
//     right: 0,
//     zIndex: 1000,    
//   },
//   headerIcon: {
//     width: 30,
//     height: 30,
//     marginRight: 10,
//   },
//   headerText: {
//     fontSize: 24,
//   },
//   text: {
//     color: '#2C683F',
//     fontSize: 40,
//     fontFamily: 'Lobster-Regular',
//     alignItems: 'center'
//   },
//   avt: {
//     width: 50,
//     height: 50,    
//   },
//   boder: {
//     borderRadius: 50,
//   },
//   iconHeader: {
//     width: 23,
//     height: 23,
//   },
//   iconEdit: {
//     width: 20,
//     height: 20,
//   },
//   iconMarker:{
//     marginLeft: 20,
//     marginBottom: 15,
//     width: 30,
//     height: 30,
//   },
//   myAccountText: {
//     fontSize: 18,
//     marginLeft: '5%',
//     marginTop: '5%',
//     color: 'black',
//   },
//   accountInfo: {
//     backgroundColor: '#4AA366',
//     marginTop: '2%',
//     padding: '5%',
//     // borderRadius: 0,
//     marginHorizontal: '2%',
//     height: '30%',
//   },
//   profileContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   profileImage: {
//     width: 70,
//     height: 70,
//     borderRadius: 35,
//     marginRight: 10,
//   },
//   userInfo: {
//     flex: 1,
//   },
//   userInfoText: {
//     color: '#ffffff',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   infoContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     flexDirection: 'row',
//     marginTop: 20,
//     height: '45%',
//     alignItems: 'center',
//   },
//   iconContainer: {
//     width: 30,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
  
//   textContainer: {
//     flex: 1,
//     marginLeft: 20,
//   },
//   change: {
//    height: 30,
//    width: 70,
//    borderColor: 'red',
//    borderRadius: 20,
//   },
//   textChange: {
//     color: 'red',
//     fontSize: 14,
//   },
//   infoText: {
//     color: '#2C683F',
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   divider: {
//     // height: 1,
//     // backgroundColor: '#DADADA',
//     // marginTop: '5%',
//   },
//   dividerContainer:
//   {    
//     flexDirection: 'row',
//     marginTop: 17,
//     borderBottomColor: '#CCCCCC',
//     borderBottomWidth: 1,
//     marginHorizontal: 15,   
//   },
//   myAccountText1: {
//     fontSize: 18,
//     marginLeft: 15,
//     marginTop: 10, 
//     color: 'gray',
//   },
//   iconDivider: {
//     marginTop: 10,    
//     width: 28,
//     height: 28, 
//   },
// });

// export default InformationEx;
