import {View, Text} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RoutNames} from './routeNames';
import {ForgetPassword, Login, MainScreen,NewPassword,OtpScreen,SignUp} from '../screens';
export const RootNavigation = () => {
  const stack = createStackNavigator();
  return (
    <NavigationContainer>
      <stack.Navigator screenOptions={{headerShown:false}}>
        <stack.Group>
        <stack.Screen name={RoutNames.MainScreen} component={MainScreen} /> 
        <stack.Screen name={RoutNames.LoginScreen} component={Login} /> 
        <stack.Screen name={RoutNames.SignUpScreen} component={SignUp} />
        <stack.Screen name={RoutNames.ForgetPassword} component={ForgetPassword} /> 
        <stack.Screen name={RoutNames.OtpScreen} component={OtpScreen} /> 
        <stack.Screen name={RoutNames.NewPasswordScreen} component={NewPassword} /> 

        
        </stack.Group>
      </stack.Navigator>
    </NavigationContainer>
  );
};
