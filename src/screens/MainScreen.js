import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fontWeights, globalStyles as styles} from '../theme/styles';
import {color, typography} from '../theme';
import {Button} from '../components';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../navigation/routeNames';
import Shape from '../assets/svg/shape.svg';
import Logo from '../assets/svg/logo.svg';
import { useSelector,useDispatch } from 'react-redux';
export const MainScreen = () => {
  const dispatch=useDispatch()
  const navigate = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.shape_container}>
        <View style={style.fix}>
          <Shape style={style.shape} width={"100%"} />
          <Text style={style.title}>Funeral Services Fund</Text>
        </View>
      </View>
      <View style={style.logo_view}>
        <Logo style={style.logo} width={'100%'} />
      </View>
      <View style={style.btn_view}>
        <TouchableOpacity
          style={style.btn}
          onPress={() => navigate.navigate(RoutNames.LoginScreen)}>
          <Button title={'Sign In'} />
        </TouchableOpacity>
        <TouchableOpacity
        onPress={() => navigate.navigate(RoutNames.SignUpScreen)}
           style={style.btn}>
          <Button button2={true} title={'Create Account'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.white,
  },
  shape_container: {
    flex: 0.4,
    width: '90%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  shape: {
    alignSelf: 'flex-end',
    marginTop: 140,
  },
  title: {
    paddingTop: 140,
    fontSize: 45,
    color: colors.white,
    position: 'absolute',
    fontWeight: fontWeights.extraBold,
    width: '60%',
    paddingLeft: 20,
  },
  fix: {
    flex: 1,
    width: 363,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo_view: {
    flex: 0.32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    
  },
  btn_view: {
    marginTop: 15,
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingBottom: 20,
    width: '80%',
  },
});
