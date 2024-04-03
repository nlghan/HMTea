import { View, Text, StyleSheet, Image, StatusBar, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import React, { useState } from 'react';
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Header from '../components/Header';
import { BORDERRADIUS, COLORS, FONTSIZE, SPACING } from '../theme/theme';
import CustomIcon from '../components/CustomIcon';

const getCategoriesFromData = (data: any) => {
  let temp: any = {};
  for (let i = 0; i < data.length; i++) {
    if (temp[data[i].name] == undefined) {
      temp[data[i].name] = 1;
    } else {
      temp[data[i].name]++;
    }
  }
  let categories = Object.keys(temp);
  categories.unshift('All');
  return categories;
};

const getTeaList = (category: string, data: any) => {
  if (category == 'All') {
    return data;
  } else {
    let tealist = data.filter((item: any) => item.name == category);
    return tealist;
  }
};

const Home = () => {
  const TeaList = useStore((state: any) => state.TeaList);
  // console.log("TeaList =", TeaList.length);
  const [categories, setCategories] = useState(getCategoriesFromData(TeaList))
  const [searchText, setSearchText] = useState('')
  const [categoriesIndex, setCategoriesIndex] = useState({
    index: 0,
    category: categories[0],
  });
  const [sortedTea, setSortedTea] = useState(getTeaList(categoriesIndex.category, TeaList));
  const tabBarHeight = useBottomTabBarHeight();

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.thirdGreen} />
      <Header />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewFlex}>       
        <View style={styles.slider}>
          <Image style={styles.slide} source={require("../assets/app_images/slide.png")} />
          <View style={styles.descript}>
            <Text style={styles.text2}>Top pick for you</Text>
          </View>
          <View style={styles.sale}>
            <Text style={styles.text3}>Sale 30%</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.InputContainerComponent}>
          <CustomIcon style={styles.icon} name="search" size={18} color={searchText.length >0 ? COLORS.primaryGreenHex : COLORS.primaryLightHex  } />
          <TextInput
            style={styles.textInput}
            placeholder="Find your tea"
            placeholderTextColor={COLORS.primaryLightHex}
            onChangeText={(text) => setSearchText(text)}
            value={searchText}
          />
        </TouchableOpacity>
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
    left: '80%', // Để văn bản nằm ở giữa chiều ngang của ảnh
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
    fontSize: 20,
    fontWeight: 'bold'
  },
  ScrollViewFlex: {
    flexGrow: 1,
    paddingHorizontal:15,
  },
  InputContainerComponent: {
    flexDirection: 'row',
    borderRadius: BORDERRADIUS.radius_20,
    backgroundColor: COLORS.primaryGreenHex,
    alignItems: 'center',
    height: 40,
    paddingHorizontal: 10,
    marginTop: 15,
  },
  icon:{
    marginRight: 10,
  },
  textInput:{
    flex: 1,
    color: 'white',
  }

});

export default Home;
