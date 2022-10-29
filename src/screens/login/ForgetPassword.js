import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React,{useState} from 'react';
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
import { showMessage } from 'react-native-flash-message';
import {Formik} from 'formik';
import * as Yup from 'yup'
const schema=Yup.object({
  email:Yup.string().email("Not Valid").required("*Required")
})
export const ForgetPassword = () => {
  const navigate = useNavigation();
  const [indicator, setIndicator] = useState(null);


  return (
    <View style={[style.container, globalStyles.fillAll]}>
      <Login_signup_Component
        title={'Forget Password'}
        description={'Enter your email to reset your password'}
        icon={'email'}
      />
      <Formik
      initialValues={{email:''}}
      validationSchema={schema}
      onSubmit={async(values,action)=>{
        console.log("values",values)
        setIndicator(true);

        const res = await fetch(
          `https://fsfeu.org/es/fsf/api/auth/forget-password?email=${values.email}`,
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

          navigate.navigate(RoutNames.OtpScreen,{email:values.email,from:RoutNames.NewPasswordScreen});
        } else {
          showMessage({
            message:jsonRes.message,
            type:"danger",
            duration:3000,
          })
          console.log(jsonRes.message);
          setIndicator(false);

        }
      }}
      >
        {({handleBlur,handleSubmit,handleChange}) => (
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
            </View>
            <View style={style.btn_view}>
              <View style={style.left_shape}>
                <LeftShape width={40} />
              </View>
              <View style={style.btn_option}>
                <TouchableOpacity
                  style={style.btn}
                  onPress={handleSubmit}>
                  <Button loading={indicator} title={'Send Mail'} />
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
    top: -30,
  },
  left_shape: {
    width: 40,
    bottom: '10%',
  },
  btn_option: {
    width: '80%',
    justifyContent: 'space-between',
    paddingBottom: 30,
  },
  btn: {
    width: '100%',
    top: 20,
  },
});
