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
import { ScrollView } from 'react-native-gesture-handler';
import { RoutNames } from '../../navigation/routeNames';
import { useNavigation } from '@react-navigation/native';

export const ForgetPassword = () => {
    const navigate=useNavigation()

  return (
    <ScrollView style={[style.container, globalStyles.fillAll]}>
      <Login_signup_Component
        title={'Forget Password'}
        description={'Enter your email to reset your password'}
        uersImg={require('../../assets/images/bigEmail.png')}
      />
      <View style={style.Allinputfeild_view}>
        <View style={style.input_view}>
          <CustomTextInput icon={'email'} />
          <TextInput style={style.input} placeholder="Email" />
        </View>
      </View>
      <View style={style.btn_view}>
        <Image
          style={style.left_shape}
          source={require('../../assets/images/leftshape.png')}
        />
        <View style={style.btn_option}>
          <TouchableOpacity style={style.btn} onPress={()=>navigate.navigate(RoutNames.OtpScreen)}>
            <Button title={'Send Mail'} />
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text style={{color:color.palette.black}}>If you do not have account?</Text>
            <TouchableOpacity
              onPress={() => navigate.navigate(RoutNames.LoginScreen)}>
              <Text style={{color: color.palette.darkblue, fontWeight: 'bold'}}>
                Sign In
              </Text>
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
    marginBottom: 60,
  },
  input: {
    position: 'absolute',
    width: '73%',
    fontSize: 18,
    color:color.palette.black
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
    width: '80%',
    justifyContent: 'space-around',
    paddingBottom: 50,
  },
  btn: {
    width: '100%',
  },
});
