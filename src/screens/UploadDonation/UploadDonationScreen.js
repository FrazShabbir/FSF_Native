import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {
  HomeComponent,
  NearBtn,
  DonationStatus,
  FormField,
  FormStatus,
  SmallButton,
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
import {colors, fontWeights} from '../../theme/styles';
import Cell from '../../assets/HomeAssets/Svgs/cellIconWhite.svg';
import {RoutNames} from '../../navigation/routeNames';
import LinearGradient from 'react-native-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import HomeIcon from '../../assets/HomeAssets/Svgs/homeblack.svg';
import {ScrollView} from 'react-native-gesture-handler';
import UploadIcon from '../../assets/HomeAssets/Svgs/uploadIcon.svg';
import RupeeSign from '../../assets/EnrolmentAssets/rupeeSign.svg';
import RightArrow from '../../assets/svg/rightArrow.svg';
import AlertIcon from '../../assets/HomeAssets/Svgs/alertIcon.svg';
import Cross from '../../assets/svg/cross.svg';
import DatePicker from 'react-native-date-picker';
import Calender from '../../assets/EnrolmentAssets/calender.svg';
import WhiteTick from '../../assets/HomeAssets/Svgs/whiteTIck.svg';
import WhiteCross from '../../assets/HomeAssets/Svgs/whiteCross.svg';
import GreenTick from '../../assets/EnrolmentAssets/greenTick.svg';
import DocumentPickerOptions from 'react-native-document-picker';
import {showMessage} from 'react-native-flash-message';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import ImageCropPicker from 'react-native-image-crop-picker';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {SetHomeRefresh} from '../../Reduxs/Reducers';
export const UploadDonationScreen = () => {
  const refRBSheet = useRef();
  const navigate = useNavigation();
  const [formView, setFormView] = useState(true);
  const {user, token, homeRefresh} = useSelector(state => state.UserReducer);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [sure, setSure] = useState(false);
  const [confirmDonate, setConfirmDonate] = useState(false);
  const [file, setFile] = useState('');
  const [openSheet, setopenSheet] = useState();
  const [bank, setbank] = useState('bank');
  const [GenderOptionsVisible, setGenderoptionVisible] = useState(false);
  const [AppOptionVisible, setAppOptionVisible] = useState(false);
  const [app, setapp] = useState('application');
  const [indicator, setIndicator] = useState(false);
  const initialDate = new Date();
  const [Acounts, setAcounts] = useState([]);
  const [bankid, setbankid] = useState();
  const [appid, setappid] = useState();
  const [values, setvalues] = useState();
  const dispatch = useDispatch();

  const FormatDate = (date = '2022-22-2') => {
    console.log('date', date);
    const year = date.slice(0, 4);
    const mon = date.slice(5, 7);
    const day = date.slice(8, 10);
    return day + '-' + mon + '-' + year;
  };
  const selectDate = () => {
    const day = date.getDate();
    const mon = date.getMonth();
    const year = date.getFullYear().toString();
    return day + '-' + (mon + 1) + '-' + year;
  };
  const dateUpload = () => {
    const day = date.getDate();
    const mon = date.getMonth();
    const year = date.getFullYear().toString();
    return year + '-' + (mon + 1) + '-' + day;
  };
  console.log('token', token, 'userId', user.id);
  useEffect(() => {
    fetch(
      `https://fsfeu.org/es/fsf/api/donation/create?user_id=${user.id}&api_token=${token}`,
    )
      .then(res => res.json())
      .then(data => {
        console.log('Data', data),
          setAcounts(data.accounts),
          setbank(
            data.accounts[0].bank + '-' + data.accounts[0].account_number,
          ),
          setbankid(data.accounts[0].id);
        if (data.applications.length ==0) {
          showMessage({
            message: "You have atleast one Approved Application to Upload Donations",
            type: 'danger',
            duration: 3000,
            titleStyle:{textAlign:"center"}
          })
          navigate.navigate(RoutNames.HomeScreen)
        } else {
          setApplication(data.applications),
            console.log('Applications', data),
            setapp(
              data.applications[0].application_id +
                '-' +
                data.applications[0].full_name,
            );
          setappid(data.applications[0].application_id);
        }
      })
      .catch(err =>
        showMessage({
          message: err.message,
          type: 'danger',
          duration: 3000,
        }),
      );
  }, []);
  const [application, setApplication] = useState([]);

  const uploadDonation = async () => {
    setIndicator(true);
    const formData = new FormData();
    formData.append('receipt', {
      name: file[0].name,
      uri: file[0].uri,
      type: file[0].type,
    });
    formData.append('application_id', appid);
    formData.append('donor_bank_name', values.donor_bank_name);
    formData.append('donor_bank_no', values.donor_bank_no);
    formData.append('amount', values.amount);
    formData.append('donation_date', dateUpload());

    formData.append('user_id', user.id);
    formData.append('api_token', token);
    formData.append('fsf_bank_id', bankid);

    const res = await fetch(`https://fsfeu.org/es/fsf/api/donation/store`, {
      method: 'post',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    }).then(res=>res.json()).then(jsonRes=>{
      console.log('re================>', jsonRes);
      if (jsonRes.status == 200) {
        // dispatch(Loggin(jsonRes));
        setConfirmDonate(true);
        setIndicator(false);
  
        console.log('status', jsonRes);
      } else {
        showMessage({
          message: jsonRes.message,
          type: 'danger',
          duration: 3000,
        });
        console.log(jsonRes);
        setIndicator(false);
      }
    }).catch(err=>{
      console.log("error",err)
      setIndicator(false)
  })
   
  };

  const pickDocument = async () => {
    const document = await DocumentPickerOptions.pick({
      type: [DocumentPickerOptions.types.allFiles],
      presentationStyle: 'overFullScreen',
    });
    console.log('file', document);
    setFile(document);
  };
  const schema = Yup.object({
    donor_bank_name: Yup.string().required(),
    donor_bank_no: Yup.string().required(),
    amount: Yup.string().required(),
    receipt: Yup.string().required(),
    donation_date: Yup.string().required(),
  });
  const initialState = {
    donor_bank_name: '',
    donor_bank_no: '',
    amount: '',
    receipt: '',
    donation_date: '',
  };

  const GenderSelect = value => {
    return (
      <ScrollView
        style={{
          width: '50%',
          marginTop: -20,
          backgroundColor: color.palette.lightBlue,
          borderBottomEndRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,

          padding: 10,
        }}>
        {Acounts.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setGenderoptionVisible(false),
                  setbankid(item.id),
                  setbank(item.bank + '-' + item.account_number);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                padding: 10,
              }}>
              <Text
                style={{
                  color: color.palette.black,
                  fontSize: 14,
                  fontFamily: typography.demi,
                }}>
                {item.bank}-{item.account_number}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };
  const appSelect = () => {
    return (
      <ScrollView
        style={{
          marginTop: -20,
          backgroundColor: color.palette.lightBlue,
          borderBottomEndRadius: 20,
          borderBottomLeftRadius: 20,
          borderBottomRightRadius: 20,

          padding: 10,
        }}>
        {application.map((item, index) => {
          return (
            <TouchableOpacity
              key={item.application_id}
              onPress={() => {
                setAppOptionVisible(false);
                setapp(item.application_id + '-' + item.full_name);
                setappid(item.application_id);
              }}
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                borderBottomWidth: 1,
                padding: 10,
              }}>
              <Text
                style={{
                  color: color.palette.black,
                  fontSize: 14,
                  fontFamily: typography.demi,
                }}>
                {item.application_id}-{item.full_name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };

  console.log('reciept', file);

  return (
    <Formik
      initialValues={initialState}
      validationSchema={schema}
      onSubmit={async (values, action) => {
        console.log('values', values);
        setSure(true);

        setvalues(values);
      }}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        touched,
        errors,
        setFieldValue,
        validateField,
        validateForm,
        isValid,
        values,
        isValidating,
      }) => (
        <View style={style.container}>
          <HomeComponent backIcon={true} title={'Upload Donation'} />
          <View style={style.status_text_view}>
            <Text style={style.status_text}>Information</Text>
          </View>
          <View style={[style.bottom_container, {}]}>
            <View style={style.btn_view}>
              <TouchableOpacity
                style={style.NearBtn}
                onPress={() => setopenSheet(!openSheet)}>
                <NearBtn title={'Nearest Office'} />
              </TouchableOpacity>
            </View>

            <ScrollView
              showsVerticalScrollIndicator={false}
              style={style.form_container}>
              {/* <View style={style.data_conianer}>
                <View style={style.data_view}>
                  <Text style={style.data_text}>Name:</Text>
                  <Text style={style.data_text}>Muhammad Akbar</Text>
                </View>
                <View style={style.data_view}>
                  <Text style={style.data_text}>Registration No:</Text>
                  <Text style={style.data_text}>15651321654</Text>
                </View>
                <View style={style.data_view}>
                  <Text style={style.data_text}>Donation Type:</Text>
                  <Text style={style.data_text}>FSF Member Fund</Text>
                </View>
                <View style={[style.data_view, {height: 50}]}>
                  <Text style={[style.data_text, {}]}>Donation Category:</Text>
                  <Text
                    style={[style.data_text, {flex: 1, textAlign: 'right'}]}>
                    FSF-22 (Auto as per signed terms policy)
                  </Text>
                </View>
                <View style={style.data_view}>
                  <Text style={style.data_text}>Beneficiary Bank Name:</Text>
                  <Text style={style.data_text}>Dummy Bank</Text>
                </View>
                <View style={style.data_view}>
                  <Text style={style.data_text}>Beneficiary Bank AC No:</Text>
                  <Text style={style.data_text}>000031564</Text>
                </View>
              </View> */}
              <FormField english={'Select Bank:'} />
              <TouchableOpacity
                onPress={() => {
                  setGenderoptionVisible(!GenderOptionsVisible);
                  //  handleChange(gender);
                }}>
                <View style={[style.input, {justifyContent: 'center'}]}>
                  <Text
                    style={[style.gender_input, {color: color.palette.black}]}>
                    {bank}
                  </Text>
                </View>
                <View style={[style.backDown]}>
                  <BackDown width={'100%'} height={'100%'} />
                </View>
              </TouchableOpacity>
              {GenderOptionsVisible ? GenderSelect() : null}
              <FormField english={'Select Application:'} />
              <TouchableOpacity
                onPress={() => {
                  setAppOptionVisible(!AppOptionVisible);
                  //  handleChange(gender);
                }}>
                <View style={[style.input, {justifyContent: 'center'}]}>
                  <Text
                    style={[style.gender_input, {color: color.palette.black}]}>
                    {app}
                  </Text>
                </View>
                <View style={[style.backDown]}>
                  <BackDown width={'100%'} height={'100%'} />
                </View>
              </TouchableOpacity>
              {AppOptionVisible ? appSelect() : null}
              <FormField english={'Doner Bank Name:'} />
              <TextInput
                style={[
                  style.input,
                  touched.donor_bank_name &&
                    errors.donor_bank_name && {
                      borderColor: 'red',
                      borderWidth: 1,
                      borderRadius: 15,
                    },
                ]}
                onChangeText={handleChange('donor_bank_name')}
                onBlur={handleBlur('donor_bank_name')}
                placeholder={'Funeral Servies Anual Donation'}
                placeholderTextColor={color.palette.lightgray}
              />
              <FormField english={'Doner Bank AC No.'} />
              <TextInput
                style={[
                  style.input,
                  touched.donor_bank_no &&
                    errors.donor_bank_no && {
                      borderColor: 'red',
                      borderWidth: 1,
                      borderRadius: 15,
                    },
                ]}
                placeholder={'2374983274890'}
                onChangeText={handleChange('donor_bank_no')}
                onBlur={handleBlur('donor_bank_no')}
                placeholderTextColor={color.palette.lightgray}
              />
              <FormField english={'Donation Amount:'} />
              <View
                style={[
                  style.ammount_container,
                  touched.amount &&
                    errors.amount && {
                      borderColor: 'red',
                      borderWidth: 1,
                      borderRadius: 15,
                    },
                ]}>
                <View style={style.rupee_view}>
                  <RupeeSign width={'100%'} height={'100%'} />
                </View>
                <TextInput
                  keyboardType="numeric"
                  onChangeText={handleChange('amount')}
                  onBlur={handleBlur('amount')}
                  style={style.rupee_input}
                />
              </View>
              <FormField english={'Donation Date:'} />
              <TouchableOpacity
                onPressOut={() => validateField('donation_date')}
                onPress={() => {
                  setOpen(true);
                }}
                onPressIn={() => setFieldValue('donation_date', 'added')}
                style={[{marginBottom: 10}]}>
                <View
                  style={[
                    style.input,
                    {justifyContent: 'center'},
                    touched.donation_date &&
                      errors.donation_date && {
                        borderColor: 'red',
                        borderWidth: 1,
                        borderRadius: 15,
                      },
                  ]}>
                  <Text style={style.gender_input}>{selectDate()}</Text>
                </View>
                <View style={[style.backDown, {width: 19, height: 19}]}>
                  <Calender width={'100%'} height={'100%'} />
                </View>
              </TouchableOpacity>
              <FormField english={'Upload Receipt:'} />
              <TouchableOpacity
                onPressIn={() => setFieldValue('receipt', 'added')}
                onPressOut={() => validateField('receipt')}
                onPress={() => pickDocument()}
                style={[
                  style.upload_reciept_container,
                  touched.receipt &&
                    errors.receipt && {
                      borderColor: 'red',
                      borderWidth: 2,
                      borderRadius: 15,
                    },
                ]}>
                <View style={style.upload_icon}>
                  <UploadIcon width={'100%'} height={'100%'} />
                </View>
                <View style={style.upload_title_view}>
                  <Text style={style.uplaod_text}>Upload Donation Receipt</Text>
                  <Text numberOfLines={2} style={style.uplaod_desc}>
                    {file[0]?.name}
                  </Text>
                </View>
              </TouchableOpacity>
              <Text
                style={{
                  color: color.palette.black,
                  fontFamily: typography.demi,
                }}>
                Note:
              </Text>
              <Text
                style={{color: color.palette.red, fontFamily: typography.demi}}>
                You can not donate from kid's personal amount.
              </Text>
              <Text
                style={{
                  color: color.palette.red,
                  top: 4,
                  fontFamily: typography.demi,
                }}>
                آپ نابالغ بچے کی ذاتی رقم سے ڈونیٹ نہیں کر سکتے.
              </Text>

              <View style={style.upload_btn_container}>
                <TouchableOpacity
                  onPress={() => {
                    handleSubmit();
                  }}>
                  <LinearGradient
                    useAngle={true}
                    colors={[color.palette.darkblue, color.palette.lightBlue]}
                    style={style.upload_btn_view}>
                    <Text style={{color: color.palette.white}}>Upload</Text>
                    <View style={style.upload_btn_icon}>
                      <RightArrow width={'100%'} height={'100%'} />
                    </View>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
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
          <>
            <DatePicker
              maximumDate={initialDate}
              modal
              mode="date"
              open={open}
              date={date}
              onConfirm={date => {
                setOpen(false);

                setDate(date);
              }}
              onCancel={() => {
                setOpen(false);
              }}
            />
          </>
          <Modal visible={sure} transparent={true} animationType="fade">
            <View style={style.modal_view}>
              <View style={style.view}>
                <View
                  style={[style.heading_container, {justifyContent: 'center'}]}>
                  <View
                    style={[
                      style.heading_icon,
                      {borderWidth: 0, width: 65, height: 60, right: 10},
                    ]}>
                    <AlertIcon width={'100%'} height={'100%'} />
                  </View>
                </View>
                <View style={[style.paragraph_container, {paddingTop: 10}]}>
                  <Text style={style.paragraph_text}>
                    Are you sure want to submit the donation information?
                  </Text>
                </View>
                <View style={style.yesNo_btn_container}>
                  <TouchableOpacity
                    onPress={() => {
                      setSure(false);
                      uploadDonation();
                    }}
                    style={style.yes_btn_container}>
                    <View style={style.yesbtn}>
                      <WhiteTick width={'100%'} height={'100%'} />
                    </View>
                    <Text style={style.yes_text}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setSure(false);
                    }}
                    style={[
                      style.yes_btn_container,
                      {backgroundColor: color.palette.red},
                    ]}>
                    <View style={style.yesbtn}>
                      <WhiteCross width={'100%'} height={'100%'} />
                    </View>
                    <Text style={style.yes_text}>No</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity
                  style={style.cross_view}
                  onPress={() => setSure(false)}>
                  <Cross width={'100%'} height={'100%'} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal
            visible={confirmDonate}
            transparent={true}
            animationType="fade">
            <View style={style.modal_view}>
              <View style={style.view}>
                <View style={style.heading_container}>
                  <View style={style.heading_icon}>
                    <GreenTick width={'100%'} height={'100%'} />
                  </View>
                  <View style={style.heading_text_view}>
                    <Text style={style.heading_text}>Donation Uploaded</Text>
                  </View>
                </View>
                <View style={[style.paragraph_container, {paddingTop: 10}]}>
                  <Text style={style.paragraph_text}>
                    Your donation receipt has been uploaded and send to the
                    department for verfication.
                  </Text>
                </View>
                <View style={style.paragraph_container}>
                  <Text style={style.paragraph_text}>
                    Chcek your verfication status in application status tab.
                  </Text>
                </View>
                <TouchableOpacity
                  style={style.cross_view}
                  onPress={() => {
                    navigate.navigate(RoutNames.HomeScreen),
                      setConfirmDonate(false);
                    dispatch(SetHomeRefresh(!homeRefresh));
                  }}>
                  <Cross width={'100%'} height={'100%'} />
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          <Modal visible={indicator} transparent>
            <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
              <SkypeIndicator color="white" size={50} />
            </View>
          </Modal>
        </View>
      )}
    </Formik>
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
    fontFamily: typography.bold,
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

  download_conatainer: {
    height: '15%',
    width: '80%',
    alignSelf: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
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
    marginBottom: 25,
    fontFamily: typography.medium,
  },
  gender_input: {
    color: color.palette.lightgray,
    fontSize: 15,
    fontFamily: typography.medium,
  },
  backDown: {
    width: 16,
    height: 16,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '25%',
    right: '5%',
  },
  data_conianer: {
    borderRadius: 20,
    paddingTop: 5,
    //borderColor: color.palette.lightwhite,
    margin: 5,
    paddingBottom: 20,
  },
  data_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 8,
  },
  data_text: {
    color: color.palette.black,
    fontSize: 14,
    fontWeight: fontWeights.bold,
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
    borderColor: color.palette.darkblue,
  },
  title_text: {
    color: color.palette.black,
    fontSize: 16,
    fontWeight: fontWeights.extraBold,
  },
  forms_view: {
    flex: 1,
  },
  ammount_container: {
    borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    borderColor: color.palette.lightwhite,
    marginTop: 8,
    height: 47,
    marginBottom: 20,
  },
  rupee_view: {
    height: 22,
    width: '20%',
    alignSelf: 'center',
    padding: 2,
  },
  rupee_input: {
    width: '80%',
    backgroundColor: color.palette.lightwhite,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
    fontSize: 16,
    height: 45,
    paddingLeft: '8%',
    paddingRight: '8%',
    color: color.palette.black,
  },
  upload_reciept_container: {
    borderWidth: 1,
    height: 160,
    marginTop: 10,
    marginBottom: 10,
    borderStyle: 'dashed',
    borderColor: color.palette.darkblue,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upload_icon: {
    width: 70,
    height: 70,
    top: 6,
  },
  upload_title_view: {
    justifyContent: 'center',
    alignItems: 'center',
    top: 8,
  },
  uplaod_text: {
    fontSize: 14,
    color: color.palette.black,
    fontFamily: typography.demi,
  },
  uplaod_desc: {
    fontSize: 12,
    color: color.palette.lightgray,
    fontFamily: typography.Regular,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 4,
  },
  upload_btn_container: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 30,
    marginBottom: 10,
  },
  upload_btn_view: {
    width: 100,
    height: 35,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  upload_btn_icon: {
    width: 14,
    height: 14,
    left: 6,
  },
  modal_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.6)',
  },
  view: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 30,
    alignItems: 'center',

    paddingTop: 20,
    paddingBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  heading_container: {
    width: '90%',
    flexDirection: 'row',
    left: 10,
  },
  heading_icon: {
    borderWidth: 2,
    width: 37,
    height: 37,
    padding: 5,
    borderColor: color.palette.lightgreen,
    borderRadius: 50,
  },
  heading_text_view: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
  },
  heading_text: {
    color: color.palette.black,
    fontSize: 18,
    fontFamily: typography.demi,
  },
  paragraph_container: {
    width: '90%',
    padding: 5,
  },
  paragraph_text: {
    color: color.palette.black,
    fontFamily: typography.medium,
  },
  cross_view: {
    width: 30,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 50,
    padding: 7,
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 7,
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
  yesNo_btn_container: {
    marginTop: 20,
    width: '75%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  yes_btn_container: {
    flexDirection: 'row',
    backgroundColor: color.palette.green,
    width: '45%',
    height: 38,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yesbtn: {
    width: 16,
    height: 16,
    right: 4,
  },
  yes_text: {
    left: 4,
    color: color.palette.white,
    fontSize: 15,
    fontFamily: typography.medium,
  },
  modal_text_view: {
    marginBottom: 20,
  },
  modal_text: {
    fontSize: 20,
    textAlign: 'center',
    color: color.palette.black,
  },
  modal_btn_view: {
    width: 100,
    height: 35,
  },
  tick_view: {
    borderWidth: 2,
    borderColor: color.palette.lightgreen,
    borderRadius: 30,
    marginBottom: 20,
    padding: 10,
  },
  tick: {
    width: 25,
    height: 25,
  },
});
