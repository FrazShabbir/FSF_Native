import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Modal,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {fontSizes, fontWeights, globalStyles} from '../../theme/styles';
import {color, typography} from '../../theme';
import {
  Login_signup_Component,
  CustomTextInput,
  Button,
} from '../../components';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import Eye from '../../assets/svg/eye.svg';
import Tick from '../../assets/svg/tickSquare.svg';
import LeftShape from '../../assets/svg/leftShape.svg';
import {Formik} from 'formik';
import * as Yup from 'yup';
import customFetch from '../../utils/axios';
import axios from 'axios';
import {useDispatch, useSelector} from 'react-redux';
import {Loggin} from '../../Reduxs/Reducers';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {SkypeIndicator} from 'react-native-indicators';
import CrossEye from '../../assets/svg/crossEye.svg';

const initialState = {
  email: '',
  password: '',
};
const schema = Yup.object({
  email: Yup.string().email('Email Not Valid').required('Email Required'),
  password: Yup.string()
    .min(8, 'Password cannot less then 8 numbers')
    .max(64)
    .required('Password Required'),
});

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [indicator, setIndicator] = useState(null);
  return (
    <View style={[globalStyles.fillAll, style.container]}>
      <Login_signup_Component
        title={'Login to FSF'}
        description={'Welcome back, please enter your details'}
        icon={'user'}
      />
      <Formik
        initialValues={initialState}
        validationSchema={schema}
        onSubmit={async (values, action) => {
          setIndicator(true);
          console.log('response', values);
          const res = await fetch(
            `https://fsfeu.org/es/fsf/api/auth/login?email=${values.email}&password=${values.password}`,
            {
              method: 'Post',
              headers: {
                'content-type': 'application/json',
              },
            },
          );
          const jsonRes = await res.json();
          console.log('Login', jsonRes);

          if (jsonRes.status == 200) {
            dispatch(Loggin(jsonRes));
            setIndicator(false);
            console.log('appliatsssssssssssss', jsonRes.applications);
          } else {
            showMessage({
              message: jsonRes.message,
              type: 'danger',
              duration: 3000,
            });
            console.log(jsonRes);
            setIndicator(false);
          }
        }}>
        {({handleChange, handleBlur, handleSubmit, touched, errors}) => (
          <>
            <View style={style.Allinputfeild_view}>
              <View
                style={[
                  style.input_view,
                  touched.email &&
                    errors.email && {
                      borderColor: 'red',
                      borderWidth: 1,
                      borderRadius: 15,
                    },
                ]}>
                <CustomTextInput icon={'email'} />
                <TextInput
                  placeholderTextColor={color.palette.lightgray}
                  style={[style.input]}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
                <View style={style.error_view}>
                  <Text style={{color: 'red'}}>
                    {touched.email && errors.email}
                  </Text>
                </View>
              </View>

              <View
                style={[
                  style.input_view,
                  touched.password &&
                    errors.password && {
                      borderColor: 'red',
                      borderWidth: 1,
                      borderRadius: 15,
                    },
                ]}>
                <View style={style.fix}>
                  <CustomTextInput icon={'user'} />
                  <TextInput
                    placeholderTextColor={color.palette.lightgray}
                    style={style.input}
                    placeholder="Password"
                    secureTextEntry={hidePassword}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                  />
                  {/* {errors?.email?showMessage({
                  message: errors.email,
                  type: "danger",
                  
                }):null} */}
                </View>
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                  style={style.eye}>
                  {hidePassword ? (
                    <CrossEye width={22} height={25} />
                  ) : (
                    <Eye width={22} height={25} />
                  )}
                </TouchableOpacity>

                <View style={style.error_view}>
                  <Text style={{color: 'red'}}>
                    {touched.password && errors.password}
                  </Text>
                </View>
              </View>
              <View style={style.option_view}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={style.text_logged}>You Keep logged in</Text>
                </View>
                <TouchableOpacity
                  onPress={() => navigate.navigate(RoutNames.ForgetPassword)}>
                  <Text style={style.text_forgot}>Forgot Password?</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={style.btn_view}>
              <View style={style.left_shape}>
                <LeftShape width={40} />
              </View>
              <View style={style.btn_option}>
                <TouchableOpacity onPress={handleSubmit} style={style.btn}>
                  <Button loading={indicator} title={'Sign In'} />
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: color.palette.black,
                      fontFamily: typography.Regular,
                    }}>
                    If you do not have account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigate.navigate(RoutNames.SignUpScreen)}>
                    <Text
                      style={{
                        color: color.palette.darkblue,
                        fontWeight: 'bold',
                        marginLeft: 2,
                        fontFamily: typography.Regular,
                      }}>
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </>
        )}
      </Formik>
      <>
        <Modal visible={false} transparent animationType="fade">
          <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.6)'}}>
            <SkypeIndicator color="white" size={60} />
          </View>
        </Modal>
      </>
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
    marginBottom: 20,
  },
  input: {
    position: 'absolute',
    width: '73%',
    fontSize: 18,
    color: color.palette.black,
    fontFamily: typography.Regular,
  },
  error_view: {
    position: 'absolute',
    bottom: 50,
    right: 10,
    alignSelf: 'flex-end',
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
    fontFamily: typography.demi,
  },
  text_logged: {
    fontSize: 15,
    paddingLeft: 5,
    color: color.palette.black,
    fontFamily: typography.demi,
  },
  tick: {},
  btn_view: {
    flex: 0.35,
    flexDirection: 'row',
    paddingTop: 10,
  },
  left_shape: {
    width: 40,
    bottom: '10%',
  },
  btn_option: {
    width: '80%',
    justifyContent: 'space-between',
    paddingBottom: 50,
  },
  btn: {
    width: '100%',
    top: 20,
  },
});
