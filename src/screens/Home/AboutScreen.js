import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Linking,
  Platform,
  PermissionsAndroid,
  useWindowDimensions,
} from 'react-native';
import React, {useRef, useEffect, useState, useCallback} from 'react';
import {
  HomeComponent,
  Loader,
  NearBtn,
  NearestOffice,
  NearOfficeSheet,
} from '../../components';
import RNFetchBlob from 'rn-fetch-blob';
import {color, typography} from '../../theme';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import AboutIcon from '../../assets/HomeAssets/Svgs/aboutHower.svg';
import SettingIcon from '../../assets/HomeAssets/Svgs/settingIcon.svg';
import PrivacyIcon from '../../assets/HomeAssets/Svgs/privacyIcon.svg';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import {fontWeights} from '../../theme/styles';
import DownloadIcon from '../../assets/HomeAssets/Svgs/downloadIcon.svg';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useDispatch, useSelector} from 'react-redux';
import BackDown from '../../assets/HomeAssets/Svgs/backDown.svg';
import LocIcon from '../../assets/HomeAssets/Svgs/locationIcon.svg';
import {SetLoading} from '../../Reduxs/Reducers';
import {ScrollView} from 'react-native-gesture-handler';
import RenderHTML from 'react-native-render-html';
export const AboutScreen = () => {
  const navigate = useNavigation();
  const refRBSheet = useRef();
  const [data, setdata] = useState('');
  const [manualUrl, setManualUrl] = useState('');
  const [openSheet, setopenSheet] = useState();
  const dispatch = useDispatch();
  const {width} = useWindowDimensions();
  const {loading} = useSelector(state => state.UserReducer);
  useEffect(() => {
    dispatch(SetLoading(true));
    fetch('https://fsfeu.org/es/fsf/api/about')
      .then(res => res.json())
      .then(data => {
        setdata(data.About),
          console.log('about', data),
          dispatch(SetLoading(false));
      })
      .catch(err => console.log('error', err));
    fetch('https://fsfeu.org/es/fsf/api/manual/download')
      .then(res => res.json())
      .then(data => {
        setManualUrl(data.manual);
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

  const handle = useCallback(() => {
    console.log('called');
  }, []);
  const handleBack = useCallback(() => {
    //navigation.goBack();
  }, []);
  const source = {
    html: loading ? `` : `${data?.value}`,
  };
  return (
    <View style={style.container}>
      <HomeComponent title={'About'} backIcon={true} />
      <View style={style.bottom_container}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={style.NearBtn}
            onPress={() => setopenSheet(!openSheet)}>
            <NearBtn title={'Nearest Office'} />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.text_container}>
          <RenderHTML
            tagsStyles={{
              p: {
                whiteSpace: 'normal',
                color: 'black',
              },
              li:{
                whiteSpace: 'normal',
                color: 'black',
              }
            }}
            contentWidth={width}
            source={source}
          />
          {/* <Text style={style.haeding}>{data?.key}</Text>
          <Text style={style.paragraph}>
           {data?.value}
          </Text> */}
        </ScrollView>
        <View style={style.download_conatainer}>
          <TouchableOpacity
            onPress={() => checkPermission(manualUrl)}
            style={style.manual_view}>
            <View style={style.download_icon_view}>
              <DownloadIcon width="100%" height="100%" />
            </View>
            <View style={style.manual_text_conatiner}>
              <Text style={style.manual_text}>Download Manual</Text>
            </View>
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
          <View style={style.icons}>
            <AboutIcon width={'100%'} />
          </View>
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
    height: '90%',
    width: '80%',
    alignSelf: 'center',
  },
  haeding: {
    fontSize: 18,
    color: color.palette.black,
    paddingBottom: 7,
    fontFamily: typography.demi,
  },
  paragraph: {
    fontSize: 13,
    color: color.palette.black,
    fontFamily: typography.Regular,
    textAlign: 'justify',
  },

  download_conatainer: {
    height: '10%',
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
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
    marginLeft: 4,
    fontSize: 14,
    borderBottomWidth: 1,
    borderBottomColor: color.palette.black,
    fontFamily: typography.demi,
  },
});
