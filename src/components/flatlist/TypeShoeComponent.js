import React from 'react';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
export default class TypeShoe extends React.Component {
  constructor(props) {
    super(props);
  }

  _goToCategoryScreen = () => {
    this.props.navigation.navigate('ProductList', {
      name: this.props.item.name,
    });
  };

  render() {
    return (
      <TouchableOpacity onPress={this._goToCategoryScreen}>
        <View style={style.container}>
          <Image
            source={{uri: this.props.item.thumbnail}}
            style={style.image}
          />
          <Text style={style.text}>{this.props.item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

const style = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 3,
    backgroundColor: 'white',
    textAlign: 'center',
    paddingVertical: 15,
  },
  image: {
    width: Dimensions.get('window').width / 3,
    height: 90,
    backgroundColor: 'white',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    paddingTop: 20,
  },
});
