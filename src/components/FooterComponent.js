import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

export default function FooterComponent() {
  return (
    <View style={style.container}>
      <Text style={style.title}>Danh sách thành viên nhóm</Text>
      <Text style={style.text}>- Nguyễn Khả Nam</Text>
      <Text style={style.text}>- Đỗ Minh Thông</Text>
      <Text style={style.text}>- Nguyễn Phương Nam</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    paddingVertical: 30,
    backgroundColor: 'black',
    color: 'white',
    marginTop: 10,
    paddingHorizontal: 30,
  },
  text: {
    color: 'white',
  },
  title: {
    fontSize: 18,
    color: 'white',
    marginBottom: 10,
  },
});
