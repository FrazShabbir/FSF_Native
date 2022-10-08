import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {color} from '../../theme';
import {fontSizes, fontWeights, globalStyles} from '../../theme/styles';
import {
  Login_signup_Component,
  CustomTextInput,
  Button,
} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {RoutNames} from '../../navigation/routeNames';
import {useNavigation} from '@react-navigation/native';
import LeftShape from '../../assets/svg/leftShape.svg';
export const OtpScreen = () => {
  const navigate = useNavigation();
  const [seconds, setSeconds] = useState(59);
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
  }, [seconds]);

  return (
    <View style={[style.container, globalStyles.fillAll]}>
      <Login_signup_Component
        title={'FSF - OTP'}
        description={'Please enter OTP, that is sent to your provided email'}
        icon={'lock'}
      />
      <View style={style.Allinputfeild_view}>
        <View style={style.otp_input_view}>
          <TextInput textAlign="center" style={style.otp_input} />

          <TextInput style={style.otp_input} />

          <TextInput style={style.otp_input} />

          <TextInput style={style.otp_input} />
        </View>
        <View style={style.otp_time_view}>
          <Text style={style.otp_time_seconds}>00:{seconds}</Text>
          {seconds === 0 ? (
            <TouchableOpacity onPress={() => setSeconds(59)}>
              <Text style={style.otp_time_text}>Resend OTP</Text>
            </TouchableOpacity>
          ) : (
            <Text style={[style.otp_time_text, {opacity: 0.5}]}>
              Resend OTP
            </Text>
          )}
        </View>
      </View>
      <View style={style.btn_view}>
        <View style={style.left_shape}>
          <LeftShape width={40} />
        </View>
        <View style={style.btn_option}>
          <TouchableOpacity
            style={style.btn}
            onPress={() => navigate.navigate(RoutNames.NewPasswordScreen)}>
            <Button title={'Verify'} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              top: '7%',
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
  otp_input_view: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
    top: -20,
  },
  otp_input: {
    borderBottomWidth: 2,
    borderBottomColor: 'black',
    width: '15%',
    textAlign: 'center',
    fontSize: 30,
    fontWeight: fontWeights.bold,
    color: 'black',
  },

  input: {
    position: 'absolute',
    width: '73%',
    fontSize: 18,
  },

  btn_view: {
    flex: 0.25,
    flexDirection: 'row',
  },
  left_shape: {
    width: 40,
    bottom: '10%',
  },
  btn_option: {
    width: '80%',
    justifyContent: 'space-between',
  },
  btn: {
    width: '100%',
    top: 20,
  },
  otp_time_view: {
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-between',
  },
  otp_time_seconds: {
    color: color.palette.lightgray,
  },
  otp_time_text: {
    color: color.palette.darkblue,
    fontWeight: '600',
  },
});
