import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Announce, HomeComponent, Loader, NearBtn, NearestOffice, NearOffice} from '../../components';
import {color, typography} from '../../theme';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import {fontWeights} from '../../theme/styles';

import {ScrollView} from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';
import { SetLoading } from '../../Reduxs/Reducers';

export const AnnouncementScreen = () => {
  const navigate = useNavigation();
  const [openNearOffice,setopenNearOffice]=useState()
  const [data, setdata] = useState([]);
  const dispatch=useDispatch()
  const [indicator,setIndicator]=useState(false)
  useEffect(() => {
    dispatch(SetLoading(true))
    fetch('https://fsfeu.org/es/fsf/api/notifications')
      .then(res => res.json())
      .then(data => {
        
        
        setdata(data.notifications),    dispatch(SetLoading(false))
        if (data.notifications.length === 0) {
          setIndicator(true);
        }
      })
      .catch(err => console.log('error', err));
  }, []);
  
  return (
    <View style={style.container}>
      <HomeComponent title={'Announcements'} backIcon={true} dot={false} />
      <View style={style.bottom_container}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={style.NearBtn}
            onPress={() => setopenNearOffice(!openNearOffice)}>
            <NearBtn title={"Nearest Office"} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.text_container}>
            {indicator ? (
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 50,
                fontSize: 17,
                color:color.palette.black,fontFamily:typography.demi

              }}>
              No notification Found
            </Text>
          ) : null}
          {data.map((item, index) => {
            return (
              <TouchableOpacity
              key={item.id}
                onPress={() => navigate.navigate(RoutNames.AnounceDetailScreen,{title:item.title,description:item.description})}
                style={style.announce_container}>
                <Announce title={item?.title} shortDesc={item?.short_description} />
              </TouchableOpacity>
            );
          })}
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
      <NearestOffice open={openNearOffice} />
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
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  NearBtn: {
    alignItems: 'flex-end',
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

});
