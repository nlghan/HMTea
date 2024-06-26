import { View, Text, StyleSheet, Image, StatusBar, ScrollView, TouchableOpacity, TextInput, FlatList, Dimensions, ToastAndroid } from 'react-native';
import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import { BORDERRADIUS, COLORS, FONTFAMILY, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';
import TeaCard from '../components/TeaCard';
import { useTranslation } from 'react-i18next'; // Import hook useTranslation
import i18n from '../i18n/i18n';
import Icon from 'react-native-vector-icons/MaterialIcons';


const getCategoriesFromData = (data: any, currentLanguage: string) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].type] == undefined) {
      temp[data[i].type] = 1;
    } else {
      temp[data[i].type]++;
    }
  }
  let categories = Object.keys(temp);
  // Kiểm tra ngôn ngữ hiện tại và quyết định xem sử dụng "All" hay "Tất cả"
  const allText = currentLanguage === 'vi' ? 'Tất cả' : currentLanguage === 'fr' ? 'Tous' : 'All';
  categories.unshift(allText);
  return categories;
};


const getTeaList = (category: string, data: any) => {
  if (category === 'All' || category === 'Tất cả' || category === 'Tous') {
    return data;
  } else {
    let tealist = data.filter((item: any) => item.name.toLowerCase().includes(category.toLowerCase()));
    if (tealist.length === 0) {
      tealist = data.filter((item: any) => item.type.toLowerCase().includes(category.toLowerCase()));
    }
    return tealist.sort((a: { index: number; }, b: { index: number; }) => a.index - b.index);
  }
};




