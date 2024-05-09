import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useEffect } from 'react';
import {
  BORDERRADIUS,
  COLORS,
  FONTFAMILY,
  FONTSIZE,
  SPACING,
} from '../theme/theme';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/store';
import i18n from '../i18n/i18n';


interface PriceProps {
  price: string;
  currency: string;
}

interface PaymentFooterProps {
  price: PriceProps;
  buttonPressHandler: any;
  buttonTitle: string;
}

const PaymentFooter: React.FC<PaymentFooterProps> = ({
  price,
  buttonPressHandler,
  buttonTitle,
}) => {
  const { t } = useTranslation(); // Use useTranslation hook
  const languageFromStore = useStore((state: any) => state.language); // Get language from useStore

  useEffect(() => {
    i18n.changeLanguage(languageFromStore);
  }, [languageFromStore]);
  return (
    <View style={styles.PriceFooter}>
      <View style={styles.PriceContainer}>
        <Text style={styles.PriceTitle}>{t('price')}</Text>
        <Text style={styles.PriceText}>
        <Text style={styles.Price}>{price.price} {t('currency')}</Text> 
         
           
        </Text>
      </View>
      <TouchableOpacity
        style={styles.PayButton}
        onPress={() => buttonPressHandler()}>
        <Text style={styles.ButtonText}>{buttonTitle}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  PriceFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,

    // paddingHorizontal: SPACING.space_20, // gap -> paddingHorizontal
  },
  PriceContainer: {
    alignItems: 'center',
    width: 220,
   
  },
  PriceTitle: {
    fontFamily: 'Inter-Bold',
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryDarkHex,
    marginLeft: -100
  },
  PriceTextContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    
    
  },
  Currency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_28,
    color: COLORS.primaryOrangeHex,
    
    
  },
  Price: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_20,
    color: COLORS.primaryDarkHex,
    
  },
  PriceText: {
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryDarkHex,
    width:180,
    
  },
  PayButton: {
    backgroundColor: COLORS.primaryGreenHex,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_36 * 1.8,
    borderRadius: BORDERRADIUS.radius_20,
    marginRight: SPACING.space_20, // Add marginLeft for spacing
    width: 180,
    marginLeft: -30
  },
  ButtonText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.primaryLightHex,
  },
});

export default PaymentFooter;
