import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  PermissionsAndroid,
  ScrollView,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {
  EnrollmentApplication,
  HomeComponent,
  NearBtn,
  NearestOffice,
} from '../../components';
import {color} from '../../theme';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import {fontWeights} from '../../theme/styles';
import {useSelector} from 'react-redux';

export const Application = ({route}) => {
  const navigate = useNavigation();
  const {applicationID} = route.params;
  const {token, user} = useSelector(state => state.UserReducer);
  const [data, setdata] = useState();
  const [openSheet, setopenSheet] = useState();
  const [suply,setSuply]=useState()

  useEffect(() => {
    fetch(
      `https://fsfeu.org/es/fsf/api/application/${applicationID}/${user.id}/${token}`,
    )
      .then(re => re.json())
      .then(data => {
        setdata(data.application),setSuply(data.supplementory) ,console.log('first', data);
      });
  }, []);
  return (
    <View style={style.container}>
      <HomeComponent title={'Application'} backIcon={true} />
      <View style={style.bottom_container}>
        <View style={style.btn_view}>
          {data?.status.toLowerCase() == 'approved' ? (
            <TouchableOpacity
              style={style.NearBtn}
              onPress={() => setopenSheet(!openSheet)}>
              <NearBtn title={'Nearest Office'} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={style.NearBtn}
              onPress={() => {
                navigate.navigate(RoutNames.EnrollAgreementForEdit, {
                  upadateInfo: true,
                  ApplicationId: applicationID,
                });
              }}>
              <NearBtn title={'Edit Information'} />
            </TouchableOpacity>
          )}
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{flex: 1, width: '80%', alignSelf: 'center'}}>
          <EnrollmentApplication data={data} suply={suply} />
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
      <NearestOffice open={openSheet} />
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

  NearBtn: {
    alignItems: 'flex-end',
  },
});
