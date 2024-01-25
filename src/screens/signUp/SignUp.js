import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Linking
} from 'react-native';
import React, {useState} from 'react';
import {fontSizes, globalStyles} from '../../theme/styles';
import {color, typography} from '../../theme';
import {Button, Login_signup_Component} from '../../components';
import {CustomTextInput} from '../../components';
import {RoutNames} from '../../navigation/routeNames';
import {useNavigation} from '@react-navigation/native';
import Eye from '../../assets/svg/eye.svg';
import RightShape from '../../assets/svg/rightShape.svg';
import Cross from '../../assets/svg/cross.svg';
import {showMessage} from 'react-native-flash-message';
import {Formik} from 'formik';
import CrossEye from '../../assets/svg/crossEye.svg';

import * as Yup from 'yup';
const initialState = {
  fullName: '',
  email: '',
  password: '',
};

const schema = Yup.object({
  fullName: Yup.string()
    .min(2, 'Atleast 2 character')
    .max(70)
    .required('*Required'),
  email: Yup.string().email('Email Not Valid').required('Email Required'),
  password: Yup.string()
    .min(8, 'Password cannot less then 8 numbers')
    .max(64)
    .required('Password Required'),
});
export const SignUp = () => {
  const navigate = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
  const [indicator, setIndicator] = useState(null);


const openUrl=(url)=>{
  Linking.openURL(url)
}

  return (
    <View style={[globalStyles.fillAll, style.container]}>
      <Login_signup_Component
        title={'Create an Account'}
        description={'Let`s go through a few simple step'}
        icon={'user'}
      />
      <Formik
        initialValues={initialState}
        validationSchema={schema}
        onSubmit={async (values, action) => {
          setIndicator(true);
          const res = await fetch(
            `https://fsfeu.org/es/fsf/api/auth/register?full_name=${values.fullName}&email=${values.email}&password=${values.password}`,
            {
              method: 'Post',
              headers: {
                'content-type': 'application/json',
              },
            },
          );
          const jsonRes = await res.json();
          if (jsonRes.status === 200) {
            setIndicator(false);
            navigate.navigate(RoutNames.OtpScreen, {
              email: values.email,
              from: RoutNames.LoginScreen,
            });
          } else {
            showMessage({
              message: jsonRes.errors.email[0],
              type: 'danger',
              duration: 3000,
            });
            console.log(jsonRes);
            setIndicator(false);
          }
        }}>
        {({handleBlur, handleChange, handleSubmit, touched, errors}) => (
          <>
            <View style={style.Allinputfeild_view}>
              <View
                style={[
                  style.input_view,
                  touched.fullName &&
                    errors.fullName && {
                      borderColor: 'red',
                      borderWidth: 1,
                      borderRadius: 15,
                    },
                ]}>
                <CustomTextInput icon={'user'} />
                <TextInput
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                  placeholder="Full Name"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                />
                <View style={style.error_view}>
                  <Text style={{color: 'red'}}>
                    {touched.fullName && errors.fullName}
                  </Text>
                </View>
              </View>
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
                  style={style.input}
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
            </View>

            <View style={style.condition_view}>
              <View style={style.condition}>
                <Cross style={style.cross} width={13} height={13} />

                <Text style={style.condition_text}>Atleast 8 characters</Text>
              </View>
              <View style={style.condition}>
                <Cross style={style.cross} width={13} height={13} />

                <Text style={style.condition_text}>
                  Both upper and lowercase letters (optional)
                </Text>
              </View>
              <View style={style.condition}>
                <Cross style={style.cross} width={13} height={13} />

                <Text style={style.condition_text}>
                  Atleast one number or symbol (optional)
                </Text>
              </View>
              <View style={style.shape_view}>
                <RightShape width={60} style={{bottom: '38%'}} />
              </View>
            </View>
            <View style={style.bottom_view}>
              <TouchableOpacity onPress={handleSubmit} style={style.btn_view}>
                <Button loading={indicator} title={'Sign up'} />
              </TouchableOpacity>
              <View style={style.text_View}>
                <View style={{alignItems: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: fontSizes.xsmall,

                        fontFamily:typography.medium,
                        color: color.palette.black,


                      }}>
                      By sign up, I accept the
                    </Text>
                    <TouchableOpacity onPress={()=>{

                      openUrl("https://fsfeu.org/terms-and-conditions")
                    }}>
                      <Text
                        style={{
                          color: color.palette.darkblue,
                          fontFamily:typography.demi,

                          paddingLeft: 5,
                        }}>
                        Terms of Services{' '}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: fontSizes.xsmall,
                        color: color.palette.black,
                        fontFamily:typography.medium,

                      }}>
                      and have
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: fontSizes.xsmall,
                        color: color.palette.black,
                        fontFamily:typography.medium,

                      }}>
                      read the{' '}
                    </Text>
                    <TouchableOpacity onPress={()=>{
                      openUrl('https://fsfeu.org/privacy-policies')
                    }}>
                      <Text
                        style={{
                          color: color.palette.darkblue,
                          fontFamily:typography.demi,

                        }}>
                        Privacy Policy
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 20,
                    paddingTop: 20,
                  }}>
                  <Text style={{color: color.palette.black,                        fontFamily:typography.medium,
}}>
                    Already have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigate.navigate(RoutNames.LoginScreen)}>
                    <Text
                      style={{
                        color: color.palette.darkblue,
                        fontWeight: 'bold',
                        paddingLeft: 5,
                        fontFamily:typography.demi,

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
    fontFamily:typography.Regular

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
    right: '8%',
  },
  condition_view: {
    flex: 0.1,
    alignItems: 'center',
    padding: 10,
  },
  condition: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
  },
  condition_text: {
    marginLeft: 15,
    fontSize: 10,
    color: color.palette.black,
    fontFamily:typography.medium,

  },
  cross: {
    width: 10,
    height: 10,
  },
  shape_view: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  shape: {
    borderWidth:1,
  },
  bottom_view: {
    flex: 0.25,
    alignItems: 'center',
  },
  btn_view: {
    width: '80%',
  },
  text_View: {
    paddingTop: 10,
    width: '80%',
    flex: 1,
    justifyContent: 'space-between',
  },
});
