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
import {ScrollView} from 'react-native-gesture-handler';
import {RoutNames} from '../../navigation/routeNames';
import {useNavigation} from '@react-navigation/native';

export const NewPassword = () => {
  const navigate = useNavigation();
  const [saved, setsaved] = useState(false);

  return (
    <ScrollView style={[style.container, globalStyles.fillAll]}>
      <Login_signup_Component
        title={'New Password'}
        description={'Enter password with following instructions'}
        uersImg={require('../../assets/images/bigLock.png')}
      />
      <View style={style.Allinputfeild_view}>
        <View style={style.input_view}>
          <View style={style.fix}>
            <CustomTextInput icon={'lock'} />
            <TextInput style={style.input} placeholder="New Password" />
          </View>
          <Image
            style={style.eye}
            source={require('../../assets/images/eye.png')}
          />
        </View>
        <View style={style.input_view}>
          <View style={style.fix}>
            <CustomTextInput icon={'lock'} />
            <TextInput style={style.input} placeholder="Confirm Password" />
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
      </View>

      <View style={style.btn_view}>
        <Image
          style={style.left_shape}
          source={require('../../assets/images/leftshape.png')}
        />
        <View style={style.btn_option}>
          <TouchableOpacity
            style={style.btn}
            onPress={() => {
              setsaved(!saved);
            }}>
            <Button title={'Save'} />
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
      <Modal visible={saved} transparent={true} animationType="slide">
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
                <Image
                  style={style.tick}
                  source={require('../../assets/images/tick.png')}
                />
              </View>
              <View style={style.modal_text_view}>
                <Text style={style.modal_text}>
                  Your Password has been Changed
                </Text>
              </View>
              <TouchableOpacity style={style.modal_btn_view} onPress={()=>navigate.navigate(RoutNames.LoginScreen)}>
                <SmallButton title={'Login'} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};
const style = StyleSheet.create({
  container: {
    
    backgroundColor: color.palette.white,
  },
  Allinputfeild_view: {
    marginTop: -20,
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
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  condition_view: {
    flex: 0.1,
    alignItems: 'center',
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
  modal_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    width: '80%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
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
    color:color.palette.black
  },
  modal_btn_view: {
    width: 100,
    height: 35,
  },
});
