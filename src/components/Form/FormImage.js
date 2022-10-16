import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import ImagePicker from '../../assets/EnrolmentAssets/imgPickerIcon.svg';
import { color } from '../../theme';
import { fontSizes, fontWeights } from '../../theme/styles';
import { TouchableOpacity } from 'react-native-gesture-handler';
export const FormImage = () => {
  return (
    <View style={style.container}>
      <View style={style.image_container}>
        <TouchableOpacity style={style.imag_view}>
          <ImagePicker width={'100%'} height={'100%'} />
        </TouchableOpacity>
        <View style={style.text_view}>
          <Text style={style.text}>Upload Your Picture</Text>
          <Text style={style.sub_text}>Filej2000H</Text>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height:180
  },
  image_container: {
    justifyContent: 'center',
    alignItems: 'center',
    width:"60%",
  },
  imag_view: {
    width:100,
    height: 100,
    borderWidth: 1,
    padding:25,
    borderRadius:50,
    borderStyle:"dashed",
    borderColor:color.palette.darkblue

    
  
  },
  text_view: {
    alignItems: 'center',
  },
  text: {
    color:color.palette.black,
    fontSize:12,
    fontWeight:fontWeights.bold
  },
  sub_text:{
    color:color.palette.lightwhite2,
    fontSize:10
  }
 
});
