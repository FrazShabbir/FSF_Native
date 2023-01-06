import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {color, typography} from '../../theme';
import StatsIcon from '../../assets/HomeAssets/Svgs/appStatus.svg';
import GreenDot from '../../assets/HomeAssets/Svgs/greenDot.svg';
import {fontWeights} from '../../theme/styles';
import RedDot from '../../assets/HomeAssets/Svgs/redDot.svg';
import YellowDot from '../../assets/HomeAssets/Svgs/yellowDot.svg';

export const FormStatus = ({icon, status, title, date}) => {
  const selectIcon = () => {
    if (icon == 'stats') {
      return <StatsIcon width={'100%'} height={'100%'} />;
    }
  };
  const selectStatus = () => {
    if (status == 'approved') {
      return (
        <>
          <View style={style.dotView}>
            <GreenDot width={'100%'} height={'100%'} />
          </View>
          <Text style={style.status_text}>Accepted</Text>
        </>
      );
    } else if (status == 'rejected') {
      return (
        <>
          <View style={style.dotView}>
            <RedDot width={'100%'} height={'100%'} />
          </View>
          <Text style={[style.status_text, {color: color.palette.red}]}>
            Rejected
          </Text>
        </>
      );
    } else if (status == 'pending') {
      return (
        <>
          <View style={style.dotView}>
            <YellowDot width={'100%'} height={'100%'} />
          </View>
          <Text style={[style.status_text, {color: color.palette.yellow}]}>
            Pendding
          </Text>
        </>
      );
    }else{
      return<Text style={[style.status_text, {color: color.palette.darkblue}]}>
      {status}
    </Text>
    }
  };
  return (
    <View style={style.container}>
      <LinearGradient
        colors={[color.palette.darkblue, color.palette.lightBlue]}
        style={style.logo_view}>
        {selectIcon()}
      </LinearGradient>
      <View style={style.title_view}>
        <Text style={style.title}>{title}</Text>
        <Text style={style.date}>{date}</Text>
      </View>
      <View style={style.status_view}>{selectStatus()}</View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginTop: 20,
    borderBottomWidth: 1,
    height: 55,
    flexDirection: 'row',
  },
  logo_view: {
    width: 35,
    height: 35,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
  },
  title_view: {
    flex: 1,
    left: 8,
    justifyContent: 'center',
  },
  title: {
    //fontWeight: fontWeights.extraBold,
    fontSize: 14,
    color: color.palette.black,
    fontFamily:typography.demi,
    marginBottom:2
  },
  date: {
    //fontWeight: fontWeights.bold,
    fontSize: 12,
    color: color.palette.black,
    fontFamily:typography.Regular

  },
  status_view: {
    marginTop: 5,
    marginBottom: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dotView: {
    width: 12,
    height: 12,
  },
  status_text: {
    color: color.palette.green,
    //fontWeight: fontWeights.bold,
    marginLeft: 3,
    fontSize: 14,
    fontFamily:typography.demi
  },
});
