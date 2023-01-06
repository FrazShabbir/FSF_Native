import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {FormStatus, HomeComponent, HomeEvent, Loader, NearBtn, NearestOffice} from '../../components';
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
import {useDispatch, useSelector} from 'react-redux';
import {useState} from 'react';
import { SetLoading } from '../../Reduxs/Reducers';

export const RenewEnrollStatus = () => {
  const [application, setApplication] = useState([]);
  const {user, token} = useSelector(state => state.UserReducer);
  const [openSheet,setopenSheet]=useState()
  const [indicator,setIndicator]=useState(false)
const dispatch=useDispatch()

  useEffect(() => {
    dispatch(SetLoading(true))
    fetch(
      `https://fsfeu.org/es/fsf/api/application/myapplication?user_id=${user.id}&api_token=${token}`,
    )
      .then(res => res.json())
      .then(data => {setApplication(data.applications),console.log("Applications",data),dispatch(SetLoading(false))
      if (data.applications.length === 0) {
        setIndicator(true);
      }
    });
    
  }, []);
  const FormatDate=(date)=>{
    
    const year= date.slice(0,4);
    const mon=date.slice(5,7);
    const day=date.slice(8,10)
    return day+"-"+mon+"-"+year;
   }
  const refRBSheet = useRef();
  const navigate = useNavigation();
  return (
    <View style={style.container}>
      <HomeComponent backIcon={true} title={'Form Submission'} />
      <View style={style.status_text_view}>
        <Text style={style.status_text}>Status</Text>
      </View>
      <View style={[style.bottom_container, {}]}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={style.NearBtn}
            onPress={() => setopenSheet(!openSheet)}>
            <NearBtn title={"Nearest Office"} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.form_container}>
            {indicator ? (
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 50,
                fontSize: 15,
                color:color.palette.black,
                fontFamily:typography.demi

              }}>
              No Application Found
            </Text>
          ) : null}
          {application.map((item, index) => {
            return (
              <TouchableOpacity
              key={item.id}
              onPress={()=>navigate.navigate(RoutNames.Application,{
                applicationID:item.application_id
              })}
              >
              <FormStatus
                key={item.id}
                date={FormatDate(item.created_at.slice(0,10))}
                title={item.full_name}
                status={item.status.toLowerCase()}
                icon={'stats'}
              />
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
      <NearestOffice open={openSheet} />
      <Loader />
    </View>
  );
};
const style = StyleSheet.create({
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
  
});
