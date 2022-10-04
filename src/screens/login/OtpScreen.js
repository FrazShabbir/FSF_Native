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
  import {fontSizes, fontWeights, globalStyles} from '../../theme/styles';
  import {
    Login_signup_Component,
    CustomTextInput,
    Button,
  } from '../../components';
  import { ScrollView } from 'react-native-gesture-handler';
  import { RoutNames } from '../../navigation/routeNames';
  import { useNavigation } from '@react-navigation/native';
  
  export const OtpScreen = () => {
      const navigate=useNavigation()
  
    return (
      <ScrollView style={[style.container, globalStyles.fillAll]}>
        <Login_signup_Component
          title={'FSF OTP'}
          description={'Please enter OTP, that is sent to your provided email'}
          uersImg={require('../../assets/images/bigEmail.png')}
        />
        <View style={style.Allinputfeild_view}>
          <View style={style.otp_input_view}>
            <TextInput style={style.otp_input} />

            <TextInput style={style.otp_input} />

            <TextInput style={style.otp_input} />

            <TextInput style={style.otp_input} />
         </View>

        </View>
        <View style={style.btn_view}>
          <Image
            style={style.left_shape}
            source={require('../../assets/images/leftshape.png')}
          />
          <View style={style.btn_option}>
            <TouchableOpacity style={style.btn} onPress={()=>navigate.navigate(RoutNames.NewPasswordScreen)}>
              <Button title={'Varify'} />
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
      justifyContent:'center',
      alignItems: 'center',
      paddingBottom:50
    },
    otp_input_view:{
      justifyContent:"space-around",
      alignItems: 'center',
      flexDirection:'row',
      width:"80%"
    },
    otp_input:{
      borderBottomWidth:2,
      borderBottomColor:'black',
      width:"15%",
      textAlign:'center',
      fontSize:30,
      fontWeight:fontWeights.bold,
      color:'black'
      
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
  