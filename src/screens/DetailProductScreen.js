import React from 'react';
import {
  Text,
  SafeAreaView,
  StyleSheet,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import HeaderComponent from '../components/HeaderComponent';
import FooterComponent from '../components/FooterComponent';
import TitleComponent from '../components/TitleComponent';
import {moneyFomat} from '../helpers/helpers';
import {axiosInstance} from '../helpers/axiosInstance';
import LoadingComponent from '../components/LoadingComponent';
import {connect} from 'react-redux';
import ModalComponent from '../components/ModalComponent';
class DetailProductScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {},
      loading: true,
      modal: {
        visible: false,
        content: '',
      },
      isRefreshing: true,
    };
  }

  getData = () => {
    this.setState({isRefreshing: true});
    const {params} = this.props.route;
    this.setState({product: params.item});
    console.log(params);
    axiosInstance
      .get(`product/detail?product_id=${params.item.id}`)
      .then((res) => {
        console.log(res);
        this.setState({
          product: res.data.response,
          loading: false,
          isRefreshing: false,
        });
      })
      .catch((error) => {
        console.log('Api call error');
        alert(error.message);
      });
  };
  componentDidMount = () => {
    this.getData();
  };

  componentDidUpdate = () => {
    const {params} = this.props.route;
    if (params.item.id != this.state.product.id) {
      this.getData();
    }
  };

  _addToCart = () => {
    axiosInstance
      .post(
        `user/cart/add?product_id=${this.state.product.id}`,
        {},
        {headers: {Authorization: `Bearer ${this.props.authenticate.token}`}},
      )
      .then((res) => {
        this.setState({
          modal: {visible: true, content: 'Thêm thành công '},
        });
      });
  };
  _closeModal = () => {
    this.setState({
      modal: {visible: false},
    });
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <HeaderComponent
          navigation={this.props.navigation}
          tabBar={false}
          title={'Chi tiết sản phẩm'}
        />
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.isRefreshing}
              onRefresh={this.getData}
            />
          }>
          <Image
            style={styles.image}
            source={{uri: this.state.product.thumbnail}}
          />
          <TitleComponent title={'Thông tin sản phẩm'} />
          <View style={styles.container}>
            <Text style={styles.text}>
              Tên sản phẩm: {this.state.product.name}
            </Text>
            <Text style={styles.text}>
              Giá sản phẩm: {moneyFomat(parseInt(this.state.product.price))}
            </Text>
            <Text style={styles.text}>
              Mô tả: {this.state.product.description}
            </Text>
          </View>
          <View style={styles.containerButton}>
            <TouchableOpacity style={styles.button} onPress={this._addToCart}>
              <Text style={styles.textButton}>Thêm vào giỏ hàng</Text>
            </TouchableOpacity>
          </View>
          <FooterComponent />
          {this.state.loading && <LoadingComponent />}
          {this.state.modal.visible && (
            <ModalComponent
              status={true}
              content={this.state.modal.content}
              closeModal={this._closeModal}
            />
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
  image: {
    width: screen.width,
    height: 250,
  },
  container: {
    backgroundColor: 'white',
    padding: 30,
  },
  text: {
    fontSize: 15,
  },
  button: {
    backgroundColor: '#42B0FF',
    textAlign: 'center',
    padding: 20,
    width: screen.width / 2,
    borderRadius: 25,
  },
  containerButton: {
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
  },
  textButton: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
  },
});

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
  };
};

export default connect(mapStateToProps, null)(DetailProductScreen);
