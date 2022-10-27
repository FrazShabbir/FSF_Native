import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {RoutNames} from './routeNames';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  ForgetPassword,
  HomeScreen,
  Login,
  MainScreen,
  NewPassword,
  OtpScreen,
  SignUp,
  AboutScreen,
  PrivacyScreen,
  SettingScreen,
  AnnouncementScreen,
  EnrollmnetScreen,
  EnrollmentScreen,
  EnrolAgreement,
} from '../screens';
import {useSelector} from 'react-redux';
export const RootNavigator = React.forwardRef((props, ref) => {
  const {loginRequired} = useSelector(store => store.UserReducer);
  const stack = createStackNavigator();
  const tab = createBottomTabNavigator();
  return (
    <NavigationContainer {...props} ref={ref}>
      <stack.Navigator screenOptions={{headerShown: false}}>
        {loginRequired ? (
          <stack.Group>
            <stack.Screen name={RoutNames.MainScreen} component={MainScreen} />
            <stack.Screen name={RoutNames.LoginScreen} component={Login} />
            <stack.Screen name={RoutNames.SignUpScreen} component={SignUp} />
            <stack.Screen
              name={RoutNames.ForgetPassword}
              component={ForgetPassword}
            />
            <stack.Screen name={RoutNames.OtpScreen} component={OtpScreen} />
            <stack.Screen
              name={RoutNames.NewPasswordScreen}
              component={NewPassword}
            />
          </stack.Group>
        ) : (
          <tab.Group>
            <tab.Screen name={RoutNames.HomeScreen} component={HomeScreen} />
            <tab.Screen name={RoutNames.AboutScreen} component={AboutScreen} />
            <tab.Screen
              name={RoutNames.PrivacyScreen}
              component={PrivacyScreen}
            />
            <tab.Screen
              name={RoutNames.SettingScreen}
              component={SettingScreen}
            />
            <tab.Screen
              name={RoutNames.AnnouncementScreen}
              component={AnnouncementScreen}
            />
            <tab.Screen
              name={RoutNames.EnrolAgreement}
              component={EnrolAgreement}
            />

            <tab.Screen
              name={RoutNames.EnrollmentScreen}
              component={EnrollmentScreen}
            />
          </tab.Group>
        )}
      </stack.Navigator>
    </NavigationContainer>
  );
});
