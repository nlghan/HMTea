import React, { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    ImageProps,
    Image,
    TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import { useTranslation } from 'react-i18next';
import { useStore } from '../store/store';
import i18n from '../i18n/i18n';

interface CartItemProps {
    id: string;
    name: string;
    imagelink_square: ImageProps;
    special_ingredient: string;
    prices: any;
    type: string;
    user: string;
    incrementCartItemQuantityHandler: any;
    decrementCartItemQuantityHandler: any;
}

const PaymentItem: React.FC<CartItemProps> = ({
    id,
    name,
    imagelink_square,
    special_ingredient,
    prices,
    type,
    user,
    incrementCartItemQuantityHandler,
    decrementCartItemQuantityHandler,
}) => {
    const { t } = useTranslation(); // Use useTranslation hook
    const languageFromStore = useStore((state: any) => state.language); // Get language from useStore

    useEffect(() => {
        i18n.changeLanguage(languageFromStore);
    }, [languageFromStore]);

    return (
        <View>
            {prices.length != 1 ? (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryLightHex, COLORS.primaryGreenHex]}
                    style={styles.CartItemLinearGradient}>
                    <View style={styles.CartItemRow}>
                        <Image source={imagelink_square} style={styles.CartItemImage} />
                        <View style={styles.CartItemInfo}>
                            <View>
                                <Text style={styles.CartItemTitle}>{name}</Text>
                                <Text style={styles.CartItemSubtitle}>
                                    {special_ingredient}
                                </Text>
                            </View>
                        </View>
                    </View>
                    {prices.map((data: any, index: any) => (
                        <View
                            key={index.toString()}
                            style={styles.CartItemSizeRowContainer}>
                            <View style={styles.CartItemSizeValueContainer}>
                                <View style={styles.SizeBox}>
                                    <Text
                                        style={[
                                            styles.SizeText,
                                            {
                                                fontSize:
                                                    FONTSIZE.size_16,
                                            },
                                        ]}>
                                        {data.size}
                                    </Text>
                                </View>
                                <View style={styles.PriceTextContainer}>
                                    <Text style={styles.Price}>{prices[0].price}</Text>
                                    <Text style={styles.Currency}>{t('currency')}</Text>
                                </View>
                            </View>
                            <View style={styles.CartItemSizeValueContainer}>
                                <TouchableOpacity
                                    style={styles.CartItemIcon}
                                    onPress={() => {
                                        decrementCartItemQuantityHandler(id, data.size);
                                    }}>
                                    <CustomIcon
                                        name="minus"
                                        color={COLORS.primaryLightHex}
                                        size={FONTSIZE.size_10}
                                    />
                                </TouchableOpacity>
                                <View style={styles.CartItemQuantityContainer}>
                                    <Text style={styles.CartItemQuantityText}>
                                        {data.quantity}
                                    </Text>
                                </View>
                                <TouchableOpacity
                                    style={styles.CartItemIcon}
                                    onPress={() => {
                                        incrementCartItemQuantityHandler(id, data.size);
                                    }}>
                                    <CustomIcon
                                        name="add"
                                        color={COLORS.primaryLightHex}
                                        size={FONTSIZE.size_10}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </LinearGradient>
            ) : (
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    colors={[COLORS.primaryLightHex, COLORS.primaryGreenHex]}
                    style={styles.CartItemSingleLinearGradient}>
                    <View>
                        <Image
                            source={imagelink_square}
                            style={styles.CartItemSingleImage}
                        />
                    </View>
                    <View style={styles.CartItemSingleInfoContainer}>
                        <View>
                            <Text style={styles.CartItemTitle}>{name}</Text>
                            <Text style={styles.CartItemSubtitle}>{special_ingredient}</Text>
                        </View>
                        <View style={styles.CartItemSingleSizeValueContainer}>
                            <View style={styles.SizeBox}>
                                <Text
                                    style={[
                                        styles.SizeText,
                                        {
                                            fontSize:
                                                FONTSIZE.size_16,
                                        },
                                    ]}>
                                    {prices[0].size}
                                </Text>
                            </View>
                            <View style={styles.PriceTextContainer}>
                                <Text style={styles.Price}>{prices[0].price}</Text>
                                <Text style={styles.Currency}>{t('currency')}</Text>
                            </View>
                        </View>
                        <View style={styles.CartItemSingleQuantityContainer}>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => {
                                    decrementCartItemQuantityHandler(id, prices[0].size);
                                }}>
                                <CustomIcon
                                    name="minus"
                                    color={COLORS.primaryLightHex}
                                    size={FONTSIZE.size_10}
                                />
                            </TouchableOpacity>
                            <View style={styles.CartItemQuantityContainer}>
                                <Text style={styles.CartItemQuantityText}>
                                    {prices[0].quantity}
                                </Text>
                            </View>
                            <TouchableOpacity
                                style={styles.CartItemIcon}
                                onPress={() => {
                                    incrementCartItemQuantityHandler(id, prices[0].size);
                                }}>
                                <CustomIcon
                                    name="add"
                                    color={COLORS.primaryLightHex}
                                    size={FONTSIZE.size_10}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </LinearGradient>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    CartItemLinearGradient: {
        flex: 1,
        gap: SPACING.space_12,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemRow: {
        flexDirection: 'row',
        gap: SPACING.space_12,
        flex: 1,
    },
    CartItemImage: {
        height: 130,
        width: 130,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemInfo: {
        flex: 1,
        paddingVertical: SPACING.space_4,
        justifyContent: 'space-between',
    },
    CartItemTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryGreenHex,
    },
    CartItemSubtitle: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_12,
        color: COLORS.secondaryLightHex,
    },
    CartItemRoastedContainer: {
        height: 50,
        width: 50 * 2 + SPACING.space_20,
        borderRadius: BORDERRADIUS.radius_15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primaryDarkHex,
    },
    CartItemRoastedText: {
        fontFamily: FONTFAMILY.poppins_regular,
        fontSize: FONTSIZE.size_10,
        color: COLORS.primaryLightHex,
    },
    CartItemSizeRowContainer: {
        flex: 1,
        alignItems: 'center',
        gap: SPACING.space_20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    CartItemSizeValueContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    SizeBox: {
        backgroundColor: COLORS.yellow,
        height: 40,
        width: 80,
        borderRadius: BORDERRADIUS.radius_10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    SizeText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.secondaryLightHex,
    },
    SizeCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_18,
        color: COLORS.primaryOrangeHex,
    },
    SizePrice: {
        color: COLORS.primaryLightHex,
    },
    CartItemIcon: {
        backgroundColor: COLORS.primaryOrangeHex,
        padding: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_10,
    },
    CartItemQuantityContainer: {
        backgroundColor: '#f8f8f8',
        width: 80,
        borderRadius: BORDERRADIUS.radius_10,
        borderWidth: 2,
        borderColor: COLORS.primaryOrangeHex,
        alignItems: 'center',
        paddingVertical: SPACING.space_4,
        marginTop: 10
    },
    CartItemQuantityText: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.secondaryLightHex,
    },
    CartItemSingleLinearGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: SPACING.space_12,
        gap: SPACING.space_12,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CartItemSingleImage: {
        height: 150,
        width: 150,
        borderRadius: BORDERRADIUS.radius_20,
    },
    CartItemSingleInfoContainer: {
        flex: 1,
        alignSelf: 'stretch',
        justifyContent: 'space-around',
    },
    CartItemSingleSizeValueContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    CartItemSingleQuantityContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },
    PriceTextContainer: {
        flexDirection: 'row',
        alignItems: 'baseline',
    },
    Currency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryOrangeHex,
        paddingLeft: 4
    },
    Price: {
        fontFamily: FONTFAMILY.poppins_semibold,
        fontSize: FONTSIZE.size_16,
        color: COLORS.primaryDarkHex,
        paddingLeft: 15
    },
});

export default PaymentItem;
