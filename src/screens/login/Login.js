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
import {color} from '../../theme';
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

const initialState = {
  email: '',
  password: '',
};
const schema = Yup.object({
  email: Yup.string().email('Not Valid').required('Required'),
  password: Yup.string().min(8).max(64).required('Required'),
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
          if (jsonRes.status === true) {
            dispatch(Loggin(jsonRes));
            setIndicator(false);
          } else {
            showMessage({
              message:jsonRes.message,
              type:"danger",
              duration:3000,
            })
            console.log(jsonRes.message);
            setIndicator(false);
          } 
        }}>
        {({handleChange, handleBlur, handleSubmit, errors}) => (
          <>
            <View style={style.Allinputfeild_view}>
              <View style={style.input_view}>
                <CustomTextInput icon={'email'} />
                <TextInput
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                />
              </View>
              <View style={style.input_view}>
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
                  <Text style={{color: color.palette.black}}>
                    If you do not have account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigate.navigate(RoutNames.SignUpScreen)}>
                    <Text
                      style={{
                        color: color.palette.darkblue,
                        fontWeight: 'bold',
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
