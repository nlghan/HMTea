import { StyleSheet, Text, View, ImageProps, Image } from 'react-native';
import React, { useEffect } from 'react';
import LinearGradient from 'react-native-linear-gradient';
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

interface OrderItemCardProps {
    type: string;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    prices: any;
    ItemPrice: string;
    user: string;
}

const OrderItemCard: React.FC<OrderItemCardProps> = ({
    type,
    name,
    imagelink_square,
    special_ingredient,
    prices,
    ItemPrice,
    user,
}) => {
    const { t } = useTranslation(); // Use useTranslation hook
    const languageFromStore = useStore((state: any) => state.language); // Get language from useStore

    useEffect(() => {
        i18n.changeLanguage(languageFromStore);
    }, [languageFromStore]);

    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            colors={[COLORS.primaryLightHex, COLORS.primaryGreenHex]}
            style={styles.CardLinearGradient}>
            <View style={styles.CardInfoContainer}>
                <View style={styles.CardImageInfoContainer}>
                    <Image source={imagelink_square} style={styles.Image} />
                    <View>
                        <Text style={styles.CardTitle}>{name}</Text>
                        <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
                    </View>
                </View>
                {/* <View style={styles.price}>
                    <Text style={styles.Price}>{ItemPrice}</Text>
                    <Text style={styles.Currency}>{t('currency')}</Text>
                </View> */}
            </View>
            {prices.map((data: any, index: any) => (
                <View key={index.toString()} style={styles.CardTableRow}>
                    <View style={styles.CardTableRow}>
                        <View style={styles.SizeBoxLeft}>
                            <Text
                                style={[
                                    styles.SizeText,
                                    {
                                        fontSize:
                                            type == 'Bean' ? FONTSIZE.size_12 : FONTSIZE.size_12,
                                    },
                                ]}>
                                {data.size}
                            </Text>
                        </View>
                        <View style={styles.PriceBoxRight}>
                            <Text style={styles.PriceCurrency}>

                                <Text style={styles.Price1}> {data.price} {data.currency}</Text>
                            </Text>
                        </View>
                    </View>

                    <View style={styles.CardTableRow}>
                        <Text style={styles.CardQuantityPriceText}>
                            X <Text style={styles.Price}>{data.quantity}</Text>
                        </Text>
                        {languageFromStore !== 'vi' && (
                            <Text style={styles.CardQuantityPriceText}>
                                {(data.quantity * data.price).toFixed(2).toString()} {t('currency')}
                            </Text>
                        )}
                        {languageFromStore === 'vi' && (
                            <Text style={styles.CardQuantityPriceText}>
                                {data.quantity * data.price} {/* Không sử dụng toFixed nếu ngôn ngữ là 'vi' */}
                            </Text>
                        )}
                    </View>

                </View>
            ))}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    CardLinearGradient: {
        gap: SPACING.space_20,
        padding: SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CardInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    CardImageInfoContainer: {
        flexDirection: 'row',
        gap: SPACING.space_20,
        alignItems: 'center',
    },
    Image: {
        height: 90,
        width: 90,
        borderRadius: BORDERRADIUS.radius_15,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryDarkHex,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.primaryGreenHex,
    },
    CardCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_20,
        color: COLORS.primaryOrangeHex,
    },
    CardPrice: {
        color: COLORS.primaryDarkHex,
    },
    CardTableRow: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 360

    },
    SizeBoxLeft: {
        backgroundColor: COLORS.secondaryGreenHex,
        height: 45,
        flex: 1,
        borderTopLeftRadius: BORDERRADIUS.radius_10,
        borderBottomLeftRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRightWidth: 1,
        borderRightColor: COLORS.yellow,


    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryLightHex,

    },
    PriceBoxRight: {
        backgroundColor: COLORS.secondaryGreenHex,
        height: 45,
        flex: 1,
        borderTopRightRadius: BORDERRADIUS.radius_10,
        borderBottomRightRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
        borderLeftWidth: 1,
        borderLeftColor: COLORS.primaryGray,
    },
    PriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryLightHex,
    },
    Price: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryDarkHex,
        paddingLeft: 15
    },
    Price1: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: 11,
        color: COLORS.primaryLightHex,
        paddingLeft: 15
    },
    CardQuantityPriceText: {
        flex: 1,
        textAlign: 'center',
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,

    },
    Currency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
        paddingLeft: 4
    },
    price: {
        //backgroundColor:'lightyellow',
        flexDirection: 'row',
        marginLeft: 10

    }
});

export default OrderItemCard;
