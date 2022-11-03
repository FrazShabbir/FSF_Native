import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Profile from '../../assets/HomeAssets/Svgs/profilePhoto.svg';
import RightArrow from '../../assets/HomeAssets/Svgs/rightArrow.svg';
import { fontWeights } from '../../theme/styles';
import {color} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import { RoutNames } from '../../navigation/routeNames';
import { useSelector } from 'react-redux';

export const HomeProfile = () => {
  const {user}=useSelector((state)=>state.UserReducer)

  const navigate = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.profile_view}>
        <Image style={{width:"100%",height:"100%",borderRadius:50}} source={{uri:user.user.avatar}} />
      </View>
      <TouchableOpacity
        style={style.name_container}
        onPress={() => navigate.navigate(RoutNames.SettingScreen)}>
        <View style={style.name_view}>
          <Text style={style.name}>{user.user.full_name}</Text>
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
    width: 65,
    height:65,
  },
  name_container: {
    flexDirection: 'column',
    left: 5,
  },
  name_view: {},
  name: {
    fontSize: 18,
    fontWeight: fontWeights.bold,
    color: color.palette.black,
  },
  arrow_container: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 3,
  },
  profile_text: {
    fontSize: 12,
    textAlign: 'center',
    color: color.palette.black,
  },
  arrow_view: {
    left: 5,
  },
});
