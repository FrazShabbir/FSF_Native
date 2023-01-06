import {View, Text} from 'react-native';
import React from 'react';
import {SkypeIndicator} from 'react-native-indicators';
import {color} from '../../theme';
import {useSelector} from 'react-redux';
export const Loader = () => {
  const {loading} = useSelector(state => state.UserReducer);
  return (
    <>
      {loading ? (
        <SkypeIndicator
          style={{position: 'absolute', alignSelf: 'center', top: '50%'}}
          color={color.palette.darkblue}
          size={50}
        />
      ) : null}
    </>
  );
};
