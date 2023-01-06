import {StyleSheet, Text, View, TouchableOpacity, Linking} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Cell from '../../assets/HomeAssets/Svgs/cellIconWhite.svg';
import BackDown from '../../assets/HomeAssets/Svgs/backDown.svg';
import LocIcon from '../../assets/HomeAssets/Svgs/locationIcon.svg';
import {fontWeights} from '../../theme/styles';
import {color} from '../../theme';
import UserIcon from '../../assets/HomeAssets/Svgs/UserForSheet.svg';
import CellBlack from '../../assets/HomeAssets/Svgs/cellIconBlack.svg';
import NearIcon from '../../assets/HomeAssets/Svgs/nearIconSheet.svg';
import {useDispatch} from 'react-redux';
import {hideBSheet} from '../../Reduxs/Reducers/UserReducer';
import {useState} from 'react';
export const NearOfficeSheet = ({
  press
}) => {
  const dispatch = useDispatch();
  const [condition, setCondition] = useState(false);
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
    <View style={style.sheet_container}>
      <View style={{height: '30%', padding: 15}}>
        <View style={[style.officer_container]}>
          <View style={style.officer_view}>
            <View style={style.user_Icon}>
              <UserIcon width={'100%'} height={'100%'} />
            </View>
            <TouchableOpacity
            onPress={()=>{console.log("no"),press()}}
            >
              <Text style={style.officer_heading_text}>Officer Name</Text>
            </TouchableOpacity>
          </View>
          <Text style={style.officer_text}>Ali Ahmad</Text>
        </View>
        <View style={[style.officer_container, {top: 10}]}>
          <View style={style.officer_view}>
            <View style={style.user_Icon}>
              <CellBlack width={'100%'} height={'100%'} />
            </View>
            <Text style={style.officer_heading_text}>Officer Cell No.</Text>
          </View>
          <Text style={style.officer_text}>0000000000</Text>
        </View>
      </View>
      <View style={style.sevice_center_container}>
        <View style={style.naarIcon}>
          <NearIcon width={'100%'} height={'100%'} />
        </View>
        <Text style={style.service_center_text}>Service Center Location</Text>
      </View>

      <View style={style.office_container}>
        <View style={style.office_info_view}>
          <View style={style.info_view}>
            <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
              State:
            </Text>
            <Text style={style.office_text}>Dummy</Text>
          </View>
          <View style={style.info_view}>
            <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
              City:
            </Text>
            <Text style={style.office_text}>Dummy City</Text>
          </View>
          <View style={style.info_view}>
            <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
              Area:
            </Text>
            <Text style={style.office_text}>Dummy Area</Text>
          </View>
          <View style={style.info_view}>
            <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
              Street:
            </Text>
            <Text style={style.office_text}>Street Dummy A-3</Text>
          </View>
        </View>
      </View>

      <View style={style.log_btn_view}>
        <TouchableOpacity
          style={{width: '100%'}}
          onPress={() => dialCall('000000000')}>
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
  );
};

const style = StyleSheet.create({
  sheet_container: {
    flex: 1,
    width: '80%',
    alignSelf: 'center',
    top: '5%',
  },
  officer_container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  officer_view: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  user_Icon: {
    width: 25,
    height: 25,
  },
  officer_heading_text: {
    color: color.palette.black,
    fontWeight: fontWeights.bold,
    left: 10,
    fontSize: 15,
  },
  officer_text: {
    color: color.palette.black,
  },
  sevice_center_container: {
    flexDirection: 'row',
    height: '10%',
    paddingLeft: 15,
    paddingRight: 15,
    alignItems: 'center',
  },
  naarIcon: {
    width: 35,
    height: 35,
  },
  service_center_text: {
    left: 10,
    color: color.palette.black,
    fontWeight: fontWeights.extraBold,
    fontSize: 18,
    textDecorationLine: 'underline',
  },

  office_container: {
    alignSelf: 'center',
    width: '100%',
    height: '30%',
    alignItems: 'flex-end',
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
    height: '100%',
    width: '80%',
    marginRight: 10,
  },
  info_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  office_text: {
    color: color.palette.black,
    fontSize: 13,
  },

  edit_container: {
    height: '10%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  personal_text: {
    fontSize: 20,
    fontWeight: fontWeights.extraBold,
    color: color.palette.black,
  },

  log_btn_view: {
    height: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  power_container: {
    width: '80%',
    height: 35,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  text: {
    color: color.palette.white,
    fontWeight: fontWeights.bold,
    fontSize: 15,
    left: 5,
  },
  powerIcon_view: {
    width: 18,
    height: 18,
  },
  loc_icon_container: {
    width: 33,
    height: 33,
  },
  edit_icon_view: {
    width: 22,
    height: 22,
  },
});
