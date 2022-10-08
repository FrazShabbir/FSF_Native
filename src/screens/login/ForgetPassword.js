import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import {globalStyles} from '../../theme/styles';
import {
  Login_signup_Component,
  CustomTextInput,
  Button,
} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {RoutNames} from '../../navigation/routeNames';
import {useNavigation} from '@react-navigation/native';
import LeftShape from '../../assets/svg//leftShape.svg';
export const ForgetPassword = () => {
  const navigate = useNavigation();

  return (
    <View style={[style.container, globalStyles.fillAll]}>
      <Login_signup_Component
        title={'Forget Password'}
        description={'Enter your email to reset your password'}
        icon={'email'}
      />
      <View style={style.Allinputfeild_view}>
        <View style={style.input_view}>
          <CustomTextInput icon={'email'} />
          <TextInput  placeholderTextColor={color.palette.lightgray} style={style.input} placeholder="Email" />
        </View>
      </View>
      <View style={style.btn_view}>
        <View style={style.left_shape}>
        <LeftShape width={40} />
        </View>
        <View style={style.btn_option}>
          <TouchableOpacity
            style={style.btn}
            onPress={() => navigate.navigate(RoutNames.OtpScreen)}>
            <Button title={'Send Mail'} />
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
              onPress={() => navigate.navigate(RoutNames.LoginScreen)}>
              <Text
                style={{
                  color: color.palette.darkblue,
                  fontWeight: 'bold',
                  paddingLeft: 5,
                }}>
                Sign In
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
    marginBottom: 60,
  },
  input: {
    position: 'absolute',
    width: '73%',
    fontSize: 18,
    color: color.palette.black,
  },

  btn_view: {
    flex: 0.35,
    flexDirection: 'row',
    top:-30
  },
  left_shape: {
    width:40,
    bottom:'10%'
  },
  btn_option: {
    width: '80%',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  btn: {
    width: '100%',
    top:20
  },
});
