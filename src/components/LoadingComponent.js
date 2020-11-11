import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Dimensions} from 'react-native';

function LoadingComponent(props) {
  const [visible, setVisible] = useState(false);

  return (
    <View style={style.supetView}>
      <Image
        style={style.image}
        source={require('../assets/images/loading.gif')}
      />
    </View>
  );
}

const style = StyleSheet.create({
  supetView: {
    backgroundColor: 'rgba(52, 52, 52, 0.8)',
    position: 'absolute',
    top: 0,
    left: 0,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: 100,
  },
});

export default LoadingComponent;
