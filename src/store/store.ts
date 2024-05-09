import { create } from 'zustand';
import { produce } from 'immer';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TeaData from '../data/teadata';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import TeaDataVi from '../data/teadatavi';
import TeaDataFr from '../data/teadatafr';

interface State {
  [x: string]: any;
  user: string;
  TeaList: any[];
  FavoriteList: any[];
  FavoriteListVi: any[]; // Danh sách yêu thích cho tiếng Việt
  FavoriteListFr: any[]; // Danh sách yêu thích cho tiếng Pháp
  CartList: any[];
  CartListVi: any[]; // Danh sách giỏ hàng cho tiếng Việt
  CartListFr: any[];
  OrderList: any[];
  OrderListVi: any[];
  OrderListFr: any[];
  fullName: string;
  address: string;
  phoneNumber: string;
  language: string;
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
      clearListsOnLogin: (email: any, language: string) => set(
        produce(state => {
          if (state.language !== language) {
            state.FavoriteList = [];
            state.CartList = [];
            state.language = language;
            state.TeaList = language === 'vi' ? TeaDataVi : language === 'fr' ? TeaDataFr : TeaData; // Check for French language
          }
        })
      ),
      login: async (email: string, language: string) => {
        const db = getFirestore();
        const userDocRef = doc(db, 'user', email);
      
        try {
          const userDocSnapshot = await getDoc(userDocRef);
      
          if (userDocSnapshot.exists()) {
            const userData = userDocSnapshot.data();
            
            if (userData && userData[language]) {
              const languageData = userData[language];
      
              const newState: any = {
                language: language,
                fullName: languageData.Information?.fullName || '',
                address: languageData.Information?.address || '',
                phoneNumber: languageData.Information?.phoneNumber || '',
                user: email,
              };
      
              // Kiểm tra và cập nhật danh sách yêu thích, giỏ hàng, và danh sách đơn hàng chỉ khi ngôn ngữ dữ liệu có sẵn
              if (languageData.TeaList) newState.TeaList = languageData.TeaList;
              if (languageData.FavoriteList) newState.FavoriteList = languageData.FavoriteList;
              if (languageData.CartList) newState.CartList = languageData.CartList;
              if (languageData.FavoriteListVi) newState.FavoriteListVi = languageData.FavoriteListVi;
              if (languageData.FavoriteListFr) newState.FavoriteListFr = languageData.FavoriteListFr;
              if (languageData.CartListVi) newState.CartListVi = languageData.CartListVi;
              if (languageData.CartListFr) newState.CartListFr = languageData.CartListFr;
              if (languageData.OrderList) newState.OrderList = languageData.OrderList;
              if (languageData.OrderListVi) newState.OrderListVi = languageData.OrderListVi;
              if (languageData.OrderListFr) newState.OrderListFr = languageData.OrderListFr;
      
              set(newState);
            } else {
              // Xử lý trường hợp không tìm thấy dữ liệu cho ngôn ngữ cụ thể, fallback về ngôn ngữ mặc định
              set((state: any) => ({
                ...state,
                language: language,
                FavoriteList: [],
                CartList: [],
                FavoriteListVi: [],
                FavoriteListFr: [],
                CartListVi: [],
                CartListFr: [],
                OrderList: [],
                OrderListVi: [],
                OrderListFr: [],
                fullName: '',
                address: '',
                phoneNumber: '',
                user: email,
                TeaList: language === 'vi' ? TeaDataVi : language === 'fr' ? TeaDataFr : TeaData,
              }));
            }
          } else {
            // Xử lý trường hợp không tìm thấy tài liệu người dùng
            set((state: any) => ({
              ...state,
              language: language,
              FavoriteList: [],
              CartList: [],
              FavoriteListVi: [],
              FavoriteListFr: [],
              CartListVi: [],
              CartListFr: [],
              OrderList: [],
              OrderListVi: [],
              OrderListFr: [],
              fullName: '',
              address: '',
              phoneNumber: '',
              user: email,
              TeaList: language === 'vi' ? TeaDataVi : language === 'fr' ? TeaDataFr : TeaData,
            }));
          }
        } catch (error) {
          console.error('Error fetching user data from Firestore:', error);
        }
      },

