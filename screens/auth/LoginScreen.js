import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
} from 'react-native';
import StyleCommon from '../../Helpers/styleCommon';
import {validateEmail, validatePassword} from '../../Helpers/validate';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      email: '',
      password: '',
      emailValid: {statusValid: false, messageValid: ''},
      passwordValid: {statusValid: false, messageValid: ''},
    };
  }

  _handleChangeInput = (name, value) => {
    let valid = name + 'Valid';
    this.setState({
      [name]: value,
      [valid]: {...this.state.valid, ...{statusValid: false}},
    });
  };

  _pressSubmit = () => {
    this.setState({
      emailValid: validateEmail(this.state.email),
      passwordValid: validatePassword(this.state.password),
    });
    console.log(this.state);
  };

  _changeScreen = () => {
    this.props.navigation.navigate('Register');
  };
  render() {
    return (
      <SafeAreaView style={style.container}>
        <View style={style.centerImage}>
          <Image
            source={require('../../assets/images/logo.png')}
            style={style.image}
          />
        </View>
        <Text style={{...style.centetText, ...StyleCommon.title}}>
          Đăng nhập
        </Text>
        <View>
          <View style={StyleCommon.viewInput}>
            <Text>Tài khoản</Text>
            <TextInput
              onChangeText={(value) => this._handleChangeInput('email', value)}
              style={StyleCommon.input}
              placeholder="Nhập email...."
              value={this.state.email}
            />
            {this.state.emailValid.statusValid && (
              <Text style={StyleCommon.validMessage}>
                {this.state.emailValid.messageValid}
              </Text>
            )}
          </View>
          <View style={StyleCommon.viewInput}>
            <Text>Mật khẩu</Text>
            <TextInput
              style={StyleCommon.input}
              placeholder="Nhập mật khẩu..."
              onChangeText={(value) =>
                this._handleChangeInput('password', value)
              }
              value={this.state.password}
            />
            {this.state.passwordValid.statusValid && (
              <Text style={StyleCommon.validMessage}>
                {this.state.passwordValid.messageValid}
              </Text>
            )}
          </View>
          <TouchableOpacity
            style={StyleCommon.button}
            onPress={this._pressSubmit}>
            <Text style={StyleCommon.textButton}>Đăng nhập</Text>
          </TouchableOpacity>
          <View style={style.moreoption}>
            <Text>Bạn chưa có tài khoản ?</Text>
            <Text onPress={this._changeScreen}>Đăng ký ngay</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 50,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  centerImage: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 50,
  },
  centetText: {
    textAlign: 'center',
    fontSize: 30,
  },
  moreoption: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 20,
  },
});
