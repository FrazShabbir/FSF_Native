import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import Event from '../../assets/HomeAssets/Svgs/eventShape.svg';
import LinearGradient from 'react-native-linear-gradient';
import {color, typography} from '../../theme';
import CicularArrow from '../../assets/HomeAssets/Svgs/circularArrow.svg';
import RightArrow from '../../assets/HomeAssets/Svgs/bigRightArrow.svg';
import PriceIcon from '../../assets/HomeAssets/Svgs/rupeeSign.svg';
import DoubleTick from '../../assets/HomeAssets/Svgs/doubleTick.svg';
import Clock from '../../assets/HomeAssets/Svgs/clockCircle.svg';
import Tick from '../../assets/HomeAssets/Svgs/ticktick.svg';
import Peoples from '../../assets/HomeAssets/Svgs/peoples.svg'
export const HomeEvent = ({text, Icon}) => {
  const selectIcon = () => {
    if (Icon == 'circleArrow') {
      return <CicularArrow width={'100%'}  />;
    } else if (Icon == 'priceIcon') {
      return <PriceIcon width={'100%'} />;
    } else if (Icon == 'doubleTick') {
      return <DoubleTick width={'100%'} />;
    } else if (Icon == 'clockIcon') {
      return (
        <View style={style.clock_container}>
          <Clock width={'100%'} />
          <View style={style.ticktick_view}>
            <Tick width={'100%'} />
          </View>
        </View>
      );
    } else if(Icon=="peoples"){
     return <Peoples width={"100%"} />
    }
  };
  return (
    <LinearGradient
      colors={[color.palette.darkblue, color.palette.mix]}
      style={style.container}>
      <View style={style.cicularArrow_view}>{selectIcon()}</View>
      <View style={style.text_view}>
        <Text style={style.text}>{text}</Text>
      </View>
      <View style={style.arrow_view}>
        <RightArrow width={'100%'} />
      </View>
    </LinearGradient>
  );
};

const style = StyleSheet.create({
  container: {
    height:'96%',
    borderRadius: 40,
    margin: 4,
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 15,
    
  },
  cicularArrow_view: {
    width: '30%',
  },
  text_view: {},
  text: {
    textAlign: 'center',
    color: color.palette.white,
    fontSize: 15,
    fontFamily:typography.medium

  },
  arrow_view: {
    width: '30%',
  },
  ticktick_view: {
    width: '22%',
    position: 'absolute',
  },
  clock_container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
