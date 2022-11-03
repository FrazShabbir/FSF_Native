import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Modal,
} from 'react-native';
import React, {useRef, useState} from 'react';
import {
  HomeComponent,
  NearBtn,
  DonationStatus,
  FormField,
  FormStatus,
  SmallButton,
} from '../../components';
import {color} from '../../theme';
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
import DocumentPickerOptions  from 'react-native-document-picker';
export const UploadDonationScreen = () => {
  const refRBSheet = useRef();
  const navigate = useNavigation();
  const [formView, setFormView] = useState(true);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [sure, setSure] = useState(false);
  const [confirmDonate, setConfirmDonate] = useState(false);
  const [fileName,setFileName]=useState('')
  const selectDate = () => {
    const day = date.getDate();
    const mon = date.getMonth();
    const year = date.getFullYear().toString();
    return day + '/' + (mon + 1) + '/' + year;
  };
  const pickDocument=async()=>{
   const document=await DocumentPickerOptions.pick()
   console.log("document",document)
   setFileName(document[0].name)
  }
  console.log("name",fileName)
  return (
    <View style={style.container}>
      <HomeComponent backIcon={true} title={'Upload Donation'} />
      <View style={style.status_text_view}>
        <Text style={style.status_text}>Information</Text>
      </View>
      <View style={[style.bottom_container, {}]}>
        <View style={style.btn_view}>
          <TouchableOpacity
            style={style.NearBtn}
            onPress={() => refRBSheet.current.open()}>
            <NearBtn />
          </TouchableOpacity>
        </View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={style.form_container}>
          <View style={style.data_conianer}>
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
              <Text style={[style.data_text, {flex: 1, textAlign: 'right'}]}>
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
          </View>
          <FormField english={'Doner Bank Name:'} />
          <TextInput
            style={style.input}
            placeholder={'Funeral Servies Anual Donation'}
            placeholderTextColor={color.palette.lightgray}
          />
          <FormField english={'Doner Bank AC No.'} />
          <TextInput
            style={style.input}
            placeholder={'2374983274890'}
            placeholderTextColor={color.palette.lightgray}
          />
          <FormField english={'Donation Amount:'} />
          <View style={style.ammount_container}>
            <View style={style.rupee_view}>
              <RupeeSign width={'100%'} height={'100%'} />
            </View>
            <TextInput keyboardType="numeric" style={style.rupee_input} />
          </View>
          <FormField english={'Donation Date:'} />
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}
            style={{marginBottom: 10}}>
            <View style={[style.input, {justifyContent: 'center'}]}>
              <Text style={style.gender_input}>{selectDate()}</Text>
            </View>
            <View style={[style.backDown, {width: 19, height: 19}]}>
              <Calender width={'100%'} height={'100%'} />
            </View>
          </TouchableOpacity>
          <FormField english={'Upload Receipt:'} />
          <TouchableOpacity       onPress={()=>pickDocument()}                                          style={style.upload_reciept_container}>
            <View style={style.upload_icon}>
              <UploadIcon width={'100%'} height={'100%'} />
            </View>
            <View style={style.upload_title_view}>
              <Text style={style.uplaod_text}>Upload Donation Receipt</Text>
              <Text style={style.uplaod_desc}>{fileName}</Text>
            </View>
          </TouchableOpacity>
          <Text style={{color: color.palette.black}}>Note:</Text>
          <Text style={{color: color.palette.black}}>
            You can not donate from kid's personal amount.
          </Text>
          <Text style={{color: color.palette.black, top: 4}}>
            آپ نابالغ بچے کی ذاتی رقم سے ڈونیٹ نہیں کر سکتے.
          </Text>

          <View style={style.upload_btn_container}>
            <TouchableOpacity onPress={() => setSure(true)}>
              <LinearGradient
                useAngle={true}
                colors={[color.palette.darkblue, color.palette.lightBlue]}
                style={style.upload_btn_view}>
                <Text style={style.text}>Upload</Text>
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
      <RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        openDuration={500}
        closeOnPressMask={true}
        animationType={'fade'}
        customStyles={{
          wrapper: {
            backgroundColor: 'rgba(0,0,0,0.6)',
          },
          draggableIcon: {
            backgroundColor: 'white',
          },
          container: {
            borderTopRightRadius: 50,
            borderTopLeftRadius: 50,
            height: '40%',
          },
        }}>
        <View style={style.sheet_container}>
          <View style={[style.edit_container, {}]}>
            <View style={{flexDirection: 'row', alignItems: 'flex-end'}}>
              <View style={style.loc_icon_container}>
                <LocIcon width={22} height={40} />
                <View style={style.loc_icon}>
                  <LocDot width="100%" height="100%" />
                </View>
              </View>
              <Text style={style.personal_text}> Near Service Center</Text>
            </View>
            <TouchableOpacity
              style={[style.edit_icon_view, {}]}
              onPress={() => refRBSheet.current.close()}>
              <BackDown width={'100%'} height={'100%'} />
            </TouchableOpacity>
          </View>
          <View style={style.office_container}>
            <View style={style.office_info_view}>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  Office Name:
                </Text>
                <Text style={style.office_text}>Ali Ahmad</Text>
              </View>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  Officer Cell No:
                </Text>
                <Text style={style.office_text}>031551548515</Text>
              </View>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  State:
                </Text>
                <Text style={style.office_text}>Dummy</Text>
              </View>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  City:
                </Text>
                <Text style={style.office_text}>Dummy City</Text>
              </View>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  Area:
                </Text>
                <Text style={style.office_text}>Dummy Area</Text>
              </View>
              <View style={style.info_view}>
                <Text
                  style={[style.office_text, {fontWeight: fontWeights.bold}]}>
                  Street:
                </Text>
                <Text style={style.office_text}>Street Dummy A-3</Text>
              </View>
            </View>
            <View style={style.log_btn_view}>
              <TouchableOpacity onPress={() => dialCall('000000000')}>
                <LinearGradient
                  useAngle={true}
                  colors={[color.palette.darkblue, color.palette.lightBlue]}
                  style={style.power_container}>
                  <View style={style.powerIcon_view}>
                    <Cell width={'100%'} height={'100%'} />
                  </View>
                  <Text style={style.text}>Call Us Now</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </RBSheet>
      <>
        <DatePicker
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
            <View style={[style.heading_container, {justifyContent: 'center'}]}>
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
                  setSure(false), setConfirmDonate(true);
                }}
                style={style.yes_btn_container}>
                <View style={style.yesbtn}>
                  <WhiteTick width={'100%'} height={'100%'} />
                </View>
                <Text style={style.yes_text}>Yes</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setSure(false)}
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
      <Modal visible={confirmDonate} transparent={true} animationType="fade">
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
              }}>
              <Cross width={'100%'} height={'100%'} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    width: 130,
    height: 34,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    color: color.palette.white,
    fontWeight: fontWeights.bold,
  },
  powerIcon_view: {
    width: '15%',
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
  },
  gender_input: {
    color: color.palette.lightgray,
    fontSize: 16,
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
    padding:2
  },
  rupee_input: {
    width: '80%',
    backgroundColor: color.palette.lightwhite,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
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
    fontWeight: fontWeights.bold,
    color: color.palette.black,
  },
  uplaod_desc: {
    fontSize: 12,
    color: color.palette.lightgray,
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
    fontWeight: fontWeights.extraBold,
  },
  paragraph_container: {
    width: '90%',
    padding: 5,
  },
  paragraph_text: {
    color: color.palette.black,
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
