import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {color, typography} from '../theme';
import {fontWeights, globalStyles} from '../theme/styles';

export const Button = ({title, onPress, titleStyle}) => {
  return (
    <View style={style.container}>
      <Image
        style={style.btn}
        source={require('../assets/images/button1.png')}
      />
      <Text style={style.title}>{title}</Text>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: color.palette.white,
    position: 'absolute',
    fontSize: 20,
    fontWeight: fontWeights.extraBold,
  },
  btn: {
    width: '100%',
    borderRadius: 50,
  },
});
