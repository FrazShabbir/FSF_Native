import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {color, typography} from '../theme';
import Profile from '../assets/HomeAssets/Svgs/profilePhoto.svg';
import { fontWeights } from '../theme/styles';

export const Announce = ({
  title,
  shortDesc
}) => {
  return (
    <View style={style.container}>
      <View style={style.photo}>
        <Profile width={'100%'} height={'100%'} />
      </View>
      <View style={style.text_container}>
        <Text style={style.title}>{title}</Text>
        <Text numberOfLines={2} style={style.desc}>{shortDesc}</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    height: 90,
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: color.palette.lightBlue,
    marginTop:10,
    justifyContent: 'center',
    padding:10
  },
  photo: {
    width: '18%',
    height: '80%',
    alignSelf:'center'
  },
  text_container: {
    width: '80%',
    justifyContent:"center",
    left:5
  },
  title:{
    fontSize:16,
    color:color.palette.black,
    //fontWeight:fontWeights.extraBold,
    fontFamily:typography.demi


  },
  desc:{
    color:color.palette.black,
    fontFamily:typography.Regular

    
  }
});
