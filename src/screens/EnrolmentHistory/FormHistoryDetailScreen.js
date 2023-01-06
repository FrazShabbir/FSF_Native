import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {
  FormStatus,
  HomeComponent,
  HomeEvent,
  NearBtn,
  NearestOffice,
} from '../../components';
import {color, typography} from '../../theme';
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
import StatsIcon from '../../assets/HomeAssets/Svgs/appStatus.svg';
import GreenDot from '../../assets/HomeAssets/Svgs/greenDot.svg';
import BlueDot from '../../assets/HomeAssets/Svgs/blueDot.svg';
import RedDot from '../../assets/HomeAssets/Svgs/redDot.svg';
import YellowDot from '../../assets/HomeAssets/Svgs/yellowDot.svg';


import {useSelector} from 'react-redux';

export const FormHistoryDetailScreen = ({route}) => {
  const refRBSheet = useRef();
  const navigate = useNavigation();
  const [openSheet, setopenSheet] = useState();
  const {appid} = route.params;
  const {user, token} = useSelector(state => state.UserReducer);
  const [comments, setcomments] = useState([]);

  const [data, setData] = useState();

  useEffect(() => {
    fetch(
      `https://fsfeu.org/es/fsf/api/application/${appid}/${user.id}/${token}`,
    )
      .then(res => res.json())
      .then(data => {
        setData(data.application),
          setcomments(data.comments),
          console.log('Applications', data);
      });
  }, []);
  const FormatDate = date => {
    
    const year = date.slice(0, 4);
    const mon = date.slice(5, 7);
    const day = date.slice(8, 10);
    return day + '-' + mon + '-' + year;
  };
  return (
    <View style={style.container}>
      <HomeComponent backIcon={true} title={'Submit Enrolment'} />
      <View style={style.status_text_view}>
        <Text style={style.status_text}>Form</Text>
      </View>
      <View style={[style.bottom_container, {}]}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={style.NearBtn}
            onPress={() => setopenSheet(!openSheet)}>
            <NearBtn title={'Nearest Office'} />
          </TouchableOpacity>
        </View>
        <View style={style.form_container}>
          <View style={style.status_logo_container}>
            <LinearGradient
              colors={[color.palette.darkblue, color.palette.lightBlue]}
              style={style.status_logo}>
              <StatsIcon width={'100%'} height={'100%'} />
            </LinearGradient>
          </View>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={style.titles_container}>
            <View style={style.title_view}>
              <Text style={style.title_text}>Submission Date:</Text>
              <Text style={style.date}>{data?.registeration_date.slice(0,10)}</Text>
            </View>
            <View style={style.title_view}>
              <Text style={style.title_text}>Application Status:</Text>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>

              {data?.status.toLowerCase() == 'pending' ? (
                  <View style={style.dot_view}>
                    <YellowDot width={'100%'} height={'100%'} />
                  </View>
              ) : null}
              {data?.status.toLowerCase() == 'approved' ? (
                  <View style={style.dot_view}>
                    <GreenDot width={'100%'} height={'100%'} />
                  </View>
              ) : null}
              {data?.status.toLowerCase() == 'rejected' ? (
                  <View style={style.dot_view}>
                    <RedDot width={'100%'} height={'100%'} />
                  </View>
              ) : null}
              <Text style={style.date}>{data?.status}</Text>
                </View>
              
            </View>
            <Text
              style={[
                style.title_text,
                {marginTop: 20,     fontFamily:typography.demi
                  , fontSize: 20},
              ]}>
              Comments:
            </Text>
            <View style={style.comment_container}>
              {comments.map((item, index) => {
                return (
                  <View
                  key={item.id}
                    style={{
                      backgroundColor: color.palette.lightBlue,
                      marginTop: 8,
                      borderRadius: 20,
                      justifyContent: 'center',
                      padding:10,
                      paddingLeft:20,
                      paddingRight:20
                      
                    }}>
                      <View
                        style={{flexDirection: 'row', alignItems: 'center'}}>
                        <View style={[style.dot_view, {width: 10, height: 10,marginTop:0}]}>
                          <BlueDot width={'100%'} height={'100%'} />
                        </View>
                        <Text style={[style.date,{marginTop:0}]}>{item?.status}</Text>
                      </View>
                      <Text style={style.comment}>{item.comment}</Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
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
    </View>
  );
};
const style = StyleSheet.create({
  comment_container: {
    flex: 1,
    paddingTop: 10,
  },
  comment_title: {
    color: color.palette.black,
    fontSize: 16,
    fontWeight: '600',
  },
  comment: {
    color: color.palette.black,
    fontSize: 14,
    left: 10,
    fontFamily:typography.medium
  },

  container: {
    flex: 1,
    backgroundColor: color.palette.lightBlue,
  },
  status_text_view: {
    height: 40,
    width: '80%',
    alignSelf: 'center',
    bottom: 20,
  },
  status_text: {
    fontSize: 28,
    color: color.palette.black,
    fontFamily:typography.bold
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

  download_conatainer: {
    height: '15%',
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
  },
  titles_container: {
    flex: 0.7,
  },
  title_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  title_text: {
    fontSize: 16,
    color: color.palette.black,
    marginTop: 10,
    fontFamily:typography.demi
  },
  status_logo_container: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  status_logo: {
    width: 80,
    height: 80,
    padding: 18,
    borderRadius: 50,
  },
  dot_view: {
    width: 12,
    height: 12,
    right: 4,
    marginTop: 10,
  },
  date: {
    marginTop: 10,
    color: color.palette.black,
    fontSize: 15,
    fontFamily:typography.demi
  },
});
