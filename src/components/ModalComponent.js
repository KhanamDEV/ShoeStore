import React, {useState, useEffect} from 'react';
import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  Dimensions,
} from 'react-native';
import CommonStyle from '../helpers/styleCommon';
function ModalMessage(props) {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(props.status);
  }, [props]);

  return (
    <Modal
      style={style.modal}
      visible={modalVisible}
      animationType="slide"
      transparent={true}>
      <View style={style.superView}>
        <View style={style.contentModal}>
          <Text style={CommonStyle.textCenter}>{props.title}</Text>
          <Text style={CommonStyle.textCenter}>{props.content}</Text>
          <TouchableOpacity
            style={CommonStyle.button}
            onPress={() => {
              setModalVisible(false);
              props.closeModal();
            }}>
            <Text
              style={{...CommonStyle.textCenter, ...CommonStyle.textButton}}>
              OK
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const style = StyleSheet.create({
  modal: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  contentModal: {
    backgroundColor: 'white',
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderRadius: 30,
    width: Dimensions.get('window').width - 80,
  },
  superView: {
    alignContent: 'center',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});

export default ModalMessage;
