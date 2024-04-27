/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import Home from './src/screens/Home';
import Details from './src/screens/Details';
import Payment from './src/screens/Payment';
import TabNavigator from './src/navigators/TabNavigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Register from './src/screens/Register';
import PersonalInfo from './src/screens/PersonalInfo';
// import Information from './src/screens/InformationEx';
import Header from './src/components/Header';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Register" component={Register} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Info" component={PersonalInfo} options={{ animation: 'slide_from_bottom' }} /> 
        <Stack.Screen name="Home" component={Home} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Header" component={Header} options={{ animation: 'slide_from_bottom' }} />     
        <Stack.Screen name="Tab" component={TabNavigator} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Details" component={Details} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Payment" component={Payment} options={{ animation: 'slide_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;