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
import {
  SafeAreaView,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
//import Screen
import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import EditUser from './src/screens/auth/EditUser';
import HomeScreen from './src/screens/HomeScreen';
import CategoryScreen from './src/screens/CategoryScreen';
import CartScreen from './src/screens/CartScreen';
import DetailProduct from './src/screens/DetailProductScreen';
import LogoutScreen from './src/screens/auth/Logout';
import {logout} from './src/redux/actions';

function customDrawer(props) {
  return (
    <SafeAreaView style={style.container}>
      <ScrollView>
        <TouchableOpacity
          style={style.button}
          onPress={() => props.navigation.navigate('Home')}>
          <Text>Trang chủ</Text>
        </TouchableOpacity>
        {!store.getState().authenticate.status && (
          <View>
            <TouchableOpacity
              style={style.button}
              onPress={() => props.navigation.navigate('Login')}>
              <Text>Đăng nhập</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.button}
              onPress={() => props.navigation.navigate('Register')}>
              <Text>Đăng ký</Text>
            </TouchableOpacity>
          </View>
        )}
        {store.getState().authenticate.status && (
          <View>
            <TouchableOpacity
              style={style.button}
              onPress={() => props.navigation.navigate('Cart')}>
              <Text>Giỏ hàng</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.button}
              onPress={() => props.navigation.navigate('Edit')}>
              <Text>Tài khoản</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={style.button}
              onPress={() => props.navigation.navigate('Logout')}>
              <Text>Đăng xuât</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
const Drawer = createDrawerNavigator();

const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => customDrawer(props)}>
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
          <Drawer.Screen name="Edit" component={EditUser} />
          <Drawer.Screen name="Cart" component={CartScreen} />
          <Drawer.Screen name="ProductList" component={CategoryScreen} />
          <Drawer.Screen name="DetailProduct" component={DetailProduct} />
          <Drawer.Screen name="Logout" component={LogoutScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 20,
  },
});

export default App;
