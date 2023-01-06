import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  PermissionsAndroid,
  ScrollView,
  useWindowDimensions
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import {HomeComponent, Loader, NearBtn} from '../../components';
import {color, typography} from '../../theme';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutIcon.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyHower from '../../assets/HomeAssets/Svgs/privacyHower.svg';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import {fontWeights} from '../../theme/styles';
import DownloadIcon from '../../assets/HomeAssets/Svgs/downloadIcon.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import RightArrow from '../../assets/svg/rightArrow.svg';
import Cell from '../../assets/HomeAssets/Svgs/cellIconWhite.svg';
import BackDown from '../../assets/HomeAssets/Svgs/backDown.svg';
import LocIcon from '../../assets/HomeAssets/Svgs/locationIcon.svg';
import LocDot from '../../assets/HomeAssets/Svgs/locationDot.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';

import RNFetchBlob from 'rn-fetch-blob';

import LinearGradient from 'react-native-linear-gradient';
import {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SetLoading } from '../../Reduxs/Reducers';
import RenderHTML from 'react-native-render-html';
export const EnrollAgreementForEdit = ({route}) => {
  const {upadateInfo, ApplicationId} = route.params;
  const [data, setdata] = useState('');
  const [urduUrl, setUrduUrl] = useState('');
  const [englishUrl, setEnglishUrl] = useState('');
  const dispatch=useDispatch()
  const {
    loading
  } = useSelector(state => state.UserReducer);
  useEffect(() => {
    dispatch(SetLoading(true))
    fetch('https://fsfeu.org/es/fsf/api/terms-and-conditions')
      .then(res => res.json())
      .then(data => {setdata(data.terms),    dispatch(SetLoading(false))
      })
      .catch(err => console.log('error', err));
    fetch('https://fsfeu.org/es/fsf/api/terms-and-conditions/download')
      .then(res => res.json())
      .then(data => {
        setUrduUrl(data.urdu), setEnglishUrl(data.english);
      })
      .catch(err => console.log('error', err));
  }, []);

  const checkPermission = async url => {
    // Function to check the platform
    // If Platform is Android then check for permissions.

    if (Platform.OS === 'ios') {
      downloadFile(url);
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'Storage Permission Required',
            message:
              'Application needs access to your storage to download File',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // Start downloading
          console.log('url', url);
          downloadFile(url);
          console.log('Storage Permission Granted.');
        } else {
          // If permission denied then show alert
          Alert.alert('Error', 'Storage Permission Not Granted');
        }
      } catch (err) {
        // To handle permission related exception
        console.log('++++' + err);
      }
    }
  };

  const downloadFile = url => {
    // Get today's date to add the time suffix in filename
    let date = new Date();
    // File URL which we want to download
    // let FILE_URL = url;
    // Function to get extention of the file url
    let file_ext = getFileExtention(url);

    file_ext = '.' + file_ext[0];

    // config: To get response by passing the downloading related options
    // fs: Root directory path to download
    const {config, fs} = RNFetchBlob;
    let RootDir = fs.dirs.DownloadDir;
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        path:
          RootDir +
          '/file_' +
          Math.floor(date.getTime() + date.getSeconds() / 2) +
          file_ext,
        description: 'downloading file...',
        notification: true,
        // useDownloadManager works with Android only
        useDownloadManager: true,
      },
    };
    config(options)
      .fetch('GET', url)
      .then(res => {
        // Alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        // alert('File Downloaded Successfully.');
      });
  };
  const getFileExtention = url => {
    // To get the file extension
    return /[.]/.exec(url) ? /[^.]+$/.exec(url) : undefined;
  };
  const {width}=useWindowDimensions()
  const source = {
    html:loading?``: `${data?.value}`
  };
  const refRBSheet = useRef();
  const navigate = useNavigation();
  return (
    <View style={style.container}>
      <HomeComponent title={'Terms & Conditions'} backIcon={true} />
      <View style={style.bottom_container}>
      <ScrollView showsVerticalScrollIndicator={false} style={style.text_container}>
         <RenderHTML tagsStyles={{
              p: {
                whiteSpace: 'normal',
                color: 'black',
              },
              li:{
                whiteSpace: 'normal',
                color: 'black',
              }
            }} contentWidth={width} source={source} />
        </ScrollView>
        <View style={style.download_conatainer}>
          <TouchableOpacity
            onPress={() => checkPermission(urduUrl)}
            style={style.manual_view}>
            <View style={style.download_icon_view}>
              <DownloadIcon width="100%" height="100%" />
            </View>
            <View style={style.manual_text_conatiner}>
              <Text style={style.manual_text}>
                Download Privacy Policy (urdu)
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
          
            onPress={() => checkPermission(englishUrl)}
            style={style.manual_view}>
            <View style={style.download_icon_view}>
              <DownloadIcon width="100%" height="100%" />
            </View>
            <View style={style.manual_text_conatiner}>
              <Text style={style.manual_text}>
                Download Privacy Policy (english)
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View style={style.agree_container}>
          <TouchableOpacity
          style={{alignItems:"flex-end"}}
            onPress={() => {
              navigate.navigate(RoutNames.UpdateApplication,{
                appId:ApplicationId,updating:upadateInfo, 
              });
            }}>
            <LinearGradient
              useAngle={true}
              colors={[color.palette.darkblue, color.palette.lightBlue]}
              style={style.power_container}>
              <Text style={style.text}>Agree Next</Text>
              <View style={style.powerIcon_view}>
                <RightArrow width={'100%'} height={'100%'} />
              </View>
            </LinearGradient>
          </TouchableOpacity>
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
    marginTop:"5%",
    height: '75%',
    width: '80%',
    alignSelf: 'center',
    paddingTop: 20,
  },
  haeding: {
    fontSize: 17,
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
    height: 34,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    color: color.palette.white,
    fontWeight: fontWeights.bold,
    marginLeft:8,
  },
  powerIcon_view: {
    width: 18,
    height:18,
    marginLeft:6
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
  manual_view: {
    flexDirection: 'row',
  },
  download_icon_view: {
    width: 30,
    height: 30,
  },
  manual_text_conatiner: {
    justifyContent: 'center',
    paddingLeft: 2,
  },
  manual_text: {
    color: color.palette.black,
    left: 3,
    borderBottomWidth: 1,
    borderBottomColor: color.palette.black,
  },
  agree_container: {
    alignItems: 'flex-end',
    width: '80%',
    alignSelf: 'center',
    // height: '5%',
    justifyContent: 'center',
  },
});
