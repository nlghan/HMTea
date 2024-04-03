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

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} options={{ animation: 'slide_from_bottom' }} />
      <Stack.Screen name="Register" component={Register} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Tab" component={TabNavigator} options={{ animation: 'slide_from_bottom' }} />
        <Stack.Screen name="Payment" component={Payment} options={{ animation: 'slide_from_bottom' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
