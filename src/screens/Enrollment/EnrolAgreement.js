import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React, {useRef} from 'react';
import {HomeComponent, NearBtn} from '../../components';
import {color} from '../../theme';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyHower from '../../assets/HomeAssets/Svgs/privacyHower.svg';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import {fontWeights} from '../../theme/styles';
import DownloadIcon from '../../assets/HomeAssets/Svgs/downloadIcon.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import RightArrow from '../../assets/svg/rightArrow.svg';
import Cell from '../../assets/HomeAssets/Svgs/cellIconWhite.svg';
import BackDown from '../../assets/HomeAssets/Svgs/backDown.svg';
import LocIcon from '../../assets/HomeAssets/Svgs/locationIcon.svg';
import LocDot from '../../assets/HomeAssets/Svgs/locationDot.svg';

import LinearGradient from 'react-native-linear-gradient';
export const EnrolAgreement = () => {
  const refRBSheet = useRef();
  const navigate = useNavigation();
  return (
    <View style={style.container}>
      <HomeComponent title={'Terms & Conditions'} backIcon={true} />
      <View style={style.bottom_container}>
        <View style={style.text_container}>
          <Text style={style.haeding}>User's Privacy</Text>
          <Text style={style.paragraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
          <Text style={style.haeding}>What is Funeral services Fund?</Text>
          <Text style={style.paragraph}>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </Text>
        </View>
        <View style={style.download_conatainer}>
          <TouchableOpacity style={style.manual_view}>
            <View style={style.download_icon_view}>
              <DownloadIcon width="100%" height="100%" />
            </View>
            <View style={style.manual_text_conatiner}>
              <Text style={style.manual_text}>
                Download Privacy Policy (urdu)
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={style.manual_view}>
            <View style={style.download_icon_view}>
              <DownloadIcon width="100%" height="100%" />
            </View>
            <View style={style.manual_text_conatiner}>
              <Text style={style.manual_text}>
                Download Privacy Policy (english)
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.agree_container}>
          <TouchableOpacity
            onPress={() => navigate.navigate(RoutNames.EnrollmentScreen)}>
            <LinearGradient
              useAngle={true}
              colors={[color.palette.darkblue, color.palette.lightBlue]}
              style={style.power_container}>
              <Text style={style.text}>Agree</Text>
              <View style={style.powerIcon_view}>
                <RightArrow width={'100%'} height={'100%'} />
              </View>
            </LinearGradient>
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
          <View style={style.icons}>
            <PrivacyHower width={'100%'} />
          </View>
          <TouchableOpacity
            style={style.icons}
            onPress={() => navigate.navigate(RoutNames.SettingScreen)}>
            <SettingIcon width={'100%'} />
          </TouchableOpacity>
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

  bottom_tab_container: {
    flex: 0.08,
    backgroundColor: color.palette.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn_view: {
    height: '10%',
    width: '80%',
    alignSelf: 'center',
    alignItems: 'flex-end',
    justifyContent: 'center',
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
  text_container: {
    height: '75%',
    width: '80%',
    alignSelf: 'center',
    paddingTop:20
  },
  haeding: {
    fontSize: 17,
    fontWeight: fontWeights.bold,
    color: color.palette.black,
    paddingBottom: 7,
  },
  paragraph: {
    fontSize: 12,
    color: color.palette.black,
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
    width: 90,
    height: "100%",
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    color: color.palette.white,
    fontWeight: fontWeights.bold,
  },
  powerIcon_view: {
    width: '20%',
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
  manual_view: {
    flexDirection: 'row',
  },
  download_icon_view: {
    width: 30,
    height: 30,
  },
  manual_text_conatiner: {
    justifyContent: 'center',
    paddingLeft: 2,
  },
  manual_text: {
    color: color.palette.black,
    left: 3,
    borderBottomWidth: 1,
    borderBottomColor: color.palette.black,
  },
  agree_container:{
    alignItems:"flex-end",
    width:"80%",
    alignSelf:"center",
    height:"5%",
  }
});
