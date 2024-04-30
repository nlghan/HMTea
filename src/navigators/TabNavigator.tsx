import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../screens/Home';
import Favorites from '../screens/Favorites';
import Cart from '../screens/Cart';
import OrderHistory from '../screens/OrderHistory';
import CustomIcon from '../components/CustomIcon';
import { COLORS } from '../theme/theme';
import { BlurView } from '@react-native-community/blur';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarBackground: () => (
          <BlurView overlayColor='' blurAmount={15} style={styles.blurStyle} />
        ),
      }} initialRouteName='Home'
      >
      <Tab.Screen
        name='Home'
        component={Home}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="home"
              size={26}
              color={focused ? COLORS.primaryGreenHex : COLORS.primaryGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Cart'
        component={Cart}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="shopping-bag"
              size={26}
              color={focused ? COLORS.primaryGreenHex : COLORS.primaryGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name='Favorite'
        component={Favorites}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="favorite"
              size={26}
              color={focused ? COLORS.primaryGreenHex : COLORS.primaryGray}
            />
          ),
        }}
      />
      <Tab.Screen
        name='History'
        component={OrderHistory}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Icon
              name="notifications"
              size={26}
              color={focused ? COLORS.primaryGreenHex : COLORS.primaryGray}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBarStyle: {
    height: 80,
    position: 'absolute',
    backgroundColor: 'white',
    borderTopWidth: 0,
    elevation: 0,
    borderTopColor: 'transparent',
  },
  blurStyle: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default TabNavigator;
