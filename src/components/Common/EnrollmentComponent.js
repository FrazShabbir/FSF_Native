import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Modal
} from 'react-native';
import React, {useEffect} from 'react';
import {colors, fontSizes, fontWeights} from '../../theme/styles';
import {color, typography} from '../../theme';
import {useState, useRef} from 'react';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {FormField} from '../Form/FormField';
import RadioGroup from 'react-native-radio-buttons-group';
import SignatureCapture from 'react-native-signature-capture';
import RupeeSign from '../../assets/EnrolmentAssets/rupeeSign.svg';
import LinearGradient from 'react-native-linear-gradient';
import TickSquare from '../../assets/EnrolmentAssets/squareCheck.svg';
import SquareCheck from '../../assets/EnrolmentAssets/checked.svg';
import RightArrow from '../../assets/svg/rightArrow.svg';
import { useDispatch, useSelector } from 'react-redux';
import { showMessage } from 'react-native-flash-message';
import { SkypeIndicator } from 'react-native-indicators';
import AlertIcon from '../../assets/HomeAssets/Svgs/alertIcon.svg';
import Cross from '../../assets/svg/cross.svg';
import WhiteTick from '../../assets/HomeAssets/Svgs/whiteTIck.svg';
import WhiteCross from '../../assets/HomeAssets/Svgs/whiteCross.svg';
import GreenTick from '../../assets/EnrolmentAssets/greenTick.svg';
import { useNavigation } from '@react-navigation/native';
import { RoutNames } from '../../navigation/routeNames';
import { SetHomeRefresh } from '../../Reduxs/Reducers';
const initialState = {
  pay_annually: '',
  signature: '',
  agree: '',




};
const ValidateSchema = Yup.object({
  pay_annually: Yup.string().required('Required'),
  signature: Yup.string().required('Required'),
  agree: Yup.string().required('Required'), 
});

