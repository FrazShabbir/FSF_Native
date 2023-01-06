import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {fontSizes, fontWeights, globalStyles} from '../../theme/styles';
import {color, typography} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import Back from '../../assets/svg/back.svg';
import SemiCircle from '../../assets/svg/semiCircle.svg';
import User from '../../assets/svg/user.svg';
import Email from '../../assets/svg/largeEmail.svg';
import Lock from '../../assets/svg/largeLock.svg';
import LockDot from '../../assets/svg/lockDot.svg';
export const Login_signup_Component = ({icon, title, description}) => {
  const selecticon = () => {
    if (icon === 'user') {
      return <User style={style.user} />;
    } else if (icon === 'email') {
      return <Email height={33} width={33} />;
    } else {
      return (
        <View>
          <Lock />
          <LockDot style={style.lock_dot} width={15} height={17} />
        </View>
      );
    }
  };
  const navigate = useNavigation();
  return (
    <View style={style.title_view}>
      <TouchableOpacity
        style={style.back_icon_view}
        onPress={() => {
          navigate.goBack();
        }}>
        <Back style={style.back_icon} />
      </TouchableOpacity>
      <View style={style.semi_circle_View}>
        <SemiCircle style={style.semi_cricle} />
      </View>
      <View style={style.user_title_view}>
        <View style={style.user_view}>{selecticon()}</View>
        <View style={style.page_title_view}>
          <Text style={style.page_title}>{title}</Text>
        </View>
        <View style={style.descr_view}>
          <Text numberOfLines={2} style={style.descr}>
            {description}
          </Text>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  title_view: {
    flex: 0.4,
    borderColor: 'black',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  back_icon_view: {
    padding: 25,
    alignSelf: 'flex-start',
  },
  back_icon: {},
  user_title_view: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  user_view: {
    marginTop: 60,
    borderRadius: 50,
    padding: 20,
    backgroundColor: color.palette.lightBlue,
  },
  user: {},
  page_title_view: {
    marginTop: 17,
  },
  page_title: {
    fontSize: fontSizes.biggest,
    color: color.palette.black,
    fontFamily: typography.demi,
   
    fontSize: 30,
  },
  descr_view: {
    width: '70%',
  },
  descr: {
    color: color.palette.lightgray,
    fontWeight: '300',
    textAlign: 'center',
    fontSize: 16,
    fontFamily:typography.medium

  },
  semi_circle_View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  semi_cricle: {
    width: 80,
  },
  lock_dot: {
    position: 'absolute',
    alignSelf: 'flex-end',
    top: 19.5,
    right: 5,
  },
});
