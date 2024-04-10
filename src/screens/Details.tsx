
import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Header from '../components/Header'
import { useStore } from '../store/store';
import { COLORS } from '../theme/theme';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImageBackgroundInfo from '../components/ImageBackgroundInfo';

const Details = ({ navigation, route }: any) => {
  console.log("routes =", route.params);
  const ItemOfIndex = useStore((state: any) =>
    route.params.type == 'Tea' ? state.TeaList : state.TeaList,
  )[route.params.index];

  const  BackHandler = () => {
    navigation.pop();
  };

  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore(
    (state: any) => state.deleteFromFavoriteList,
  );

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    
    favourite ? deleteFromFavoriteList(type, id) : addToFavoriteList(type, id);
    console.log("status", favourite, type, id )
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
          />
        </ScrollView>
        <Text>Details</Text>
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
    backgroundColor: 'lightyellow'
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
  }
})

export default Details
=======
import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'

const Details = () => {
  return (
    <View>
      <Header />
      <Text>Details</Text>
    </View>
  )
}



const styles = StyleSheet.create({})

export default Details

