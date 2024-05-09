import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import Header from '../components/Header';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PopUpAnimation from '../components/PopUpAnimation';
import OrderHistoryCard from '../components/OrderHistoryCard';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';

const OrderHistory = ({navigation}: any) => {
  const OrderHistoryList = useStore((state: any) => state.OrderList);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);
  const pushListsToFirestore = useStore((state: any) => state.pushListsToFirestore);

  const navigationHandler = ({index, id, type}: any) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };

  const buttonPressHandler = () => {
    setShowAnimation(true);
    setTimeout(() => {
      setShowAnimation(false);
    }, 2000);
  };

  const { t } = useTranslation(); // Use useTranslation hook
  const languageFromStore = useStore((state: any) => state.language); // Get language from useStore

  useEffect(() => {
    // Update i18n language to match language from useStore
    i18n.changeLanguage(languageFromStore);
  }, [languageFromStore]);

  useEffect(() => {
    pushListsToFirestore();
  }, [OrderHistoryList, pushListsToFirestore, languageFromStore]);

  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.thirdGreen} />
      <Header />

      {showAnimation ? (
        <PopUpAnimation
          style={styles.LottieAnimation}
          source={require('../lottie/download.json')}
        />
      ) : (
        <></>
      )}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>
          

            {OrderHistoryList.length == 0 ? (
              <EmptyListAnimation title={'No Order History'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {OrderHistoryList.map((data: any, index: any) => (
                  <OrderHistoryCard
                    key={index.toString()}
                    navigationHandler={navigationHandler}
                    CartList={data.CartList}
                    CartListPrice={data.CartListPrice}
                    OrderDate={data.OrderDate}
                  />
                ))}
              </View>
            )}
          </View>
          {OrderHistoryList.length > 0 ? (
            <TouchableOpacity
              style={styles.DownloadButton}
              onPress={() => {
                buttonPressHandler();
              }}>
              <Text style={styles.ButtonText}>Download</Text>
            </TouchableOpacity>
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  LottieAnimation: {
    height: 250,
  },
  ScrollViewFlex: {
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
    gap: SPACING.space_30,
  },
  DownloadButton: {
    margin: SPACING.space_20,
    backgroundColor: COLORS.primaryOrangeHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 2,
    borderRadius: BORDERRADIUS.radius_20,
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryDarkHex,
  },
});

export default OrderHistory;
