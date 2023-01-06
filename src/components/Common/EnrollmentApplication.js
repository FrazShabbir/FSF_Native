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
  import {fontSizes, fontWeights} from '../../theme/styles';
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
  import { useSelector } from 'react-redux';
  import { showMessage } from 'react-native-flash-message';
  import { SkypeIndicator } from 'react-native-indicators';
  
  export const EnrollmentApplication = ({data,
    suply
  }) => {
    const singRef = useRef();
    
  
    // useEffect(() => {
    //   fetch(`https://fsfeu.org/es/fsf/api/get_passport/info/${relPassport}/${user.id}/${token}`).
    //   then(r=>r.json()).
    //   then(data=>console.log("passport",data))
    // }, [])
    
  
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
  
        {data?.registered_relatives == "No" ? (
          <View style={style.text_container}>
            <Text style={style.text1}>Any Realative:</Text>
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
        <View style={style.text_container}>
          <Text style={style.text1}>Annual Fund Ammount:</Text>
          <Text style={style.text2}>{data?.annually_fund_amount}</Text>
        </View>
        <View style={style.text_container}>
          <Text style={style.text1}>Status:</Text>
          <Text style={[style.text2,{fontFamily:typography.demi}]}>{data?.status}</Text>
        </View>
        <View style={style.text_container}>
          <Text style={style.text1}>Signature:</Text>
        </View>
        <View style={style.sign_container}>
            <Image style={style.sign}  source={{uri:data?.user_signature}} />
        </View>
      </View>
    );
  };
  const style = StyleSheet.create({
    sign_container:{
        borderWidth:1,
        height:180,
        borderStyle:"dashed",
        marginBottom:30
    },
    sign:{

        width:"100%",
        height:"100%"

    }
    ,

    heading: {
      fontSize: 18,
      color: color.palette.black,
      paddingTop: 6,
      paddingBottom: 6,
      fontFamily:typography.demi
    },
    sub_heading: {
      fontSize: fontSizes.medium,
      color: color.palette.black,
      paddingTop: 6,
      paddingBottom: 6,
      textDecorationLine: 'underline',
      fontFamily:typography.medium
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
      color: color.palette.black,
      width: '40%',
      alignSelf: 'center',
      fontFamily:typography.medium
    },
    text2: {
      fontSize: 14,
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
  });
  