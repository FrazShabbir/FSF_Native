import {
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {color, typography} from '../theme';
import {fontWeights, globalStyles} from '../theme/styles';
import Button1 from '../assets/svg/button1.svg'
import Button2 from '../assets/svg/button2.svg'
import { BarIndicator,BallIndicator,DotIndicator,MaterialIndicator,PacmanIndicator,WaveIndicator,PulseIndicator,UIActivityIndicator,SkypeIndicator } from 'react-native-indicators';
export const Button = ({title, onPress,button2, titleStyle,loading}) => {
  return (
    <View style={style.container}>
      {button2?(<Button2 style={style.btn} width={"100%"} />):(
       <Button1 style={style.btn} width={"100%"}/>
      )}
      {loading? (<SkypeIndicator size={40}  style={{position:'absolute'}} color='white' />):(<Text style={style.title}>{title}</Text>)
}
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: color.palette.white,
    position: 'absolute',
    fontSize: 20,
    fontWeight: fontWeights.extraBold,
  },
  btn: {
    borderRadius: 50,
  },
});
