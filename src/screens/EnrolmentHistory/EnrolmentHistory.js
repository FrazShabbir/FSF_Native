import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  Modal,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {
  Announce,
  HomeComponent,
  NearBtn,
  FormStatus,
  DonationStatus,
  NearOffice,
  NearestOffice,
  Loader,
} from '../../components';
import {color, typography} from '../../theme';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import {fontWeights} from '../../theme/styles';
import RBSheet from 'react-native-raw-bottom-sheet';
import Calender from '../../assets/EnrolmentAssets/calender.svg';
import {SkypeIndicator} from 'react-native-indicators';
import Cell from '../../assets/HomeAssets/Svgs/cellIconWhite.svg';
import BackDown from '../../assets/HomeAssets/Svgs/backDown.svg';
import LocIcon from '../../assets/HomeAssets/Svgs/locationIcon.svg';
import LocDot from '../../assets/HomeAssets/Svgs/locationDot.svg';
import FilterIcon from '../../assets/HomeAssets/Svgs/filterIcon.svg';
import FilterIconBlack from '../../assets/HomeAssets/Svgs/filterIconBlack.svg';

import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import {useDispatch, useSelector} from 'react-redux';
import {Logout, SetLoading} from '../../Reduxs/Reducers';
export const EnrolmentHistory = () => {
  const navigate = useNavigation();
  const [formView, setFormView] = useState(true);
  const refRBSheet = useRef();
  const [filter, setFilter] = useState(false);
  const [open, setOpen] = useState(false);
  const [end, setend] = useState(false);
  const [fromdate, setFromDate] = useState(new Date());
  const [todate, setToDate] = useState(new Date());
  const initialDate=new Date()
  const [application, setApplication] = useState([]);
  const {user, token} = useSelector(state => state.UserReducer);
  const [indicator, setIndicator] = useState(false);
  const [indicator2, setIndicator2] = useState(false);
  const [indicator3, setIndicator3] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(SetLoading(true));
    fetch(
      `https://fsfeu.org/es/fsf/api/application/myapplication?user_id=${user.id}&api_token=${token}`,
    )
      .then(res => res.json())
      .then(data => {
        setApplication(data.applications), console.log('Applications', data);

        dispatch(SetLoading(false));
        if (data.applications.length === 0) {
          setIndicator2(true);
        }
      });
  }, []);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    fetch(
      `https://fsfeu.org/es/fsf/api/donations/all?user_id=${user.id}&api_token=${token}`,
    )
      .then(res => res.json())
      .then(data => {
        setDonations(data.donations), console.log('donations', data);
        if (data.donations.length === 0) {
          setIndicator3(true);
        }
      });
  }, []);
  const FormatDate = date => {
    const year = date.slice(0, 4);
    const mon = date.slice(5, 7);
    const day = date.slice(8, 10);
    return day + '-' + mon + '-' + year;
  };
  const selectFromDate = () => {
    const day = fromdate.getDate();
    const mon = fromdate.getMonth();
    const year = fromdate.getFullYear().toString();
    return day + '-' + (mon + 1) + '-' +year ;
  };
  const selectToDate = () => {
    const day = todate.getDate();
    const mon = todate.getMonth();
    const year = todate.getFullYear().toString();
    return day + '-' + (mon + 1) + '-' +year ;
  };

  const uploadFromDate = () => {
    const day = fromdate.getDate();
    const mon = fromdate.getMonth();
    const year = fromdate.getFullYear().toString();
    return year + '-' + (mon + 1) + '-' +day ;
  };
  const uploadToDate = () => {
    const day = todate.getDate();
    const mon = todate.getMonth();
    const year = todate.getFullYear().toString();
    return year + '-' + (mon + 1) + '-' +day ;
  };
  const [openSheet, setopenSheet] = useState();

  const filterData = async () => {
    setIndicator(true);
    console.log("date",uploadFromDate(),"tot",uploadToDate())
    await fetch(
      `https://fsfeu.org/es/fsf/api/filter/result?user_id=${user.id}&api_token=${token}&date_from=${uploadFromDate()}&date_to=${uploadToDate()}`,
    )
      .then(re => re.json())
      .then(data => {
        console.log('filtered', data), setDonations(data.donations);
        setApplication(data.applications)
        setIndicator(false);
      })
      .catch(er => {
        console.log('eerrr', er), setIndicator(false);
      });
  };

  //console.log("first",selectFromDate(),selectToDate())
  return (
    <View style={style.container}>
      <HomeComponent title={'History'} backIcon={true} />

      <View style={style.bottom_container}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={[style.NearBtn]}
            onPress={() => setopenSheet(!openSheet)}>
            <NearBtn title={'Nearest Office'} />
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
              <View style={style.Date_fix}>
                <Text style={{color:color.palette.black,fontFamily:typography.medium}}>Date From:</Text>
                <TouchableOpacity
                  onPress={() => setOpen(true)}
                  style={style.date_view}>
                  <View style={style.calender}>
                    <Calender width={'100%'} height={'100%'} />
                  </View>
                  <Text style={style.date_text}>
                    {selectFromDate()}
                  </Text>
                </TouchableOpacity>
              </View>
              <View style={style.Date_fix}>
              <Text style={{color:color.palette.black,fontFamily:typography.medium}}>Date To:</Text>

                <TouchableOpacity
                  onPress={() => {
                    setOpen(true), setend(true);
                  }}
                  style={style.date_view}>
                  <View style={style.calender}>
                    <Calender width={'100%'} height={'100%'} />
                  </View>
                  <Text style={style.date_text}>
                    {selectToDate()}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => filterData()}
              style={style.filter_btn_container}>
              <LinearGradient
                useAngle={true}
                colors={[color.palette.lightBlue, color.palette.darkblue]}
                style={style.filter_btn}>
                <Text style={style.filter_btn_text}>Apply Filters</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        ) : null}

        <View style={style.text_container}>
        <View style={style.title_container}>
              <TouchableOpacity
                onPress={() => setFormView(true)}
                style={[
                  style.title_view,
                  formView
                    ? {
                        borderBottomWidth: 2,
                        borderColor: color.palette.darkblue,
                      }
                    : null,
                ]}>
                <Text style={style.title_text}>Forms</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setFormView(false)}
                style={[
                  style.title_view,
                  formView
                    ? {borderBottomWidth: 1}
                    : {
                        borderBottomWidth: 2,
                        borderColor: color.palette.darkblue,
                      },
                ]}>
                <Text style={style.title_text}>Donations</Text>
              </TouchableOpacity>
            </View>
          {formView ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={style.forms_view}>
              {indicator2 ? (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 50,
                    fontSize: 15,
                    color: color.palette.black,
                    fontFamily:typography.demi
                  }}>
                  No Donation Found
                </Text>
              ) : null}
              {application.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() => {
                      navigate.navigate(RoutNames.FormHistoryDetailScreen, {
                        appid: item.application_id,
                      });
                    }}>
                    <FormStatus
                      date={FormatDate(item.created_at.slice(0, 10))}
                      icon={'stats'}
                      title={item.full_name}
                    />
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
          ) : (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={style.forms_view}>
              {indicator3 ? (
                <Text
                  style={{
                    alignSelf: 'center',
                    marginTop: 50,
                    fontSize: 15,
                    color: color.palette.black,
                    fontFamily:typography.demi

                  }}>
                  No Donation Found
                </Text>
              ) : null}
              {donations.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={item.id}
                    onPress={() =>
                      navigate.navigate(RoutNames.DonationHistoryDetailScreen, {
                        donate: item,
                      })
                    }>
                    <DonationStatus
                      title={item.application.full_name}
                      status={item.status.toLowerCase()}
                      date={FormatDate(item.created_at.slice(0, 10))}
                      icon={'rupee'}
                      amount={item.amount}
                    />
                  </TouchableOpacity>
                );
              })}
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
      <NearestOffice open={openSheet} />
      <>
        <DatePicker            
         maximumDate={initialDate}
          modal
          mode="date"
          open={open}
          date={fromdate}
          onConfirm={datePicked => {
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
      <Modal visible={indicator} transparent>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <SkypeIndicator color="white" size={50} />
        </View>
      </Modal>
      <Loader />
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
    borderColor: color.palette.gray,
  },
  title_text: {
    color: color.palette.black,
    fontSize: 18,
    fontFamily:typography.demi

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
    width: '80%',
    alignSelf: 'center',
    backgroundColor: '#F8F8F8',
    padding: 10,
    borderRadius: 20,
    marginBottom: 10,
  },
  filter_title: {
    paddingTop: 10,
    paddingBottom:10,
  },
  date_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date_view: {
    height: 45,
    borderRadius: 20,
    backgroundColor: color.palette.lightwhite,
    flexDirection: 'row',
    alignItems: 'center',
  },
  Date_fix: {
    width: '45%',
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
    fontFamily:typography.medium
  },
  filter_text: {
    fontSize: 18,
    color: color.palette.black,
    fontFamily:typography.demi

  },
  filter_btn_container: {
    height: 60,
    marginTop: 10,
  },
  filter_btn: {
    width: '40%',
    height: 35,
    borderRadius: 20,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filter_btn_text: {
    color: color.palette.white,
    fontFamily:typography.demi
  },
});
