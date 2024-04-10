
import {create} from 'zustand';
import {produce} from 'immer';
import {persist, createJSONStorage} from 'zustand/middleware';

import AsyncStorage from '@react-native-async-storage/async-storage';
import TeaData from '../data/teadata';

export const useStore = create(

  persist(
    (set, get) => ({
      TeaList: TeaData,
      CartPrice: 0,
      FavoriteList: [],
      CartList: [],
      OrderList: [],
      addToFavoriteList: () => {}, // Empty function for adding to favorites
      deleteToFavoriteList: () => {}, // Empty function for deleting from favorites
    }),
    {
      name: 'HMTea',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
