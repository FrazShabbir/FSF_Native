import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {color, typography} from '../../theme';
import {fontWeights} from '../../theme/styles';
import Cell from '../../assets/HomeAssets/Svgs/cellIconWhite.svg';
import BackDown from '../../assets/HomeAssets/Svgs/backDown.svg';
import LocIcon from '../../assets/HomeAssets/Svgs/locationIcon.svg';
import LocDot from '../../assets/HomeAssets/Svgs/locationDot.svg';
import {useRef, useEffect, useCallback} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import {useSelector} from 'react-redux';
export const NearestOffice = ({open}) => {
  const {user, token, NearOffice} = useSelector(state => state.UserReducer);
  const [data, setdata] = useState(NearOffice);
  //console.log("toek",token)

  useEffect(() => {
    if (open == true) {
      refRBSheet.current.open();
    } else if (open == false) {
      refRBSheet.current.open();
    } else {
      refRBSheet.current.close();
    }
  }, [open]);

  const refRBSheet = useRef();
  const dialCall = number => {
    let phoneNumber = '';
    if (Platform.OS === 'android') {
      phoneNumber = `tel:${number}`;
    } else {
      phoneNumber = `telprompt:${number}`;
    }
    Linking.openURL(phoneNumber);
  };

  return (
    <RBSheet
      ref={refRBSheet}
      closeOnPressBack
      closeOnDragDown={true}
      openDuration={500}
      closeOnPressMask={true}
      animationType={'fade'}
      customStyles={{
        wrapper: {
          backgroundColor: 'rgba(0,0,0,0.6)',
        },
        draggableIcon: {
          backgroundColor: 'white',
        },
        container: {
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          height: '40%',
        },
      }}>
      <View style={style.sheet_container}>
        <View style={[style.edit_container, {}]}>
          <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
            <View style={style.loc_icon_container}>
              <LocIcon width={33} height={40} />
            </View>
            <Text style={style.personal_text}> Near Service Center</Text>
          </View>
          <TouchableOpacity
            style={[style.edit_icon_view, {}]}
            onPress={() => refRBSheet.current.close()}>
            <BackDown width={'100%'} height={'100%'} />
          </TouchableOpacity>
        </View>
        <View style={style.office_container}>
          <View style={style.office_info_view}>
            <View style={style.info_view}>
              <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                Office Name:
              </Text>
              <Text style={style.office_text}>{data[0]?.name}</Text>
            </View>
            <View style={style.info_view}>
              <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                Officer Cell No:
              </Text>
              <Text style={style.office_text}>{data[0]?.phone}</Text>
            </View>
            <View style={style.info_view}>
              <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                State:
              </Text>
              <Text style={style.office_text}>{data[0]?.officehead}</Text>
            </View>
            <View style={style.info_view}>
              <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                City:
              </Text>
              <Text style={style.office_text}>{data[0]?.city_id}</Text>
            </View>
            <View style={style.info_view}>
              <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                Area:
              </Text>
              <Text style={style.office_text}>{data[0]?.area}</Text>
            </View>
            <View style={style.info_view}>
              <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                Street:
              </Text>
              <Text style={style.office_text}>{data[0]?.street}</Text>
            </View>
          </View>
          <View style={style.log_btn_view}>
            <TouchableOpacity 
            style={{alignItems:'flex-start'}} onPress={() => dialCall(data[0]?.phone)}>
              <LinearGradient
                useAngle={true}
                colors={[color.palette.darkblue, color.palette.lightBlue]}
                style={style.power_container}>
                <View style={style.powerIcon_view}>
                  <Cell width={'100%'} height={'100%'} />
                </View>
                <Text style={style.text}>Call Us Now</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </RBSheet>
  );
};

const style = StyleSheet.create({
  sheet_container: {
    flex: 1,
  },

  edit_container: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  personal_text: {
    fontSize: 20,
   fontFamily:typography.demi,
    color: color.palette.black,
  },
  edit_icon_view: {
    width: 22,
    height: 22,
  },
  profile_container: {
    height: '20%',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profile: {
    width: '60%',
    height: '60%',
  },
  textInput_container: {
    width: '80%',
    alignSelf: 'center',
    height: '25%',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  text_view: {},
  info_text: {
    borderBottomColor: color.palette.black,
    borderBottomWidth: 1,
    paddingLeft: '13%',
    color: color.palette.black,
  },
  input_icon: {
    width: '10%',
    height: 20,
    position: 'absolute',
    paddingLeft: 10,
  },
  office_container: {
    alignSelf: 'center',
    width: '80%',
    flex: 1,
  },
  office_heading_view: {
    height: '15%',
  },
  office_heading_text: {
    fontWeight: fontWeights.extraBold,
    color: color.palette.black,
    fontSize: 20,
  },
  office_info_view: {
    height: '70%',
    paddingTop: 30,
    paddingBottom: 10,
  },
  info_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 20,
    paddingRight: 20,

    flexGrow: 1,
  },
  office_text: {
    color: color.palette.black,
    fontSize: 13,
    fontFamily:typography.medium
  },

  log_btn_view: {
    height: '30%',
    justifyContent: 'center',
  },
  power_container: {
    height: 34,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    color: color.palette.white,
    marginLeft:8,
    fontFamily:typography.demi
  },
  powerIcon_view: {
    width: 20,
    height:20,
  },
  loc_icon_container: {
    top: '3%',
  },
  
});