      addToFavoriteList: (type: string | string[], id: any, user: any) => set(
        produce(state => {
          if (type.includes('Tea') || type.includes('Trà') || type.includes('Thé')) {
            const teaToAdd = state.TeaList.find((tea: { id: any; }) => tea.id === id);
            if (teaToAdd) {
              if (!teaToAdd.favourite) {
                teaToAdd.favourite = true;
                state.FavoriteList.unshift({ ...teaToAdd, user });
              }
            }
          }
          if (state.language === 'en') {
            state.FavoriteList = [...state.FavoriteList];
          } else if (state.language === 'fr') {
            state.FavoriteListFr = [...state.FavoriteList];
          } else if (state.language === 'vi') {
            state.FavoriteListVi = [...state.FavoriteList];
          }
        })
      ),
      deleteFromFavoriteList: (type: string | string[], id: any, user: any) => set(
        produce(state => {
          if (type.includes('Tea') || type.includes('Trà') || type.includes('Thé')) {
            const teaToModify = state.TeaList.find((tea: { id: any; }) => tea.id === id);
            if (teaToModify) {
              teaToModify.favourite = !teaToModify.favourite;
            }
            const indexToRemove = state.FavoriteList.findIndex((item: { id: any; user: any; }) => item.id === id && item.user === user);
            if (indexToRemove !== -1) {
              state.FavoriteList.splice(indexToRemove, 1);
            }
          }
          if (state.language === 'en') {
            state.FavoriteList = [...state.FavoriteList];
          } else if (state.language === 'fr') {
            state.FavoriteListFr = [...state.FavoriteList];
          } else if (state.language === 'vi') {
            state.FavoriteListVi = [...state.FavoriteList];
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
            // Ánh xạ dữ liệu cho từng ngôn ngữ
            if (state.language === 'en') {
              state.CartList = [...state.CartList];
            } else if (state.language === 'fr') {
              state.CartListFr = [...state.CartList];
            } else if (state.language === 'vi') {
              state.CartListVi = [...state.CartList];
            }
          }),
        ),
      

      calculateCartPrice: () =>
        set(
          produce((state) => {
            let totalprice = 0;
            for (let i = 0; i < state.CartList.length; i++) {
              let tempprice = 0;
              for (let j = 0; j < state.CartList[i].prices.length; j++) {
                tempprice +=
                  parseFloat(state.CartList[i].prices[j].price) *
                  state.CartList[i].prices[j].quantity;
              }
              if (state.language === 'en' || state.language === 'fr') {
                state.CartList[i].ItemPrice = tempprice.toFixed(2).toString();
              } else {
                state.CartList[i].ItemPrice = tempprice.toString();
              }
              totalprice += tempprice;
            }
            if (state.language === 'en' || state.language === 'fr') {
              state.CartPrice = totalprice.toFixed(2).toString();
            } else {
              state.CartPrice = totalprice.toString();
            }
          })
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
          try {
            const state = get() as State;
            const { user, FavoriteList, FavoriteListVi, FavoriteListFr, CartList, CartListVi, CartListFr, OrderList, OrderListFr, OrderListVi, TeaList, fullName, address, phoneNumber, language } = state;
            const db = getFirestore();
            const userDocRef = doc(db, 'user', user);
          
            const languageDataMapping: any = {
              en: { TeaList, FavoriteList, CartList, OrderList },
              fr: { TeaList: TeaDataFr, FavoriteList: FavoriteListFr, CartList: CartListFr, OrderList: OrderListFr },
              vi: { TeaList: TeaDataVi, FavoriteList: FavoriteListVi, CartList: CartListVi, OrderList: OrderListVi }
            };
          
            await setDoc(userDocRef, { [language]: { ...languageDataMapping[language], Information: { fullName, address, phoneNumber } } }, { merge: true });
            console.log('Lists and Information pushed to Firestore successfully');
            
          } catch (error) {
            console.error('Error pushing lists and Information to Firestore:', error);
          }
        },
        
        
        addToOrderHistoryListFromCart: async () => {
          try {
            set(
              produce((state: State) => {
                const { language, CartList, CartListVi, CartListFr, OrderList, OrderListVi, OrderListFr } = state;
        
                // Kiểm tra xem languageCartList có phần tử không
                if (CartList.length === 0 && CartListVi.length === 0 && CartListFr.length === 0) {
                  console.error('Error adding order to history: languageCartList is empty');
                  return;
                }
        
                // Tính toán tổng giá trị của giỏ hàng
                state.calculateCartPrice();
        
                let totalPrice = parseFloat(state.CartPrice); // Sử dụng giá trị đã tính toán từ CartPrice
        
                let cartListPrice: string;
                if (language === 'fr' || language === 'en') {
                  cartListPrice = totalPrice.toFixed(2).toString();
                } else {
                  cartListPrice = totalPrice.toString();
                }
        
                // Thêm đơn hàng vào OrderList tương ứng với ngôn ngữ
                const newOrder = {
                  OrderDate: new Date().toDateString() + ' ' + new Date().toLocaleTimeString(),
                  CartList: language === 'vi' ? CartListVi : language === 'fr' ? CartListFr : CartList,
                  CartListPrice: cartListPrice,
                };
        
                // Cập nhật OrderList tương ứng với ngôn ngữ
                if (language === 'vi') {
                  state.CartListVi = []; // Reset CartListVi
                  state.OrderListVi = [newOrder, ...OrderListVi]; // Thêm đơn hàng vào OrderListVi
                  state.OrderList = [newOrder, ...OrderList]; // Cập nhật OrderList chung
                  state.CartListVi = []; 
                } else if (language === 'fr') {
                  state.CartListFr = []; // Reset CartListFr
                  state.OrderListFr = [newOrder, ...OrderListFr]; // Thêm đơn hàng vào OrderListFr
                  state.OrderList = [newOrder, ...OrderList]; // Cập nhật OrderList chung
                  state.CartListFr = []; 
                } else {
                  state.CartList = []; // Reset CartList
                  state.OrderList = [newOrder, ...OrderList]; // Thêm đơn hàng vào OrderList
                }
                state.CartListVi = []; 
                state.CartListFr = [];
                state.CartList = [];
              })
              
            );
          } catch (error) {
            console.error('Error adding order to history:', error);
          }
        }
      
    }),
    {
      name: 'HMTea',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )

);