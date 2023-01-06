import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import BlueDot from '../../assets/HomeAssets/Svgs/blueDot.svg';
import {fontWeights} from '../../theme/styles';
import GreenDot from '../../assets/HomeAssets/Svgs/greenDot.svg';
import RedDot from '../../assets/HomeAssets/Svgs/redDot.svg';

import {color, typography} from '../../theme';
import BackIcon from '../../assets/HomeAssets/Svgs/rightBack.svg';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import BackDown from '../../assets/HomeAssets/Svgs/backDown.svg';
import { useSelector } from 'react-redux';

export const HomeStatus = ({ callback, more,notRegister}) => {
  const navigate = useNavigation();
  const {HomeStats}=useSelector((state)=>state.UserReducer)
 
  const selectStatus = () => {
    if (HomeStats.status == 'pending') {
      return (
        <View style={style.status_view}>
          <View style={style.dot_view}>
            <BlueDot />
          </View>
          <Text style={style.status_text}>Pendding</Text>
        </View>
      );
    } else if (HomeStats.status == 'approved') {
      return (
        <View style={style.status_view}>
          <View style={style.dot_view}>
            <GreenDot />
          </View>
          <Text style={style.status_text}>Approved</Text>
        </View>
      );
    } else if (HomeStats.status == 'rejected') {
      return (
        <View style={style.status_view}>
          <View style={style.dot_view}>
            <RedDot />
          </View>
          <Text style={style.status_text}>Rejected</Text>
        </View>
      );
    } else {
      return (
        <View style={style.status_view}>
          <View style={style.dot_view}>
            <BlueDot />
          </View>
          <Text style={style.status_text}>{HomeStats.status}</Text>
        </View>
      );
    }
  };
  return (
    <View style={style.container}>
      {more ==0 ? (
        <View style={[style.title_container,{flexDirection:"row",padding:0,alignItems:"center",justifyContent:"space-between",width:"100%"}]}>
          <View>
          <Text style={[style.title,{fontSize:15}]}>Funeral Services Fund - FSF</Text>
          <Text style={[style.title,{fontSize:15}]}>Enrolment Form</Text>
          </View>
          <TouchableOpacity
            style={[style.status_view,{top:8,margin:0}]}
            onPress={() => navigate.navigate(RoutNames.EnrolAgreement)}>
            <Text
              style={[style.status_text, {textDecorationLine: 'underline'}]}>
              Register Now
            </Text>
            <View style={style.back_view}>
              <BackIcon width={'100%'} />
            </View>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={style.title_container}>
          <Text style={style.title}>FSF - Enrolment Status</Text>
          {more == 1 ? (
            <View
              style={{
                flexDirection: 'row',
                top: 8,
              }}>
              <Text style={style.title}>{HomeStats.name}</Text>
              {selectStatus()}
            </View>
          ) : (
            <TouchableOpacity
              onPress={() => callback()}
              style={{
                flexDirection: 'row',
                top:4,
                paddingTop: 8,
                paddingBottom:5,
                flexWrap:"wrap",
              }}>
              <Text style={style.title}>{HomeStats.name}</Text>
              <View
                style={{
                  justifyContent: 'center',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                {selectStatus()}
                  <View style={style.back_view}>
                    <BackDown width={'100%'} />
                  </View>
              </View>
            </TouchableOpacity>
          )}
        </View>
      )}
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
  title_container: {
    padding: 10,
    width: '110%',
    
  },
  title: {
    fontSize: 17,
    //fontWeight: fontWeights.extraBold,
    color: color.palette.black,
    fontFamily:typography.demi
  },
  status_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:20
  },
  dot_view: {
    right: 3,
  },
  back_view: {
    top: 1,
    width: 12,
    height: 14,
    marginLeft: 6,
  },
  status_text: {
    fontSize:14,
    color: color.palette.black,
    fontFamily:typography.demi,
  },
});
