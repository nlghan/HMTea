import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useStore } from '../store/store';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';
import PaymentFooter from '../components/PaymentFooter';
import { useTranslation } from 'react-i18next'; // Import hook useTranslation
import i18n from '../i18n/i18n';

const Details = ({ navigation, route }: any) => {
  const ItemOfIndex = useStore((state: any) =>
    route.params.type == 'Tea' ? state.TeaList : state.TeaList,
  )[route.params.index];



  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const user = useStore((state: any) => state.user);

  const [price, setPrice] = useState(ItemOfIndex.prices[0]);
  const [fullDesc, setFullDesc] = useState(false);

  const { t } = useTranslation(); // Use useTranslation hook
  const languageFromStore = useStore((state: any) => state.language); // Get language from useStore

  useEffect(() => {
    // Update i18n language to match language from useStore
    i18n.changeLanguage(languageFromStore);
  }, [languageFromStore]);

  const addToCarthandler = ({
    id,
    index,
    name,
    imagelink_square,
    special_ingredient,
    type,
    price,
    user,
  }: any) => {
    addToCart({
      id,
      index,
      name,
      imagelink_square,
      special_ingredient,
      type,
      prices: [{...price, quantity: 1}],
      user
    }, user);
    calculateCartPrice();
    navigation.navigate('Cart');
  };


  const BackHandler = () => {
    navigation.pop();
  };

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);
  const pushListsToFirestore = useStore((state: any) => state.pushListsToFirestore);

  const ToggleFavourite = (favourite: boolean, type: string, id: string, user: string) => {
    if (favourite) {
      deleteFromFavoriteList(type, id, user); 
      console.log("statusDelete", favourite, type, id, user)// Call deleteFromFavoriteList from the store
    } else {
      addToFavoriteList(type, id, user);
      console.log("statusAdd", favourite, type, id, user) // Call addToFavoriteList from the store
    }
    console.log("status", favourite, type, id, user)
    pushListsToFirestore();
  };

  return (
    <>
      <Header />
      <View style={styles.container}>
        <StatusBar backgroundColor={COLORS.thirdGreen} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollView}>
          <ImageBackgroundInfo
            EnableBackHandler={true}
            imagelink_portrait={ItemOfIndex.imagelink_portrait}
            type={ItemOfIndex.type}
            id={ItemOfIndex.id}
            favourite={ItemOfIndex.favourite}
            name={ItemOfIndex.name}
            special_ingredient={ItemOfIndex.special_ingredient}
            ingredients={ItemOfIndex.ingredients}
            average_rating={ItemOfIndex.average_rating}
            ratings_count={ItemOfIndex.ratings_count}
            BackHandler={BackHandler}
            ToggleFavourite={ToggleFavourite} 
            user={user}          
            />
          <View style={styles.FooterInfoArea}>
          <Text style={styles.InfoTitle}>{t('description')}</Text>
          {fullDesc ? (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text style={styles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          ) : (
            <TouchableWithoutFeedback
              onPress={() => {
                setFullDesc(prev => !prev);
              }}>
              <Text numberOfLines={3} style={styles.DescriptionText}>
                {ItemOfIndex.description}
              </Text>
            </TouchableWithoutFeedback>
          )}
          <Text style={styles.InfoTitle}>{t('size')}</Text>
          <View style={styles.SizeOuterContainer}>
            {ItemOfIndex.prices.map((data: any) => (
              <TouchableOpacity
                key={data.size}
                onPress={() => {
                  setPrice(data);
                }}
                style={[
                  styles.SizeBox,
                  {
                    borderColor:
                      data.size == price.size
                        ? COLORS.primaryGreenHex
                        : COLORS.primaryDarkHex,

                    backgroundColor:
                    data.size == price.size
                        ? COLORS.yellow
                        : COLORS.primaryLightHex,
                  },
                ]}>
                <Text
                  style={[
                    styles.SizeText,
                    {
                      fontSize:
                        FONTSIZE.size_16,
  
                      color:
                      data.size == price.size
                      ? COLORS.primaryGreenHex
                      : COLORS.primaryDarkHex,
                    },
                  ]}>
                  {data.size}
                </Text>
              </TouchableOpacity>
            ))}
          </View>          
          </View>

          <PaymentFooter
          price={price}
          buttonTitle={t('Add')}
          buttonPressHandler={() => {
            addToCarthandler({
              id: ItemOfIndex.id,
              index: ItemOfIndex.index,
              name: ItemOfIndex.name,
              roasted: ItemOfIndex.roasted,
              imagelink_square: ItemOfIndex.imagelink_square,
              special_ingredient: ItemOfIndex.special_ingredient,
              type: ItemOfIndex.type,
              price: price,
              user: user,
            });
          }}
        />


        </ScrollView>
        
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    paddingHorizontal: 15
  },
  scrollView: {
    flexGrow: 1,
    //backgroundColor: 'lightyellow'
  },
  subHeader: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 5
  },
  subHeaderText: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: 'black',
  },
  FooterInfoArea: {
    padding: SPACING.space_16,
  },
  InfoTitle: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: 'black',
    marginBottom: SPACING.space_10,
  },
  DescriptionText: {
    letterSpacing: 0.5,
    fontFamily: FONTFAMILY.poppins_regular,
    fontSize: FONTSIZE.size_14,
    color: 'black',
    marginBottom: SPACING.space_30,
  },
  SizeOuterContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: SPACING.space_20,
  },
  SizeBox: {
    flex: 1,
    // backgroundColor: COLORS.yellow,
    alignItems: 'center',
    justifyContent: 'center',
    height: SPACING.space_24 * 2,
    borderRadius: BORDERRADIUS.radius_10,
    borderWidth: 1,
  },
  SizeText: {
    fontFamily: FONTFAMILY.poppins_medium,
  },

})

export default Details;
