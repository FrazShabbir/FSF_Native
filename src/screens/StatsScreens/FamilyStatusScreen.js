import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  HomeComponent,
  NearBtn,
  DonationStatus,
  FormField,
  FormStatus,
} from '../../components';
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
import {ScrollView} from 'react-native-gesture-handler';

export const FamilyStatusScreen = () => {
  const refRBSheet = useRef();
  const navigate = useNavigation();
  const [formView, setFormView] = useState(true);
  return (
    <View style={style.container}>
      <HomeComponent backIcon={true} title={'Check Family'} />
      <View style={style.status_text_view}>
        <Text style={style.status_text}>Registration Status</Text>
      </View>
      <View style={[style.bottom_container, {}]}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={style.NearBtn}
            onPress={() => refRBSheet.current.open()}>
            <NearBtn />
          </TouchableOpacity>
        </View>
        <View style={style.form_container}>
          <FormField english={'Select your family member:'} />
          <TouchableOpacity onPress={() => {}}>
            <View style={[style.input, {justifyContent: 'center'}]}>
              <Text style={style.gender_input}>Ali Ahmad</Text>
            </View>
            <View style={[style.backDown]}>
              <BackDown width={'100%'} height={'100%'} />
            </View>
          </TouchableOpacity>
          <View style={style.data_conianer}>
            <View style={style.data_view}>
              <Text style={style.data_text}>Name:</Text>
              <Text style={style.data_text}>Muhammad Akbar</Text>
            </View>
            <View style={style.data_view}>
              <Text style={style.data_text}>Father Name:</Text>
              <Text style={style.data_text}>M. Junaid</Text>
            </View>
            <View style={style.data_view}>
              <Text style={style.data_text}>Registration No:</Text>
              <Text style={style.data_text}>000031564</Text>
            </View>
            <View style={[style.data_view, {flexDirection: 'column'}]}>
              <Text style={style.data_text}>Address:</Text>
              <View style={style.data_address_view}>
                <Text style={style.data_address_text}>Street No.</Text>
                <Text style={style.data_address_text}>Dummy Area</Text>
                <Text style={style.data_address_text}>Barcelona Spain</Text>
              </View>
            </View>
          </View>

          <View style={style.status_view}>
            <View style={style.title_container}>
              <TouchableOpacity
                onPress={() => setFormView(true)}
                style={style.title_view}>
                <Text style={style.title_text}>Forms</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFormView(false)}
                style={style.title_view}>
                <Text style={style.title_text}>Donations</Text>
              </TouchableOpacity>
            </View>
            {formView ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.forms_view}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                  status={'accepted'}
                />
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                  status={'pendding'}
                />

                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                  status={'rejected'}
                />

                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                  status={'accepted'}
                />
              </ScrollView>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.forms_view}>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'accepted'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
                <DonationStatus
                  title={'Regular Donation'}
                  status={'pendding'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
                <DonationStatus
                  title={'Regular Donation'}
                  status={'rejected'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
                <DonationStatus
                  title={'Regular Donation'}
                  status={'accepted'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </ScrollView>
            )}
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
  status_text: {
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
  form_container: {
    flex: 1,
    alignSelf: 'center',
    width: '80%',
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
  input: {
    backgroundColor: color.palette.lightwhite,
    borderRadius: 10,
    fontSize: 16,
    height: 50,
    paddingLeft: '8%',
    paddingRight: '8%',
    marginBottom: 10,
    color: color.palette.black,
    top: 4,
  },
  gender_input: {
    color: color.palette.lightgray,
    fontSize: 16,
  },
  backDown: {
    width: 16,
    height: 16,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '35%',
    right: '5%',
  },
  data_conianer: {
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    //borderColor: color.palette.lightwhite,
    margin: 5,
  },
  data_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  data_text: {
    color: color.palette.black,
    fontSize: 15,
  },
  data_address_view: {
    width: '80%',
    alignSelf: 'center',
    paddingTop: 10,
  },
  data_address_text: {
    color: color.palette.black,
  },
  status_view: {
    flex: 1,
  },
  title_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title_view: {
    width: '50%',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: color.palette.darkblue,
  },
  title_text: {
    color: color.palette.black,
    fontSize: 16,
    fontWeight: fontWeights.extraBold,
  },
  forms_view: {
    flex: 1,
  },
});
