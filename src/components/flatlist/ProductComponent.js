import React from 'react';

import {
  Image,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {moneyFomat} from '../../helpers/helpers';

class ProductComponent extends React.Component {
  constructor(props) {
    super(props);
  }
  _goToCategoryScreen = () => {
    this.props.navigation.navigate('DetailProduct', {
      item: this.props.item,
    });
  };
  render() {
    return (
      <TouchableOpacity onPress={this._goToCategoryScreen}>
        <View style={style.container}>
          <Image
            style={style.image}
            source={{uri: this.props.item.thumbnail}}
          />
          <Text style={style.text}>{this.props.item.name}</Text>
          <Text style={style.text}>
            {moneyFomat(parseInt(this.props.item.price))}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2 - 10,
    backgroundColor: 'white',
    textAlign: 'center',
    margin: 5,
    paddingBottom: 15,
  },
  image: {
    width: Dimensions.get('window').width / 2 - 10,
    height: 150,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20,
  },
});

export default ProductComponent;
