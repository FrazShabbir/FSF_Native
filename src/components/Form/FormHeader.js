import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {color} from '../../theme';
import { fontWeights } from '../../theme/styles';

export const FormHeader = () => {
  return (
    <View style={style.container}>
      <LinearGradient
        useAngle={true}
        colors={[color.palette.darkblue, color.palette.lightBlue]}
        style={style.line_container}></LinearGradient>
      <View style={style.text_border}>
        <LinearGradient
          colors={[color.palette.darkblue, color.palette.lightBlue]}
          style={style.title_view}>
          <View
            style={{
              width:25 ,
              height:25 ,
              justifyContent:"center",
            alignItems:"center"
            }}>
            <Text style={style.title}>1.</Text>
          </View>
        </LinearGradient>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 0.08,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
  },
  line_container: {
    height:"10%",
    borderRadius:20
  },
  title_view: {
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 50,
  },
  text_border: {
    justifyContent: 'center',
    padding: 3,
    borderRadius: 50,
    borderWidth: 1,
    position: 'absolute',
    backgroundColor: color.palette.white,
    borderColor:color.palette.lightBlue,
    left:"15%"
  },
  title:{
    color:color.palette.white,
    fontWeight:fontWeights.extraBold
    
  }
});
