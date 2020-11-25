import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Image,
  Keyboard,
} from 'react-native';
import {connect} from 'react-redux';

import StyleCommon from '../../helpers/styleCommon';
import {validateEmail, validatePassword} from '../../helpers/validate';
import {axiosInstance} from '../../helpers/axiosInstance';

import {signIn} from '../../redux/actions';

import ModalMessage from '../../components/ModalComponent';
import LoadingComponent from '../../components/LoadingComponent';
class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      email: '',
      password: '',
      emailValid: {statusValid: false, messageValid: ''},
      passwordValid: {statusValid: false, messageValid: ''},
      modal: {
        visible: false,
        content: '',
      },
      loading: false,
    };
  }

  _handleChangeInput = (name, value) => {
    let valid = name + 'Valid';
    this.setState({
      [name]: value,
      [valid]: {...this.state.valid, ...{statusValid: false}},
    });
    this._changeStatusForm();
  };

  _pressSubmit = () => {
    this.setState({
      emailValid: validateEmail(this.state.email),
      passwordValid: validatePassword(this.state.password),
    });
    if (this.state.status) {
      this.setState({loading: true});
      axiosInstance
        .post(
          `sign-in?email=${this.state.email}&password=${this.state.password}`,
        )
        .then((res) => {
          console.log(res);
          if (
            res.data.meta.status === 200 &&
            res.data.meta.message !== 'Wrong'
          ) {
            let userData = {
              status: true,
              token: res.data.response.token,
              user: {
                name: res.data.response.user.name,
                id: res.data.response.user.id,
                email: res.data.response.user.email,
              },
            };
            this.props.saveUser(userData);
            this.props.navigation.navigate('Home');
          } else {
            this.setState({
              loading: false,
              modal: {visible: true, content: res.data.meta.message},
            });
          }
          this.setState({loading: false});
        })
        .catch(() => {
          this.setState({
            loading: false,
            modal: {visible: true, content: 'Vui lòng thử lại'},
          });
        });
    }
  };

  _changeScreen = () => {
    this.props.navigation.navigate('Register');
  };

  _changeStatusForm = () => {
    this.setState({
      status: !(
        this.state.emailValid.statusValid &&
        this.state.passwordValid.statusValid
      ),
    });
  };

  _closeModal = () => {
    this.setState({
      modal: {visible: false},
    });
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
            <Text>Mật khẩu</Text>
            <TextInput
              style={StyleCommon.input}
              placeholder="Nhập mật khẩu..."
              onChangeText={(value) =>
                this._handleChangeInput('password', value)
              }
              value={this.state.password}
              secureTextEntry={true}
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
            <Text
              onPress={() => {
                console.log(this.props.authenticate);
              }}>
              Bạn chưa có tài khoản ?
            </Text>
            <Text onPress={this._changeScreen}>Đăng ký ngay</Text>
          </View>
        </View>
        {this.state.modal.visible && (
          <ModalMessage
            status={true}
            content={this.state.modal.content}
            closeModal={this._closeModal}
          />
        )}
        {this.state.loading && <LoadingComponent />}
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

const mapDispatchToProps = (dispatch) => {
  return {
    saveUser: (user) => {
      dispatch(signIn(user));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);
