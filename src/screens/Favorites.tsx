import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Header from '../components/Header'

import {useStore} from '../store/store';
import {useBottomTabBarHeight} from '@react-navigation/bottom-tabs';
import {COLORS, SPACING} from '../theme/theme';
import FavoritesItemCard from '../components/FavoritesItemCard';
import EmptyListAnimation from '../components/EmptyListAnimation';

const Favorites = ({navigation}: any) => {
  const FavoritesList = useStore((state: any) => state.FavoriteList);
  const tabBarHeight = useBottomTabBarHeight();
  const user = useStore((state: any) => state.user);
  const addToFavoriteList = useStore((state: any) => state.addToFavoriteList);
  const deleteFromFavoriteList = useStore((state: any) => state.deleteFromFavoriteList);
  const pushListsToFirestore = useStore((state: any) => state.pushListsToFirestore);

  const ToggleFavourite = (favourite: boolean, type: string, id: string) => {
    if (favourite) {
      deleteFromFavoriteList(type, id, user); 
    } else {
      addToFavoriteList(type, id, user); 
    }
    console.log("status", favourite, type, id, user)
    pushListsToFirestore();
  };
  
  return (
    <View style={styles.ScreenContainer}>
      <Header/>
      <StatusBar backgroundColor={COLORS.thirdGreen} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}>
        <View
          style={[styles.ScrollViewInnerView, {marginBottom: tabBarHeight}]}>
          <View style={styles.ItemContainer}>

            {FavoritesList.length == 0 ? (
              <EmptyListAnimation title={'You have not seen anything!'} />
            ) : (
              <View style={styles.ListItemContainer}>
                {FavoritesList.map((data: any) => (
                  <TouchableOpacity
                    onPress={() => {
                      navigation.push('Details', {
                        index: data.index,
                        id: data.id,
                        type: data.type,
                      });
                    }}
                    key={data.id}>
                    <FavoritesItemCard
                      id={data.id}
                      imagelink_portrait={data.imagelink_portrait}
                      name={data.name}
                      special_ingredient={data.special_ingredient}
                      type={data.type}
                      ingredients={data.ingredients}
                      average_rating={data.average_rating}
                      ratings_count={data.ratings_count}
                      description={data.description}
                      favourite={data.favourite}
                      user={data.user}
                      ToggleFavouriteItem={(favourite: boolean, type: string, id: string) => ToggleFavourite(favourite, type, id)} 
                    />
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );

}


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
    gap: SPACING.space_20,
  },
})

export default Favorites
