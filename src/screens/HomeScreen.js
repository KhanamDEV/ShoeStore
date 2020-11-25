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
import TypeShoeComponent from '../components/flatlist/TypeShoeComponent';
import ProductComponent from '../components/flatlist/ProductComponent';
import TitleComponent from '../components/TitleComponent';
import {axiosInstance} from '../helpers/axiosInstance';
import LoadingComponent from '../components/LoadingComponent';

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newProduct: [],
      hotProduct: [],
      categories: [],
      loading: true,
    };
  }

  getData = () => {
    axiosInstance
      .get('product/new')
      .then((res) => {
        this.setState({
          newProduct: res.data.response.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log('Api call error');
        alert(error.message);
      });
    axiosInstance
      .get('product/hot')
      .then((res) => {
        this.setState({
          hotProduct: res.data.response.data,
          loading: false,
        });
      })
      .catch((error) => {
        console.log('Api call error');
        alert(error.message);
      });
    axiosInstance
      .get('categories')
      .then((res) => {
        this.setState({
          categories: res.data.response,
          loading: false,
        });
      })
      .catch((err) => {
        console.log('Api call error');
        alert(error.message);
      });
  };

  componentDidMount() {
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
    this.getData();
  }

  _test = () => {
    console.log('tét');
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <HeaderComponent
          tabBar={true}
          title={'Home page'}
          navigation={this.props.navigation}
        />
        <ScrollView>
          <Image
            style={styles.image}
            source={require('../assets/images/banner3.jpg')}
          />
          <TitleComponent title={'Hãng giày'} />
          <FlatList
            data={this.state.categories}
            renderItem={({item, index, separators}) => (
              <TypeShoeComponent
                item={item}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            horizontal={true}
          />
          <TitleComponent title={'Sản phẩm mới'} />
          <FlatList
            data={this.state.newProduct}
            renderItem={({item, index, separators}) => (
              <ProductComponent
                item={item}
                navigation={this.props.navigation}
              />
            )}
            keyExtractor={(item, index) => index.toString()}
            vertical={true}
            numColumns={2}
          />
          <Image
            style={styles.image}
            source={require('../assets/images/banner1.jpg')}
          />
          <TitleComponent title={'Sản phẩm nổi bật'} />
          <FlatList
            data={this.state.hotProduct}
            renderItem={({item, index, separators}) => (
              <ProductComponent
                item={item}
                navigation={this.props.navigation}
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
const dimensions = Dimensions.get('window');
const styles = StyleSheet.create({
  wrapper: {
    marginTop: 100,
    backgroundColor: 'red',
    height: 200,
  },
  image: {
    width: null,
    height: 150,
    resizeMode: 'cover',
  },
});
