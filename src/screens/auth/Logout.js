import React from 'react';
import {connect} from 'react-redux';
import {logout} from '../../redux/actions';
import styleCommon from '../../helpers/styleCommon';

import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';
class LogOut extends React.Component {
  constructor(props) {
    super(props);
  }

  _logout = () => {
    this.props.logout();
    this.props.navigation.navigate('Home');
  };

  _backToHome = () => {
    this.props.navigation.navigate('Home');
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Bạn chắc chắn muốn đăng xuất ?</Text>
        <View style={styles.viewButton}>
          <TouchableOpacity onPress={this._logout} style={styles.buttonLogout}>
            <Text style={styles.text}>Đăng xuất</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={this._backToHome} style={styles.buttonBack}>
          <Text>Quay lại trang chủ</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    flex: 1,
  },
  viewButton: {
    display: 'flex',
    justifyContent: 'center',
  },
  buttonLogout: {
    paddingHorizontal: 30,
    paddingVertical: 15,
    backgroundColor: '#42B0FF',
    borderRadius: 20,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    marginBottom: 100,
  },
  buttonBack: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: '#ccc',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 20,
  },
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(null, mapDispatchToProps)(LogOut);
