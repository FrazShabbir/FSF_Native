import {View, Text, TextInput, StyleSheet, Image} from 'react-native';
import React from 'react';
import {color} from '../theme';
import Email from '../assets/svg/email.svg'
import User from '../assets/svg/smallUser.svg'
import Lock from '../assets/svg/lock.svg'
export const CustomTextInput = ({icon}) => {
  const getImage=()=> {
    if (icon === 'email') {
        return <Email style={style.user} height={20} width={22} />
    }
    if (icon === 'user') {
        return <User width={20} height={24} />
    }
    return <Lock width={20} height={24} />
}
  return (
    <View style={style.input_view}>
      <View style={style.lock_view}>
        {getImage()}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  input_view: {
    height: 50,
    backgroundColor: color.palette.lightwhite,
    justifyContent: 'center',
    width: '100%',
    borderRadius: 15,
  },
  lock_view: {
    padding: 16,
    alignSelf: 'flex-start',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lock: {
    width: 17,
    height: 20,
  },
  user:{
    width:17,
    height:22
  }
});
