import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {color} from '../../theme';
import StatsIcon from '../../assets/HomeAssets/Svgs/appStatus.svg';
import GreenDot from '../../assets/HomeAssets/Svgs/greenDot.svg';
import {fontWeights} from '../../theme/styles';
import RedDot from '../../assets/HomeAssets/Svgs/redDot.svg';
import YellowDot from '../../assets/HomeAssets/Svgs/yellowDot.svg';
import RupeeSign from '../../assets/HomeAssets/Svgs/rupeeSign.svg';

export const DonationStatus = ({icon, status, title, date}) => {
  const selectIcon = () => {
    if (icon == 'rupee') {
      return <RupeeSign width={'100%'} height={'100%'} />;
    }
  };
  const selectStatus = () => {
    if (status == 'accepted') {
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
    } else if (status == 'pendding') {
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
    }
  };
  return (
    <View style={style.container}>
      <LinearGradient
        colors={[color.palette.darkblue, color.palette.lightBlue]}
        style={style.logo_view}>
        {selectIcon()}
      </LinearGradient>
      <View style={style.title_container}>
        <View style={style.title_view}>
          <Text style={style.title}>{title}</Text>
          <Text style={style.date}>{date}</Text>
        </View>
        <View style={style.status_view}>{selectStatus()}</View>
      </View>
      <View style={style.amount_view}>
        <Text style={style.amount}>100$</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginTop: 20,
    borderBottomWidth: 2,
    height: 70,
    flexDirection: 'row',
    paddingBottom:3
  },
  title_container: {
    flex: 1,
  },
  logo_view: {
    width: 35,
    height: 35,
    borderRadius: 10,
    padding: 5,
    marginTop: 5,
    marginBottom: 5,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title_view: {
    flex: 1,
    left: 8,
    justifyContent: 'center',
    
  },
  title: {
    fontWeight: fontWeights.extraBold,
    fontSize: 13,
    color: color.palette.black,
  },
  date: {
    fontWeight: fontWeights.bold,
    fontSize: 11,
    color: color.palette.black,
  },
  status_view: {
    flexDirection: 'row',
    alignItems: 'center',
    left: 8,
  },
  dotView: {
    width: 10,
    height: 10,
  },
  status_text: {
    color: color.palette.green,
    fontWeight: fontWeights.bold,
    left: 3,
    fontSize: 12,
  },
  amount_view:{
    width:"15%",
    justifyContent:"center",
    alignItems:"center"
  },
  amount:{
    fontWeight:fontWeights.extraBold,
    color:color.palette.black
  }
});
