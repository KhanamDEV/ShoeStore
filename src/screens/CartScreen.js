import React from 'react';

import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  FlatList,
  Dimensions,
  ScrollView,
  LogBox,
  RefreshControl,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import CartItemComponent from '../components/flatlist/CartItemComponent';
import TitleComponent from '../components/TitleComponent';
import {axiosInstance} from '../helpers/axiosInstance';
import LoadingComponent from '../components/LoadingComponent';
import {connect} from 'react-redux';
class CartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: [],
      loading: true,
      isRefreshing: false,
    };
  }
  getData = () => {
    this.setState({isRefreshing: true});
    axiosInstance.get('listcart?user_id=1').then((res) => {
      this.setState({
        product: res.data.response.data,
        isRefreshing: false,
      });
    });
  };
  componentDidMount = () => {
    this.getData();
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <HeaderComponent
          tabBar={true}
          title={'Giỏ hàng'}
          navigation={this.props.navigation}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.getData}
            />
          }>
          <TitleComponent title={'Danh sách '} />
          <FlatList
            data={this.state.product}
            renderItem={({item}) => (
              <CartItemComponent
                token={this.props.authenticate.token}
                item={item}
                press={this.getData}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            vertical={true}
            numColumns={2}
          />
          <FooterComponent />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
  };
};

export default connect(mapStateToProps, null)(CartScreen);
