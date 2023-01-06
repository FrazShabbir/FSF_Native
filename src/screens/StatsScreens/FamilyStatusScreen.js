import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {
  HomeComponent,
  NearBtn,
  DonationStatus,
  FormField,
  FormStatus,
  NearestOffice,
  Loader,
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
import {useDispatch, useSelector} from 'react-redux';
import {SetLoading} from '../../Reduxs/Reducers';

export const FamilyStatusScreen = () => {
  const refRBSheet = useRef();
  const navigate = useNavigation();
  const [formView, setFormView] = useState(true);
  const [application, setApplication] = useState([]);
  const [dropdownData, setdropdownData] = useState([]);
  const [dropdownData2, setdropdownData2] = useState([]);

  const {user, token} = useSelector(state => state.UserReducer);
  const [donations, setDonations] = useState([]);
  const [openSheet, setopenSheet] = useState();
  const [AppOptionVisible, setAppOptionVisible] = useState(false);
  const [appName, setappName] = useState('Select');
  const [indicator,setIndicator]=useState(false)
  const [indicator2,setIndicator2]=useState(false)
  const dispatch = useDispatch();
  const FormatDate=(date)=>{
    
    const year= date.slice(0,4);
    const mon=date.slice(5,7);
    const day=date.slice(8,10)
    return day+"-"+mon+"-"+year;
   }
  useEffect(() => {
    dispatch(SetLoading(true));
    fetch(
      `https://fsfeu.org/es/fsf/api/donations/all?user_id=${user.id}&api_token=${token}`,
    )
      .then(res => res.json())
      .then(data => {
        dispatch(SetLoading(false)),
          setDonations(data.donations),
          setdropdownData2(data.donations);
          if (data.donations.length === 0) {
            setIndicator2(true);
          }
      });
  }, []);
  useEffect(() => {
    fetch(
      `https://fsfeu.org/es/fsf/api/application/myapplication?user_id=${user.id}&api_token=${token}`,
    )
      .then(res => res.json())
      .then(data => {
        setApplication(data.applications), setdropdownData(data.applications);
        if (data.applications.length === 0) {
          setIndicator(true);
        }
      });
  }, []);
  const updateValues = id => {
    setApplication(dropdownData.filter(x => x.application_id === id));
    setDonations(
      dropdownData2.filter(x => x.application.application_id === id),
    );
  };
  const appSelect = () => {
    return (
      <View
        style={{
          backgroundColor: color.palette.lightBlue,
          borderBottomEndRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,

          padding: 10,
        }}>
        {dropdownData.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.application_id}
              onPress={() => {
                setAppOptionVisible(false);
                setappName(item.full_name);
                updateValues(item.application_id);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                padding: 10,
              }}>
              <Text style={{color: color.palette.black,fontFamily:typography.demi,fontSize:16}}>{item.full_name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    );
  };
  return (
    <View style={style.container}>
      <HomeComponent backIcon={true} title={'Check Family'} />
      <View style={style.status_text_view}>
        <Text style={style.status_text}>Registration Status</Text>
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
          <FormField english={'Select Application:'} />
          <TouchableOpacity
            onPress={() => {
              setAppOptionVisible(!AppOptionVisible);
              //  handleChange(gender);
            }}>
            <View style={[style.input, {justifyContent: 'center'}]}>
              <Text
                style={[
                  style.gender_input,
                  appName == 'Select' ? {color: color.palette.lightgray} : null,
                ]}>
                {appName}
              </Text>
            </View>
            <View style={[style.backDown]}>
              <BackDown width={'100%'} height={'100%'} />
            </View>
          </TouchableOpacity>
          {AppOptionVisible ? appSelect() : null}

          <View style={style.status_view}>
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
                    <FormStatus
                      key={item.id}
                      date={FormatDate(item.created_at.slice(0, 10))}
                      icon={'stats'}
                      title={item.full_name}
                      status={item.status.toLowerCase()}
                    />
                  );
                })}
              </ScrollView>
            ) : (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.forms_view}>
                   {indicator2 ? (
            <Text
              style={{
                alignSelf: 'center',
                marginTop: 50,
                fontSize: 15,
                color:color.palette.black,
                fontFamily:typography.demi

              }}>
              No Donation Found 
            </Text>
          ) : null}
                {donations.map((item, index) => {
                  return (
                    <DonationStatus
                      key={item.id}
                      title={item.application.full_name}
                      status={item.status.toLowerCase()}
                      date={FormatDate(item.donation_date.slice(0, 10))}
                      icon={'rupee'}
                      amount={item.amount}
                    />
                  );
                })}
              </ScrollView>
            )}
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

  input: {
    backgroundColor: color.palette.lightwhite,
    borderRadius: 10,
    fontSize: 16,
    height: 50,
    paddingLeft: '8%',
    paddingRight: '8%',
    marginBottom: 10,
    color: color.palette.black,
    top: 4,
  },
  gender_input: {
    color: color.palette.black,
    fontSize: 16,
    fontFamily:typography.Regular
  },
  backDown: {
    width: 16,
    height: 16,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '35%',
    right: '5%',
  },
  data_conianer: {
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    //borderColor: color.palette.lightwhite,
    margin: 5,
  },
  data_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  data_text: {
    color: color.palette.black,
    fontSize: 15,
  },
  data_address_view: {
    width: '80%',
    alignSelf: 'center',
    paddingTop: 10,
  },
  data_address_text: {
    color: color.palette.black,
  },
  status_view: {
    marginTop: 10,
    flex: 1,
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
    fontSize: 17,
    fontFamily:typography.demi
  },
  forms_view: {
    flex: 1,
  },
});
