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
import RightArrow from '../assets/svg/rightArrow.svg'
import SmButton from '../assets/svg/smallButton.svg'
export const SmallButton = ({title}) => {
  return (
    <View style={style.container}>
      <SmButton width={150} height={38}/>
      <View style={style.title_view}>
        <Text style={style.title}>{title}</Text>
       <RightArrow style={style.arrow} width={22} height={13} />
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
    paddingLeft:10,
    paddingRight:10,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    color: color.palette.white,
    fontSize: 16,
    fontFamily:typography.medium
  },
  btn: {
    width: '100%',
    borderRadius: 17,
    height: '100%',
    
  },
  arrow: {
    alignSelf: 'center',
   
    marginLeft: 5,
  },
});
