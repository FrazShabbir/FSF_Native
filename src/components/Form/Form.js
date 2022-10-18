import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
} from 'react-native';
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
import TickSquare from '../../assets/EnrolmentAssets/tickSquare.svg';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import RadioGroup, {RadioButton} from 'react-native-radio-buttons-group';
import RupeeSign from '../../assets/EnrolmentAssets/rupeeSign.svg';
import SignatureCapture from 'react-native-signature-capture';

export const Form = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(5);
  const [imgPath, setimgPath] = useState('');
  const [img, setimg] = useState(false);
  const [filename, setfilename] = useState('');
  const [select, setSelect] = useState(false);
  const refRBSheet = useRef();
  const [buried, setburied] = useState(false);
  const [other, setOther] = useState(false);
  const [relativeInvolve, setRelativeInvolve] = useState(true);
  const [data, setData] = useState(false);
  const [sign, setSign] = useState();
  const singRef = useRef();

  const [radioButtons, setRadioButtons] = useState([
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Option 1',
      value: 'option1',
    },
    {
      id: '2',
      label: 'Option 2',
      value: 'option2',
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
    }).then(image => {
      setfilename(image.filename);
      setimgPath(image.path);
      setimg(true);
      refRBSheet.current.close();
    });
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
    }).then(image => {
      setimgPath(image.path);
      setimg(true);
      refRBSheet.current.close();
    });
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
                <TouchableOpacity style={style.gender_input}>
                  <TextInput
                    style={style.input}
                    placeholder={'Male'}
                    editable={false}
                    placeholderTextColor={color.palette.lightgray}
                  />
                  <View style={style.backDown}>
                    <BackDown width={'100%'} height={'100%'} />
                  </View>
                </TouchableOpacity>
                <FormField english={'Date Of Birth:'} urdu={'dateOfBirth'} />
                <TouchableOpacity
                  style={style.gender_input}
                  onPress={() => {
                    setOpen(true);
                  }}>
                  <TextInput
                    style={style.input}
                    placeholder={'Date of Birth'}
                    editable={false}
                    placeholderTextColor={color.palette.lightgray}
                    value={selectDate()}
                  />
                  <View style={style.backDown}>
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
                  <View style={style.tick_square}>
                    <TickSquare width={'100%'} height={'100%'} />
                  </View>
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
                  <View style={style.radio_view}>
                    <RadioButton
                      color={color.palette.darkblue}
                      onPress={() => setburied(!buried)}
                      selected={buried}
                      size={20}
                      value={'Native Country'}
                    />
                    <Text style={style.radio_text}>Native Country</Text>
                  </View>

                  <View style={style.radio_view}>
                    <RadioButton
                      color={color.palette.darkblue}
                      onPress={() => setburied(!buried)}
                      selected={!buried}
                      size={20}
                      value={'Residential Country'}
                    />
                    <Text style={style.radio_text}>Residential Country</Text>
                  </View>
                </View>
                <FormField
                  english={'Do you have any relative registered in this fund?'}
                />
                <FormField urdu={'relativeInvolve'} />
                <View style={style.radio_container}>
                  <View style={style.radio_view}>
                    <RadioButton
                      color={color.palette.darkblue}
                      onPress={() => setSelect(true)}
                      selected={select}
                      size={20}
                      value={'Yes'}
                    />
                    <Text style={style.radio_text}>Yes</Text>
                  </View>

                  <View style={style.radio_view}>
                    <RadioButton
                      color={color.palette.darkblue}
                      onPress={() => setSelect(false)}
                      selected={!select}
                      size={20}
                      value={'No'}
                    />
                    <Text style={style.radio_text}>No</Text>
                  </View>
                </View>
                {select ? (
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
                <View style={style.radio_container}>
                  <View style={style.radio_view}>
                    <RadioButton
                      color={color.palette.darkblue}
                      onPress={() => setSelect(!select)}
                      selected={select}
                      size={20}
                      value={'Yes'}
                    />
                    <Text style={style.radio_text}>
                      I will not give any ammount annually
                    </Text>
                  </View>
                </View>
                <FormField urdu={'notPay'} />
                <View
                  style={[
                    style.radio_container,
                    {flexDirection: 'column', alignItems: 'flex-start'},
                  ]}>
                  <RadioGroup
                    onPress={e => {
                      console.log(e);
                    }}
                    radioButtons={radioButtons}></RadioGroup>
                  {/* <View style={style.radio_view}>
                    <RadioButton
                      color={color.palette.darkblue}
                      onPress={() => setSelect(!select)}
                      selected={select}
                      size={20}
                      value={'Yes'}
                    />
                    <Text style={style.radio_text}>30$</Text>
                  </View>
                  <View style={style.radio_view}>
                    <RadioButton
                      color={color.palette.darkblue}
                      onPress={() => setSelect(!select)}
                      selected={select}
                      size={20}
                      value={'Yes'}
                    />
                    <Text style={style.radio_text}>50$</Text>
                  </View> */}

                  {other ? (
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
                {/* <View style={{width:"100%",height:200,borderWidth:1}}>
                    <Image style={{width:"80%",height:80,borderWidth:1,}}  source={{uri: `data:image/png;base64,${sign}`}} />
                </View> */}
                <View style={[style.agree_conatiner, {paddingBottom: 30}]}>
                  <View style={style.tick_square}>
                    <TickSquare width={'100%'} height={'100%'} />
                  </View>
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
                  <TouchableOpacity onPress={() => {}}>
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
  gender_input: {},
  backDown: {
    width: 25,
    height: 25,
    position: 'absolute',
    alignSelf: 'flex-end',
    top: '20%',
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
    width: 20,
    height: 20,
    margin: 3,
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
  },
  rupee_view: {
    height: 25,
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
    height: 50,
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
});
