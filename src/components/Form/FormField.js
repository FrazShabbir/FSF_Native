import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {color, typography} from '../../theme';
import { fontWeights } from '../../theme/styles';
export const FormField = ({urdu, english}) => {
  const select = () => {
    if (urdu == 'name') {
      return (
        <Text style={style.urdu}>نام</Text>
      );
    } else if (urdu == 'fatherName') {
        return (
          <Text style={style.urdu}>ولدیت</Text>

        );
      }
     else if (urdu == 'surName') {
      return (
        <Text style={style.urdu}>خاندانی نام</Text>

      );
    }else if (urdu == 'gender') {
        return (
          <Text style={style.urdu}>جنس</Text>

        );
      }else if (urdu == 'dateOfBirth') {
        return (
          <Text style={style.urdu}>تاریخ پیدائش</Text>

        );
      }else if (urdu == 'passport') {
        return (
          <Text style={style.urdu}>پاسپورٹ نمبر</Text>

        );
      }else if (urdu == 'euroCard') {
        return (
          <Text style={style.urdu}>یورپی رہائشی کارڈ نمبر</Text>

        );
      }else if (urdu == 'cell') {
        return (
          <Text style={style.urdu}>موبائل فون نمبر</Text>

        );
      }else if (urdu == 'email') {
        return (
          <Text style={style.urdu}>ای میل ایڈریس</Text>

        );
      } if (urdu == 'country') {
        return (
          <Text style={style.urdu}>ملک</Text>

        );
      }else if (urdu == 'community') {
        return (
          <Text style={style.urdu}>کمیونٹی</Text>

        );
      }else if (urdu == 'province') {
        return (
          <Text style={style.urdu}>صوبہ</Text>

        );
      }else if (urdu == 'city') {
        return (
          <Text style={style.urdu}>شہر</Text>

        );
      }else if (urdu == 'area') {
        return (
          <Text style={style.urdu}>علاقہ / گلی / مکان نمبر</Text>

        );
      }else if (urdu == 'nativeCountry') {
        return (
          <Text style={style.urdu}>آبائی وطن</Text>

        );
      }else if (urdu == 'CNIC') {
        return (
          <Text style={style.urdu}>شناختی کارڈ نمبر (آبائی وطن)</Text>

        );
      }else if (urdu == 'completeAddress') {
        return (
          <Text style={style.urdu}>مکمل پتہ (آبائی وطن)</Text>

        );
      }
      /// form Header
      else if (urdu == 'relativeInfo') {
        return (
          <Text style={style.english_heading}>مقامی رشتہ داروں کی معلومات</Text>

        );
      }
      else if (urdu == 'relativeInfoNative') {
        return (
          <Text style={[style.english_heading,{fontSize:15}]}>آبائی وطن میں  موجود رشتہ داروں کی معلومات</Text>

        );
      }
      else if (urdu == 'relation') {
        return (
          <Text style={style.urdu}>رشتہ</Text>
        );
      }
      else if (urdu == 'representInfo') {
        return (
          <Text style={style.english_heading}>نائب کی معلومات</Text>
        );
      }

      //form header end
      else if (urdu == 'completeAddress2') {
        return (
          <Text style={style.urdu}>مکمل پتہ</Text>
        );
      }
      else if (urdu == 'agreement') {
        return (
          <Text style={style.urdu}>کیا آپ نے ان کو مطلع کر دیا ہے کہ آپ انہیں ایف ایس ایف میں اپنا نائب مقرر کر رہے ہیں؟ نیز یہی آپ کی بچی ہوئی رقم لینے کے مجاز ہوں گے؟</Text>
        );
      }
      else if (urdu == 'buried') {
        return (
          <Text style={style.urdu}>آپ کہاں دفن ہونا چاہتے ہیں؟</Text>
        );
      }
      else if (urdu == 'relativeInvolve') {
        return (
          <Text style={style.urdu}>کیا آپ کا کوئی رشتہ دار اس فنڈ میں شامل ہے؟</Text>
        );
      }
      else if (urdu == 'payFund') {
        return (
          <Text style={style.urdu}>آپ اس فنڈ میں سالانہ کتنی رقم ادا کریں گے؟</Text>
        );
      }
      else if (urdu == 'notPay') {
        return (
          <Text style={style.urdu}>میں کوئی رقم صدقہ نہیں کرنا چاہتا.</Text>
        );
      }
      else if (urdu == 'signature') {
        return (
          <Text style={style.urdu}>آپ کے دستخط</Text>
        );
      }
  };

  return (
    <View style={style.container}>
      <View style={style.field_view}>
        <View style={style.title_view}>
          <Text style={style.english}>{english}</Text>
          {select()}
        </View>
      </View>
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    marginTop:10,
    paddingLeft:5,
    paddingRight:5
  },
  field_view: {},
  title_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urdu:{
    color: color.palette.black,
    fontSize:15,
    fontFamily:typography.medium
  },
  english: {
    color: color.palette.black,
    fontSize:15,
    fontFamily:typography.medium,

  },
  english_heading:{
    color: color.palette.black,
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 17,
    fontWeight: fontWeights.bold,
  },
  
  input_container: {
    flex: 1,
    backgroundColor: color.palette.lightwhite2,
    borderRadius: 10,
  },
});
