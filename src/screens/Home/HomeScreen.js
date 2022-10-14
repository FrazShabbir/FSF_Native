import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {globalStyles} from '../../theme/styles';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeIcon.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';

import {
  HomeComponent,
  HomeProfile,
  HomeStatus,
  HomeDates,
  HomeEvent,
} from '../../components';
import {color} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';

export const HomeScreen = () => {
  const [status, setStatus] = useState('notRegister');

  const navigate = useNavigation();
  return (
    <View style={style.container}>
      <HomeComponent title={'Home'} />
      <HomeProfile />

      <HomeStatus status={status} />
      {status == 'notRegister' ? (
        <View style={style.not_register_conatiner}>
          <View style={style.not_register_view}>
            <Text style={style.not_register_text}>
              You are not Register Yet
            </Text>
          </View>
        </View>
      ) : (
        <HomeDates />
      )}
      {status == 'notRegister' ? (
        <View style={[style.bottom_container,{backgroundColor:color.palette.lightgray}]}>
          <View style={style.event_view}>
            <HomeEvent
              Icon={'circleArrow'}
              text={'Renew your subscription to continue you services'}
            />
          </View>
          <View style={style.event_view}>
            <HomeEvent
              Icon={'priceIcon'}
              text={'Upload your donation receipt with all requirement'}
            />
          </View>
          <View style={style.event_view}>
            <HomeEvent
              Icon={'doubleTick'}
              text={"See all your's and your family application with status"}
            />
          </View>
          <View style={style.event_view}>
            <HomeEvent
              Icon={'clockIcon'}
              text={
                'See all your previous records of forms and donation submission'
              }
            />
          </View>
        </View>
      ) : (
        <View style={[style.bottom_container, {}]}>
          <TouchableOpacity style={[style.event_view, {}]}>
            <HomeEvent
              Icon={'circleArrow'}
              text={'Renew your subscription to continue you services'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.event_view}>
            <HomeEvent
              Icon={'priceIcon'}
              text={'Upload your donation receipt with all requirement'}
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.event_view}>
            <HomeEvent
              Icon={'doubleTick'}
              text={"See all your's and your family application with status"}
            />
          </TouchableOpacity>
          <TouchableOpacity style={style.event_view}>
            <HomeEvent
              Icon={'clockIcon'}
              text={
                'See all your previous records of forms and donation submission'
              }
            />
          </TouchableOpacity>
        </View>
      )}
      <View style={style.bottom_tab_container}>
        <View style={style.icons_container}>
          <TouchableOpacity
            style={style.icons}
            onPress={() => navigate.navigate(RoutNames.HomeScreen)}>
            <HomeIcon width={'100%'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.icons}
            onPress={() => navigate.navigate(RoutNames.AboutScreen)}>
            <AboutIcon width={'100%'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.icons}
            onPress={() => navigate.navigate(RoutNames.PrivacyScreen)}>
            <PrivacyIcon width={'100%'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.icons}
            onPress={() => navigate.navigate(RoutNames.SettingScreen)}>
            <SettingIcon width={'100%'} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.lightBlue,
  },
  bottom_container: {
    flex: 0.53,
    backgroundColor: color.palette.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  event_view: {
    width: '43%',
    height: '47%',
  },

  bottom_tab_container: {
    flex: 0.08,
    backgroundColor: color.palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    width: '20%',
  },
  icons_container: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  not_register_conatiner: {
    flex: 0.04,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  not_register_view: {
    borderRadius: 20,
    backgroundColor: color.palette.red,
    bottom:6
  },
  not_register_text: {
    color: color.palette.white,
    padding:6,
    paddingLeft:8,
    paddingRight:8,

    fontSize:12
  },
});
