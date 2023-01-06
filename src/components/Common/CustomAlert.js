import {View, Text, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import {fontWeights} from '../../theme/styles';
import AlertIcon from '../../assets/HomeAssets/Svgs/alertIcon.svg';
export const CustomAlert = () => {
  return (
    //<Modal visible={true} transparent={true} animationType="fade">
    <View style={style.modal_view}>
      <>
        <View style={style.view}>
          <View style={style.heading_container}>
            <View style={style.heading_icon}>
              <AlertIcon width={'100%'} height={'100%'} />
            </View>
            <Text style={{fontSize:16,fontWeight:"800"}}>Representative information</Text>
          </View>
          <View style={[style.paragraph_container, {paddingTop: 10}]}>
            <Text style={style.paragraph_text}>
            Representative information only will be changed form the nearest office. If you want to update this information please visit nearest office
            </Text>
          </View>
        </View>
      </>
    </View>
    // </Modal>
  );
};
const style = StyleSheet.create({
  modal_view: {
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    position: 'absolute',
    height: '100%',
    alignItems:"center",
  },
  view: {
    top:80,
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',

    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading_container: {
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems:"center"
    
  },
  heading_icon: {
    width: 70,
    height: 70,
    borderRadius: 50,
    padding: 5,
  },
  heading_text_view: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
  },
  heading_text: {
    color: color.palette.black,
    fontSize: 17,
    fontWeight: fontWeights.extraBold,
  },
  paragraph_container: {
    width: '90%',
    padding: 5,
  },
  paragraph_text: {
    color: color.palette.black,
  },
  
});
