import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import React, {useEffect, useState, useCallback} from 'react';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeIcon.svg';
import HomeIconBlack from '../../assets/HomeAssets/Svgs/homeblack.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';
import Refresh from '../../assets/HomeAssets/refresh.svg';
import {
  HomeComponent,
  HomeProfile,
  HomeStatus,
  HomeDates,
  HomeEvent,
} from '../../components';
import {color, typography} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import Cross from '../../assets/svg/cross.svg';

import {RoutNames} from '../../navigation/routeNames';
import {useDispatch, useSelector} from 'react-redux';
import {
  SetEnrollstatus,
  GetProfile,
  SetNearOffice,
  SetNotify,
  SetAllApplications,
  SetHomeStatus,
  Logout,
  SetinitialModel,
} from '../../Reduxs/Reducers';
import CicularArrow from '../../assets/HomeAssets/Svgs/circularArrow.svg';
import {SkypeIndicator} from 'react-native-indicators';
import LinearGradient from 'react-native-linear-gradient';
import {ScrollView} from 'react-native-gesture-handler';

export const HomeScreen = () => {
  const {
    HomeStats,
    user,
    token,
    updateStatus,
    userId,
    notify,
    allApplications,
    initialModel,
    homeRefresh
  } = useSelector(state => state.UserReducer);
  const [refresh, setrefresh] = useState();
  const [searchModel, setSearchModel] = useState(null);
  const [application, setApplications] = useState([]);
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const [date, setdate] = useState({
    regDate: '',
    expDate: '',
    name: '',
    status: '',
  });
  const [indicator, setIndicator] = useState(false);

  useEffect(() => {
    fetch('https://fsfeu.org/es/fsf/api/check/notifications')
      .then(res => res.json())
      .then(data => {
        dispatch(SetNotify(data.icon)), console.log('notify', data);
      });
    if (updateStatus == true) {
      getappData();
    }
  }, [refresh,homeRefresh]);
  useEffect(() => {
    fetch(`https://fsfeu.org/es/fsf/api/myprofile/${userId}/${token}`)
      .then(res => res.json())
      .then(data => {
        dispatch(GetProfile(data.user)), console.log('user', data.user);
      });
  }, [refresh,homeRefresh]);
  useEffect(() => {
    fetch(
      `https://fsfeu.org/es/fsf/api/application/myapplication?user_id=${user.id}&api_token=${token}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log('Applications', data);

        if (data.applications == null) {
          dispatch(SetEnrollstatus('notRegister'));
        } else {
          setIndicator(false);
          dispatch(SetAllApplications(data.applications));
          setTimeout(() => {
            dispatch(SetinitialModel(false))

          }, 1000);
          // dispatch(setUpdateStatus(true))
          ///setApplications(data.applications);
          // setdate({
          //   ...date,
          //   regDate: data.applications[0].created_at.slice(0, 10),
          //   expDate: data.applications[0].renewal_date.slice(0, 10),
          //   name: data.applications[0].full_name,
          //   status: data.applications[0].status.toLowerCase(),
          // });
          dispatch(SetEnrollstatus(data.applications[0].status.toLowerCase()));
          //dispatch(SetEnrollstatus('approved'));
        }
      });
  }, [refresh,homeRefresh]);
  useEffect(() => {
    fetch(
      `https://fsfeu.org/es/fsf/api/nearest-offices/all?api_token=${token}&user_id=${user.id}`,
    )
      .then(res => res.json())
      .then(data => {
        if (data.status == 404) {
          dispatch(Logout());
        } else {
          dispatch(SetNearOffice(data.offices)), console.log('data', data);
        }
      })
      .catch(err => console.log('error', err));
  }, [refresh,homeRefresh]);
  const getappData = async () => {
    await fetch(
      `https://fsfeu.org/es/fsf/api/application/${HomeStats.id}/${user.id}/${token}`,
    )
      .then(re => re.json())
      .then(data => {
        console.log('bbbbbbbbbbbbbbbbb', data);
        dispatch(
          SetHomeStatus({
            id: data.application.application_id,
            regDate: data.application.registeration_date.slice(0, 10),
            expDate: data.application.expiration_date.slice(0, 10),
            name: data.application.full_name,
            status: data.application.status.toLowerCase(),
          }),
        );
      });
  };
  const handleApplications = useCallback(() => {
    setSearchModel(true);
  }, []);

  return (
    <View style={style.container}>
      <HomeComponent title={'Home'} dot={notify} />
      <HomeProfile app={allApplications.length} />

      <HomeStatus
        // status={date.status}
        callback={handleApplications}
        //name={date.name}
        more={allApplications.length}
      />
      {allApplications.length == 0 ? (
        <View style={style.not_register_conatiner}>
          <View style={style.not_register_view}>
            <Text style={style.not_register_text}>
              You are not Register Yet
            </Text>
          </View>
        </View>
      ) : (
        <HomeDates />
      )}
      {allApplications.length == 0 ? (
        <>
          <View
            style={[
              style.bottom_container,
              /* {backgroundColor: color.palette.lightgray}, */
            ]}>
            <View style={style.event_view}>
              <HomeEvent
                Icon={'circleArrow'}
                text={'Renew your subscription to continue you services'}
              />
            </View>
            <View style={style.event_view}>
              <HomeEvent
                Icon={'priceIcon'}
                text={'Upload your donation receipt with all requirement'}
              />
            </View>
            <View style={style.event_view}>
              <HomeEvent
                Icon={'doubleTick'}
                text={"See all your's and your family application with status"}
              />
            </View>
            <View style={style.event_view}>
              <HomeEvent
                Icon={'clockIcon'}
                text={
                  'See all your previous records of forms and donation submission'
                }
              />
            </View>
            <View
              style={[
                style.bottom_container,
                {
                  position: 'absolute',
                  backgroundColor: 'rgba(255,255,255,0.5)',
                  width: '100%',
                  height: '100%',
                },
              ]}></View>
          </View>
          <View style={style.bottom_tab_container}>
            <View style={style.icons_container}>
              <TouchableOpacity
                style={style.icons}
                onPress={() => navigate.navigate(RoutNames.HomeScreen)}>
                <HomeIconBlack width={'100%'} />
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
              <TouchableOpacity
                style={[style.icons]}
                onPress={() => {
                  setrefresh(!refresh), setIndicator(true);
                }}>
                <Refresh width={'100%'} />
              </TouchableOpacity>
            </View>
            <View
              style={[
                style.bottom_tab_container,
                {
                  position: 'absolute',
                  backgroundColor: 'rgba(255,255,255,0.6)',
                  width: '60%',
                  height: '100%',
                  alignSelf: 'stretch',
                },
              ]}></View>
          </View>
        </>
      ) : null}
      {allApplications.length >= 1 ? (
        <>
          <View style={[style.bottom_container, {}]}>
            <TouchableOpacity
              style={[style.event_view, {}]}
              onPress={() => navigate.navigate(RoutNames.AllApplications)}>
              <HomeEvent
                Icon={'circleArrow'}
                text={'Renew your subscription to continue you services'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                /* dispatch(SetEnrollstatus("notRegister")), */ navigate.navigate(
                  RoutNames.UploadDonationScreen,
                );
              }}
              style={style.event_view}>
              <HomeEvent
                Icon={'priceIcon'}
                text={'Upload your donation receipt with all requirement'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={style.event_view}
              onPress={() => navigate.navigate(RoutNames.StatusScreen)}>
              <HomeEvent
                Icon={'doubleTick'}
                text={"See all your's and your family application with status"}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigate.navigate(RoutNames.EnrollmentHistory)}
              style={style.event_view}>
              <HomeEvent
                Icon={'clockIcon'}
                text={
                  'See all your previous records of forms and donation submission'
                }
              />
            </TouchableOpacity>
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
              <TouchableOpacity
                style={[style.icons]}
                onPress={() => {
                  setrefresh(!refresh), setIndicator(true);
                }}>
                <Refresh width={'100%'} />
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : null}

      <Modal visible={indicator} transparent>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <SkypeIndicator color="white" size={50} />
        </View>
      </Modal>
      <Modal visible={searchModel} transparent animationType="fade">
        <View style={style.search_cont}>
          <LinearGradient
            colors={[color.palette.darkblue, color.palette.lightBlue]}
            style={style.search_Model}>
            <ScrollView>
              {allApplications.map((item, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    style={style.item_container}
                    onPress={() => {
                      dispatch(
                        SetHomeStatus({
                          id: item.application_id,
                          regDate: item.created_at.slice(0, 10),
                          expDate: item.renewal_date.slice(0, 10),
                          name: item.full_name,
                          status: item.status.toLowerCase(),
                        }),
                      );
                      setSearchModel(false);
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: '600',
                        color: color.palette.black,
                      }}>
                      {item.full_name}
                    </Text>
                    
                 
                  </TouchableOpacity>
                );
              })}
            </ScrollView>
            <TouchableOpacity
              style={[style.cross_view, {backgroundColor: color.palette.white}]}
              onPress={() => setSearchModel(false)}>
              <Cross width={'100%'} height={'100%'} />
            </TouchableOpacity>
          </LinearGradient>
        </View>
      </Modal>
      
    </View>
  );
};
const style = StyleSheet.create({
 
  item_container: {
    backgroundColor: color.palette.white,
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'center',
    margin: 10,
    alignItems: 'center',
    borderRadius: 10,
    padding: 8,
  },
  search_cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  search_Model: {
    width: '80%',
    borderRadius: 25,
    padding: 30,
    marginTop: "60%",
    marginBottom: "60%",
  },
  cross_view: {
    width: 25,
    height: 25,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 7,
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 4,
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
  container: {
    flex: 1,
    backgroundColor: color.palette.lightBlue,
  },
  bottom_container: {
    flex: 0.53,
    backgroundColor: color.palette.white,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'flex-end',
  },
  event_view: {
    width: '43%',
    height: '47%',
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
  not_register_conatiner: {
    flex: 0.04,
    width: '80%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  not_register_view: {
    borderRadius: 20,
    backgroundColor: color.palette.red,
    bottom: 6,
  },
  not_register_text: {
    color: color.palette.white,
    padding: 6,
    paddingLeft: 8,
    paddingRight: 8,
    fontFamily: typography.Bold,
    fontSize: 12,
  },
});
