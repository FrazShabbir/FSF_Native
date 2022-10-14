import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import React, {useRef} from 'react';
import {HomeComponent, NearBtn} from '../../components';
import {color} from '../../theme';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingHower.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import {fontWeights} from '../../theme/styles';
import Profile from '../../assets/HomeAssets/Svgs/profilePhoto.svg';
import User from '../../assets/svg/smallUser.svg';
import Email from '../../assets/svg/email.svg';
import LinearGradient from 'react-native-linear-gradient';
import PowerIcon from '../../assets/HomeAssets/Svgs/powerIcon.svg';
import PowerLine from '../../assets/HomeAssets/Svgs/powerIconLIne.svg'
import EditIcon from '../../assets/HomeAssets/Svgs/editIcon.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import Cross from '../../assets/svg/cross.svg';
import WhiteTick from '../../assets/HomeAssets/Svgs/whiteTIck.svg';
export const SettingScreen = () => {
  const refRBSheet = useRef();

  const navigate = useNavigation();
  return (
    <View style={style.container}>
      <HomeComponent title={'Setting'} backIcon={true} />
      <View style={style.bottom_container}>
        <View style={style.edit_container}>
          <Text style={style.personal_text}>Personal Information</Text>
          <TouchableOpacity
            style={style.edit_icon_view}
            onPress={() => refRBSheet.current.open()}>
            <EditIcon width={'100%'} />
          </TouchableOpacity>
        </View>
        <View style={style.profile_container}>
          <View style={style.profile}>
            <Profile width={'100%'} height={'100%'} />
          </View>
        </View>
        <View style={style.textInput_container}>
          <View style={style.text_view}>
            <Text style={style.info_text}>Muhammad Ali Asghar</Text>
            <View style={style.input_icon}>
              <User width={'100%'} height={'100%'} />
            </View>
          </View>
          <View style={style.text_view}>
            <Text style={style.info_text}>Dummy@gmail.com</Text>
            <View style={style.input_icon}>
              <Email width={'100%'} height={'100%'} />
            </View>
          </View>
          <View style={style.text_view}>
            <Text style={style.info_text}>0300153100534</Text>
            <View style={style.input_icon}>
              <User width={'100%'} height={'100%'} />
            </View>
          </View>
        </View>
        <View style={style.office_container}>
          <View style={style.office_heading_view}>
            <Text style={style.office_heading_text}>Near Service Center</Text>
          </View>
          <View style={style.office_info_view}>
            <View style={style.info_view}>
              <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                Office Name:
              </Text>
              <Text style={style.office_text}>Ali Ahmad</Text>
            </View>
            <View style={style.info_view}>
              <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                Officer Cell No:
              </Text>
              <Text style={style.office_text}>031551548515</Text>
            </View>
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
          <View style={style.log_btn_view}>
            <TouchableOpacity>
            <LinearGradient
              useAngle={true}
              colors={[color.palette.darkblue, color.palette.lightBlue]}
              style={style.power_container}>
              <View style={style.powerIcon_view}>
                <PowerIcon width={'100%'} height={'100%'} />
                <View style={style.power_line}>
                <PowerLine width={10} height={12} />
                </View>
              </View>
              <Text style={style.text}>Log out</Text>
            </LinearGradient>
            </TouchableOpacity>
          </View>
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
          <View style={style.icons}>
            <SettingIcon width={'100%'} />
          </View>
        </View>
      </View>

      {/*       <Button title="OPEN BOTTOM SHEET" onPress={() => refRBSheet.current.open()} />
       */}
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={false}
        openDuration={500}
        closeOnPressMask={false}
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
            height: '60%',
          },
        }}>
        <View style={style.sheet_container}>
          <View style={[style.edit_container, {}]}>
            <Text style={style.personal_text}> Edit Personal Information</Text>
            <TouchableOpacity
              style={[style.edit_icon_view, {}]}
              onPress={() => refRBSheet.current.close()}>
              <Cross width={'100%'} height={'100%'} />
            </TouchableOpacity>
          </View>
          <View style={[style.profile_container, {height: '35%'}]}>
            <View style={style.profile}>
              <Profile width={'100%'} height={'100%'} />
            </View>
          </View>
          <View style={[style.textInput_container, {height: '35%'}]}>
            <View style={style.text_view}>
              <Text style={style.info_text}>Muhammad Ali Asghar</Text>
              <View style={style.input_icon}>
                <User width={'100%'} height={'100%'} />
              </View>
            </View>
            <View style={style.text_view}>
              <Text style={style.info_text}>Dummy@gmail.com</Text>
              <View style={style.input_icon}>
                <Email width={'100%'} height={'100%'} />
              </View>
            </View>
            <View style={style.text_view}>
              <Text style={style.info_text}>0300153100534</Text>
              <View style={style.input_icon}>
                <User width={'100%'} height={'100%'} />
              </View>
            </View>
          </View>
          <View
            style={[style.log_btn_view, {width: '80%', alignSelf: 'center',}]}>
              <TouchableOpacity>
            <LinearGradient
              useAngle={true}
              colors={[color.palette.darkblue, color.palette.lightBlue]}
              style={style.power_container}>
              <View style={style.powerIcon_view}>
                <WhiteTick width={'100%'} height={'100%'} />
              </View>
              <Text style={style.text}>Update</Text>
            </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </RBSheet>
    </View>
  );
};
const style = StyleSheet.create({
  sheet_container: {
    top: '3%',
    flex: 1,
  },

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
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
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
    height: '80%',
    width: '80%',
    alignSelf: 'center',
  },
  haeding: {
    fontSize: 15,
    fontWeight: fontWeights.bold,
    color: color.palette.black,
    paddingBottom: 7,
  },
  paragraph: {
    fontSize: 12,
    color: color.palette.black,
  },
  manual_view: {
    height: '10%',
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  download_icon_view: {
    width: '8%',
  },
  manual_text_conatiner: {},
  manual_text: {
    color: color.palette.black,
    left: 3,
  },
  edit_container: {
    height: '7%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'space-between',
  },
  personal_text: {
    fontSize: 15,
    fontWeight: fontWeights.extraBold,
    color: color.palette.black,
  },
  edit_icon_view: {
    width: '10%',
    height: '50%',
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
    fontSize: 16,
  },
  office_info_view: {
    height: '65%',
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
  },

  log_btn_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  power_container: {
    width: '30%',
    height: 32,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    color: color.palette.white,
  },
  powerIcon_view: {

    width: '20%',
  },
  power_line:{
    position:"absolute",
    alignSelf:"center",
    top:4

  }
});
