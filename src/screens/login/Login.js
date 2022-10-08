import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {fontSizes, fontWeights, globalStyles} from '../../theme/styles';
import {color} from '../../theme';
import {
  Login_signup_Component,
  CustomTextInput,
  Button,
} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import Eye from '../../assets/svg/eye.svg';
import Tick from '../../assets/svg/tickSquare.svg';
import LeftShape from '../../assets/svg/leftShape.svg';
export const Login = () => {
  const navigate = useNavigation();
  return (
    <View style={[globalStyles.fillAll, style.container]}>
      <Login_signup_Component
        title={'Login to FSF'}
        description={'Welcome back, please enter your details'}
        icon={'user'}
      />
      <View style={style.Allinputfeild_view}>
        <View style={style.input_view}>
          <CustomTextInput icon={'email'} />
          <TextInput 
          placeholderTextColor={color.palette.lightgray} style={style.input} placeholder="Email" />
        </View>
        <View style={style.input_view}>
          <View style={style.fix}>
            <CustomTextInput icon={'user'} />
            <TextInput  placeholderTextColor={color.palette.lightgray} style={style.input} placeholder="Password" />
          </View>
          <TouchableOpacity style={style.eye}>
            <Eye width={22} height={25} />
          </TouchableOpacity>
        </View>
        <View style={style.option_view}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Tick style={style.tick} width={20} height={20} />

            <Text style={style.text_logged}>Keep me logged in</Text>
          </View>
          <TouchableOpacity
            onPress={() => navigate.navigate(RoutNames.ForgetPassword)}>
            <Text style={style.text_forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.btn_view}>
        <View style={style.left_shape}>
        <LeftShape  width={40} />
        </View>
        <View style={style.btn_option}>
          <TouchableOpacity style={style.btn}>
            <Button title={'Sign In'} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color: color.palette.black}}>
              If you do not have account?
            </Text>
            <TouchableOpacity
              onPress={() => navigate.navigate(RoutNames.SignUpScreen)}>
              <Text style={{color: color.palette.darkblue, fontWeight: 'bold'}}>
                Sign Up
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    backgroundColor: color.palette.white,
  },
  Allinputfeild_view: {
    flex: 0.25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input_view: {
    width: '80%',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  input: {
    position: 'absolute',
    width: '73%',
    fontSize: 18,
    color: color.palette.black,
  },
  fix: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    position: 'absolute',
    right: '5%',
  },
  option_view: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  text_forgot: {
    color: color.palette.darkblue,
    fontWeight: 'bold',
  },
  text_logged: {
    fontSize: 15,
    paddingLeft: 5,
    color: color.palette.black,
  },
  tick: {},
  btn_view: {
    flex: 0.35,
    flexDirection: 'row',
    paddingTop: 10,
  },
  left_shape: {
    width:40,
    bottom:'10%'
  },
  btn_option: {
    width: '80%',
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  btn: {
    width: '100%',
    top:20
  },
});
