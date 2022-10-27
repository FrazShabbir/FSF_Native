import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import {fontSizes, globalStyles} from '../../theme/styles';
import {color} from '../../theme';
import {Button, Login_signup_Component} from '../../components';
import {CustomTextInput} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {RoutNames} from '../../navigation/routeNames';
import {useNavigation} from '@react-navigation/native';
import Eye from '../../assets/svg/eye.svg';
import RightShape from '../../assets/svg/rightShape.svg';
import Cross from '../../assets/svg/cross.svg';
import {Formik} from 'formik';
import * as Yup from 'yup';
const initialState = {
  fullName: '',
  email: '',
  password: '',
};

const schema = Yup.object({
  fullName: Yup.string().min(3).max(70).required('*Required'),
  email: Yup.string().email('Not Valid').required('*Required'),
  password: Yup.string().min(8).max(64).required('*Required'),
});
export const SignUp = () => {
  const navigate = useNavigation();
  const [hidePassword, setHidePassword] = useState(true);
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
            navigate.navigate(RoutNames.OtpScreen,{email:values.email,from:RoutNames.LoginScreen});
          } else {
            console.log(jsonRes.message);
          }
        }}>
        {({handleBlur, handleChange, handleSubmit}) => (
          <>
            <View style={style.Allinputfeild_view}>
              <View style={style.input_view}>
                <CustomTextInput icon={'user'} />
                <TextInput
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                  placeholder="Full Name"
                  onChangeText={handleChange('fullName')}
                  onBlur={handleBlur('fullName')}
                />
              </View>
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
                </View>
                <TouchableOpacity
                  onPress={() => setHidePassword(!hidePassword)}
                  style={style.eye}>
                  <Eye width={22} height={25} />
                </TouchableOpacity>
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
                <Button title={'Sign up'} />
              </TouchableOpacity>
              <View style={style.text_View}>
                <View style={{alignItems: 'center'}}>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: fontSizes.xsmall,
                        color: color.palette.black,
                      }}>
                      By sign up, I accept the
                    </Text>
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: color.palette.darkblue,
                          fontWeight: 'bold',
                          paddingLeft: 5,
                        }}>
                        Terms of Services{' '}
                      </Text>
                    </TouchableOpacity>
                    <Text
                      style={{
                        fontSize: fontSizes.xsmall,
                        color: color.palette.black,
                      }}>
                      and have
                    </Text>
                  </View>
                  <View style={{flexDirection: 'row'}}>
                    <Text
                      style={{
                        fontSize: fontSizes.xsmall,
                        color: color.palette.black,
                      }}>
                      read the{' '}
                    </Text>
                    <TouchableOpacity>
                      <Text
                        style={{
                          color: color.palette.darkblue,
                          fontWeight: 'bold',
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
                  <Text style={{color: color.palette.black}}>
                    Already have an account?
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
    fontSize: fontSizes.xxsmall,
    color: color.palette.black,
  },
  cross: {
    width: 10,
    height: 10,
  },
  shape_view: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  shape: {},
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
