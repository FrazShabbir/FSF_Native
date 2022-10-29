import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef} from 'react';
import {FormStatus, HomeComponent, HomeEvent, NearBtn} from '../../components';
import {color} from '../../theme';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import LocIcon from '../../assets/HomeAssets/Svgs/locationIcon.svg';
import LocDot from '../../assets/HomeAssets/Svgs/locationDot.svg';
import BackDown from '../../assets/HomeAssets/Svgs/backDown.svg';
import {fontWeights} from '../../theme/styles';
import Cell from '../../assets/HomeAssets/Svgs/cellIconWhite.svg';
import {RoutNames} from '../../navigation/routeNames';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import { ScrollView } from 'react-native-gesture-handler';

export const RenewEnrollStatus = () => {
  const refRBSheet = useRef();
  const navigate = useNavigation();
  return (
    <View style={style.container}>
      <HomeComponent backIcon={true} title={'Form Submission'} />
      <View style={style.status_text_view}>
        <Text style={style.status_text}>Status</Text>
      </View>
      <View style={[style.bottom_container, {}]}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={style.NearBtn}
            onPress={() => refRBSheet.current.open()}>
            <NearBtn />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={style.form_container}>
            <FormStatus date={"25-5-2022"} title={"Submit Enrolment Form"} status={'accepted'} icon={"stats"} />
            <FormStatus date={"14-6-2019"} title={"Renew Subscription"} status={'pendding'} icon={"stats"} />
            <FormStatus date={"13-5-2020"} title={"Submit Enrolment Form"} status={'rejected'} icon={"stats"} />
            <FormStatus date={"25-5-2022"} title={"Submit Enrolment Form"} status={'accepted'} icon={"stats"} />
            <FormStatus date={"14-6-2019"} title={"Renew Subscription"} status={'pendding'} icon={"stats"} />
            <FormStatus date={"13-5-2020"} title={"Submit Enrolment Form"} status={'rejected'} icon={"stats"} />
            <FormStatus date={"25-5-2022"} title={"Submit Enrolment Form"} status={'accepted'} icon={"stats"} />
            <FormStatus date={"14-6-2019"} title={"Renew Subscription"} status={'pendding'} icon={"stats"} />
            <FormStatus date={"13-5-2020"} title={"Submit Enrolment Form"} status={'rejected'} icon={"stats"} />
            <FormStatus date={"25-5-2022"} title={"Submit Enrolment Form"} status={'accepted'} icon={"stats"} />
            <FormStatus date={"14-6-2019"} title={"Renew Subscription"} status={'pendding'} icon={"stats"} />
            <FormStatus date={"13-5-2020"} title={"Submit Enrolment Form"} status={'rejected'} icon={"stats"} />
            <FormStatus date={"25-5-2022"} title={"Submit Enrolment Form"} status={'accepted'} icon={"stats"} />
            <FormStatus date={"14-6-2019"} title={"Renew Subscription"} status={'pendding'} icon={"stats"} />
            <FormStatus date={"13-5-2020"} title={"Submit Enrolment Form"} status={'rejected'} icon={"stats"} />

        </ScrollView>
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
      <RBSheet
        ref={refRBSheet}
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
                <LocIcon width={22} height={40} />
                <View style={style.loc_icon}>
                  <LocDot width="100%" height="100%" />
                </View>
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
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  Office Name:
                </Text>
                <Text style={style.office_text}>Ali Ahmad</Text>
              </View>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  Officer Cell No:
                </Text>
                <Text style={style.office_text}>031551548515</Text>
              </View>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  State:
                </Text>
                <Text style={style.office_text}>Dummy</Text>
              </View>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  City:
                </Text>
                <Text style={style.office_text}>Dummy City</Text>
              </View>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  Area:
                </Text>
                <Text style={style.office_text}>Dummy Area</Text>
              </View>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  Street:
                </Text>
                <Text style={style.office_text}>Street Dummy A-3</Text>
              </View>
            </View>
            <View style={style.log_btn_view}>
              <TouchableOpacity onPress={() => dialCall('000000000')}>
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
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: color.palette.lightBlue,
  },
  status_text_view:{
    height:40,
    width:"80%",
    alignSelf:'center',
    bottom:20,
    
  },
  status_text:{
    fontSize: 28,
    fontWeight: fontWeights.extraBold,
    color: color.palette.black,
  },
  bottom_container: {
    flex: 0.76,
    backgroundColor: color.palette.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    
  },
  form_container:{
    flex:1,
    alignSelf:"center",
    width:"80%"
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
});
