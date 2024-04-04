import React from 'react';
import {
  Dimensions,
  ImageBackground,
  ImageProps,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
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
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;

interface TeaCardProps {
  id: string;
  index: number;
  type: string;
  imagelink_square: ImageProps;
  name: string;
  special_ingredient: string;
  average_rating: number;
  price: any;
  buttonPressHandler: any;
}

const TeaCard: React.FC<TeaCardProps> = ({
  id,
  index,
  type,
  imagelink_square,
  name,
  special_ingredient,
  average_rating,
  price,
  buttonPressHandler,
}) => {
  return (
    <View style={styles.CardContainer}>
      <LinearGradient
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={styles.CardLinearGradientContainer}
        colors={[COLORS.primaryLightHex, COLORS.primaryGreenHex]}>
        <ImageBackground
          source={imagelink_square}
          style={styles.CardImageBG}
          resizeMode="cover">
          <View style={styles.CardRatingContainer}>
            <CustomIcon
              name={'star'}
              color={COLORS.whiteHex}
              size={FONTSIZE.size_16}
            />
            <Text style={styles.CardRatingText}>{average_rating}</Text>
          </View>
        </ImageBackground>
        <Text style={styles.CardTitle}>{name}</Text>
        <Text style={styles.CardSubtitle}>{special_ingredient}</Text>
        <View style={styles.CardFooterRow}>
          <Text style={styles.CardPriceCurrency}>
            $ <Text style={styles.CardPrice}>{price.price}</Text>
          </Text>
          <TouchableOpacity
            onPress={() => {
              buttonPressHandler({
                id,
                index,
                type,
                imagelink_square,
                name,
                special_ingredient,
                prices: [{...price, quantity: 1}],
              });
            }}>
            <BGIcon
              color={COLORS.whiteHex}
              name={'add'}
              BGColor={COLORS.primaryLightHex}
              size={FONTSIZE.size_10}
            />
          </TouchableOpacity>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  CardContainer: {
    height: CARD_WIDTH + 210, // Độ cao tùy chỉnh cho card
  },
  CardLinearGradientContainer: {
    padding: SPACING.space_15,
    borderRadius: BORDERRADIUS.radius_25,
    flex: 1,
  },
  CardImageBG: {
    width: CARD_WIDTH + 100,
    height: CARD_WIDTH +60,
    borderRadius: BORDERRADIUS.radius_20,
    marginBottom: SPACING.space_15,
    overflow: 'hidden',
  },
  CardRatingContainer: {
    flexDirection: 'row',
    backgroundColor: COLORS.secondaryBlackAlpha,
    alignItems: 'center',
    justifyContent: 'center',
    gap: SPACING.space_10,
    paddingHorizontal: SPACING.space_15,
    position: 'absolute',
    borderBottomLeftRadius: BORDERRADIUS.radius_20,
    borderTopRightRadius: BORDERRADIUS.radius_20,
    top: 0,
    right: 0,
  },
  CardRatingText: {
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.primaryLightHex,
    lineHeight: 22,
    fontSize: FONTSIZE.size_16,
  },
  CardTitle: {
    fontFamily: FONTFAMILY.poppins_bold,
    color: COLORS.blackHex,
    fontSize: FONTSIZE.size_18,
  },
  CardSubtitle: {
    fontFamily: FONTFAMILY.poppins_light,
    color: COLORS.blackHex,
    fontSize: FONTSIZE.size_14,
  },
  CardFooterRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: SPACING.space_10,
  },
  CardPriceCurrency: {
    fontFamily: FONTFAMILY.poppins_semibold,
    color: COLORS.whiteHex,
    fontSize: FONTSIZE.size_18,
  },
  CardPrice: {
    color: COLORS.whiteHex,
    fontSize: FONTSIZE.size_20
  },
});

export default TeaCard;
