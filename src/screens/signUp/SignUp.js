import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {fontSizes, globalStyles} from '../../theme/styles';
import {color} from '../../theme';
import {Button, Login_signup_Component} from '../../components';
import {CustomTextInput} from '../../components';
import {ScrollView} from 'react-native-gesture-handler';
import {RoutNames} from '../../navigation/routeNames';
import {useNavigation} from '@react-navigation/native';
export const SignUp = () => {
  const navigate = useNavigation();
  return (
    <ScrollView style={[globalStyles.fillAll, style.container]}>
      <Login_signup_Component
        title={'Create an Account'}
        description={'Let`s go through a few simple step'}
        uersImg={require('../../assets/images/user.png')}
      />
      <View style={style.Allinputfeild_view}>
        <View style={style.input_view}>
          <CustomTextInput icon={'user'} />
          <TextInput style={style.input} placeholder="Full Name" />
        </View>
        <View style={style.input_view}>
          <CustomTextInput icon={'email'} />
          <TextInput style={style.input} placeholder="Email" />
        </View>
        <View style={style.input_view}>
          <View style={style.fix}>
            <CustomTextInput icon={'lock'} />
            <TextInput style={style.input} placeholder="Password" />
          </View>
          <Image
            style={style.eye}
            source={require('../../assets/images/eye.png')}
          />
        </View>
      </View>

      <View style={style.condition_view}>
        <View style={style.condition}>
          <Image
            style={style.cross}
            source={require('../../assets/images/cross.png')}
          />
          <Text style={style.condition_text}>Atleast 8 characters</Text>
        </View>
        <View style={style.condition}>
          <Image
            style={style.cross}
            source={require('../../assets/images/cross.png')}
          />
          <Text style={style.condition_text}>
            Both upper and lowercase letters (optional)
          </Text>
        </View>
        <View style={style.condition}>
          <Image
            style={style.cross}
            source={require('../../assets/images/cross.png')}
          />
          <Text style={style.condition_text}>
            Atleast one number or symbol (optional)
          </Text>
        </View>
        <View style={style.shape_view}>
          <Image
            style={style.shape}
            source={require('../../assets/images/rightShape.png')}
          />
        </View>
      </View>
      <View style={style.bottom_view}>
        <TouchableOpacity onPress={()=>navigate.navigate(RoutNames.OtpScreen)} style={style.btn_view}>
          <Button title={'Sign up'} />
        </TouchableOpacity>
        <View style={style.text_View}>
          <View style={{alignItems: 'center'}}>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: fontSizes.xsmall,color:color.palette.black}}>
                By sign up, I accept the
              </Text>
              <TouchableOpacity>
                <Text
                  style={{color: color.palette.darkblue, fontWeight: 'bold'}}>
                  Terms of Services{' '}
                </Text>
              </TouchableOpacity>
              <Text style={{fontSize: fontSizes.xsmall,color:color.palette.black}}>and have</Text>
            </View>
            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: fontSizes.xsmall,color:color.palette.black}}>read the </Text>
              <TouchableOpacity>
                <Text
                  style={{color: color.palette.darkblue, fontWeight: 'bold'}}>
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
            <Text style={{color:color.palette.black}}>Already have an account?</Text>
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
    marginTop: -50,
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
  condition_view: {
    flex: 0.1,
    alignItems: 'center',
    padding: 20,
  },
  condition: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '70%',
  },
  condition_text: {
    marginLeft: 15,
    fontSize: fontSizes.xxsmall,
    color:color.palette.black
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
    width: 40,
    height: 150,
  },
  bottom_view: {
    alignItems: 'center',
  },
  btn_view: {
    paddingTop: 10,
    width: '80%',
  },
  text_View: {
    paddingTop: 10,
    width: '80%',
    flex: 1,
    justifyContent: 'space-between',
  },
});
