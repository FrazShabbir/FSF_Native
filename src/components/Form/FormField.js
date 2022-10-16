import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import {color} from '../../theme';
import Name from '../../assets/EnrolmentAssets/name.svg';
import FatherName from '../../assets/EnrolmentAssets/fatherName.svg';
import SurName from '../../assets/EnrolmentAssets/surName.svg';
import Gender from '../../assets/EnrolmentAssets/gender.svg';
import DateOfBirth from '../../assets/EnrolmentAssets/dateBirth.svg';

import PassportNum from '../../assets/EnrolmentAssets/passportNum.svg';

import EuroCard from '../../assets/EnrolmentAssets/eurCard.svg';

import Cell from '../../assets/EnrolmentAssets/cellNumber.svg';

import Email from '../../assets/EnrolmentAssets/emailAddress.svg';

import Country from '../../assets/EnrolmentAssets/country.svg';

import Community from '../../assets/EnrolmentAssets/community.svg';
import Province from '../../assets/EnrolmentAssets/province.svg';

import City from '../../assets/EnrolmentAssets/city.svg';
import Area from '../../assets/EnrolmentAssets/area.svg';
import NativeCountry from '../../assets/EnrolmentAssets/nativeCountry.svg';
import CNIC from '../../assets/EnrolmentAssets/CNIC.svg';
import CompleteAddress from '../../assets/EnrolmentAssets/completeAddress.svg';
import RelativeInfo from '../../assets/EnrolmentAssets/relativeInfo.svg'
import Relation from '../../assets/EnrolmentAssets/relation.svg'
import RelativeInfoNative from '../../assets/EnrolmentAssets/relativeInfoNativeLand.svg'
import CompleteAddress2 from '../../assets/EnrolmentAssets/completeAddress2.svg'
import RepresentiveInfo from '../../assets/EnrolmentAssets/representiveInfo.svg'
import Agreement from '../../assets/EnrolmentAssets/agreement.svg'

export const FormField = ({urdu, english}) => {
  const select = () => {
    if (urdu == 'name') {
      return (
        <View style={style.urdu1}>
          <Name width={'100%'} height={"100%"} />
        </View>
      );
    } else if (urdu == 'fatherName') {
        return (
          <View style={style.urdu2}>
            <FatherName width={'100%'} height={'100%'} />
          </View>
        );
      }
     else if (urdu == 'surName') {
      return (
        <View style={style.urdu3}>
          <SurName width={'100%'} height={'100%'} />
        </View>
      );
    }else if (urdu == 'gender') {
        return (
          <View style={style.urdu4}>
            <Gender width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'dateOfBirth') {
        return (
          <View style={style.urdu5}>
            <DateOfBirth width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'passport') {
        return (
          <View style={style.urdu6}>
            <PassportNum width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'euroCard') {
        return (
          <View style={style.urdu7}>
            <EuroCard width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'cell') {
        return (
          <View style={style.urdu8}>
            <Cell width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'email') {
        return (
          <View style={style.urdu9}>
            <Email width={'100%'} height={'100%'} />
          </View>
        );
      } if (urdu == 'country') {
        return (
          <View style={style.urdu10}>
            <Country width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'community') {
        return (
          <View style={style.urdu11}>
            <Community width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'province') {
        return (
          <View style={style.urdu12}>
            <Province width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'city') {
        return (
          <View style={style.urdu13}>
            <City width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'area') {
        return (
          <View style={style.urdu14}>
            <Area width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'nativeCountry') {
        return (
          <View style={style.urdu15}>
            <NativeCountry width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'CNIC') {
        return (
          <View style={style.urdu16}>
            <CNIC width={'100%'} height={'100%'} />
          </View>
        );
      }else if (urdu == 'completeAddress') {
        return (
          <View style={style.urdu17}>
            <CompleteAddress width={'100%'} height={'100%'} />
          </View>
        );
      }
      /// form Header
      else if (urdu == 'relativeInfo') {
        return (
          <View style={style.urdu18}>
            <RelativeInfo width={'100%'} height={'100%'} />
          </View>
        );
      }
      else if (urdu == 'relativeInfoNative') {
        return (
          <View style={style.urdu20}>
            <RelativeInfoNative width={'100%'} height={'100%'} />
          </View>
        );
      }
      else if (urdu == 'relation') {
        return (
          <View style={style.urdu19}>
            <Relation width={'100%'} height={'100%'} />
          </View>
        );
      }
      else if (urdu == 'representInfo') {
        return (
          <View style={style.urdu22}>
            <RepresentiveInfo width={'100%'} height={'100%'} />
          </View>
        );
      }

      //form header end
      else if (urdu == 'completeAddress2') {
        return (
          <View style={style.urdu21}>
            <CompleteAddress2 width={'100%'} height={'100%'} />
          </View>
        );
      }
      else if (urdu == 'agreement') {
        return (
          <View style={style.urdu23}>
            <Agreement width={'100%'} height={'100%'} />
          </View>
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
  },
  field_view: {},
  title_view: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  urdu1: {
    width: 20,
    height: 20,
  },
  urdu2: {
    width: 40,
    height: 20,
  },
  urdu3: {
    width: 70,
    height: 20,
  },
  urdu4: {
    width: 40,
    height: 20,
  },
  urdu5: {
    width: 80,
    height: 20,
  },
  urdu6: {
    width: 80,
    height: 20,
  },
  urdu7: {
    width: 130,
    height: 20,
  },
  urdu8: {
    width: 100,
    height: 20,
  },
  urdu9: {
    width: 80,
    height: 20,
  },
  urdu10: {
    width: 30,
    height: 20,
  },
  urdu11: {
    width: 50,
    height: 20,
  },
  urdu12: {
    width: 40,
    height: 20,
  },
  urdu13: {
    width: 30,
    height: 20,
  },
  urdu14: {
    width: 130,
    height: 20,
  },
  urdu15: {
    width: 60,
    height: 20,
  },
  urdu16: {
    width: 130,
    height: 20,
  },
  urdu17: {
    width: 80,
    height: 20,
  },
  english: {
    color: color.palette.black,
  },
  ///form header
  urdu18: {
    width: 220,
    height: 20,
  },
  urdu19: {
    width: 35,
    height: 20,
  },
  urdu20: {
    paddingTop:5,
    width: 300,
    height: 30,
  },
  urdu22: {
    paddingTop:5,
    width: 130,
    height: 30,
  },


  ///form header end
  urdu21: {
    width: 60,
    height: 30,
  },
  urdu23: {
    width: "100%",
    height: 40,
  },
  input_container: {
    flex: 1,
    backgroundColor: color.palette.lightwhite2,
    borderRadius: 10,
  },
});
