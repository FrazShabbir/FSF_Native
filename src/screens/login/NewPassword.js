import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Modal,
} from 'react-native';
import React, {useState} from 'react';
import {color} from '../../theme';
import {fontSizes, globalStyles} from '../../theme/styles';
import {
  Login_signup_Component,
  CustomTextInput,
  Button,
  SmallButton,
} from '../../components';
import {RoutNames} from '../../navigation/routeNames';
import {useNavigation} from '@react-navigation/native';
import Eye from '../../assets/svg/eye.svg';
import LeftShape from '../../assets/svg/leftShape.svg';
import Cross from '../../assets/svg/cross.svg';
import Tick from '../../assets/svg/tick.svg';
import { showMessage } from 'react-native-flash-message';
import {Formik} from 'formik';
import * as Yup from 'yup';
const initailState = {
  newPassword: '',
  confirmPassword: '',
};
const schema = Yup.object({
  newPassword: Yup.string().min(8).max(64).required('*Required'),
  confirmPassword: Yup.string()
    .min(8)
    .max(64)
    .required('*Required')
    .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
});
export const NewPassword = ({route}) => {
  const navigate = useNavigation();
  const [saved, setsaved] = useState(false);
  const [hidePassword, setHidePassword] = useState(true);
  const [hidePassword1, setHidePassword1] = useState(true);
  const [indicator, setIndicator] = useState(null);

  const {email, otp} = route.params;

  return (
    <View style={[style.container, globalStyles.fillAll]}>
      <Login_signup_Component
        title={'New Password'}
        description={'Enter password with following instructions'}
        icon={'lock'}
      />
      <Formik
        initialValues={initailState}
        validationSchema={schema}
        onSubmit={async (values, action) => {
          //   console.log('values', values, otp, email);
          setIndicator(true);

          const res = await fetch(
            `https://fsfeu.org/es/fsf/api/auth/set-new-password?email=${email}&password=${values.newPassword}&otp=${otp}`,
            {
              method: 'Post',
              headers: {
                'content-type': 'application/json',
              },
            },
          );
          const jsonRes = await res.json();
          if (jsonRes.status === 200) {
            setsaved(true);
            setIndicator(false);
          } else {
            showMessage({
              message:jsonRes.message,
              type:"danger",
              duration:3000,
            })
            console.log(jsonRes);
            setIndicator(false);
          }
        }}>
        {({handleSubmit, handleBlur, handleChange}) => (
          <>
            <View style={style.Allinputfeild_view}>
              <View style={style.input_view}>
                <View style={style.fix}>
                  <CustomTextInput icon={'lock'} />
                  <TextInput
                    placeholderTextColor={color.palette.lightgray}
                    style={style.input}
                    placeholder="New Password"
                    onChangeText={handleChange('newPassword')}
                    onBlur={handleBlur('newPassword')}
                    secureTextEntry={hidePassword1}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => setHidePassword1(!hidePassword1)}
                  style={style.eye}>
                  <Eye width={22} height={25} />
                </TouchableOpacity>
              </View>
              <View style={style.input_view}>
                <View style={style.fix}>
                  <CustomTextInput icon={'lock'} />
                  <TextInput
                    placeholderTextColor={color.palette.lightgray}
                    style={style.input}
                    placeholder="Confirm Password"
                    onChangeText={handleChange('confirmPassword')}
                    onBlur={handleBlur('confirmPassword')}
                    secureTextEntry={hidePassword}
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
            </View>

            <View style={style.btn_view}>
              <View style={style.left_shape}>
                <LeftShape width={'100%'} />
              </View>
              <View style={style.btn_option}>
                <TouchableOpacity
                  style={style.btn}
                  onPress={/* setsaved(!saved); */ handleSubmit}>
                  <Button loading={indicator} title={'Save'} />
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
                      }}>
                      Sign In
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <Modal visible={saved} transparent={true} animationType="fade">
              <View style={style.modal_view}>
                <View style={style.view}>
                  <View
                    style={{
                      width: '90%',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 20,
                    }}>
                    <View style={style.tick_view}>
                      <Tick width={25} height={25} />
                    </View>
                    <View style={style.modal_text_view}>
                      <Text style={style.modal_text}>
                        Your Password has been Changed
                      </Text>
                    </View>
                    <TouchableOpacity
                      style={style.modal_btn_view}
                      onPress={() => {
                        setsaved(!saved),
                          navigate.navigate(RoutNames.LoginScreen);
                      }}>
                      <SmallButton title={'Login'} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </Modal>
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
    flex: 0.15,
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
  condition_view: {
    flex: 0.1,
    alignItems: 'center',
    top: '2%',
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
  btn_view: {
    flex: 0.35,
    flexDirection: 'row',
  },
  left_shape: {
    width: 40,
    bottom: '10%',
  },
  btn_option: {
    width: '80%',
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  btn: {
    width: '100%',
    top: 20,
  },
  modal_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  view: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  tick_view: {
    borderWidth: 2,
    borderColor: color.palette.lightgreen,
    borderRadius: 30,
    marginBottom: 20,
    padding: 10,
  },
  tick: {
    width: 25,
    height: 25,
  },
  modal_text_view: {
    marginBottom: 20,
  },
  modal_text: {
    fontSize: 20,
    textAlign: 'center',
    color: color.palette.black,
  },
  modal_btn_view: {
    width: 100,
    height: 35,
  },
});
