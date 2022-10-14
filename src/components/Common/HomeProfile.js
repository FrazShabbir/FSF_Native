import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Profile from '../../assets/HomeAssets/Svgs/profilePhoto.svg';
import RightArrow from '../../assets/HomeAssets/Svgs/rightArrow.svg';
import { fontWeights } from '../../theme/styles';
import { color } from '../../theme';

export const HomeProfile = () => {
  return (
    <View style={style.container}>
      <View style={style.profile_view}>
        <Profile width={'100%'} height={'100%'} />
      </View>
      <TouchableOpacity style={style.name_container}>
        <View style={style.name_view}>
          <Text style={style.name}>M. Habib Ali</Text>
        </View>
        <View style={style.arrow_container}>
          <Text style={style.profile_text}>Profile</Text>
          <View style={style.arrow_view}>
            <RightArrow width={12} height={15} />
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    left: '5%',
  },
  profile_view: {
    width: '20%',
  },
  name_container: {
    flexDirection: 'column',
    left:2,
    alignSelf: 'flex-end',
  },
  name_view:{

  },
  name: {
    fontSize: 18,
    fontWeight:fontWeights.bold,
    color:color.palette.black
  },
  arrow_container: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom:3
  },
  profile_text:{
    fontSize:10,
    textAlign:"center",
    color:color.palette.black
  },
  arrow_view: {
    left:5,
          
  },
});
