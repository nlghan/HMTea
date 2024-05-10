import React, { useEffect, useState } from 'react';
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useTranslation } from 'react-i18next';
import i18n from '../i18n/i18n';
import Header from '../components/Header';
import OrderHistoryCard from '../components/OrderHistoryCard';
import { useStore } from '../store/store';
import { COLORS, SPACING, FONTFAMILY, FONTSIZE, BORDERRADIUS } from '../theme/theme';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import PopUpAnimation from '../components/PopUpAnimation';

const OrderHistory = ({ navigation }: any) => {
  const OrderHistoryList = useStore((state: any) => state.OrderListAll);
  const tabBarHeight = useBottomTabBarHeight();
  const [showAnimation, setShowAnimation] = useState(false);
  const pushListsToFirestore = useStore((state: any) => state.pushListsToFirestore);

  const navigationHandler = ({ index, id, type }: any) => {
    navigation.push('Details', {
      index,
      id,
      type,
    });
  };
  const buttonPressHandler = async () => {
    setShowAnimation(true); // Hiển thị hiệu ứng

    try {
      let htmlContent = `
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f0f0f0;
            font-size: 25;
          }
          .header {
            background-color: #2C683F;
            color: #fff;
            text-align: center;
            padding: 20px 0;
          }
          .order {
            margin: 20px 0;
            padding: 10px;
            border: 1px solid #ccc;
            background-color: #fff;
          }
          .order-date {
            font-weight: bold;
            margin-bottom: 10px;
            font-size: 20;
          }
          .order-item {
            margin-bottom: 5px;
            font-size: 20;
          }
          .special-ingredient {
            font-size: 20; /* Kích thước chữ mới cho thành phần đặc biệt */
          }
        </style>
        <div class="header">
          <h1>Order History</h1>
        </div>
      `;

      OrderHistoryList.forEach((data: any) => {
        htmlContent += `
          <div class="order">
            <div class="order-date">Date: ${data.OrderDate}</div>
            <div class="order-item">Total Amount: ${data.CartListPrice}</div>
            <div class="order-item">Products: 
              <ul>
                ${data.CartList.map((product: any) => `<li>${product.name} - ${product.ItemPrice} ${product.prices[0].currency}</li>`).join('')}
              </ul>
            </div>
            <div class="order-item special-ingredient">Special Ingredients:</div>
          <ul>
               ${data.CartList.map((product: any) => `<li class="special-ingredient">${product.special_ingredient}</li>`).join('')}
          </ul>
          </div>
        `;
      });

      const options = {
        html: htmlContent,
        fileName: 'OrderHistory',
        directory: 'Documents',
      };

      const pdf = await RNHTMLtoPDF.convert(options);
      //setShowAnimation(false); // Tắt hiệu ứng sau khi tạo và lưu PDF thành công
      //Alert.alert('PDF Saved', pdf.filePath);
    } catch (error) {
      console.error('Error creating PDF:', error);
      setShowAnimation(false); // Tắt hiệu ứng nếu có lỗi xảy ra
      Alert.alert('Error', 'Failed to create PDF');
    }
  };



  // Sử dụng setTimeout để tắt hiệu ứng sau 4 giây
  const showAnimationDuration = 4000;
  const hideAnimation = () => {
    setShowAnimation(false);
  };

  useEffect(() => {
    let timer = setTimeout(hideAnimation, showAnimationDuration);
    return () => {
      clearTimeout(timer);
    };
  }, [showAnimation]);


  const { t } = useTranslation();
  const languageFromStore = useStore((state: any) => state.language);

  useEffect(() => {
    // Update i18n language to match language from useStore
    i18n.changeLanguage(languageFromStore);
  }, [languageFromStore]);

  useEffect(() => {
    // Load data from Firestore when there are changes in OrderList, OrderListVi, or OrderListFr
    pushListsToFirestore();
  }, [OrderHistoryList]);

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
          style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          <View style={styles.ItemContainer}>
            {OrderHistoryList.length == 0 ? (
              <Text>No Order History</Text>
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
              <Text style={styles.ButtonText}>{t('download')}</Text>
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
    fontFamily: 'Inter-Bold',
    fontSize: FONTSIZE.size_18,
    color: COLORS.primaryDarkHex,
  },
  LottieAnimation: {
    height: 250,
  },

});

export default OrderHistory;