const Home = ({ navigation }: any) => {
  const TeaList = useStore((state: any) => state.TeaList);
  const addToCart = useStore((state: any) => state.addToCart);
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const language = useStore((state: any) => state.language)
  console.log("TeaList =", TeaList);
  const [categories, setCategories] = useState(getCategoriesFromData(TeaList, language))
  const [searchText, setSearchText] = useState('')
  const [categoriesIndex, setCategoriesIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedTea, setSortedTea] = useState(getTeaList(categoriesIndex.category, TeaList));
  const [showVoiceTab, setShowVoiceTab] = useState(false);
  const tabBarHeight = useBottomTabBarHeight();
  const { t } = useTranslation(); // Use useTranslation hook
  const languageFromStore = useStore((state: any) => state.language); // Get language from useStore

  useEffect(() => {
    // Update i18n language to match language from useStore
    i18n.changeLanguage(languageFromStore);
  }, [languageFromStore]);

  const ListRef: any = useRef<FlatList>();

  const searchTea = (search: string) => {
    if (search != '') {
      ListRef?.current?.scrollToOffset({
        animated: true,
        offset: 0,
      });
      setCategoriesIndex({ index: 0, category: categories[0] });
      setSortedTea([
        ...TeaList.filter((item: any) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        ),
      ]);
    }
  };

  const resetSearchTea = () => {
    ListRef?.current?.scrollToOffset({
      animated: true,
      offset: 0,
    });
    setCategoriesIndex({ index: 0, category: categories[0] });
    setSortedTea([...TeaList]);
    setSearchText('');
  };

  const TeaCardAddToCart = ({
    id,
    index,
    name,
    imagelink_square,
    special_ingredient,
    type,
    prices,
    user
  }: any) => {
    addToCart({
      id,
      index,
      name,
      imagelink_square,
      special_ingredient,
      type,
      prices,
      user
    }, user);
    calculateCartPrice();
    ToastAndroid.showWithGravity(
      `${name} ${t('addto')}`,
      ToastAndroid.SHORT,
      ToastAndroid.CENTER
    );
  };

  useEffect(() => {
    setCategories(getCategoriesFromData(TeaList, language));
    const filteredTea = getTeaList(categoriesIndex.category, TeaList);
    if (searchText !== '') {
      const searchResult = TeaList.filter((item: { name: string; }) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setSortedTea(searchResult);
    } else {
      setSortedTea(filteredTea);
    }
  }, [categoriesIndex, searchText, TeaList]);

 
  const handleVoiceSearch = () => {
    setShowVoiceTab(true);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.thirdGreen} />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>
        <View style={styles.slider}>
          <Image style={styles.slide} source={require("../assets/app_images/slide.png")} />
          <View style={styles.descript}>
            <Text style={styles.text2}>
            {t('pick')}
            </Text>
          </View>

          <View style={styles.sale}>
            <Text style={styles.text3}>{t('view')}</Text>
          </View>
        </View>

        <View style={styles.InputContainerComponent}>
          <TouchableOpacity
            onPress={() => {
              searchTea(searchText);
            }}>
            <CustomIcon
              style={styles.InputIcon}
              name="search"
              size={FONTSIZE.size_18}
              color={
                searchText.length > 0
                  ? COLORS.whiteHex
                  : COLORS.primaryLightHex
              }
            />
          </TouchableOpacity>          
          <TextInput
            placeholder={t('whatWould')}
            value={searchText}
            onChangeText={text => {
              setSearchText(text);
              searchTea(text);
            }}
            placeholderTextColor={COLORS.primaryLightHex}
            style={styles.TextInputContainer}
          />
          <TouchableOpacity onPress={handleVoiceSearch}>
            <Icon name='keyboard-voice' size={25}/>
          </TouchableOpacity>
        </View>       
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.CategoryScrollViewStyle}>
          {categories.map((data, index) => (
            <View
              key={index.toString()}
              style={styles.CategoryScrollViewContainer}>
              <TouchableOpacity
                style={styles.CategoryScrollViewItem}
                onPress={() => {
                  ListRef?.current?.scrollToOffset({
                    animated: true,
                    offset: 0,
                  });
                  setCategoriesIndex({ index: index, category: categories[index] });
                  setSortedTea([
                    ...getTeaList(categories[index], TeaList),
                  ]);
                }}>
                <Text
                  style={[
                    styles.CategoryText,
                    categoriesIndex.index == index
                      ? { color: COLORS.whiteHex }
                      : {},
                  ]}>
                  {data}
                </Text>
                {categoriesIndex.index == index ? (
                  <View style={styles.ActiveCategory} />
                ) : (
                  <></>
                )}
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        {/* Coffee Flatlist */}

        <FlatList
          ref={ListRef}
          horizontal
          ListEmptyComponent={
            <View style={styles.EmptyListContainer}>
              <Text style={styles.CategoryText}>{t('avai')}</Text>
            </View>
          }
          showsHorizontalScrollIndicator={false}
          data={sortedTea}
          contentContainerStyle={styles.FlatListContainer}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() => {

                  navigation.navigate('Details', {
                    index: item.index,
                    id: item.id,
                    type: item.type,
                    user: item.user,

                  });
                }}>
                <TeaCard
                  id={item.id}
                  index={item.index}
                  type={item.type}
                  imagelink_square={item.imagelink_square}
                  name={item.name}
                  special_ingredient={item.special_ingredient}
                  average_rating={item.average_rating}
                  price={item.prices[2]}
                  user={''}
                  buttonPressHandler={TeaCardAddToCart}
                  language={language} />
              </TouchableOpacity>
            );
          }}
        />


      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',

  },
  slider: {
    position: 'relative', // Để các phần tử bên trong có vị trí tương đối với slider
  },
  slide: {
    width: '100%',
    marginTop: 15,
  },
  sale: {
    backgroundColor: '#ED5151',
    width: 120,
    height: 30,
    position: 'absolute', // Để vị trí tuyệt đối với slider
    bottom: 20,
    left: 20,
    zIndex: 1000,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  descript: {
    backgroundColor: 'transparent',
    width: 300,
    height: 30,
    position: 'absolute',
    paddingHorizontal: 5,
    zIndex: 1000,
    top: 30, // Để văn bản nằm ở giữa chiều dọc của ảnh
    left: '68%', // Để văn bản nằm ở giữa chiều ngang của ảnh
    transform: [{ translateX: -150 }, { translateY: -15 }], // Để văn bản được căn giữa theo chiều ngang và dọc của ảnh
  },
  text3: {
    color: 'white',
    textAlign: 'center',
    fontSize: 20,
  },
  text2: {
    color: "#005A24",
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold'
  },
  ScrollViewFlex: {
    flexGrow: 1,
    paddingHorizontal: 15,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryGreenHex,
    alignItems: 'center',
    height: 50,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    color: 'white',
  },
  InputIcon: {
    marginHorizontal: SPACING.space_20,
  },
  TextInputContainer: {
    flex: 1,
    height: SPACING.space_20 * 3,
    fontFamily: FONTFAMILY.poppins_medium,
    fontSize: FONTSIZE.size_14,
    color: COLORS.secondaryLightHex,
    alignItems: 'center',
    justifyContent: 'center', // Chỉnh text nằm giữa chiều dọc
  },
  CategoryScrollViewStyle: {
    // paddingHorizontal: SPACING.space_20,
    marginTop: SPACING.space_20

  },
  CategoryScrollViewContainer: {
    paddingHorizontal: SPACING.space_15,
    height: 25
  },
  CategoryScrollViewItem: {
    alignItems: 'center',
  },
  CategoryText: {
    fontFamily: FONTFAMILY.poppins_semibold,
    fontSize: FONTSIZE.size_16,
    color: COLORS.secondaryLightHex,
    marginBottom: SPACING.space_4,
  },
  ActiveCategory: {
    height: SPACING.space_10,
    width: SPACING.space_10,
    borderRadius: BORDERRADIUS.radius_10,
    backgroundColor: COLORS.whiteHex,
  },
  FlatListContainer: {
    height: 400,
    gap: SPACING.space_20,

  },
  EmptyListContainer: {
    width: Dimensions.get('window').width - SPACING.space_30 * 2,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: SPACING.space_36 * 3.6,
  },
  CoffeeBeansTitle: {
    fontSize: FONTSIZE.size_18,
    marginLeft: SPACING.space_30,
    marginTop: SPACING.space_20,
    fontFamily: FONTFAMILY.poppins_medium,
    color: COLORS.secondaryLightHex,
  },

});

export default Home;