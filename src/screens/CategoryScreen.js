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
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import ProductComponent from '../components/flatlist/ProductComponent';
import TitleComponent from '../components/TitleComponent';
import {axiosInstance} from '../helpers/axiosInstance';
import LoadingComponent from '../components/LoadingComponent';

import {connect} from 'react-redux';
class CartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listProduct: [],
      loading: true,
    };
  }

  render() {
    const {params} = this.props.route;
    axiosInstance
      .get(`product/list?category=${params.name}`)
      .then((res) => {
        this.setState({
          listProduct: res.data.response.data,
          loading: false,
        });
      })
      .catch((err) => {
        console.log(err);
      });

    return (
      <SafeAreaView style={{flex: 1}}>
        <HeaderComponent
          tabBar={false}
          title={'Giỏ hàng'}
          navigation={this.props.navigation}
        />
        <ScrollView>
          <TitleComponent title={params.name} />
          <FlatList
            data={this.state.listProduct}
            renderItem={({item}) => (
              <ProductComponent
                navigation={this.props.navigation}
                item={item}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            vertical={true}
            numColumns={2}
          />
          <FooterComponent />
          {this.state.loading && <LoadingComponent />}
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
