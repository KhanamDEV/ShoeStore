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
import {validateEmail, validateName} from '../../helpers/validate';
import {updateUser} from '../../redux/actions';
import {axiosInstance} from '../../helpers/axiosInstance';
import {connect} from 'react-redux';

import LoadingComponent from '../../components/LoadingComponent';
import ModalMessage from '../../components/ModalComponent';

class UpdateScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      status: false,
      email: '',
      name: '',
      emailValid: {statusValid: false, messageValid: ''},
      nameValid: {statusValid: false, messageValid: ''},
      modal: {visible: false, content: ''},
      loading: false,
    };
  }

  componentDidMount = () => {
    this.setState({
      email: this.props.authenticate.user.email,
      name: this.props.authenticate.user.name,
    });
  };
  _changeStatusForm = () => {
    this.setState({
      status: !(
        this.state.emailValid.statusValid && this.state.nameValid.statusValid
      ),
    });
  };

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
      nameValid: validateName(this.state.name),
    });
    if (this.state.status) {
      this.setState({loading: true});
      axiosInstance
        .put(
          `user/update?email=${this.state.email}&name=${this.state.name}`,
          {},
          {
            headers: {Authorization: `Bearer ${this.props.authenticate.token}`},
          },
        )
        .then((res) => {
          if (res.data.meta.status === 200) {
            this.props.update({
              user: {name: this.state.name, email: this.state.email},
            });
          }
          this.setState({
            loading: false,
            modal: {visible: true, content: res.data.meta.message},
          });
        })
        .catch(() => {
          this.setState({
            loading: false,
            modal: {visible: true, content: 'Vui lòng thử lại !'},
          });
          console.log(this.state);
        });
    }
    console.log(this.state);
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
          <Image source={require('../../assets/images/logo.png')} />
        </View>
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
          <TouchableOpacity
            style={StyleCommon.button}
            onPress={this._pressSubmit}>
            <Text style={StyleCommon.textButton}>Cập nhật thông tin</Text>
          </TouchableOpacity>
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

const mapDispatchToProps = (dispatch) => {
  return {
    update: (user) => {
      dispatch(updateUser(user));
    },
  };
};

const mapStateToProps = (state) => {
  return {
    authenticate: state.authenticate,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateScreen);

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
    marginBottom: 30,
  },
});
