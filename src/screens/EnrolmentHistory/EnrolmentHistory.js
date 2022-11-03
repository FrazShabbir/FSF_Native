import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  Announce,
  HomeComponent,
  NearBtn,
  FormStatus,
  DonationStatus,
  NearOffice,
} from '../../components';
import {color} from '../../theme';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import {fontWeights} from '../../theme/styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import Calender from '../../assets/EnrolmentAssets/calender.svg';

import Cell from '../../assets/HomeAssets/Svgs/cellIconWhite.svg';
import BackDown from '../../assets/HomeAssets/Svgs/backDown.svg';
import LocIcon from '../../assets/HomeAssets/Svgs/locationIcon.svg';
import LocDot from '../../assets/HomeAssets/Svgs/locationDot.svg';
import FilterIcon from '../../assets/HomeAssets/Svgs/filterIcon.svg';
import FilterIconBlack from '../../assets/HomeAssets/Svgs/filterIconBlack.svg';

import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
export const EnrolmentHistory = () => {
  const navigate = useNavigation();
  const [formView, setFormView] = useState(true);
  const refRBSheet = useRef();
  const [filter, setFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [end, setend] = useState(false);

  const [fromdate, setFromDate] = useState(new Date());
  const [todate, setToDate] = useState(new Date());




  const selectFromDate = () => {
    const day = fromdate.getDate();
    const mon = fromdate.getMonth();
    const year = fromdate.getFullYear().toString();
    return day + '/' + (mon + 1) + '/' + year;
  };
  const selectToDate = () => {
    const day = todate.getDate();
    const mon = todate.getMonth();
    const year = todate.getFullYear().toString();
    return day + '/' + (mon + 1) + '/' + year;
  };






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
    <View style={style.container}>
      <HomeComponent title={'History'} backIcon={true} />
      <View style={style.bottom_container}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={[style.NearBtn]}
            onPress={() => refRBSheet.current.open()}>
            <NearBtn />
          </TouchableOpacity>
          {filter ? (
            <TouchableOpacity onPress={() => setFilter(false)}>
              <LinearGradient
                colors={[color.palette.darkblue, color.palette.lightBlue]}
                style={style.filter_Icon}>
                <FilterIcon width={'100%'} height={'100%'} />
              </LinearGradient>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={() => setFilter(true)}
              style={style.filter_Icon}>
              <FilterIconBlack width={'100%'} height={'100%'} />
            </TouchableOpacity>
          )}
        </View>
        {filter ? (
          <View style={style.filter_view_container}>
            <View style={style.filter_title}>
              <Text style={style.filter_text}>Filters</Text>
            </View>
            <View style={style.date_container}>
              <TouchableOpacity onPress={()=>setOpen(true)} style={style.date_view}>
                <View style={style.calender}>
                  <Calender width={'100%'} height={'100%'} />
                </View>
                <Text style={style.date_text}>{selectFromDate()}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={()=>setOpen(true)} style={style.date_view}>
                <View style={style.calender}>
                  <Calender width={'100%'} height={'100%'} />
                </View>
                <Text style={style.date_text}>{selectToDate()}</Text>
              </TouchableOpacity>
            </View>
            <View style={style.filter_btn_container}>
              <LinearGradient
                useAngle={true}
                colors={[ color.palette.lightBlue,color.palette.darkblue]}
                style={style.filter_btn}>
                <Text style={style.filter_btn_text}>Apply Filters</Text>
              </LinearGradient>
            </View>
          </View>
        ) : null}

        <View style={style.text_container}>
          <View style={style.title_container}>
            <TouchableOpacity
              onPress={() => setFormView(true)}
              style={[
                style.title_view,
                formView ? {borderBottomWidth: 2} : null,
              ]}>
              <Text style={style.title_text}>Forms</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setFormView(false)}
              style={[
                style.title_view,
                formView ? {} : {borderBottomWidth: 2},
              ]}>
              <Text style={style.title_text}>Donations</Text>
            </TouchableOpacity>
          </View>
          {formView ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={style.forms_view}>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(RoutNames.FormHistoryDetailScreen);
                }}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(RoutNames.FormHistoryDetailScreen);
                }}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(RoutNames.FormHistoryDetailScreen);
                }}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(RoutNames.FormHistoryDetailScreen);
                }}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(RoutNames.FormHistoryDetailScreen);
                }}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(RoutNames.FormHistoryDetailScreen);
                }}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(RoutNames.FormHistoryDetailScreen);
                }}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(RoutNames.FormHistoryDetailScreen);
                }}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(RoutNames.FormHistoryDetailScreen);
                }}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  navigate.navigate(RoutNames.FormHistoryDetailScreen);
                }}>
                <FormStatus
                  date={'24-3-2010'}
                  icon={'stats'}
                  title={'Submit Enrolment Form'}
                />
              </TouchableOpacity>
            </ScrollView>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={style.forms_view}>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'accepted'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'pendding'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'rejected'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'accepted'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'pendding'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'rejected'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'accepted'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'pendding'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'rejected'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'accepted'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'pendding'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  navigate.navigate(RoutNames.DonationHistoryDetailScreen)
                }>
                <DonationStatus
                  title={'Regular Donation'}
                  status={'rejected'}
                  date={'24-3-2020'}
                  icon={'rupee'}
                />
              </TouchableOpacity>
            </ScrollView>
          )}
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
                <LocIcon width={23} height={40} />
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
      <>
      <DatePicker
                  modal
                  mode="date"
                  open={open}
                  date={fromdate}
                  onConfirm={(datePicked) => {
                    setOpen(false);

                    if (end === true) {
                      setToDate(datePicked);
                      setend(false);
                    } else {
                      setFromDate(datePicked);
                    }
                  }}
                  onCancel={() => {
                    setOpen(false);
                  }}
                />
      </>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  text_container: {
    flex: 1,
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
  announce_container: {
    paddingBottom: 20,
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
    fontSize: 17,
    fontWeight: fontWeights.bold,
  },
  forms_view: {
    flex: 1,
  },
  filter_Icon: {
    width: 40,
    height: 40,
    borderRadius: 50,
    padding: 10,
  },
  filter_view_container: {
    height: 180,
    width: '80%',
    alignSelf: 'center',
    backgroundColor:color.palette.lightBlue,
    padding:10,
    borderRadius:20,
    marginBottom:10
  },
  filter_title: {
    padding: 10,
  },
  date_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date_view: {
    height: 45,
    width: '45%',
    borderRadius: 20,
    backgroundColor: color.palette.lightwhite,
    flexDirection: 'row',
    alignItems: 'center',
  },
  calender: {
    width: 22,
    height: 22,
    left: 10,
  },
  date_text: {
    color: color.palette.lightgray,
    fontSize: 15,
    left: 14,
  },
  filter_text: {
    fontSize: 18,
    color: color.palette.black,
    fontWeight: fontWeights.bold,
  },
  filter_btn_container:{
    height:60,
    marginTop:20
  },
  filter_btn:{
    width:"40%",
    height:35,
    borderRadius:20,
    margin:10,
    justifyContent:"center",
    alignItems:'center'

  },
  filter_btn_text:{
    color:color.palette.white
  }
});
