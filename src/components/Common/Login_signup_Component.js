import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import {fontSizes, fontWeights, globalStyles} from '../../theme/styles';
import {color, typography} from '../../theme';
import { useNavigation } from '@react-navigation/native';
export const Login_signup_Component = ({uersImg, title, description}) => {
  const navigate=useNavigation()
  return (
    <View style={style.title_view}>
      <TouchableOpacity style={style.back_icon_view} onPress={()=>{navigate.goBack()}}>
        <Image
          style={style.back_icon}
          source={require('../../assets/images/backIcon.png')}
        />
      </TouchableOpacity>
      <View style={style.semi_circle_View}>
        <Image
          style={style.semi_cricle}
          source={require('../../assets/images/semiCircle.png')}
        />
      </View>
      <View style={style.user_title_view}>
        <View style={style.user_view}>
          <Image style={style.user} source={uersImg} />
        </View>
        <View style={style.page_title_view}>
          <Text style={style.page_title}>{title}</Text>
        </View>
        <View style={style.descr_view}>
          <Text numberOfLines={2} style={style.descr}>{description}</Text>
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
  back_icon_view: {},
  back_icon: {
    
    margin: 20,
  },
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
    fontStyle:typography.Avenir_Bold,
    fontWeight:fontWeights.extraBold
    
  },
  descr_view: {
    width:'70%'
  },
  descr: {
    color: color.palette.black,
    fontWeight: '300',
    textAlign:'center'
  },
  semi_circle_View: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  semi_cricle: {
    width: 80,
  },
});
