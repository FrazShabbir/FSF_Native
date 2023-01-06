import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { SkypeIndicator } from 'react-native-indicators';
import { color, typography } from '../theme';
import { useDispatch, useSelector } from 'react-redux';
import { Loggin, SetAllApplications, SetEnrollstatus } from '../Reduxs/Reducers';
import { useNavigation } from '@react-navigation/native';
import { RoutNames } from '../navigation/routeNames';
import { useEffect } from 'react';

export const Welcome = ({route}) => {
    const dispatch=useDispatch()
    const navigate=useNavigation()
    //const {id,token}=route.params;
      const {user,token}=useSelector((state)=>state.UserReducer)
    useEffect(() => {
      fetch(
        `https://fsfeu.org/es/fsf/api/application/myapplication?user_id=${user.id}&api_token=${token}`,
      )
        .then(res => res.json())
        .then(data => {
          console.log('Applications', data);
  
          if (data.applications == null) {
            dispatch(SetEnrollstatus('notRegister'));
          } else {

            dispatch(SetAllApplications(data.applications));
            navigate.navigate(RoutNames.HomeScreen)
          }
        });
      
      }, []);
    
  return (
    <LinearGradient
      colors={[color.palette.darkblue, color.palette.lightBlue]}
      style={style.initial_Model}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{bottom: 75, fontFamily: typography.bold, fontSize: 25,color:color.palette.white}}>
          Welcome To FSF
        </Text>
        <SkypeIndicator color="white" size={70} />
      </View>
    </LinearGradient>
  );
}
const style=StyleSheet.create({
    initial_Model: {
        flex: 1,
        justifyContent:"center"
      },
})