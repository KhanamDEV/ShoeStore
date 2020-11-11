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
import StyleCommon from '../../helpers/styleCommon';
import {
  validateEmail,
  validatePassword,
  validateName,
} from '../../helpers/validate';
export default class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      email: '',
      password: '',
      name: '',
      newPassword: '',
      emailValid: {statusValid: false, messageValid: ''},
      passwordValid: {statusValid: false, messageValid: ''},
      nameValid: {statusValid: false, messageValid: ''},
      newPasswordValid: {statusValid: false, messageValid: ''},
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
      nameValid: validateName(this.state.name),
    });
    console.log(this.state);
  };

  render() {
    return (
      <SafeAreaView style={style.container}>
        <Text style={{...style.centetText, ...StyleCommon.title}}>
          Cập nhật thông tin
        </Text>
        <View>
          <View style={StyleCommon.viewInput}>
            <Text>Tên người dùng</Text>
            <TextInput
              onChangeText={(value) => this._handleChangeInput('name', value)}
              style={StyleCommon.input}
              placeholder="Nhập tên người dùng...."
              value={this.state.name}
            />
            {this.state.emailValid.statusValid && (
              <Text style={StyleCommon.validMessage}>
                {this.state.nameValid.messageValid}
              </Text>
            )}
          </View>
          <View style={StyleCommon.viewInput}>
            <Text>Email</Text>
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
            <Text>Mật khẩu cũ</Text>
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
          <View style={StyleCommon.viewInput}>
            <Text>Mật khẩu mới</Text>
            <TextInput
              style={StyleCommon.input}
              placeholder="Nhập mật khẩu..."
              onChangeText={(value) =>
                this._handleChangeInput('password', value)
              }
              value={this.state.newPassword}
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
            <Text style={StyleCommon.textButton}>Cập nhật thông tin</Text>
          </TouchableOpacity>
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
    marginBottom: 20,
  },
  centetText: {
    textAlign: 'center',
    fontSize: 30,
  },
});
