import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import BlueDot from '../../assets/HomeAssets/Svgs/blueDot.svg';
import {fontWeights} from '../../theme/styles';
import GreenDot from '../../assets/HomeAssets/Svgs/greenDot.svg'
import RedDot from '../../assets/HomeAssets/Svgs/redDot.svg'

import {color} from '../../theme';
import BackIcon from '../../assets/HomeAssets/Svgs/rightBack.svg'
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RoutNames } from '../../navigation/routeNames';

export const HomeStatus = ({status}) => {
  const navigate=useNavigation()
  const selectStatus = () => {
    if (status == 'notRegister') {
      return (
        <TouchableOpacity style={style.status_view} onPress={()=>navigate.navigate(RoutNames.EnrollmentScreen)} >
          <Text style={style.status_text}>Register Now</Text>
          <View style={style.back_view}>
            <BackIcon width={"100%"} />
          </View>
        </TouchableOpacity>
      );
    } else if (status == 'pendding') {
      return (
        <View style={style.status_view}>
          <View style={style.dot_view}>
            <BlueDot />
          </View>
          <Text style={style.status_text}>Pendding</Text>
        </View>
      );
    } else if (status == 'accepted') {
      return (
        <View style={style.status_view}>
          <View style={style.dot_view}>
            <GreenDot />
          </View>
          <Text style={style.status_text}>Approved</Text>
        </View>
      );
    } else if(status == 'rejected') {
      return (
        <View style={style.status_view}>
          <View style={style.dot_view}>
            <RedDot />
          </View>
          <Text style={style.status_text}>Rejected</Text>
        </View>
      );
    }
  };
  return (
    <View style={style.container}>
      <View style={style.title_container}>
        <Text style={style.title}>Funeral Services Fund - FSF</Text>
        <Text style={style.title}>Enrolment Status</Text>
      </View>
      {selectStatus()}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 0.13,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  title_container: {},
  title: {
    fontSize: 15,
    fontWeight: fontWeights.extraBold,
    color: color.palette.black,
  },
  status_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot_view: {
    
    right: 3,
  },
  back_view:{
    width:12,
    height:14,
    left:2
  },
  status_text: {
    color: color.palette.black,
    fontWeight: fontWeights.bold,
  },
});
