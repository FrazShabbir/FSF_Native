import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
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
import {Formik} from 'formik';
const initialState = {
  inp1: '',
  inp2: '',
  inp3: '',
  inp4: '',
};
export const OtpScreen = ({route}) => {
  const navigate = useNavigation();

  const [seconds, setSeconds] = useState(59);
  //const {email,from} = route.params;
  useEffect(() => {
    if (seconds > 0) {
      setTimeout(() => {
        setSeconds(seconds - 1);
      }, 1000);
    }
  }, [seconds]);
  const inp1 = useRef();
  const inp2 = useRef();
  const inp3 = useRef();
  const inp4 = useRef();
  const resendOtp=async()=>{
    const res = await fetch(
      `https://fsfeu.org/es/fsf/api/auth/forget-password?email=furqan@gmail.com`,
      {
        method: 'Post',
        headers: {
          'content-type': 'application/json',
        },
      },
    );
    const jsonRes = await res.json();
    if (jsonRes.status === 200) {
      console.log("Otp Sended")
    } else {
      console.log(jsonRes.message);
    }
  }
  return (
    <View style={[style.container, globalStyles.fillAll]}>
      <Login_signup_Component
        title={'FSF - OTP'}
        description={'Please enter OTP, that is sent to your provided email'}
        icon={'lock'}
      />
      <Formik
        initialValues={initialState}
        onSubmit={async (values, action) => {
         const   otp=values.inp1+values.inp2+values.inp3+values.inp4;
          console.log('otp', otp);
        /*    const res = await fetch(
            `https://fsfeu.org/es/fsf/api/auth/verify-otp?email=${email}&otp=${otp}`,
            {
              method: 'Post',
              headers: {
                'content-type': 'application/json',
              },
            },
          );
          const jsonRes = await res.json();
          if (jsonRes.status === 200) {
            if(from ==RoutNames.LoginScreen){
              navigate.navigate(RoutNames.LoginScreen);
            }else{
              navigate.navigate(RoutNames.NewPasswordScreen,{email:email,otp:otp})
            }
          } else {
            console.log(jsonRes);
          } */
        }}>
        {({handleBlur, handleChange, handleSubmit}) => (
          <>
            <View style={style.Allinputfeild_view}>
              <View style={style.otp_input_view}>
                <TextInput
                  textAlign="center"
                  style={style.otp_input}
                  maxLength={1}
                  ref={inp1}
                  onChangeText={handleChange('inp1')}
                  onBlur={handleBlur('inp1')}
                  //   onChange={inp2.current.focus()}
                  onKeyPress={e => {
                    if (e.nativeEvent.key == 'Backspace') {
                    } else {
                      inp2.current.focus();
                    }
                  }}
                />

                <TextInput
                  style={style.otp_input}
                  maxLength={1}
                  ref={inp2}
                  onChangeText={handleChange('inp2')}
                  onBlur={handleBlur('inp2')}
                  onKeyPress={e => {
                    if (e.nativeEvent.key == 'Backspace') {
                      inp1.current.focus();
                    } else {
                      inp3.current.focus();
                    }
                  }}
                />

                <TextInput
                  style={style.otp_input}
                  maxLength={1}
                  ref={inp3}
                  onChangeText={handleChange('inp3')}
                  onBlur={handleBlur('inp3')}
                  onKeyPress={e => {
                    if (e.nativeEvent.key == 'Backspace') {
                      inp2.current.focus();
                    } else {
                      inp4.current.focus();
                    }
                  }}
                />

                <TextInput
                  style={style.otp_input}
                  maxLength={1}
                  ref={inp4}
                  onChangeText={handleChange('inp4')}
                  onBlur={handleBlur('inp4')}
                  onKeyPress={e => {
                    if (e.nativeEvent.key == 'Backspace') {
                      inp3.current.focus();
                    } else {
                    }
                  }}
                />
              </View>
              <View style={style.otp_time_view}>
                <Text style={style.otp_time_seconds}>00:{seconds}</Text>
                {seconds === 0 ? (
                  <TouchableOpacity onPress={() => {setSeconds(59),resendOtp()}}>
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
                <TouchableOpacity style={style.btn} onPress={handleSubmit}>
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
          </>
        )}
      </Formik>
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
