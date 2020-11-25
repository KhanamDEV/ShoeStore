import {useNavigation, DrawerActions} from '@react-navigation/native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class HeaderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  _openNavigation = () => {
    this.props.navigation.dispatch(DrawerActions.openDrawer());
  };

  _backScreen = () => {
    this.props.navigation.goBack();
  };

  render() {
    return (
      <View style={style.container}>
        {this.props.tabBar && (
          <View style={style.position}>
            <Icon
              name="align-left"
              size={20}
              color="black"
              onPress={this._openNavigation}
            />
          </View>
        )}
        {!this.props.tabBar && (
          <View style={style.position}>
            <Icon
              name="chevron-left"
              size={20}
              color="black"
              onPress={this._backScreen}
            />
          </View>
        )}
        <Text>{this.props.title} </Text>
      </View>
    );
  }
}
const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    paddingVertical: 15,
    justifyContent: 'center',
  },
  position: {
    position: 'absolute',
    top: 15,
    left: 10,
  },
});
export default HeaderComponent;
