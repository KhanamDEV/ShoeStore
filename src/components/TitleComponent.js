import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function TitleComponent(props) {
  return (
    <View style={style.container}>
      <Icon name="caret-right" size={25} color="black" />
      <Text style={style.text}>{props.title}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    padding: 10,
    textTransform: 'uppercase',
  },
});
