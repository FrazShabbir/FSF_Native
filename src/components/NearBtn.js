import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {color, typography} from '../theme';
import RightArrow from '../assets/svg/rightArrow.svg';
export const NearBtn = ({title}) => {
  return (
    <LinearGradient
      useAngle={true}
      colors={[color.palette.darkblue, color.palette.lightBlue]}
      style={style.container}>
      <Text style={style.text}>{title}</Text>
      <View style={style.arrow_view}>
        <RightArrow width={'100%'} height={'100%'} />
      </View>
    </LinearGradient>
  );
};
const style = StyleSheet.create({
  container: {
    height: 32,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    fontSize:14,
    color: color.palette.white,
    fontFamily:typography.medium,
    
  },
  arrow_view: {
    marginLeft:4,
    width: 17,
    height:17
  },
});
