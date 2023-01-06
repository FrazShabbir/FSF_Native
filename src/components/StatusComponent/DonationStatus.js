import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {color, typography} from '../../theme';
import StatsIcon from '../../assets/HomeAssets/Svgs/appStatus.svg';
import GreenDot from '../../assets/HomeAssets/Svgs/greenDot.svg';
import {fontWeights} from '../../theme/styles';
import RedDot from '../../assets/HomeAssets/Svgs/redDot.svg';
import YellowDot from '../../assets/HomeAssets/Svgs/yellowDot.svg';
import RupeeSign from '../../assets/HomeAssets/Svgs/rupeeSignSmall.svg';

export const DonationStatus = ({icon, status, title, date, amount}) => {
  const selectIcon = () => {
    if (icon == 'rupee') {
      return <RupeeSign width={'100%'} height={'100%'} />;
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
    } else {
      return (
        <Text style={[style.status_text, {color: color.palette.darkblue}]}>
          {status}
        </Text>
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
        <Text style={style.amount}>€ {amount}</Text>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginTop: 20,
    borderBottomWidth: 1,
    height: 70,
    flexDirection: 'row',
    paddingBottom: 3,
  },
  title_container: {
    flex: 1,
    justifyContent:"center"
  },
  logo_view: {
    width:"13%",
    
    borderRadius: 10,
    padding: 8,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    
  },
  title_view: {
    flex: 1,
    marginLeft: 8,
    justifyContent: 'center',
    paddingTop:4,

  },
  title: {
    fontSize: 14,
    color: color.palette.black,
    fontFamily:typography.demi,
  },
  date: {
    fontSize: 12,
    color: color.palette.black,
    fontFamily:typography.Regular
  },
  status_view: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 8,
  },
  dotView: {
    width: 10,
    height: 10,
  },
  status_text: {
    color: color.palette.green,
    fontFamily:typography.demi,
    left: 3,
    fontSize: 12,
  },
  amount_view: {
    width: '15%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    fontSize:14,
    color: color.palette.black,
    fontFamily:typography.demi
  },
});
