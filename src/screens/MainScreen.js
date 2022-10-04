import {View, Text, Image, StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import {colors, fontWeights, globalStyles as styles} from '../theme/styles';
import {color, typography} from '../theme';
import {Button} from '../components';
import {ScrollView} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../navigation/routeNames';
export const MainScreen = () => {
  const navigate = useNavigation();
  return (
    <View style={style.container}>
      <View style={style.shape_container}>
        <View style={style.fix}>
          <Image
            style={style.shape}
            source={require('../assets/images/shape.png')}
          />
          <Text style={style.title}>Funeral Service Fund</Text>
        </View>
      </View>
      <View style={style.logo_view}>
        <Image
          style={style.logo}
          source={require('../assets/images/logo.png')}
        />
      </View>
      <View style={style.btn_view}>
        <TouchableOpacity
          style={style.btn}
          onPress={() => navigate.navigate(RoutNames.LoginScreen)}>
          <Button title={'Sign In'} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigate.navigate(RoutNames.SignUpScreen)} style={style.btn}>
          <Button title={'Create Account'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:color.palette.white
  },
  shape_container: {
    flex: 0.4,
    width: '90%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
  },
  shape: {
    alignSelf: 'flex-end',
    width: 383,
    height: 420,
    marginTop: 20,
  },
  title: {
    fontSize: 45,
    color: colors.white,
    position: 'absolute',
    fontWeight: fontWeights.extraBold,
    width: '60%',
    paddingLeft: 20,
    
  },
  fix: {
    flex: 1,
    width: 363,
    height: 400,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo_view: {
    flex: 0.32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 280,
    height: 280,
  },
  btn_view: {
    marginTop: 15,
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    paddingBottom: 20,
    width: '70%',
  },
});
