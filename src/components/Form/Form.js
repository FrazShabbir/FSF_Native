import {View, Text, StyleSheet, TouchableOpacity, Modal} from 'react-native';
import React, {useRef, useState} from 'react';
import {Formik} from 'formik';
import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {FormField} from './FormField';
import {FormImage} from './FormImage';
import {color} from '../../theme';
import {fontWeights} from '../../theme/styles';
import DatePicker from 'react-native-date-picker';
import BackDown from '../../assets/EnrolmentAssets/downBack.svg';
import Calender from '../../assets/EnrolmentAssets/calender.svg';
import LinearGradient from 'react-native-linear-gradient';
import RightArrow from '../../assets/svg/rightArrow.svg';
import LeftArrow from '../../assets/EnrolmentAssets/leftArrow.svg';
import {FormHeader} from './FormHeader';
import TickSquare from '../../assets/EnrolmentAssets/squareCheck.svg';
import SquareCheck from '../../assets/EnrolmentAssets/checked.svg';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import RadioGroup, {RadioButton} from 'react-native-radio-buttons-group';
import RupeeSign from '../../assets/EnrolmentAssets/rupeeSign.svg';
import SignatureCapture from 'react-native-signature-capture';
import GreenTick from '../../assets/EnrolmentAssets/greenTick.svg';
import Cross from '../../assets/svg/cross.svg';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
export const Form = () => {
  const [enrolled, setEnrolled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [imgPath, setimgPath] = useState('');
  const [img, setimg] = useState(false);
  const [filename, setfilename] = useState('');
  const [checked, setchecked] = useState(false);
  const refRBSheet = useRef();
  const [buried, setburied] = useState(false);
  const [data, setData] = useState(false);
  const [sign, setSign] = useState();
  const singRef = useRef();
  const navigate = useNavigation();
  const [GenderOptionsVisible, setGenderoptionVisible] = useState(false);
  const [gender, setGender] = useState('Male');
  const [relative, setrealtive] = useState(false);
  const [otherPay, setOtherPay] = useState(false);
  const [buriedRadio, setBuriedRadio] = useState([
    {
      id: '0', // acts as primary key, should be unique and non-empty string
      label: 'Native Country',
      value: 'notPay',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Residential Country',
      value: 'notPay',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
  ]);
  const [relativeInvolveRadio, setRelativeInvovleRadio] = useState([
    {
      id: '0', // acts as primary key, should be unique and non-empty string
      label: 'Yes',
      value: 'notPay',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'No',
      value: 'notPay',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
  ]);
  const [payRadio, setPayRadio] = useState([
    {
      id: '0', // acts as primary key, should be unique and non-empty string
      label: 'I will not give any ammount annually',
      value: 'notPay',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
      containerStyle: {paddingBottom: 20},
    },
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '30$',
      value: '30',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '2',
      label: '50$',
      value: '50',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '3',
      label: '70$',
      value: '70',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '4',
      label: '100$',
      value: '100',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '5',
      label: 'Other',
      value: 'other',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
  ]);

  const selectDate = () => {
    const day = date.getDate();
    const mon = date.getMonth();
    const year = date.getFullYear().toString();
    return day + '/' + (mon + 1) + '/' + year;
  };
  const pickFromGallary = () => {
    ImagePicker.clean()
      .then(() => {})
      .catch(e => {
        alert(e);
      });
    ImagePicker.openPicker({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setfilename(image.filename);
        setimgPath(image.path);
        setimg(true);
        refRBSheet.current.close();
      })
      .catch(error => alert('Please Select Profile Picture'));
  };

  const pickFromCamer = () => {
    ImagePicker.clean()
      .then(() => {})
      .catch(e => {
        alert(e);
      });
    ImagePicker.openCamera({
      width: 400,
      height: 400,
      cropping: true,
    })
      .then(image => {
        setimgPath(image.path);
        setimg(true);
        refRBSheet.current.close();
      })
      .catch(error => alert('Please Capture Again Profile Picture'));
  };
  const GenderSelect = () => {
    return (
      <View
        style={{
          width: '40%',
          marginTop: -20,
          backgroundColor: color.palette.lightwhite,
          height: 130,
          borderBottomEndRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            setGenderoptionVisible(false), setGender('Male');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            height: '33%',
          }}>
          <Text style={{color: color.palette.black}}>Male</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGenderoptionVisible(false), setGender('Female');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderBottomWidth: 1,
            height: '33%',
          }}>
          <Text style={{color: color.palette.black}}>Female</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setGenderoptionVisible(false), setGender('Other');
          }}
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            height: '33%',
          }}>
          <Text style={{color: color.palette.black}}>Other</Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={{flex: 1}}>
      {step == 1 ? (
        <>
          <FormHeader formNo={1} />
          <View style={style.form_title_view}>
            <Text style={style.form_title}>Personal Information</Text>
          </View>
        </>
      ) : null}
      {step == 2 ? (
        <>
          <FormHeader formNo={2} />
          <View style={style.form_title_view}>
            <Text style={style.form_title}>Relative Information(spain)</Text>
            <FormField urdu={'relativeInfo'} />
          </View>
        </>
      ) : null}
      {step == 3 ? (
        <>
          <FormHeader formNo={3} />
          <View style={style.form_title_view}>
            <Text style={style.form_title}>
              Relative Information(Native Country)
            </Text>
            <FormField urdu={'relativeInfoNative'} />
          </View>
        </>
      ) : null}
      {step == 4 ? (
        <>
          <FormHeader formNo={4} />
          <View style={style.form_title_view}>
            <Text style={style.form_title}>Representive Information</Text>
            <FormField urdu={'representInfo'} />
          </View>
        </>
      ) : null}
      {step == 5 ? (
        <>
          <FormHeader formNo={5} />
          <View style={style.form_title_view}>
            <Text style={style.form_title}>Supplementary Information</Text>
          </View>
        </>
      ) : null}

      <Formik>
        {() => (
          <>
            {step == 1 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.form_container}>
                <TouchableOpacity onPress={() => refRBSheet.current.open()}>
                  <FormImage fileName={filename} path={imgPath} img={img} />
                </TouchableOpacity>
                <FormField english={'Full Name:'} urdu={'name'} />
                <TextInput
                  style={style.input}
                  placeholder={'Ahmed Ali'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Father Name:'} urdu={'fatherName'} />
                <TextInput
                  style={style.input}
                  placeholder={'Muhammad Azhar'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Sur Name:'} urdu={'surName'} />
                <TextInput
                  style={style.input}
                  placeholder={'Khokhar'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Gender:'} urdu={'gender'} />
                <TouchableOpacity
                  onPress={() => {
                    setGenderoptionVisible(!GenderOptionsVisible);
                  }}>
                  <View style={[style.input, {justifyContent: 'center'}]}>
                    <Text style={style.gender_input}>{gender}</Text>
                  </View>
                  <View style={[style.backDown]}>
                    <BackDown width={'100%'} height={'100%'} />
                  </View>
                </TouchableOpacity>
                {GenderOptionsVisible ? GenderSelect() : null}
                <FormField english={'Date Of Birth:'} urdu={'dateOfBirth'} />
                <TouchableOpacity
                  onPress={() => {
                    setOpen(true);
                  }}>
                  <View style={[style.input, {justifyContent: 'center'}]}>
                    <Text style={style.gender_input}>{selectDate()}</Text>
                  </View>
                  <View style={[style.backDown, {width: 19, height: 19}]}>
                    <Calender width={'100%'} height={'100%'} />
                  </View>
                </TouchableOpacity>
                <FormField english={'Passport NO:'} urdu={'passport'} />
                <TextInput
                  style={style.input}
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField
                  english={'Europe Residence Card No:'}
                  urdu={'euroCard'}
                />
                <TextInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField english={'Cell No:'} urdu={'cell'} />
                <TextInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField english={'Email:'} urdu={'email'} />
                <TextInput
                  placeholder={'dummy@gmail.com'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField english={'Country:'} urdu={'country'} />
                <TextInput
                  placeholder={'Dummy Country'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField english={'Community:'} urdu={'community'} />
                <TextInput
                  placeholder={'dummy Community'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField english={'Province:'} urdu={'province'} />
                <TextInput
                  placeholder={'Dummy'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField english={'City:'} urdu={'city'} />
                <TextInput
                  placeholder={'Dummy City'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField english={'Area/Street/House No:'} urdu={'area'} />
                <TextInput
                  placeholder={'Area/Street/House No'}
                  placeholderTextColor={color.palette.lightgray}
                  style={[style.input, {height: 90, textAlignVertical: 'top'}]}
                  multiline={true}
                  numberOfLines={3}
                />
                <FormField english={'Native Country:'} urdu={'nativeCountry'} />
                <TextInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField
                  english={'ID Card No.(native country):'}
                  urdu={'CNIC'}
                />
                <TextInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField
                  english={'Complete Address.(native country):'}
                  urdu={'completeAddress'}
                />
                <TextInput
                  placeholder={'Complete Address.(native country)'}
                  placeholderTextColor={color.palette.lightgray}
                  style={[style.input, {height: 90, textAlignVertical: 'top'}]}
                  multiline={true}
                  numberOfLines={3}
                />
                <View style={style.log_btn_view}>
                  <TouchableOpacity onPress={() => setStep(step + 1)}>
                    <LinearGradient
                      useAngle={true}
                      colors={[color.palette.darkblue, color.palette.lightBlue]}
                      style={style.power_container}>
                      <Text style={style.text}>Next</Text>
                      <View style={style.powerIcon_view}>
                        <RightArrow width={'100%'} height={'100%'} />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
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
                  <>
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
                          height: '30%',
                        },
                      }}>
                      <View style={style.sheet_container}>
                        <TouchableOpacity onPress={() => pickFromGallary()}>
                          <LinearGradient
                            useAngle={true}
                            colors={[
                              color.palette.darkblue,
                              color.palette.lightBlue,
                            ]}
                            style={style.pick_camera_view}>
                            <Text style={style.camera_text}>
                              Pick Image From Gallary
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => pickFromCamer()}>
                          <LinearGradient
                            useAngle={true}
                            colors={[
                              color.palette.darkblue,
                              color.palette.lightBlue,
                            ]}
                            style={style.pick_gallery_view}>
                            <Text style={style.gallary_text}>
                              Pick Image from Camera
                            </Text>
                          </LinearGradient>
                        </TouchableOpacity>
                      </View>
                    </RBSheet>
                  </>
                </>
              </ScrollView>
            ) : null}
            {step == 2 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.form_container}>
                <Text style={style.sub_heading}>1st Relative</Text>

                <FormField english={'Full Name:'} urdu={'name'} />
                <TextInput
                  style={style.input}
                  placeholder={'Ahmed Ali'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Relation:'} urdu={'relation'} />
                <TextInput
                  style={style.input}
                  placeholder={'Brother'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Cell No:'} urdu={'cell'} />
                <TextInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField
                  english={'Complete Address.(native country):'}
                  urdu={'completeAddress2'}
                />
                <TextInput
                  placeholder={'Complete Address.(native country)'}
                  placeholderTextColor={color.palette.lightgray}
                  style={[style.input, {height: 90, textAlignVertical: 'top'}]}
                  multiline={true}
                  numberOfLines={3}
                />
                <Text style={style.sub_heading}>2nd Relative</Text>
                <FormField english={'Full Name:'} urdu={'name'} />
                <TextInput
                  style={style.input}
                  placeholder={'Ahmed Ali'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Relation:'} urdu={'relation'} />
                <TextInput
                  style={style.input}
                  placeholder={'Brother'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Cell No:'} urdu={'cell'} />
                <TextInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField
                  english={'Complete Address.(native country):'}
                  urdu={'completeAddress2'}
                />
                <TextInput
                  placeholder={'Complete Address.(native country)'}
                  placeholderTextColor={color.palette.lightgray}
                  style={[style.input, {height: 90, textAlignVertical: 'top'}]}
                  multiline={true}
                  numberOfLines={3}
                />
                <View style={style.log_btn_view2}>
                  <TouchableOpacity onPress={() => setStep(step - 1)}>
                    <LinearGradient
                      useAngle={true}
                      colors={[color.palette.darkblue, color.palette.lightBlue]}
                      style={style.power_container}>
                      <View style={style.powerIcon_view}>
                        <LeftArrow width={'100%'} height={'100%'} />
                      </View>
                      <Text style={style.text}>Back</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setStep(step + 1)}>
                    <LinearGradient
                      useAngle={true}
                      colors={[color.palette.darkblue, color.palette.lightBlue]}
                      style={style.power_container}>
                      <Text style={style.text}>Next</Text>
                      <View style={style.powerIcon_view}>
                        <RightArrow width={'100%'} height={'100%'} />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : null}
            {step == 3 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.form_container}>
                <Text style={style.sub_heading}>1st Relative</Text>

                <FormField english={'Full Name:'} urdu={'name'} />
                <TextInput
                  style={style.input}
                  placeholder={'Ahmed Ali'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Relation:'} urdu={'relation'} />
                <TextInput
                  style={style.input}
                  placeholder={'Brother'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Cell No:'} urdu={'cell'} />
                <TextInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField
                  english={'Complete Address.(native country):'}
                  urdu={'completeAddress2'}
                />
                <TextInput
                  placeholder={'Complete Address.(native country)'}
                  placeholderTextColor={color.palette.lightgray}
                  style={[style.input, {height: 90, textAlignVertical: 'top'}]}
                  multiline={true}
                  numberOfLines={3}
                />
                <Text style={style.sub_heading}>2nd Relative</Text>
                <FormField english={'Full Name:'} urdu={'name'} />
                <TextInput
                  style={style.input}
                  placeholder={'Ahmed Ali'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Relation:'} urdu={'relation'} />
                <TextInput
                  style={style.input}
                  placeholder={'Brother'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Cell No:'} urdu={'cell'} />
                <TextInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField
                  english={'Complete Address.(native country):'}
                  urdu={'completeAddress2'}
                />
                <TextInput
                  placeholder={'Complete Address.(native country)'}
                  placeholderTextColor={color.palette.lightgray}
                  style={[style.input, {height: 90, textAlignVertical: 'top'}]}
                  multiline={true}
                  numberOfLines={3}
                />
                <View style={style.log_btn_view2}>
                  <TouchableOpacity onPress={() => setStep(step - 1)}>
                    <LinearGradient
                      useAngle={true}
                      colors={[color.palette.darkblue, color.palette.lightBlue]}
                      style={style.power_container}>
                      <View style={style.powerIcon_view}>
                        <LeftArrow width={'100%'} height={'100%'} />
                      </View>
                      <Text style={style.text}>Back</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setStep(step + 1)}>
                    <LinearGradient
                      useAngle={true}
                      colors={[color.palette.darkblue, color.palette.lightBlue]}
                      style={style.power_container}>
                      <Text style={style.text}>Next</Text>
                      <View style={style.powerIcon_view}>
                        <RightArrow width={'100%'} height={'100%'} />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : null}
            {step == 4 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.form_container}>
                <FormField english={'Full Name:'} urdu={'name'} />
                <TextInput
                  style={style.input}
                  placeholder={'Ahmed Ali'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Sur Name:'} urdu={'surName'} />
                <TextInput
                  style={style.input}
                  placeholder={'Khokhar'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Passport No:'} urdu={'passport'} />
                <TextInput
                  style={style.input}
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                />
                <FormField english={'Cell No:'} urdu={'cell'} />
                <TextInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  style={style.input}
                />
                <FormField
                  english={'Complete Address.(native country):'}
                  urdu={'completeAddress2'}
                />
                <TextInput
                  placeholder={'Complete Address.(native country)'}
                  placeholderTextColor={color.palette.lightgray}
                  style={[style.input, {height: 90, textAlignVertical: 'top'}]}
                  multiline={true}
                  numberOfLines={3}
                />
                <View style={style.agree_conatiner}>
                  <TouchableOpacity
                    onPress={() => {
                      setchecked(!checked);
                    }}
                    style={style.tick_square}>
                    {checked ? (
                      <TickSquare width={'100%'} height={'100%'} />
                    ) : (
                      <View style={{width: 23, height: 23, bottom: 7}}>
                        <SquareCheck width={'100%'} height={'100%'} />
                      </View>
                    )}
                  </TouchableOpacity>
                  <View style={style.agree_text_view}>
                    <Text style={style.agree_text}>
                      Have you informed him that you are appointing this person
                      as your Representative in FSF and this person will be
                      authorized to collect your remaining amount?
                    </Text>
                  </View>
                </View>
                <FormField urdu={'agreement'} />
                <View style={style.log_btn_view2}>
                  <TouchableOpacity onPress={() => setStep(step - 1)}>
                    <LinearGradient
                      useAngle={true}
                      colors={[color.palette.darkblue, color.palette.lightBlue]}
                      style={style.power_container}>
                      <View style={style.powerIcon_view}>
                        <LeftArrow width={'100%'} height={'100%'} />
                      </View>
                      <Text style={style.text}>Back</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setStep(step + 1)}>
                    <LinearGradient
                      useAngle={true}
                      colors={[color.palette.darkblue, color.palette.lightBlue]}
                      style={style.power_container}>
                      <Text style={style.text}>Next</Text>
                      <View style={style.powerIcon_view}>
                        <RightArrow width={'100%'} height={'100%'} />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : null}
            {step == 5 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.form_container}>
                <FormField english={'Where do you want to buried?'} />
                <FormField urdu={'buried'} />
                <View style={style.radio_container}>
                  <RadioGroup
                    layout="row"
                    radioButtons={buriedRadio}
                    onPress={e => setburied(e)}
                    containerStyle={{width: '100%'}}
                  />
                </View>
                <FormField
                  english={'Do you have any relative registered in this fund?'}
                />
                <FormField urdu={'relativeInvolve'} />
                <View style={style.radio_container}>
                  <RadioGroup
                    layout="row"
                    radioButtons={relativeInvolveRadio}
                    onPress={e => [
                      setRelativeInvovleRadio(e),
                      e[0].selected ? setrealtive(true) : setrealtive(false),
                    ]}
                  />
                </View>
                {relative ? (
                  <View>
                    <FormField english={'Passport No:'} urdu={'passport'} />
                    <TextInput
                      style={style.input}
                      placeholder={'000515552'}
                      placeholderTextColor={color.palette.lightgray}
                    />
                    <TouchableOpacity
                      style={{alignSelf: 'flex-end'}}
                      onPress={() => setData(true)}>
                      <LinearGradient
                        useAngle={true}
                        colors={[
                          color.palette.darkblue,
                          color.palette.lightBlue,
                        ]}
                        style={[
                          style.power_container,
                          {justifyContent: 'center', alignContent: 'center'},
                        ]}>
                        <Text style={style.text}>Submit</Text>
                        <View style={[style.powerIcon_view, {padding: 1}]}>
                          <RightArrow width={'100%'} height={'100%'} />
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                    {data ? (
                      <View style={style.data_conianer}>
                        <View style={style.data_view}>
                          <Text style={style.data_text}>Name:</Text>
                          <Text style={style.data_text}>Muhammad Akbar</Text>
                        </View>
                        <View style={style.data_view}>
                          <Text style={style.data_text}>Father Name:</Text>
                          <Text style={style.data_text}>M. Junaid</Text>
                        </View>
                        <View style={style.data_view}>
                          <Text style={style.data_text}>Registration No:</Text>
                          <Text style={style.data_text}>000031564</Text>
                        </View>
                        <View
                          style={[style.data_view, {flexDirection: 'column'}]}>
                          <Text style={style.data_text}>Address:</Text>
                          <View style={style.data_address_view}>
                            <Text style={style.data_address_text}>
                              Street No.
                            </Text>
                            <Text style={style.data_address_text}>
                              Dummy Area
                            </Text>
                            <Text style={style.data_address_text}>
                              Barcelona Spain
                            </Text>
                          </View>
                        </View>
                      </View>
                    ) : null}
                  </View>
                ) : null}
                <FormField
                  english={'How much will you pay annaully in this fund?'}
                />
                <FormField urdu={'payFund'} />

                <View
                  style={[
                    style.radio_container,
                    {flexDirection: 'column', alignItems: 'flex-start'},
                  ]}>
                  <RadioGroup
                    onPress={e => {
                      setPayRadio(e),
                        e[5].selected ? setOtherPay(true) : setOtherPay(false);
                    }}
                    radioButtons={payRadio}
                    containerStyle={{
                      width: '100%',
                      alignItems: 'flex-start',
                    }}
                  />
                  <View
                    style={{
                      position: 'absolute',
                      alignSelf: 'flex-end',
                      paddingTop: 25,
                    }}>
                    <FormField urdu={'notPay'} />
                  </View>

                  {otherPay ? (
                    <View style={style.ammount_container}>
                      <View style={style.rupee_view}>
                        <RupeeSign width={'100%'} height={'100%'} />
                      </View>
                      <TextInput
                        keyboardType="numeric"
                        style={style.rupee_input}
                      />
                    </View>
                  ) : null}
                </View>
                <Text style={style.sing_text}>Your Signature:</Text>
                <View>
                  <View style={style.sign_view}>
                    <SignatureCapture
                      ref={singRef}
                      onTouchEnd={() => singRef.current.saveImage()}
                      style={style.sign}
                      saveImageFileInExtStorage={false}
                      showNativeButtons={false}
                      showTitleLabel={true}
                      onSaveEvent={img => setSign(img.encoded)}
                      backgroundColor={color.palette.white}
                      strokeColor="black"
                      minStrokeWidth={4}
                      maxStrokeWidth={4}
                      viewMode={'portrait'}
                    />
                  </View>
                  <TouchableOpacity
                    onPress={() => singRef.current.resetImage()}
                    style={style.clear_sign_view}>
                    <Text style={style.clear_sign_text}>Clear</Text>
                  </TouchableOpacity>
                </View>
                {/* <View style={{width:"100%",height:200,borderWidth:1}}>
                    <Image style={{width:"80%",height:80,borderWidth:1,}}  source={{uri: `data:image/png;base64,${sign}`}} />
                </View> */}
                <View style={[style.agree_conatiner, {paddingBottom: 30}]}>
                  <TouchableOpacity
                    onPress={() => {
                      setchecked(!checked);
                    }}
                    style={style.tick_square}>
                    {checked ? (
                      <TickSquare width={'100%'} height={'100%'} />
                    ) : (
                      <View style={{width: 23, height: 23, bottom: 7}}>
                        <SquareCheck width={'100%'} height={'100%'} />
                      </View>
                    )}
                  </TouchableOpacity>
                  <View style={style.agree_text_view}>
                    <Text style={style.agree_text}>
                      Have you read carefully to all the conditions and
                      regulations on this funeral service fund?
                    </Text>
                  </View>
                </View>
                <View style={style.log_btn_view2}>
                  <TouchableOpacity onPress={() => setStep(step - 1)}>
                    <LinearGradient
                      useAngle={true}
                      colors={[color.palette.darkblue, color.palette.lightBlue]}
                      style={style.power_container}>
                      <View style={style.powerIcon_view}>
                        <LeftArrow width={'100%'} height={'100%'} />
                      </View>
                      <Text style={style.text}>Back</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      setEnrolled(true);
                    }}>
                    <LinearGradient
                      useAngle={true}
                      colors={[color.palette.darkblue, color.palette.lightBlue]}
                      style={style.power_container}>
                      <Text style={style.text}>Enroll</Text>
                      <View style={style.powerIcon_view}>
                        <RightArrow width={'100%'} height={'100%'} />
                      </View>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            ) : null}
          </>
        )}
      </Formik>
      <Modal visible={enrolled} transparent={true} animationType="fade">
        <View style={style.modal_view}>
          <View style={style.view}>
            <View style={style.heading_container}>
              <View style={style.heading_icon}>
                <GreenTick width={'100%'} height={'100%'} />
              </View>
              <View style={style.heading_text_view}>
                <Text style={style.heading_text}>
                  Enrollment Form Submitted
                </Text>
              </View>
            </View>
            <View style={[style.paragraph_container, {paddingTop: 10}]}>
              <Text style={style.paragraph_text}>
                Your enrolment form has been submitted and send to the
                department for verification.
              </Text>
            </View>
            <View style={style.paragraph_container}>
              <Text style={style.paragraph_text}>
                Check your verification status in application status tab and
                home screen.
              </Text>
            </View>
            <TouchableOpacity
              style={style.cross_view}
              onPress={() => {
                navigate.navigate(RoutNames.HomeScreen), setEnrolled(false);
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
  form_container: {
    flex: 1,
    alignSelf: 'center',
    width: '80%',
  },
  input: {
    backgroundColor: color.palette.lightwhite,
    borderRadius: 10,
    fontSize: 16,
    height: 50,
    paddingLeft: '8%',
    paddingRight: '8%',
    marginBottom: 20,
    color: color.palette.black,
  },
  gender_input: {
    color: color.palette.black,
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
  log_btn_view: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  log_btn_view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  power_container: {
    width: 90,
    height: 35,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 18,
    paddingRight: 12,
  },
  powerIcon_view: {
    alignSelf: 'center',
    width: '25%',
  },
  text: {
    color: color.palette.white,
    fontSize: 15,
  },
  form_title_view: {
    marginTop:10,
    width: '80%',
    alignSelf: 'center',
  },
  form_title: {
    color: color.palette.black,
    fontWeight: fontWeights.bold,
    fontSize: 18,
  },
  sub_heading: {
    color: color.palette.black,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 17,
    fontWeight: fontWeights.bold,
  },
  agree_conatiner: {
    flexDirection: 'row',
  },
  tick_square: {
    width: 35,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    top: 2,
  },
  agree_text_view: {
    width: '92%',
  },
  agree_text: {
    color: color.palette.lightgray,
    fontSize: 14,
  },
  sheet_container: {
    flex: 1,
    justifyContent: 'center',
  },
  pick_gallery_view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 20,
  },
  gallary_text: {
    color: color.palette.white,
    fontSize: 18,
    fontWeight: fontWeights.bold,
  },
  pick_camera_view: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%',
    alignSelf: 'center',
    height: 50,
    borderRadius: 20,
    marginBottom: 20,
  },
  camera_text: {
    color: color.palette.white,
    fontSize: 18,
    fontWeight: fontWeights.bold,
  },
  radio_container: {
    flexDirection: 'row',
  },
  radio_view: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginRight: 10,
  },
  radio_text: {
    textAlignVertical: 'center',
    color: color.palette.black,
    marginLeft: -5,
  },
  ammount_container: {
    borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
    borderRadius: 10,
    borderColor: color.palette.lightwhite,
    marginTop: 8,
    height: 47,
  },
  rupee_view: {
    height: 22,
    width: '20%',
    alignSelf: 'center',
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
  data_conianer: {
    borderRadius: 20,
    padding: 15,
    borderWidth: 1,
    //borderColor: color.palette.lightwhite,
    marginTop: 15,
    marginBottom: 15,
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
  sing_text: {
    color: color.palette.black,
    paddingBottom: 8,
    paddingTop: 12,
  },
  sign_view: {
    borderWidth: 1,
    height: 150,
    borderStyle: 'dashed',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  sign: {
    flex: 1,
    borderColor: 'black',
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
  },
  heading_icon: {
    borderWidth: 2,
    width: 45,
    height: 45,
    borderRadius: 50,
    padding: 5,
    borderColor: color.palette.lightgreen,
  },
  heading_text_view: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 10,
  },
  heading_text: {
    color: color.palette.black,
    fontSize: 17,
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
  clear_sign_view: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'flex-end',
    
    borderWidth:1,
    borderBottomLeftRadius: 15,
    borderStyle:"dashed",
    borderTopRightRadius:30,
  },
  clear_sign_text: {
    color: color.palette.darkblue,
    fontWeight: fontWeights.bold,
  },
});
