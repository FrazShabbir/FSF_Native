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
import { ScrollView } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';
import { RoutNames } from '../../navigation/routeNames';

export const Login = () => {
  const navigate=useNavigation()
  return (
    <ScrollView style={[globalStyles.fillAll, style.container]}>
      <Login_signup_Component
        title={'Login to FSF'}
        description={'Welcome back, please enter your details'}
        uersImg={require('../../assets/images/user.png')}
      />
      <View style={style.Allinputfeild_view}>
        <View style={style.input_view}>
          <CustomTextInput icon={'email'} />
          <TextInput style={style.input} placeholder="Email" />
        </View>
        <View style={style.input_view}>
          <View style={style.fix}>
            <CustomTextInput icon={'user'} />
            <TextInput style={style.input} placeholder="Password" />
          </View>
          <Image
            style={style.eye}
            source={require('../../assets/images/eye.png')}
          />
        </View>
        <View style={style.option_view}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              style={style.tick}
              source={require('../../assets/images/tickSquare.png')}
            />
            <Text style={style.text_logged}>Keep me logged in</Text>
          </View>
          <TouchableOpacity onPress={()=>navigate.navigate(RoutNames.ForgetPassword)}>
          <Text style={style.text_forgot}>Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.btn_view}>
         <Image
          style={style.left_shape}
          source={require('../../assets/images/leftshape.png')}
        /> 
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
            <Text style={{color:color.palette.black}}>If you do not have account?</Text>
            <TouchableOpacity onPress={()=>navigate.navigate(RoutNames.SignUpScreen)} >
              <Text style={{color:color.palette.darkblue,fontWeight:'bold'}}>Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
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
    color:color.palette.black
  },
  fix: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  eye: {
    width: 19,
    height: 15,
    position: 'absolute',
    right: '5%',
  },
  option_view: {
    width:'80%',
    flexDirection: 'row',
    justifyContent:"space-between"
  },
  text_forgot: {
    color: color.palette.darkblue,
    fontWeight:'bold'
  },
  text_logged: {
    fontSize: 15,
    paddingLeft: 5,
    color:color.palette.black
  },
  tick: {
    width: 20,
    height: 20,
  },
  btn_view: {
    flex: 0.35,
    flexDirection: 'row',
    paddingTop: 10,
  },
   left_shape: {
    width: 40,
    height: 300,
  }, 
  btn_option: {
    width: "80%",
    justifyContent:'space-around',
    paddingBottom:50

  },
  btn: {
    width: '100%',
  },
});
