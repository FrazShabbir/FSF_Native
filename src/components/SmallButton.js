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

export const SmallButton = ({title}) => {
  return (
    <View style={style.container}>
      <Image
        style={style.btn}
        source={require('../assets/images/button1.png')}
      />
      <View style={style.title_view}>
        <Text style={style.title}>{title}</Text>
        <Image
          style={style.arrow}
          source={require('../assets/images/rightArrow.png')}
        />
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_view: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    color: color.palette.white,
    fontSize: 16,
  },
  btn: {
    width: '100%',
    borderRadius: 17,
    height: '100%',
    
  },
  arrow: {
    alignSelf: 'center',
    width: 18,
    height: 13,
    marginLeft: 5,
  },
});
