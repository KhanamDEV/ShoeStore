/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
//import Screen
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import EditUser from './src/screens/auth/EditUser';
import HomeScreen from './src/screens/HomeScreen';

const Drawer = createDrawerNavigator();
const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
          <Drawer.Screen name="Edit" component={EditUser} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
