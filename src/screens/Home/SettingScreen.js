import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Modal,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {HomeComponent, NearBtn} from '../../components';
import {color, typography} from '../../theme';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingHower.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import {fontWeights} from '../../theme/styles';
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
import {useDispatch, useSelector} from 'react-redux';
import {Logout, UpdateProfile} from '../../Reduxs/Reducers';
import {showMessage} from 'react-native-flash-message';
import {SkypeIndicator} from 'react-native-indicators';
import IntlPhoneInput from 'react-native-intl-phone-input';
export const SettingScreen = () => {
  const dispatch = useDispatch();
  const refRBSheet = useRef();
  const profileRBsheet = useRef();
  const [img, setimg] = useState(false);
  const [indicator, setIndicator] = useState(false);
  const {user, token, Enrollstatus, NearOffice} = useSelector(
    state => state.UserReducer,
  );
  const [valid, setValid] = useState('');
  const [profile, setprofile] = useState({
    id: user.id,
    fullName: user.full_name,
    email: user.email,
    phoneNumber: user.phone,
    avatar: user.avatar,
  });
  const [data, setdata] = useState(NearOffice);

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
      setprofile({
        ...profile,
        avatar: image.path,
      });

      setimg(true);
      profileRBsheet.current.close();
    });
  };
  const updateProfile = async () => {
    setIndicator(true);
    const formData = new FormData();
    formData.append('avatar', {
      uri: profile.avatar,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    formData.append('full_name', `${profile.fullName}`);
    formData.append('email', `${profile.email}`);
    formData.append('phone', `${profile.phoneNumber}`);
    formData.append('api_token', `${token}`);
    const res = await fetch(
      `https://fsfeu.org/es/fsf/api/myprofile/${profile.id}/update`,
      {
        method: 'post',
        body: formData,
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
    const jsonRes = await res.json();
    if (jsonRes.status === 200) {
      dispatch(UpdateProfile(jsonRes.user));
      console.log('res', jsonRes);
      showMessage({
        message: jsonRes.message,
        type: 'success',
        duration: 3000,
      });
      setIndicator(false);
    } else {
      showMessage({
        message: jsonRes.errors.email[0],
        type: 'danger',
        duration: 3000,
      });
      console.log('data', jsonRes);
      setIndicator(false);
    }
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
      setprofile({
        ...profile,
        avatar: image.path,
      });

      setimg(true);
      profileRBsheet.current.close();
    });
  };
  const UserLogout = async () => {
    dispatch(Logout());

    /*  setIndicator(true);
    const res = await fetch(
      `https://fsfeu.org/es/fsf/api/auth/logout?token=${token}&user_id=${profile.id}`,
      {
        method: 'Post',
        headers: {
          'content-type': 'application/json',
        },
      },
    ).then((res)=>res.json())
    .then((jsonRes)=>{
      if (jsonRes.status === 200) {
        dispatch(Logout({}));
        setIndicator(false);
        showMessage({
          message: jsonRes.message,
          type: 'success',
          duration: 3000,
        });
      } else {
        showMessage({
          message: jsonRes.message,
          type: 'danger',
          duration: 3000,
        });
        console.log(jsonRes.message);
        setIndicator(false);
       
      }
    }).catch((error)=>{
      showMessage({
        message:"Please Make Sure you're connected to Internet",
        type: 'danger',
        duration: 3000,
      });
      setIndicator(false);

    })
     */
  };
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
            <Image
              style={{width: '100%', height: '100%', borderRadius: 50}}
              source={{uri: user.avatar}}
            />
          </View>
        </View>
        <View style={style.textInput_container}>
          <View style={style.text_view}>
            <View style={style.input_icon}>
              <User width={'100%'} height={'100%'} />
            </View>
            <Text style={style.info_text}>{profile.fullName}</Text>
          </View>
          <View style={style.text_view}>
            <View style={style.input_icon}>
              <Email width={'100%'} height={'100%'} />
            </View>
            <Text style={style.info_text}>{profile.email}</Text>
          </View>
          <View style={style.text_view}>
            <View style={style.input_icon}>
              <Cellicon width={'100%'} height={'100%'} />
            </View>
            <Text style={style.info_text}>{profile.phoneNumber}</Text>
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
              <Text style={style.office_text}>{data[0]?.name}</Text>
            </View>
            <View style={style.info_view}>
              <Text style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                Officer Cell No:
              </Text>
              <Text selectable style={style.office_text}>
                {data[0]?.phone}
              </Text>
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
              style={{alignItems: 'flex-start'}}
              onPress={() => UserLogout()}>
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
        {Enrollstatus == 'notRegister' ? (
          <View
            style={[
              style.bottom_tab_container,
              {
                position: 'absolute',
                backgroundColor: 'rgba(255,255,255,0.6)',
                width: '50%',
                height: '100%',
              },
            ]}></View>
        ) : null}
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
              <Image
                style={{width: '100%', height: '100%', borderRadius: 50}}
                source={{uri: profile.avatar}}
              />
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
                placeholder={profile.fullName}
                onChangeText={e => setprofile({...profile, fullName: e})}
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
                placeholder={profile.email}
                onChangeText={e => setprofile({...profile, email: e})}
                placeholderTextColor={color.palette.black}
              />
              <View style={style.profile_input_icon}>
                <Email width={'100%'} height={'100%'} />
              </View>
              <View style={{borderWidth: 1, bottom: 8}}></View>
            </View>
            <View style={style.edit_profile_view}>
              <IntlPhoneInput
                placeholder={profile.phoneNumber}
                placeholderTextColor={color.palette.lightgray}
                phoneInputStyle={[style.profile_input, {paddingLeft: 10}]}
                onChangeText={e => {
                  console.log('phone', e);

                  if (e.isVerified == true) {
                    setprofile({
                      ...profile,
                      phoneNumber:
                        e.dialCode.toString() +
                        e.unmaskedPhoneNumber.toString(),
                    });
                    setValid(
                      e.dialCode.toString() + e.unmaskedPhoneNumber.toString(),
                    );
                  } else {
                    setValid('');
                  }
                }}
                containerStyle={{
                  borderRadius: 10,
                  fontSize: 16,
                  height: 50,
                  color: color.palette.black,
                  marginLeft: 25,
                  top: 4,
                }}
                flagStyle={{width: 0, height: 0}}
                dialCodeTextStyle={{
                  fontSize: 16,
                  color: color.palette.black,
                  bottom: 2,
                }}
                defaultCountry={'PK'}
                modalCountryItemCountryNameStyle={{
                  color: color.palette.black,
                  fontFamily: typography.demi,
                }}
              />
              {/* <TextInput
                style={style.profile_input}
                placeholder={profile.phoneNumber}
                onChangeText={e => setprofile({...profile, phoneNumber: e})}
                placeholderTextColor={color.palette.black}
              /> */}
              <View style={style.profile_input_icon}>
                <Cellicon width={'100%'} height={'100%'} />
              </View>
              <View style={{borderWidth: 1, bottom: 8}}></View>
            </View>
          </View>
          <View
            style={[
              style.log_btn_view,
              {width: '80%', alignSelf: 'center', marginTop: 15},
            ]}>
            <TouchableOpacity
              onPress={() => {
                if (valid == '') {
                  showMessage({
                    message: 'Enter Valid Phone Number',
                    type: 'danger',
                    duration: 3000,
                  });
                } else {
                  updateProfile();
                  setValid('');
                }
              }}>
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
      <Modal visible={indicator} transparent>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <SkypeIndicator color="white" size={50} />
        </View>
      </Modal>
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
    fontSize: 18,
    //fontWeight: fontWeights.extraBold,
    color: color.palette.black,
    fontFamily: typography.demi,
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
    width: 80,
    height: 80,
  },
  textInput_container: {
    width: '80%',
    alignSelf: 'center',
    height: '25%',
    justifyContent: 'space-around',
    paddingBottom: 10,
  },
  text_view: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    paddingBottom: 3,
  },
  info_text: {
    borderBottomColor: color.palette.black,
    paddingLeft: 12,
    color: color.palette.black,
    fontFamily: typography.Regular,
    fontSize: 16,
    alignSelf: 'center',
  },
  input_icon: {
    width: 30,
    height: 20,
    //position: 'absolute',
    paddingLeft: 10,
    alignSelf: 'center',
  },
  office_container: {
    alignSelf: 'center',
    width: '80%',
    flex: 1,
  },
  office_heading_view: {
    height: '15%',
    justifyContent: 'center',
  },
  office_heading_text: {
    // fontWeight: fontWeights.extraBold,
    color: color.palette.black,
    fontSize: 17,
    fontFamily: typography.demi,
  },
  office_info_view: {
    flex: 1,
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
    fontFamily: typography.Regular,
    fontSize: 15,
  },

  log_btn_view: {
    alignItems: 'flex-end',
  },
  power_container: {
    height: 32,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    color: color.palette.white,
    fontFamily: typography.medium,
    fontSize: 14,
    marginLeft: 7,
  },
  powerIcon_view: {
    width: 18,
    height: 18,
  },
  power_line: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 10,
  },
  edit_white_container: {
    borderRadius: 50,
    width: 35,
    height: 35,
    justifyContent: 'center',
    alignItems: 'center',
    top: 4,
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
    fontSize: 16,
    fontFamily: typography.Bold,
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
    fontSize: 16,
    //fontWeight: fontWeights.bold,
    fontFamily: typography.Bold,
  },
  Edit_profile_container: {
    width: '80%',
    alignSelf: 'center',
  },
  edit_profile_view: {
    width: '100%',
    alignSelf: 'center',
  },
  profile_input: {
    textAlignVertical: 'bottom',
    paddingLeft: 40,
    color: color.palette.black,
    fontFamily: typography.Regular,
    fontSize: 15,
  },
  profile_input_icon: {
    width: 22,
    height: 22,
    position: 'absolute',
    top: '32%',
    left: 4,
    alignSelf: 'flex-end',
  },
});
