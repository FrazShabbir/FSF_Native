import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {color} from '../theme';
import Profile from '../assets/HomeAssets/Svgs/profilePhoto.svg';
import { fontWeights } from '../theme/styles';

export const Announce = () => {
  return (
    <View style={style.container}>
      <View style={style.photo}>
        <Profile width={'100%'} height={'100%'} />
      </View>
      <View style={style.text_container}>
        <Text style={style.title}>Update Privacy Policy</Text>
        <Text numberOfLines={2} style={style.desc}>Lorem ipsum dolor,sit annat connsenter</Text>
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

    color:color.palette.black,
    fontWeight:fontWeights.extraBold,

  },
  desc:{
    color:color.palette.black,
    
  }
});
