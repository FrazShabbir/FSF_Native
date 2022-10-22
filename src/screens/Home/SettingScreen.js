import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import React, {useRef, useState} from 'react';
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
import PowerLine from '../../assets/HomeAssets/Svgs/powerIconLIne.svg';
import EditIcon from '../../assets/HomeAssets/Svgs/editIcon.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import Cross from '../../assets/svg/cross.svg';
import WhiteTick from '../../assets/HomeAssets/Svgs/whiteTIck.svg';
import EditIconWhite from '../../assets/EnrolmentAssets/EditIconWhite.svg';
import Cellicon from '../../assets/HomeAssets/Svgs/cellIcon.svg';
import ImagePicker from 'react-native-image-crop-picker';

export const SettingScreen = () => {
  const refRBSheet = useRef();
  const profileRBsheet = useRef();
  const [imgPath, setimgPath] = useState('');
  const [img, setimg] = useState(false);

  const pickFromGallary = () => {
    ImagePicker.clean()
      .then(() => {})
      .catch(e => {
        alert(e);
      });
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      setimgPath(image.path);
      setimg(true);
      profileRBsheet.current.close();
    });
  };
  const pickFromCamer = () => {
    ImagePicker.clean()
      .then(() => {})
      .catch(e => {
        alert(e);
      });
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    }).then(image => {
      setimgPath(image.path);
      setimg(true);
      profileRBsheet.current.close();
    });
  };

  const select = () => {
    if (img == true) {
      return (
        <Image
          style={{width: '100%', height: '100%', borderRadius: 50}}
          source={{uri: imgPath}}
        />
      );
    } else {
      return (
        <Image
          style={{width: '100%', height: '100%'}}
          source={require('../../assets/images/profile.png')}
        />
      );
    }
  };
  console.log('object', imgPath);
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
              <Cellicon width={'100%'} height={'100%'} />
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
            <View style={[style.profile, {width: 100, height: 100}]}>
              {select()}
              <TouchableOpacity
                onPress={() => profileRBsheet.current.open()}
                style={{
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  top: '60%',
                }}>
                <LinearGradient
                  colors={[color.palette.darkblue, color.palette.lightBlue]}
                  style={style.edit_white_container}>
                  <View style={style.edit_white_view}>
                    <EditIconWhite width={'100%'} height={'100%'} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
          <View style={style.Edit_profile_container}>
            <View style={style.edit_profile_view}>
              <TextInput
                style={style.profile_input}
                placeholder={'Muhammad Ali Asghar'}
                placeholderTextColor={color.palette.black}
              />
              <View style={style.profile_input_icon}>
                <User width={'100%'} height={'100%'} />
              </View>
              <View style={{borderWidth: 1, bottom: 8}}></View>
            </View>
            <View style={style.edit_profile_view}>
              <TextInput
                style={style.profile_input}
                placeholder={'Dummy@gmail.com'}
                placeholderTextColor={color.palette.black}
              />
              <View style={style.profile_input_icon}>
                <Email width={'100%'} height={'100%'} />
              </View>
              <View style={{borderWidth: 1, bottom: 8}}></View>
            </View>
            <View style={style.edit_profile_view}>
              <TextInput
                style={style.profile_input}
                placeholder={'15151151551'}
                placeholderTextColor={color.palette.black}
              />
              <View style={style.profile_input_icon}>
                <Cellicon width={'100%'} height={'100%'} />
              </View>
              <View style={{borderWidth: 1, bottom: 8}}></View>
            </View>
          </View>
          <View
            style={[style.log_btn_view, {width: '80%', alignSelf: 'center'}]}>
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
          <>
            <RBSheet
              ref={profileRBsheet}
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
                  height: '30%',
                },
              }}>
              <View style={style.profile_sheet_container}>
                <TouchableOpacity onPress={() => pickFromGallary()}>
                  <LinearGradient
                    useAngle={true}
                    colors={[color.palette.darkblue, color.palette.lightBlue]}
                    style={style.pick_camera_view}>
                    <Text style={style.camera_text}>
                      Pick Image From Gallary
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => pickFromCamer()}>
                  <LinearGradient
                    useAngle={true}
                    colors={[color.palette.darkblue, color.palette.lightBlue]}
                    style={style.pick_gallery_view}>
                    <Text style={style.gallary_text}>
                      Pick Image from Camera
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            </RBSheet>
          </>
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
    paddingBottom: 3,
  },
  input_icon: {
    width: 30,
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
  power_line: {
    position: 'absolute',
    alignSelf: 'center',
    top: 4,
  },
  edit_white_container: {
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  edit_white_view: {
    width: 15,
    height: 15,
  },
  profile_sheet_container: {
    flex: 1,
    justifyContent: 'center',
  },
  pick_gallery_view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 20,
  },
  gallary_text: {
    color: color.palette.white,
    fontSize: 18,
    fontWeight: fontWeights.bold,
  },
  pick_camera_view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 20,
    marginBottom: 20,
  },
  camera_text: {
    color: color.palette.white,
    fontSize: 18,
    fontWeight: fontWeights.bold,
  },
  Edit_profile_container: {
    width: '80%',
    alignSelf: 'center',
    height: '35%',
  },
  edit_profile_view: {
    width: '100%',
    alignSelf: 'center',
  },
  profile_input: {
    textAlignVertical: 'bottom',
    paddingLeft: 40,
    color: color.palette.black,
  },
  profile_input_icon: {
    width: 20,
    height: 20,
    position: 'absolute',
    top: '30%',
    left: 4,
  },
});
