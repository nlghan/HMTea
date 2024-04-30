import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';

const Cart = ({ navigation }: any) => {
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const pushListsToFirestore = useStore((state: any) => state.pushListsToFirestore);
  const tabBarHeight = useBottomTabBarHeight();

  useEffect(() => {
    // Gọi hàm pushListsToFirestore khi có sự thay đổi trong CartList
    pushListsToFirestore();
  }, [CartList, pushListsToFirestore]);

  const buttonPressHandler = () => {
    navigation.push('Payment', { amount: CartPrice });
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

  const { t } = useTranslation(); // Use useTranslation hook
  const languageFromStore = useStore((state: any) => state.language); // Get language from useStore

  useEffect(() => {
    i18n.changeLanguage(languageFromStore);
  }, [languageFromStore]);

  return (
    <View style={styles.ScreenContainer}>
      <Header />
      <StatusBar backgroundColor={COLORS.thirdGreen} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
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
                    <CartItem
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
              buttonTitle={t('pay')}
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
})

export default Cart
