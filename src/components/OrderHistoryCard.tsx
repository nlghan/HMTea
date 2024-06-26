import {
    StyleSheet,
    Text,
    Touchable,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, { useEffect } from 'react';
  import {COLORS, FONTFAMILY, FONTSIZE, SPACING} from '../theme/theme';
  import OrderItemCard from './OrderItemCard';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/store';
import i18n from '../i18n/i18n';
  interface OrderHistoryCardProps {
    navigationHandler: any;
    CartList: any;
    CartListPrice: string;
    OrderDate: string;
  }
  const OrderHistoryCard: React.FC<OrderHistoryCardProps> = ({
    navigationHandler,
    CartList,
    CartListPrice,
    OrderDate,
  }) => {

    const { t } = useTranslation(); // Use useTranslation hook
    const languageFromStore = useStore((state: any) => state.language); // Get language from useStore

    useEffect(() => {
        i18n.changeLanguage(languageFromStore);
    }, [languageFromStore]);

    const currency = CartList.length > 0 ? CartList[0].prices[0].currency : '';
    
    return (
      <View style={styles.CardContainer}>
        <View style={styles.CardHeader}>
          <View>
            <Text style={styles.HeaderTitle}>{t('orderTime')}</Text>
            <Text style={styles.HeaderSubtitle}>{OrderDate}</Text>
          </View>
          <View style={styles.PriceContainer}>
            <Text style={styles.HeaderTitle}>{t('total')}</Text>
            <Text style={styles.HeaderPrice}>{`${CartListPrice}${currency}`}</Text>
          </View>
        </View>
        <View style={styles.ListContainer}>
          {CartList.map((data: any, index: any) => (
            <TouchableOpacity
              key={index.toString() + data.id}
              onPress={() => {
                navigationHandler({
                  index: data.index,
                  id: data.id,
                  type: data.type,
                });
              }}>
              <OrderItemCard
                type={data.type}
                name={data.name}
                imagelink_square={data.imagelink_square}
                special_ingredient={data.special_ingredient}
                prices={data.prices}
                ItemPrice={data.ItemPrice}
                user={''} 
                currency={data.prices[0].currency}              />
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    CardContainer: {
      gap: SPACING.space_10,
    },
    CardHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      gap: SPACING.space_20,
      alignItems: 'center',
    },
    HeaderTitle: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_16,
      color: COLORS.primaryDarkHex,
    },
    HeaderSubtitle: {
      fontFamily: FONTFAMILY.poppins_light,
      fontSize: FONTSIZE.size_16,
      color: COLORS.primaryOrangeHex,
    },
    PriceContainer: {
      alignItems: 'flex-end',
    },
    HeaderPrice: {
      fontFamily: FONTFAMILY.poppins_semibold,
      fontSize: FONTSIZE.size_18,
      color: COLORS.primaryOrangeHex,
    },
    ListContainer: {
      gap: SPACING.space_20,
    },
  });
  
  export default OrderHistoryCard;
  