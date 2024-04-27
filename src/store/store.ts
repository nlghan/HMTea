import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TeaData from '../data/teadata';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';

interface State {
  user: string;
  TeaList: any[];
  CartPrice: number;
  FavoriteList: any[];
  CartList: any[];
  OrderList: any[];
  fullName: string;
  address: string;
  phoneNumber: string;
  clearListsOnLogin: (email: any) => void;
  login: (email: string) => void;
  addToFavoriteList: (type: string | string[], id: any, user: any) => void;
  addToCart: (cartItem: any, user: any) => void;
  pushListsToFirestore: () => Promise<void>;
}

export const useStore = create(
  persist(
    (set, get) => ({
      TeaList: TeaData,
      CartPrice: 0,
      FavoriteList: [],
      CartList: [],
      OrderList: [],
      fullName: '', // Thêm các trường thông tin mới
      address: '',
      phoneNumber: '',

      clearListsOnLogin: (email: any) => set(
        produce(state => {
          state.FavoriteList = [];
          state.CartList = [];
          state.OrderList = [];
        })
      ),
      login: async (email: string) => {
        const db = getFirestore();
        const userDocRef = doc(db, 'user', email);
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
          const userData = userDocSnapshot.data();
          set((state: any) => ({
            ...state,
            TeaList: userData.TeaData || TeaData,
            FavoriteList: userData.FavoriteList || [],
            CartList: userData.CartList || [],
            OrderList: userData.OrderList || [],
            fullName: userData.Information?.fullName || '',
            address: userData.Information?.address || '',
            phoneNumber: userData.Information?.phoneNumber || '',
            user: email,
            
          }));
        } else {
          set((state: any) => ({
            ...state,
            FavoriteList: [],
            CartList: [],
            OrderList: [],
            fullName: '',
            address: '',
            phoneNumber: '',
            user: email,
            TeaList: TeaData,
          }));
        }
      },
      
      addToFavoriteList: (type: string | string[], id: any, user: any) => set(
        produce(state => {
          if (type.includes('Tea')) {
            const teaToAdd = state.TeaList.find((tea: { id: any; }) => tea.id === id);
            if (teaToAdd) {
              if (!teaToAdd.favourite) {
                teaToAdd.favourite = true;
                state.FavoriteList.unshift({ ...teaToAdd, user });
              }
            }
          }
        })
      ),
      deleteFromFavoriteList: (type: string | string[], id: any, user: any) => set(
        produce(state => {
          if (type.includes('Tea')) {
            const teaToModify = state.TeaList.find((tea: { id: any; }) => tea.id === id);
            if (teaToModify) {
              teaToModify.favourite = !teaToModify.favourite;
            }
            const indexToRemove = state.FavoriteList.findIndex((item: { id: any; user: any; }) => item.id === id && item.user === user);
            if (indexToRemove !== -1) {
              state.FavoriteList.splice(indexToRemove, 1);
            }
          }
        })
      ),
      addToCart: (cartItem: any, user: any) =>
        set(
          produce(state => {
            let found = false;
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == cartItem.id) {
                found = true;
                let size = false;
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == cartItem.prices[0].size) {
                    size = true;
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
                if (size == false) {
                  state.CartList[i].prices.push(cartItem.prices[0]);
                }
                state.CartList[i].prices.sort((a: any, b: any) => {
                  if (a.size > b.size) {
                    return -1;
                  }
                  if (a.size < b.size) {
                    return 1;
                  }
                  return 0;
                });
                break;
              }
            }
            if (found == false) {
              // Thêm thông tin user vào cartItem
              cartItem.user = state.user;
              state.CartList.push(cartItem);
            }
          }),
        ),

      calculateCartPrice: () =>
        set(
          produce(state => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempprice =
                  tempprice +
                  parseFloat(state.CartList[i].prices[j].price) *
                  state.CartList[i].prices[j].quantity;
              }
              state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
              totalprice = totalprice + tempprice;
            }
            state.CartPrice = totalprice.toFixed(2).toString();
          }),
        ),

      incrementCartItemQuantity: (id: any, size: any) => // Chức năng tăng số lượng
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id && state.CartList[i].user == state.user) { // Đảm bảo chỉ tăng số lượng cho sản phẩm của người dùng hiện tại
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    state.CartList[i].prices[j].quantity++;
                    break;
                  }
                }
              }
            }
          }),
        ),

      decrementCartItemQuantity: (id: any, size: any) => // Chức năng giảm số lượng
        set(
          produce(state => {
            for (let i = 0; i < state.CartList.length; i++) {
              if (state.CartList[i].id == id && state.CartList[i].user == state.user) { // Đảm bảo chỉ giảm số lượng cho sản phẩm của người dùng hiện tại
                for (let j = 0; j < state.CartList[i].prices.length; j++) {
                  if (state.CartList[i].prices[j].size == size) {
                    if (state.CartList[i].prices.length > 1) {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList[i].prices.splice(j, 1);
                      }
                    } else {
                      if (state.CartList[i].prices[j].quantity > 1) {
                        state.CartList[i].prices[j].quantity--;
                      } else {
                        state.CartList.splice(i, 1);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }),
        ),
      pushListsToFirestore: async () => {
        const state = get() as State;
        const { user, FavoriteList, CartList, OrderList, TeaList, fullName, address, phoneNumber } = state;
        const db = getFirestore();
        const userDocRef = doc(db, 'user', user);

        const data = {
          TeaData: TeaList,
          FavoriteList,
          CartList,
          OrderList,
          Information: {  // Thêm trường thông tin người dùng
            fullName,
            address,
            phoneNumber
          }
        };

        try {
          await setDoc(userDocRef, data);
          console.log('Lists and Information pushed to Firestore successfully');
        } catch (error) {
          console.error('Error pushing lists and Information to Firestore:', error);
        }
      },
    }),
    {
      name: 'HMTea',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )

);