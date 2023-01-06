import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import React, {useRef, useState} from 'react';
import {HomeComponent, HomeEvent, NearBtn, NearestOffice} from '../../components';
import {color} from '../../theme';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';

import {fontWeights} from '../../theme/styles';
import Cell from '../../assets/HomeAssets/Svgs/cellIconWhite.svg';
import {RoutNames} from '../../navigation/routeNames';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import Cross from '../../assets/svg/cross.svg';
import AlertIcon from '../../assets/HomeAssets/Svgs/alertIcon.svg';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';

export const StatusScreen = () => {
  const refRBSheet = useRef();
  const [noRelative, setNoRelative] = useState(false);
  const navigate = useNavigation();
  const [openSheet,setopenSheet]=useState()

  return (
    <View style={style.container}>
      <HomeComponent backIcon={true} title={'Applications'} />
      <View style={[style.bottom_container, {}]}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={style.NearBtn}
            onPress={() => setopenSheet(!openSheet)}>
            <NearBtn title={"Nearest Office"}/>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            flexWrap: 'wrap',
            height: '70%',
            alignItems: 'center',
            width: '80%',
            alignSelf: 'center',
          }}>
            
          <TouchableOpacity
            onPress={() => navigate.navigate(RoutNames.RenewEnrollStatus)}
            style={[style.event_view, {}]}>
            <HomeEvent
              Icon={'circleArrow'}
              text={'All application & status'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigate.navigate(RoutNames.DonationStatusScreen)}
            style={style.event_view}>
            <HomeEvent
              Icon={'priceIcon'}
              text={'Donation receipt Upload application status'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.event_view}
            onPress={() =>navigate.navigate(RoutNames.FamilyStatusScreen)}>
            <HomeEvent
              Icon={'peoples'}
              text={'See your family application status'}
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={style.bottom_tab_container}>
        <View style={style.icons_container}>
          <TouchableOpacity
            style={style.icons}
            onPress={() => navigate.navigate(RoutNames.HomeScreen)}>
            <HomeIcon width={'100%'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.icons}
            onPress={() => navigate.navigate(RoutNames.AboutScreen)}>
            <AboutIcon width={'100%'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.icons}
            onPress={() => navigate.navigate(RoutNames.PrivacyScreen)}>
            <PrivacyIcon width={'100%'} />
          </TouchableOpacity>
          <TouchableOpacity
            style={style.icons}
            onPress={() => navigate.navigate(RoutNames.SettingScreen)}>
            <SettingIcon width={'100%'} />
          </TouchableOpacity>
        </View>
      </View>
      <NearestOffice open={openSheet}/>
      <Modal visible={noRelative} transparent={true} animationType="fade">
        <View style={style.modal_view}>
          <View style={style.view}>
            <View style={style.heading_container}>
              <View style={style.heading_icon}>
                <AlertIcon width={'100%'} height={'100%'} />
              </View>
              <View style={style.heading_text_view}>
                <Text style={style.heading_text}>
                There is no family
                </Text>
              </View>
            </View>
            <View style={[style.paragraph_container, {paddingTop: 10}]}>
              <Text style={style.paragraph_text}>
                You don’t have family member in your hierarchy. Please add your
                fmaily member or contact to the nearest office.
              </Text>
            </View>
            <TouchableOpacity style={style.cross_view} onPress={() => {
              setNoRelative(false)
            }}>
              <Cross width={'100%'} height={'100%'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.lightBlue,
  },
  bottom_container: {
    flex: 0.76,
    backgroundColor: color.palette.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  event_view: {
    width: '50%',
    height: '38%',
  },
  bottom_tab_container: {
    flex: 0.08,
    backgroundColor: color.palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icons: {
    width: '20%',
  },
  icons_container: {
    width: '85%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  btn_view: {
    height: '10%',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  NearBtn: {
    alignItems: 'flex-end',
  },
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
    fontWeight: fontWeights.extraBold,
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
  },

  log_btn_view: {
    height: '30%',
    justifyContent: 'center',
  },
  power_container: {
    width: 130,
    height: 34,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    color: color.palette.white,
    fontWeight: fontWeights.bold,
  },
  powerIcon_view: {
    width: '15%',
  },
  loc_icon_container: {
    top: '3%',
  },
  loc_icon: {
    width: '45%',
    height: 30,
    position: 'absolute',
    alignSelf: 'center',
  },
  download_conatainer: {
    height: '15%',
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  modal_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  view: {
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
    flexDirection: 'row',
  },
  heading_icon: {
    width: 45,
    height: 45,
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
  cross_view: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 7,
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 7,
    top: -10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
