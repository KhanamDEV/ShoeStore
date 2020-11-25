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
import {axiosInstance} from '../../helpers/axiosInstance';
class CartItemComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  _removeItem = () => {
    axiosInstance
      .delete(
        `cart/delete?id=${this.props.item.item_id}`,
        {},
        {
          headers: {Authorization: `Bearer ${this.props.token}`},
        },
      )
      .then((res) => {
        console.log(res);
        this.props.press();
      })
      .catch(() => {
        this.setState({
          loading: false,
          modal: {visible: true, content: 'Vui lòng thử lại !'},
        });
        console.log(this.state);
      });
  };

  render() {
    return (
      <TouchableOpacity
        onPress={() => {
          console.log(this.props.item.item_id);
        }}>
        <View style={style.container}>
          <Image
            style={style.image}
            source={{uri: this.props.item.thumbnail}}
          />
          <Text style={style.text}>{this.props.item.name}</Text>
          <Text style={style.text}>
            {moneyFomat(parseInt(this.props.item.price))}
          </Text>
          <View style={style.styleCenter}>
            <TouchableOpacity onPress={this._removeItem} style={style.button}>
              <Text style={style.textButton}>Xóa</Text>
            </TouchableOpacity>
          </View>
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
    paddingVertical: 15,
    margin: 5,
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
  button: {
    backgroundColor: '#2b2827',
    marginTop: 15,
    paddingVertical: 10,
    width: Dimensions.get('window').width / 3,
    borderRadius: 5,
  },
  textButton: {
    textAlign: 'center',
    color: 'white',
  },
  styleCenter: {
    display: 'flex',
    alignItems: 'center',
  },
});

export default CartItemComponent;
