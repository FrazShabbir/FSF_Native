import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef,useState} from 'react';
import {FormStatus, HomeComponent, HomeEvent, NearBtn, NearestOffice} from '../../components';
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
import GreenDot from '../../assets/HomeAssets/Svgs/greenDot.svg'
import RedDot from '../../assets/HomeAssets/Svgs/redDot.svg'
import BlueDot from '../../assets/HomeAssets/Svgs/blueDot.svg'
import YellowDot from '../../assets/HomeAssets/Svgs/yellowDot.svg';

import RupeeIcon from '../../assets/HomeAssets/Svgs/rupeeSignSmall.svg'

export const DonationHistoryDetailScreen = ({
  route
}) => {
  const refRBSheet = useRef();
  const navigate = useNavigation();
  const [openSheet,setopenSheet]=useState()
  const {donate}=route.params;
  const FormatDate = date => {
    const year = date.slice(0, 4);
    const mon = date.slice(5, 7);
    const day = date.slice(8, 10);
    return day + '-' + mon + '-' + year;
  };
  console.log("route",donate)
  return (
    <View style={style.container}>
      <HomeComponent backIcon={true} title={'Donation Form'} />
      <View style={style.status_text_view}>
        <Text style={style.status_text}>History</Text>
      </View>
      <View style={[style.bottom_container, {}]}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={style.NearBtn}
            onPress={() => setopenSheet(!openSheet)}>
            <NearBtn title={"Nearest Office"} />
          </TouchableOpacity>
        </View>
        <View style={style.form_container}>
          <View style={style.status_logo_container}>
            <LinearGradient
              colors={[color.palette.darkblue, color.palette.lightBlue]}
              style={style.status_logo}>
              <RupeeIcon width={'100%'} height={'100%'} />
            </LinearGradient>
          </View>
          <View style={style.titles_container}>
            <View style={style.title_view}>
                <Text style={style.title_text}>Submission Date:</Text>
                <Text style={style.date}>{FormatDate(donate?.created_at.slice(0,10))}</Text>
            </View>
            <View style={style.title_view}>
                <Text style={style.title_text}>Application Status:</Text>
                {donate.status.toLowerCase()=="pending"?
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <View style={style.dot_view}>
                  <YellowDot width={'100%'} height={'100%'} />
                  </View>
                <Text style={style.date}>Pending</Text>
                </View>:null}
                {donate.status.toLowerCase()=="approved"?
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <View style={style.dot_view}>
                    <GreenDot width={"100%"} height={"100%"} />
                  </View>
                <Text style={style.date}>Approved</Text>
                </View>:null}
                {donate.status.toLowerCase()=="rejected"?
                <View style={{flexDirection:"row",alignItems:"center"}}>
                  <View style={style.dot_view}>
                    <RedDot width={"100%"} height={"100%"} />
                  </View>
                <Text style={style.date}>rejected</Text>
                </View>:null}
            </View>
            <View style={style.title_view}>
                <Text style={style.title_text}>Donation Amount:</Text>
                <Text style={style.date}>€ {donate?.amount}</Text>
            </View>
            <View style={style.title_view}>
                <Text style={style.title_text}>Doner Bank Name:</Text>
                <Text style={style.date}>{donate?.donor_bank_name}</Text>
            </View>
            <View style={style.title_view}>
                <Text style={style.title_text}>Doner Bank AC No.</Text>
                <Text style={style.date}>{donate?.donor_bank_no}</Text>
            </View>
            
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
      <NearestOffice />
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
  
  titles_container:{
    flex:0.7
  },
  title_view:{
    flexDirection:"row",
    justifyContent:"space-between"
  },
  title_text:{
    fontSize:16,
    color:color.palette.black,
    marginTop:10,
    fontFamily:typography.demi

  },
  status_logo_container:{
    flex:0.3,
    justifyContent:"center",
    alignItems:"center"
  },
  status_logo:{
    width:80,
    height:80,
    padding:18,
    borderRadius:50,
  
  },
  dot_view:{
    width:12,
    height:12,
    right:4,
    marginTop:10
  },
  date:{
    marginTop:10,
    color:color.palette.black,
    fontSize:15,
    fontFamily:typography.medium

  }
});