export const EnrollmentComponent = ({applicationId,

}) => {
  const [anyRelative, setanyRelative] = useState(true);
  const singRef = useRef();
  const [checked, setchecked] = useState(false);
  const [otherPay, setOtherPay] = useState(false);
  const [sign, setSign] = useState();
  const [sure, setSure] = useState(false);

const {token,user,homeRefresh}=useSelector((state)=>state.UserReducer)
  const [data, setdata] = useState('');
  const [indicator, setIndicator] = useState(false);
  const [amnt,setamnt]=useState()
  const [confirmDonate, setConfirmDonate] = useState(false);
  const navigate=useNavigation()
  const [suply,setSuply]=useState()
  const dispatch=useDispatch()

  useEffect(() => {
    fetch(
      `https://fsfeu.org/es/fsf/api/application/renew/?user_id=${user.id}&api_token=${token}&application_id=${applicationId}`,
    )
      .then(re => re.json())
      .then(data => {setdata(data.application),setSuply(data.supplementory),console.log("first",data)});
  }, []);

  const [payRadio, setPayRadio] = useState([
    {
      id: '0', // acts as primary key, should be unique and non-empty string
      label: 'I will not give any ammount annually',
      value: 'notPay',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black,fontFamily:typography.Regular,fontSize:14},
      containerStyle: {paddingBottom: 20},
    },
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: '€ 30',
      value: '30',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black,fontFamily:typography.Regular,fontSize:14},
    },
    {
      id: '2',
      label: '€ 50',
      value: '50',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black,fontFamily:typography.Regular,fontSize:14},
    },
    {
      id: '3',
      label: '€ 70',
      value: '70',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black,fontFamily:typography.Regular,fontSize:14},
    },
    {
      id: '4',
      label: '€ 100',
      value: '100',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black,fontFamily:typography.Regular,fontSize:14},
    },
    {
      id: '5',
      label: 'Other',
      value: 'other',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black,fontFamily:typography.Regular,fontSize:14},
    },
  ]);

  const RenewApplication = async (
  ) => {
     setIndicator(true)
    const formData = new FormData();

    formData.append('user_id', user.id);
    formData.append('api_token', token);
    formData.append('application_id', data.application_id);


    //step 1
    formData.append('full_name', data.full_name);
    formData.append('father_name', data.father_name);
    formData.append('surname', data.surname);
    formData.append('gender', data.gender);
    formData.append('dob', data.dob);
    formData.append('passport_number', data.passport_number);
    formData.append('nie', data.nie);
    formData.append('phone', data.phone);
    formData.append('email', data.email);
    formData.append('country_id', data.country_id);
    formData.append('community_id', data.community_id);
    formData.append('province_id', data.province_id);
    formData.append('city_id', data.city_id);
    formData.append('native_country', data.native_country);
    formData.append('native_id', data.native_id);
    formData.append('native_country_address', data.native_country_address);
    formData.append('area', data.area);

    //step 2
    formData.append('s_relative_1_name', data.s_relative_1_name);
    formData.append('s_relative_1_relation', data.s_relative_1_relation);
    formData.append('s_relative_1_phone', data.s_relative_1_phone);
    formData.append(
      's_relative_1_address',
      data.s_relative_1_address,
    );
    formData.append('s_relative_2_name', data.s_relative_2_name);
    formData.append('s_relative_2_relation', data.s_relative_2_relation);
    formData.append('s_relative_2_phone', data.s_relative_2_phone);
    formData.append(
      's_relative_2_address',
      data.s_relative_2_address,
    );

    //step 3
    formData.append('n_relative_1_name', data.n_relative_1_name);
    formData.append(
      'n_relative_1_relation',
      data.n_relative_1_relation,
    );
    formData.append('n_relative_1_phone', data.n_relative_1_phone);
    formData.append(
      'n_relative_1_address',
      data.n_relative_1_address,
    );
    formData.append('n_relative_2_name', data.n_relative_2_name);
    formData.append(
      'n_relative_2_relation',
      data.n_relative_2_relation,
    );
    formData.append('n_relative_2_phone', data.n_relative_2_phone);
    formData.append(
      'n_relative_2_address',
      data.n_relative_2_address,
    );

    //step 4
    formData.append('rep_name', data.rep_name);
    formData.append('rep_surname', data.rep_surname);
    formData.append('rep_passport_no', data.rep_passport_no);
    formData.append('rep_phone', data.rep_phone);
    formData.append('rep_address', data.rep_address);
    formData.append('rep_confirmed', data.rep_confirmed);

    //step 5
    formData.append('buried_location', data.buried_location);
    formData.append('registered_relatives', data.registered_relatives);
    formData.append('registered_relative_passport_no', data.registered_relative_passport_no);
    formData.append('annually_fund_amount', amnt);
    formData.append('user_signature', {
      uri: `file://${sign}`,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    formData.append('declaration_confirm', data.declaration_confirm);

    const res = await fetch(`https://fsfeu.org/es/fsf/api/renew/application/save?`, {
      method: 'post',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    });
    const jsonRes = await res.json();
    console.log('resssssss+++', jsonRes);
    if (jsonRes.status === 200) {
      showMessage({
        message: jsonRes.message,
        type: 'success',
        duration: 3000,
      });
      setIndicator(false);
      setConfirmDonate(true)
    } else {
      //  console.log('data', jsonRes);
      setIndicator(false);
    }
  };

  return (
    <View>
      <Text style={style.heading}>Personal Information</Text>
      <View style={style.photo}>
        <Image
          style={{width: '100%', height: '100%', borderRadius: 50}}
          source={{uri: data?.avatar}}
        />
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Name:</Text>
        <Text style={style.text2}>{data?.full_name}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Father Name:</Text>
        <Text style={style.text2}>{data?.father_name}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Sur Name:</Text>
        <Text style={style.text2}>{data?.surname}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Gender:</Text>
        <Text style={style.text2}>{data?.gender}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Date of Birth:</Text>
        <Text style={style.text2}>{data?.dob}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Passport No:</Text>
        <Text style={style.text2}>{data?.passport_number}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Spanis Residency Card No.:</Text>
        <Text style={style.text2}>{data?.nie}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Native Country:</Text>
        <Text style={style.text2}>{data?.native_country}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>ID card No. (Native Country):</Text>
        <Text style={style.text2}>{data?.native_id}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Cell No:</Text>
        <Text style={style.text2}>{data?.phone}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Email Address:</Text>
        <Text style={style.text2}>{data?.email}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Complete Address (Spain):</Text>
        <Text style={style.text2}>{data?.area}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Complete Address (Native County):</Text>
        <Text style={style.text2}>{data?.native_country_address}</Text>
      </View>

      <Text style={style.heading}>Relatives Information (Spain)</Text>
      <Text style={style.sub_heading}>1st Relative</Text>
      <View style={style.text_container}>
        <Text style={style.text1}>Name:</Text>
        <Text style={style.text2}>{data?.s_relative_1_name}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Relation:</Text>
        <Text style={style.text2}>{data?.s_relative_1_relation}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Cell No:</Text>
        <Text style={style.text2}>{data?.s_relative_1_phone}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Complete Address (Native County):</Text>
        <Text style={style.text2}>{data?.s_relative_1_address} </Text>
      </View>
      <Text style={style.sub_heading}>2nd Relative</Text>

      <View style={style.text_container}>
        <Text style={style.text1}>Name:</Text>
        <Text style={style.text2}>{data?.s_relative_2_name}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Relation:</Text>
        <Text style={style.text2}>{data?.s_relative_2_relation}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Cell No:</Text>
        <Text style={style.text2}>{data?.s_relative_2_phone}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Complete Address (Native County):</Text>
        <Text style={style.text2}>{data?.s_relative_2_address}</Text>
      </View>
      <Text style={style.heading}>Relatives Information (Native Country)</Text>
      <Text style={style.sub_heading}>1st Relative</Text>
      <View style={style.text_container}>
        <Text style={style.text1}>Name:</Text>
        <Text style={style.text2}>{data?.n_relative_1_name}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Relation:</Text>
        <Text style={style.text2}>{data?.n_relative_1_relation}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Cell No:</Text>
        <Text style={style.text2}>{data?.n_relative_1_phone}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Complete Address (Native County):</Text>
        <Text style={style.text2}>{data?.n_relative_1_address} </Text>
      </View>
      <Text style={style.sub_heading}>2nd Relative</Text>

      <View style={style.text_container}>
        <Text style={style.text1}>Name:</Text>
        <Text style={style.text2}>{data?.n_relative_2_name}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Relation:</Text>
        <Text style={style.text2}>{data?.n_relative_2_relation}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Cell No:</Text>
        <Text style={style.text2}>{data?.n_relative_2_phone}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Complete Address (Native County):</Text>
        <Text style={style.text2}>{data?.n_relative_2_address}</Text>
      </View>
      <Text style={style.heading}>Representative Information</Text>
      <View style={style.text_container}>
        <Text style={style.text1}>Name:</Text>
        <Text style={style.text2}>{data?.rep_name}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>SurName:</Text>
        <Text style={style.text2}>{data?.rep_surname}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>ID Card No:</Text>
        <Text style={style.text2}>{data?.rep_passport_no}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Cell No:</Text>
        <Text style={style.text2}>{data?.rep_phone}</Text>
      </View>
      <View style={style.text_container}>
        <Text style={style.text1}>Complete Address (Native County):</Text>
        <Text style={style.text2}>{data?.rep_address}</Text>
      </View>
      <Text style={style.heading}>Supplementary Information</Text>

      {data.registered_relatives == "0" ? (
        <View style={style.text_container}>
          <Text style={style.text1}>Any Realative::</Text>
          <Text style={style.text2}>No</Text>
        </View>
      ) : (
        <>
        <Text style={style.sub_heading}>Relative Information</Text>
        <View style={style.text_container}>
          <Text style={style.text1}>Name:</Text>
          <Text style={style.text2}>{suply?.full_name}</Text>
        </View>
        <View style={style.text_container}>
          <Text style={style.text1}>Father Name:</Text>
          <Text style={style.text2}>{suply?.father_name}</Text>
        </View>
        {/* <View style={style.text_container}>
          <Text style={style.text1}>Relation:</Text>
          <Text style={style.text2}>{suply?.full_name}</Text>
        </View> */}
        <View style={style.text_container}>
          <Text style={style.text1}>Cell No:</Text>
          <Text style={style.text2}>{suply?.phone}</Text>
        </View>
        <View style={style.text_container}>
          <Text style={style.text1}>Complete Address (Native County):</Text>
          <Text style={style.text2}>
          {suply?.address}              </Text>
        </View>
      </>
      )}

      <Formik
        initialValues={initialState}
        validationSchema={ValidateSchema}
        validateOnChange={false}
        validateOnBlur={false}
        onSubmit={(values, {setErrors}) => {
          setSure(true)
         console.log("values",values)
         setamnt(values.pay_annually)
        }}>
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          errors,
          touched,
          isSubmitting,
          validateField,
          setFieldValue,
          validateForm,
          setErrors,
        }) => (
          <>
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
                  setPayRadio(e);
                  if (e[0].id == 0 && e[0].selected == true) {
                    setFieldValue(
                      'pay_annually',
                      '0',
                    );
                    console.log('first');
                  } else if (e[1].id == 1 && e[1].selected == true) {
                    setFieldValue('pay_annually', '30');
                    console.log('second');
                  } else if (e[2].id == 2 && e[2].selected == true) {
                    setFieldValue('pay_annually', '50');
                    console.log('third');
                  } else if (e[3].id == 3 && e[3].selected == true) {
                    setFieldValue('pay_annually', '70');
                    console.log('fourth');
                  } else if (e[4].id == 4 && e[4].selected == true) {
                    setFieldValue('pay_annually', '100');
                    console.log('fifth');
                  } else if (e[5].id == 5 && e[5].selected == true) {
                    e[5].selected ? setOtherPay(true) : setOtherPay(false);
                    setFieldValue('pay_annually', 'other');

                    console.log('sixth');
                  }
                  setTimeout(() => {
                    validateField('pay_annually');
                  }, 1000);
                }}
                radioButtons={payRadio}
                containerStyle={{
                  width: '100%',
                  alignItems: 'flex-start',
                }}
              />
              <Text
                style={{
                  color: 'white',
                  left: 100,
                  bottom: 30,
                  position: 'absolute',
                }}>
                {errors.pay_annually == 'Required'
                  ? ((payRadio[0].color = 'red'),
                    (payRadio[1].color = 'red'),
                    (payRadio[2].color = 'red'),
                    (payRadio[3].color = 'red'),
                    (payRadio[4].color = 'red'),
                    (payRadio[5].color = 'red'))
                  : ((payRadio[0].color = color.palette.darkblue),
                    (payRadio[1].color = color.palette.darkblue),
                    (payRadio[2].color = color.palette.darkblue),
                    (payRadio[3].color = color.palette.darkblue),
                    (payRadio[4].color = color.palette.darkblue),
                    (payRadio[5].color = color.palette.darkblue))}
              </Text>
              <View
                style={{
                  position: 'absolute',
                  alignSelf: 'flex-end',
                  paddingTop: 25,
                }}>
                <FormField urdu={'notPay'} />
              </View>

              {payRadio[5].selected ? (
                <View style={style.ammount_container}>
                  <View style={style.rupee_view}>
                    <RupeeSign width={'100%'} height={'100%'} />
                  </View>
                  <TextInput
                    keyboardType="numeric"
                    style={style.rupee_input}
                    onChangeText={handleChange('pay_annually')}
                  />
                </View>
              ) : null}
            </View>
            <View style={{marginTop: 10}}>
              <FormField english={'Your Signature:'} urdu={'signature'} />
            </View>
            <View style={{marginTop: 5}}>
              <View
                style={[
                  style.sign_view,
                  errors.signature == 'Required'
                    ? {borderColor: 'red', borderWidth: 2}
                    : null,
                ]}>
                <SignatureCapture
                  ref={singRef}
                  onTouchStart={() => setFieldValue('signature', 'SignPicked')}
                  onTouchEnd={() => {
                    singRef.current.saveImage(), validateField('signature');
                  }}
                  style={style.sign}
                  saveImageFileInExtStorage={true}
                  showNativeButtons={false}
                  showTitleLabel={true}
                  onSaveEvent={img => {
                    setSign(img.pathName), validateField('signature');
                  console.log("isig",img.pathName)
                  }}
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

            <View style={[style.agree_conatiner, {paddingBottom: 30}]}>
              <TouchableOpacity
                onPress={() => {
                  setchecked(true);
                   validateField('agree');
                }}
               onPressIn={() => setFieldValue('agree', 'true')}
                onPressOut={() => validateField('agree')}
                style={style.tick_square}>
                {checked ? (
                  <View style={{width: 23, height: 23, bottom: 7}}>
                    <SquareCheck width={'100%'} height={'100%'} />
                  </View>
                ) : (
                  <TickSquare width={'100%'} height={'100%'} />
                )}
              </TouchableOpacity>
              <View style={style.agree_text_view}>
                <Text
                  style={[
                    style.agree_text,
                    errors.agree == 'Required' ? {color: 'red'} : null,
                  ]}>
                  Have you read carefully to all the conditions and regulations
                  on this funeral service fund?
                </Text>
              </View>
            </View>
            <View style={{marginBottom:10}}>
              <TouchableOpacity
                onPress={() => {
                  //setEnrolled(true);
                  handleSubmit();
                }}>
                <LinearGradient
                  useAngle={true}
                  colors={[color.palette.darkblue, color.palette.lightBlue]}
                  style={[style.power_container,{alignSelf:'flex-end'}]}>
                  <Text style={{color:color.palette.white,fontFamily:typography.Bold}}>Enroll</Text>
                  <View style={style.powerIcon_view}>
                    <RightArrow width={'100%'} height={'100%'} />
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}
    
      </Formik>
      <Modal visible={indicator} transparent>
        <View style={{flex: 1, backgroundColor: 'rgba(0,0,0,0.4)'}}>
          <SkypeIndicator color="white" size={50} />
        </View>
      </Modal>
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
                  Are you sure want to submit this renew subscription form?                  </Text>
                </View>
                <View style={style.yesNo_btn_container}>
                  <TouchableOpacity
                    onPress={() => {
                      setSure(false);
                      RenewApplication()
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
                  Your renew enroment form has been submitted and send to the department for verfication. 
                  </Text>
                </View>
                <View style={style.paragraph_container}>
                  <Text style={style.paragraph_text}>
                  Chcek your verfication status in application status tab.                  </Text>
                </View>
                <TouchableOpacity
                  style={style.cross_view}
                  onPress={() => {
                    navigate.navigate(RoutNames.HomeScreen),
                      setConfirmDonate(false);
                      dispatch(SetHomeRefresh(!homeRefresh))
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
  heading_container: {
    width: '90%',
    flexDirection: 'row',
    left: 10,
  },
  heading: {
   // fontWeight: '800',
    fontSize: fontSizes.medium,
    color: color.palette.black,
    paddingTop: 6,
    paddingBottom: 6,
    fontFamily:typography.Bold
  },
  sub_heading: {
    fontSize: fontSizes.medium,
    color: color.palette.black,
    paddingTop: 6,
    paddingBottom: 6,
    textDecorationLine: 'underline',
    fontFamily:typography.Bold
  },
  photo: {
    width: 100,
    height: 100,
    borderWidth: 1,
    borderRadius: 50,
    left: 10,
    borderStyle: 'dashed',
  },
  text_container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 7,
    paddingBottom: 7,
  },
  text1: {
    fontSize: 15,
    //fontWeight: '600',
    color: color.palette.black,
    width: '40%',
    alignSelf: 'center',
    fontFamily:typography.Regular,
  
  },
  text2: {
    fontSize: 13,
    color: color.palette.black,
    width: '40%',
    textAlign: 'right',
    alignSelf: 'center',
    fontFamily:typography.Regular

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

  clear_sign_view: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    alignSelf: 'flex-end',

    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderStyle: 'dashed',
    borderTopRightRadius: 30,
  },
  clear_sign_text: {
    color: color.palette.darkblue,
    fontWeight: fontWeights.bold,
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
    fontFamily:typography.demi
  },
  paragraph_container: {
    width: '90%',
    padding: 5,
  },
  paragraph_text: {
    color: color.palette.black,
    fontFamily:typography.medium
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
    fontFamily:typography.medium
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
