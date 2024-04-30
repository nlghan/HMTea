import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useStore } from '../store/store';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING, BORDERRADIUS, FONTFAMILY, FONTSIZE } from '../theme/theme';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import PaymentItem from '../components/PaymentItem';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';




const Payment = ({ navigation }: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const [Information, setInformation] = useState(null);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const pushListsToFirestore = useStore((state: any) => state.pushListsToFirestore);
  const useNavigar = useNavigation();
  // const tabBarHeight1 = useBottomTabBarHeight();

 
  const buttonPressHandler = () => {
    navigation.push('OrderComplete', { amount: CartPrice });
    // pushListsToFirestore();
  };

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
    // pushListsToFirestore();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
    // pushListsToFirestore();
  };

  const [fullName, setFullName] = useState('');
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const user = useStore((state: any) => state.user);
  
  
  useEffect(() => {
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
            setFullName(userData.fullName || '');
            setAddress(userData.address || '');
            setPhoneNumber(userData.phoneNumber || '');
          }
        }
      }
    };
    loadUserInfo();
  }, [user]);
  
  
  useEffect(() => {    
     // Gọi hàm pushListsToFirestore khi có sự thay đổi trong CartList
    pushListsToFirestore();
  }, [CartList, Information, pushListsToFirestore],);


  const changeUserInfo = () => {
    navigation.navigate('Infor');
  };

  const { t } = useTranslation(); // Use useTranslation hook
  const languageFromStore = useStore((state: any) => state.language); // Get language from useStore

  useEffect(() => {
    // Update i18n language to match language from useStore
    i18n.changeLanguage(languageFromStore);
  }, [languageFromStore]);
  return (
    <View style={styles.ScreenContainer}>
      <Header />
      <StatusBar backgroundColor={COLORS.thirdGreen} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <Text style={styles.infoTiTle}>{t('info')} </Text>
        <View style={styles.userInfo}>  
          <View style={styles.textContainer}>
            <Text style={styles.info}>{t('fullName')}: {fullName}</Text>
            <TouchableOpacity onPress={changeUserInfo}>
            <Icon  style={styles.icon} name='edit-square' size={25} color={COLORS.primaryGreenHex}/>
            </TouchableOpacity>            
          </View>        
          <View style={styles.text}>            
            <Text style={styles.infoText}>Email: {user}</Text>
            <Text style={styles.infoText}>{t('phone')}: {phoneNumber}</Text>
            <Text style={styles.infoText}>{t('address')}: {address}</Text>
          </View>   
        </View>
        <View
          style={[styles.ScrollViewInnerView , { marginBottom: 10 }]}>
          <View style={styles.ItemContainer}>
            {CartList.length == 0 ? (
              <EmptyListAnimation title={t('emptyCart')} />
            ) : (
              <View style={styles.ListItemContainer}>
                {CartList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <PaymentItem 
                      id={data.id}
                      name={data.name}
                      imagelink_square={data.imagelink_square}
                      special_ingredient={data.special_ingredient}
                      prices={data.prices}
                      type={data.type}
                      incrementCartItemQuantityHandler={incrementCartItemQuantityHandler}
                      decrementCartItemQuantityHandler={decrementCartItemQuantityHandler}
                      user={data.user}
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {CartList.length != 0 ? (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle={t('orderBtn')}
              price={{ price: CartPrice, currency: t('currency') }}
            />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
}


const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  ScrollViewFlex: {
    marginTop: 10,
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
  userInfo: {
    gap: SPACING.space_12,
    padding: SPACING.space_12,
    borderRadius: BORDERRADIUS.radius_25,
    backgroundColor: '#f8f8f8',
    marginBottom: 15,
    marginHorizontal: 20,  
    height: 200,   
    borderColor: '#B4BBCB',
    borderWidth: 1.2
  },
  infoText: {
    color: 'black',
    fontSize: 15,
    marginBottom: 5,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  infoTiTle: {
    color: 'black',
    marginBottom: 5,
    marginLeft: 10,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
  },
  saveButton: {
    alignItems: 'flex-end',  
    padding: 20,
    marginRight: 20,
    
  },
  saveText: {
    color: 'red'
  },
  icon: {
    width: 30,    
  },
  textContainer: {
    marginTop: 15,
    flexDirection: 'row',
    marginBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  info: {
    color: 'black',
    fontSize: 15,
    marginBottom: 5,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  text: {
    marginTop: -15,
  }
})

export default Payment