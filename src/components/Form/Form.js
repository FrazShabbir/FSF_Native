import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
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

export const Form = () => {
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const selectDate = () => {
    const day = date.getDate();
    const mon = date.getMonth();
    const year = date.getFullYear().toString();
    return day + '/' + (mon + 1) + '/' + year;
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

      <Formik>
        {() => (
          <>
            {step == 1 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={style.form_container}>
                <FormImage />
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
});
