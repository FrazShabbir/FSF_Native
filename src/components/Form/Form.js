import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useRef, useState, useEffect} from 'react';
import {Formik, useFormik, useFormikContext} from 'formik';
import CountryPicker from 'rn-country-picker';

import {ScrollView, TextInput} from 'react-native-gesture-handler';
import {FormField} from './FormField';
import {FormImage} from './FormImage';
import {color, typography} from '../../theme';
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
import {SetEnrollstatus, SetHomeRefresh} from '../../Reduxs/Reducers';
import {showMessage} from 'react-native-flash-message';
import {
  stepOneSchema,
  stepTwoSchema,
  stepThreeSchma,
  stepFourSchema,
  stepFiveSchema,
} from '../../utils/schema';
import {useDispatch, useSelector} from 'react-redux';
import {SkypeIndicator} from 'react-native-indicators';
import SearchIcon from '../../assets/EnrolmentAssets/searchIcon.svg';
import {CustomAlert} from '../Common/CustomAlert';
import IntlPhoneInput from 'react-native-intl-phone-input';
import {values} from 'ramda';

export const Form = ({updating = false, appId}) => {
  const [indicator, setIndicator] = useState(false);
  const [enrolled, setEnrolled] = useState(false);
  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [imgPath, setimgPath] = useState('');
  const [img, setimg] = useState(false);
  const [filename, setfilename] = useState('');
  const [checked, setchecked] = useState(false);
  const [checked1, setchecked1] = useState(false);
  const refRBSheet = useRef();
  const [buried, setburied] = useState(false);
  const [PassportInfo, setPassportInfo] = useState(false);
  const [sign, setSign] = useState();
  const singRef = useRef();
  const navigate = useNavigation();
  const [GenderOptionsVisible, setGenderoptionVisible] = useState(false);
  const [gender, setGender] = useState('Male');
  const [relative, setrealtive] = useState(false);
  const [otherPay, setOtherPay] = useState(false);
  const {token, user, homeRefresh} = useSelector(state => state.UserReducer);
  const dispatch = useDispatch();
  const [relPassport, setRelPassport] = useState(null);
  const [passportData, setpassportData] = useState({});
  const [searchModel, setSearchModel] = useState(null);
  const [country, setCountry] = useState('Country');
  const [community, setCommunity] = useState('Community');
  const [province, setprovince] = useState('Province');
  const [city, setcity] = useState('City');
  const [native, setNative] = useState('Native Country');
  const [list, setlist] = useState([]);
  const [forCountry, setforCountry] = useState(null);
  const [forCommunity, setforcommunity] = useState(null);
  const [forProvince, setforProvince] = useState(null);
  const [forcity, setforcity] = useState(null);
  const [forNative, setForNative] = useState(null);
  const initialDate = new Date();
  const [upload, setupload] = useState(true);
  const [fetchData, setFetchData] = useState({
    communities: [],
    countries: [],
    provinces: [],
    cities: [],
    native: [],
  });
  const [location, setlocation] = useState({
    community: '',
    country: '',
    province: '',
    city: '',
  });

  const [Form, setForm] = useState({
    fullName: '',
    fatherName: '',
    surName: '',
    passportNumber: '',
    europeResidenceCardNo: '',
    cellNumber: '',
    email: '',
    country: '',
    community: '',
    province: '',
    city: '',
    areaStreetHouse: '',
    nativeCountry: '',
    idCardNo_native: '',
    completeAddress_native: '',

    //step 2
    first_relative_fullName: '',
    first_relative_relation: '',
    first_relative_cellNo: '',
    first_relative_completeAddress: '',

    second_relative_fullName: '',
    second_relative_relation: '',
    second_relative_cellNo: '',
    second_relative_completeAddress: '',
    // //step 3

    first_relative_fullName_native: '',
    first_relative_relation_native: '',
    first_relative_cellNo_native: '',
    first_relative_completeAddress_native: '',

    second_relative_fullName_native: '',
    second_relative_relation_native: '',
    second_relative_cellNo_native: '',
    second_relative_completeAddress_native: '',
    // //step 4

    representive_fullName: '',
    representive_surName: '',
    representive_passportNo: '',
    representive_cellNo: '',
    representive_completeAddress: '',
    step4_agree: '',
    // // step 5
    whereBurried: '',
    relative_involve_fund: '',
    relative_passportNo: relPassport,
    pay_annually: '',
    signature: '',
    step5_agree: '',
  });

  const [buriedRadio, setBuriedRadio] = useState([
    {
      id: '0', // acts as primary key, should be unique and non-empty string
      label: 'Native Country',
      value: 'Native Country',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'Residential Country',
      value: 'Residential Country',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
  ]);

  const [relativeInvolveRadio, setRelativeInvovleRadio] = useState([
    {
      id: '0', // acts as primary key, should be unique and non-empty string
      label: 'Yes',
      value: 'yes',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '1', // acts as primary key, should be unique and non-empty string
      label: 'No',
      value: 'no',
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
      label: '€ 30',
      value: '30',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '2',
      label: '€ 50',
      value: '50',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '3',
      label: '€ 70',
      value: '70',
      color: color.palette.darkblue,
      size: 20,
      labelStyle: {color: color.palette.black},
    },
    {
      id: '4',
      label: '€ 100',
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
  const FormatDate = date => {
    const year = date.slice(0, 4);
    const mon = date.slice(5, 7);
    const day = date.slice(8, 10);
    return day + '-' + mon + '-' + year;
  };
  const step1ref = useRef();
  const step2ref = useRef();
  const step3ref = useRef();
  const step4ref = useRef();
  const step5ref = useRef();
  const selectDate = () => {
    const day = date.getDate();
    const mon = date.getMonth();
    const year = date.getFullYear().toString();
    const fullDate = day + '-' + (mon + 1) + '-' + year;
    return fullDate;
  };
  const dateUpload = () => {
    const day = date.getDate();
    const mon = date.getMonth();
    const year = date.getFullYear().toString();
    return year + '-' + (mon + 1) + '-' + day;
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
        setupload(false);
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
        setupload(false);
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

  useEffect(() => {
    fetch(
      `https://fsfeu.org/es/fsf/api/application/create?user_id=${user.id}&api_token=${token}`,
    )
      .then(res => res.json())
      .then(data => {
        {
          setFetchData({...fetchData, countries: data.countries});
        }
      })
      .catch(err => console.log('err', err));
  }, []);
  const fetchCommunity = async id => {
    await fetch(
      `https://fsfeu.org/es/fsf/api/getCommunities?country_id=${id}`,
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        setFetchData({...fetchData, communities: data.communities});
      })
      .catch(err => console.log('err', err));
  };
  const fetchProvince = async id => {
    await fetch(
      `https://fsfeu.org/es/fsf/api/getprovinces?community_id=${id}`,
      {
        method: 'post',
        headers: {
          'content-type': 'application/json',
        },
      },
    )
      .then(res => res.json())
      .then(data => {
        setFetchData({...fetchData, provinces: data.provinces});
      })
      .catch(err => console.log('err', err));
  };
  const fetchCity = async id => {
    await fetch(`https://fsfeu.org/es/fsf/api/getcities?province_id=${id}`, {
      method: 'post',
      headers: {
        'content-type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        //console.log("province",data)
        setFetchData({...fetchData, cities: data.cities});
      })
      .catch(err => console.log('err', err));
  };
  const SubmitCompleteForm = async (
    whereBurried,
    relative_involve_fund,
    pay_annually,
    relative_passportNo,
  ) => {
    console.log('alldata', Form);
    setIndicator(true);
    const formData = new FormData();

    formData.append('user_id', user.id);
    formData.append('api_token', token);

    //step 1
    formData.append('avatar', {
      uri: imgPath,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    formData.append('full_name', Form.fullName);
    formData.append('father_name', Form.fatherName);
    formData.append('surname', Form.surName);
    formData.append('gender', gender);
    formData.append('dob', dateUpload());
    formData.append('passport_number', Form.passportNumber);
    formData.append('nie', Form.europeResidenceCardNo);
    formData.append('phone', Form.cellNumber);
    formData.append('email', Form.email);
    formData.append('country_id', location.country);
    formData.append('community_id', location.community);
    formData.append('province_id', location.province);
    formData.append('city_id', location.city);
    formData.append('native_country', Form.nativeCountry);
    formData.append('native_id', Form.idCardNo_native);
    formData.append('native_country_address', Form.completeAddress_native);
    formData.append('area', Form.areaStreetHouse);

    //step 2
    formData.append('s_relative_1_name', Form.first_relative_fullName);
    formData.append('s_relative_1_relation', Form.first_relative_relation);
    formData.append('s_relative_1_phone', Form.first_relative_cellNo);
    formData.append(
      's_relative_1_address',
      Form.first_relative_completeAddress,
    );
    formData.append('s_relative_2_name', Form.second_relative_fullName);
    formData.append('s_relative_2_relation', Form.second_relative_relation);
    formData.append('s_relative_2_phone', Form.second_relative_cellNo);
    formData.append(
      's_relative_2_address',
      Form.second_relative_completeAddress,
    );

    //step 3
    formData.append('n_relative_1_name', Form.first_relative_fullName_native);
    formData.append(
      'n_relative_1_relation',
      Form.first_relative_relation_native,
    );
    formData.append('n_relative_1_phone', Form.first_relative_cellNo_native);
    formData.append(
      'n_relative_1_address',
      Form.first_relative_completeAddress_native,
    );
    formData.append('n_relative_2_name', Form.second_relative_fullName_native);
    formData.append(
      'n_relative_2_relation',
      Form.second_relative_relation_native,
    );
    formData.append('n_relative_2_phone', Form.second_relative_cellNo_native);
    formData.append(
      'n_relative_2_address',
      Form.second_relative_completeAddress_native,
    );

    //step 4
    formData.append('rep_name', Form.representive_surName);
    formData.append('rep_surname', Form.representive_surName);
    formData.append('rep_passport_no', Form.representive_passportNo);
    formData.append('rep_phone', Form.representive_cellNo);
    formData.append('rep_address', Form.representive_completeAddress);
    formData.append('rep_confirmed', '1');

    //step 5
    formData.append('buried_location', whereBurried);
    formData.append('registered_relatives', relative_involve_fund);
    formData.append('registered_relative_passport_no', relative_passportNo);
    formData.append('annually_fund_amount', pay_annually);
    formData.append('user_signature', {
      uri: `file://${sign}`,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    formData.append('declaration_confirm', '1');

    await fetch(`https://fsfeu.org/es/fsf/api/application/store?`, {
      method: 'post',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          showMessage({
            message: data.message,
            type: 'success',
            duration: 3000,
          });
          setIndicator(false);
          setEnrolled(true);
        } else if (data.status == 400) {
          showMessage({
            message: data.message,
            type: 'danger',
            duration: 3000,
          });
          setIndicator(false);
        } else {
          console.log('data', data);
          setIndicator(false);
        }
      })
      .catch(err => {
        console.log('err', err);
        setIndicator(false);
      })
      .catch(err => {
        console.log('err', err);
        setIndicator(false);
      });

    // res.catch(err=>{
    // })
  };
  const UpdateEnrollment = async (
    whereBurried,
    relative_involve_fund,
    pay_annually,
    relative_passportNo,
  ) => {
    setIndicator(true);
    const formData = new FormData();

    formData.append('user_id', user.id);
    formData.append('api_token', token);

    //step 1
    formData.append('avatar', {
      uri: imgPath,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    formData.append('application_id', appId);

    formData.append('full_name', Form.fullName);
    formData.append('father_name', Form.fatherName);
    formData.append('surname', Form.surName);
    formData.append('gender', gender);
    formData.append('dob', dateUpload());
    formData.append('passport_number', Form.passportNumber);
    formData.append('nie', Form.europeResidenceCardNo);
    formData.append('phone', Form.cellNumber);
    formData.append('email', Form.email);
    formData.append('country_id', location.country);
    formData.append('community_id', location.community);
    formData.append('province_id', location.province);
    formData.append('city_id', location.city);
    formData.append('native_country', Form.nativeCountry);
    formData.append('native_id', Form.idCardNo_native);
    formData.append('native_country_address', Form.completeAddress_native);
    formData.append('area', Form.areaStreetHouse);

    //step 2
    formData.append('s_relative_1_name', Form.first_relative_fullName);
    formData.append('s_relative_1_relation', Form.first_relative_relation);
    formData.append('s_relative_1_phone', Form.first_relative_cellNo);
    formData.append(
      's_relative_1_address',
      Form.first_relative_completeAddress,
    );
    formData.append('s_relative_2_name', Form.second_relative_fullName);
    formData.append('s_relative_2_relation', Form.second_relative_relation);
    formData.append('s_relative_2_phone', Form.second_relative_cellNo);
    formData.append(
      's_relative_2_address',
      Form.second_relative_completeAddress,
    );

    //step 3
    formData.append('n_relative_1_name', Form.first_relative_fullName_native);
    formData.append(
      'n_relative_1_relation',
      Form.first_relative_relation_native,
    );
    formData.append('n_relative_1_phone', Form.first_relative_cellNo_native);
    formData.append(
      'n_relative_1_address',
      Form.first_relative_completeAddress_native,
    );
    formData.append('n_relative_2_name', Form.second_relative_fullName_native);
    formData.append(
      'n_relative_2_relation',
      Form.second_relative_relation_native,
    );
    formData.append('n_relative_2_phone', Form.second_relative_cellNo_native);
    formData.append(
      'n_relative_2_address',
      Form.second_relative_completeAddress_native,
    );

    //step 4
    // formData.append('rep_name', Form.representive_surName);
    // formData.append('rep_surname', Form.representive_surName);
    // formData.append('rep_passport_no', Form.representive_passportNo);
    // formData.append('rep_phone', Form.representive_cellNo);
    // formData.append('rep_address', Form.representive_completeAddress);
    // formData.append('rep_confirmed', '1');

    //step 5
    formData.append('buried_location', whereBurried);
    formData.append('registered_relatives', relative_involve_fund);
    formData.append('registered_relative_passport_no', relative_passportNo);
    formData.append('annually_fund_amount', pay_annually);
    formData.append('user_signature', {
      uri: `file://${sign}`,
      name: 'image.png',
      fileName: 'image',
      type: 'image/png',
    });
    formData.append('declaration_confirm', '1');

    await fetch(`https://fsfeu.org/es/fsf/api/application/update?`, {
      method: 'post',
      body: formData,
      headers: {
        'content-type': 'multipart/form-data',
      },
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === true) {
          showMessage({
            message: data.message,
            type: 'success',
            duration: 3000,
          });
          setIndicator(false);
          setEnrolled(true);
        } else if (data.status == 400) {
          showMessage({
            message: data.message,
            type: 'danger',
            duration: 3000,
          });
          setIndicator(false);
        } else {
          console.log('data', data);
          setIndicator(false);
        }
      })
      .catch(err => {
        console.log('err', err);
        setIndicator(false);
      })
      .catch(err => {
        console.log('err', err);
        setIndicator(false);
      });
  };
  searchItem = text => {
    const newData = list.filter(item => {
      const itemData = `${item.name.toUpperCase()}   
        ${item.name.toUpperCase()} ${item.name.toUpperCase()}`;

      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    if (forCountry == true) {
      setFetchData({...fetchData, countries: newData});
    } else if (forCommunity == true) {
      setFetchData({...fetchData, communities: newData});
    } else if (forProvince == true) {
      setFetchData({...fetchData, provinces: newData});
    } else if (forcity == true) {
      setFetchData({...fetchData, cities: newData});
    } else if (forNative == true) {
      setFetchData({...fetchData, native: newData});
    }
  };

  console.log('appid', updating, appId);
  const Nations = [
    {name: 'Afghanistan', code: 'AF'},
    {name: 'Åland Islands', code: 'AX'},
    {name: 'Albania', code: 'AL'},
    {name: 'Algeria', code: 'DZ'},
    {name: 'American Samoa', code: 'AS'},
    {name: 'AndorrA', code: 'AD'},
    {name: 'Angola', code: 'AO'},
    {name: 'Anguilla', code: 'AI'},
    {name: 'Antarctica', code: 'AQ'},
    {name: 'Antigua and Barbuda', code: 'AG'},
    {name: 'Argentina', code: 'AR'},
    {name: 'Armenia', code: 'AM'},
    {name: 'Aruba', code: 'AW'},
    {name: 'Australia', code: 'AU'},
    {name: 'Austria', code: 'AT'},
    {name: 'Azerbaijan', code: 'AZ'},
    {name: 'Bahamas', code: 'BS'},
    {name: 'Bahrain', code: 'BH'},
    {name: 'Bangladesh', code: 'BD'},
    {name: 'Barbados', code: 'BB'},
    {name: 'Belarus', code: 'BY'},
    {name: 'Belgium', code: 'BE'},
    {name: 'Belize', code: 'BZ'},
    {name: 'Benin', code: 'BJ'},
    {name: 'Bermuda', code: 'BM'},
    {name: 'Bhutan', code: 'BT'},
    {name: 'Bolivia', code: 'BO'},
    {name: 'Bosnia and Herzegovina', code: 'BA'},
    {name: 'Botswana', code: 'BW'},
    {name: 'Bouvet Island', code: 'BV'},
    {name: 'Brazil', code: 'BR'},
    {name: 'British Indian Ocean Territory', code: 'IO'},
    {name: 'Brunei Darussalam', code: 'BN'},
    {name: 'Bulgaria', code: 'BG'},
    {name: 'Burkina Faso', code: 'BF'},
    {name: 'Burundi', code: 'BI'},
    {name: 'Cambodia', code: 'KH'},
    {name: 'Cameroon', code: 'CM'},
    {name: 'Canada', code: 'CA'},
    {name: 'Cape Verde', code: 'CV'},
    {name: 'Cayman Islands', code: 'KY'},
    {name: 'Central African Republic', code: 'CF'},
    {name: 'Chad', code: 'TD'},
    {name: 'Chile', code: 'CL'},
    {name: 'China', code: 'CN'},
    {name: 'Christmas Island', code: 'CX'},
    {name: 'Cocos (Keeling) Islands', code: 'CC'},
    {name: 'Colombia', code: 'CO'},
    {name: 'Comoros', code: 'KM'},
    {name: 'Congo', code: 'CG'},
    {name: 'Congo, The Democratic Republic of the', code: 'CD'},
    {name: 'Cook Islands', code: 'CK'},
    {name: 'Costa Rica', code: 'CR'},
    {name: "Cote D'Ivoire", code: 'CI'},
    {name: 'Croatia', code: 'HR'},
    {name: 'Cuba', code: 'CU'},
    {name: 'Cyprus', code: 'CY'},
    {name: 'Czech Republic', code: 'CZ'},
    {name: 'Denmark', code: 'DK'},
    {name: 'Djibouti', code: 'DJ'},
    {name: 'Dominica', code: 'DM'},
    {name: 'Dominican Republic', code: 'DO'},
    {name: 'Ecuador', code: 'EC'},
    {name: 'Egypt', code: 'EG'},
    {name: 'El Salvador', code: 'SV'},
    {name: 'Equatorial Guinea', code: 'GQ'},
    {name: 'Eritrea', code: 'ER'},
    {name: 'Estonia', code: 'EE'},
    {name: 'Ethiopia', code: 'ET'},
    {name: 'Falkland Islands (Malvinas)', code: 'FK'},
    {name: 'Faroe Islands', code: 'FO'},
    {name: 'Fiji', code: 'FJ'},
    {name: 'Finland', code: 'FI'},
    {name: 'France', code: 'FR'},
    {name: 'French Guiana', code: 'GF'},
    {name: 'French Polynesia', code: 'PF'},
    {name: 'French Southern Territories', code: 'TF'},
    {name: 'Gabon', code: 'GA'},
    {name: 'Gambia', code: 'GM'},
    {name: 'Georgia', code: 'GE'},
    {name: 'Germany', code: 'DE'},
    {name: 'Ghana', code: 'GH'},
    {name: 'Gibraltar', code: 'GI'},
    {name: 'Greece', code: 'GR'},
    {name: 'Greenland', code: 'GL'},
    {name: 'Grenada', code: 'GD'},
    {name: 'Guadeloupe', code: 'GP'},
    {name: 'Guam', code: 'GU'},
    {name: 'Guatemala', code: 'GT'},
    {name: 'Guernsey', code: 'GG'},
    {name: 'Guinea', code: 'GN'},
    {name: 'Guinea-Bissau', code: 'GW'},
    {name: 'Guyana', code: 'GY'},
    {name: 'Haiti', code: 'HT'},
    {name: 'Heard Island and Mcdonald Islands', code: 'HM'},
    {name: 'Holy See (Vatican City State)', code: 'VA'},
    {name: 'Honduras', code: 'HN'},
    {name: 'Hong Kong', code: 'HK'},
    {name: 'Hungary', code: 'HU'},
    {name: 'Iceland', code: 'IS'},
    {name: 'India', code: 'IN'},
    {name: 'Indonesia', code: 'ID'},
    {name: 'Iran, Islamic Republic Of', code: 'IR'},
    {name: 'Iraq', code: 'IQ'},
    {name: 'Ireland', code: 'IE'},
    {name: 'Isle of Man', code: 'IM'},
    {name: 'Israel', code: 'IL'},
    {name: 'Italy', code: 'IT'},
    {name: 'Jamaica', code: 'JM'},
    {name: 'Japan', code: 'JP'},
    {name: 'Jersey', code: 'JE'},
    {name: 'Jordan', code: 'JO'},
    {name: 'Kazakhstan', code: 'KZ'},
    {name: 'Kenya', code: 'KE'},
    {name: 'Kiribati', code: 'KI'},
    {name: "Korea, Democratic People'S Republic of", code: 'KP'},
    {name: 'Korea, Republic of', code: 'KR'},
    {name: 'Kuwait', code: 'KW'},
    {name: 'Kyrgyzstan', code: 'KG'},
    {name: "Lao People'S Democratic Republic", code: 'LA'},
    {name: 'Latvia', code: 'LV'},
    {name: 'Lebanon', code: 'LB'},
    {name: 'Lesotho', code: 'LS'},
    {name: 'Liberia', code: 'LR'},
    {name: 'Libyan Arab Jamahiriya', code: 'LY'},
    {name: 'Liechtenstein', code: 'LI'},
    {name: 'Lithuania', code: 'LT'},
    {name: 'Luxembourg', code: 'LU'},
    {name: 'Macao', code: 'MO'},
    {name: 'Macedonia, The Former Yugoslav Republic of', code: 'MK'},
    {name: 'Madagascar', code: 'MG'},
    {name: 'Malawi', code: 'MW'},
    {name: 'Malaysia', code: 'MY'},
    {name: 'Maldives', code: 'MV'},
    {name: 'Mali', code: 'ML'},
    {name: 'Malta', code: 'MT'},
    {name: 'Marshall Islands', code: 'MH'},
    {name: 'Martinique', code: 'MQ'},
    {name: 'Mauritania', code: 'MR'},
    {name: 'Mauritius', code: 'MU'},
    {name: 'Mayotte', code: 'YT'},
    {name: 'Mexico', code: 'MX'},
    {name: 'Micronesia, Federated States of', code: 'FM'},
    {name: 'Moldova, Republic of', code: 'MD'},
    {name: 'Monaco', code: 'MC'},
    {name: 'Mongolia', code: 'MN'},
    {name: 'Montserrat', code: 'MS'},
    {name: 'Morocco', code: 'MA'},
    {name: 'Mozambique', code: 'MZ'},
    {name: 'Myanmar', code: 'MM'},
    {name: 'Namibia', code: 'NA'},
    {name: 'Nauru', code: 'NR'},
    {name: 'Nepal', code: 'NP'},
    {name: 'Netherlands', code: 'NL'},
    {name: 'Netherlands Antilles', code: 'AN'},
    {name: 'New Caledonia', code: 'NC'},
    {name: 'New Zealand', code: 'NZ'},
    {name: 'Nicaragua', code: 'NI'},
    {name: 'Niger', code: 'NE'},
    {name: 'Nigeria', code: 'NG'},
    {name: 'Niue', code: 'NU'},
    {name: 'Norfolk Island', code: 'NF'},
    {name: 'Northern Mariana Islands', code: 'MP'},
    {name: 'Norway', code: 'NO'},
    {name: 'Oman', code: 'OM'},
    {name: 'Pakistan', code: 'PK'},
    {name: 'Palau', code: 'PW'},
    {name: 'Palestinian Territory, Occupied', code: 'PS'},
    {name: 'Panama', code: 'PA'},
    {name: 'Papua New Guinea', code: 'PG'},
    {name: 'Paraguay', code: 'PY'},
    {name: 'Peru', code: 'PE'},
    {name: 'Philippines', code: 'PH'},
    {name: 'Pitcairn', code: 'PN'},
    {name: 'Poland', code: 'PL'},
    {name: 'Portugal', code: 'PT'},
    {name: 'Puerto Rico', code: 'PR'},
    {name: 'Qatar', code: 'QA'},
    {name: 'Reunion', code: 'RE'},
    {name: 'Romania', code: 'RO'},
    {name: 'Russian Federation', code: 'RU'},
    {name: 'RWANDA', code: 'RW'},
    {name: 'Saint Helena', code: 'SH'},
    {name: 'Saint Kitts and Nevis', code: 'KN'},
    {name: 'Saint Lucia', code: 'LC'},
    {name: 'Saint Pierre and Miquelon', code: 'PM'},
    {name: 'Saint Vincent and the Grenadines', code: 'VC'},
    {name: 'Samoa', code: 'WS'},
    {name: 'San Marino', code: 'SM'},
    {name: 'Sao Tome and Principe', code: 'ST'},
    {name: 'Saudi Arabia', code: 'SA'},
    {name: 'Senegal', code: 'SN'},
    {name: 'Serbia and Montenegro', code: 'CS'},
    {name: 'Seychelles', code: 'SC'},
    {name: 'Sierra Leone', code: 'SL'},
    {name: 'Singapore', code: 'SG'},
    {name: 'Slovakia', code: 'SK'},
    {name: 'Slovenia', code: 'SI'},
    {name: 'Solomon Islands', code: 'SB'},
    {name: 'Somalia', code: 'SO'},
    {name: 'South Africa', code: 'ZA'},
    {name: 'South Georgia and the South Sandwich Islands', code: 'GS'},
    {name: 'Spain', code: 'ES'},
    {name: 'Sri Lanka', code: 'LK'},
    {name: 'Sudan', code: 'SD'},
    {name: 'Suriname', code: 'SR'},
    {name: 'Svalbard and Jan Mayen', code: 'SJ'},
    {name: 'Swaziland', code: 'SZ'},
    {name: 'Sweden', code: 'SE'},
    {name: 'Switzerland', code: 'CH'},
    {name: 'Syrian Arab Republic', code: 'SY'},
    {name: 'Taiwan, Province of China', code: 'TW'},
    {name: 'Tajikistan', code: 'TJ'},
    {name: 'Tanzania, United Republic of', code: 'TZ'},
    {name: 'Thailand', code: 'TH'},
    {name: 'Timor-Leste', code: 'TL'},
    {name: 'Togo', code: 'TG'},
    {name: 'Tokelau', code: 'TK'},
    {name: 'Tonga', code: 'TO'},
    {name: 'Trinidad and Tobago', code: 'TT'},
    {name: 'Tunisia', code: 'TN'},
    {name: 'Turkey', code: 'TR'},
    {name: 'Turkmenistan', code: 'TM'},
    {name: 'Turks and Caicos Islands', code: 'TC'},
    {name: 'Tuvalu', code: 'TV'},
    {name: 'Uganda', code: 'UG'},
    {name: 'Ukraine', code: 'UA'},
    {name: 'United Arab Emirates', code: 'AE'},
    {name: 'United Kingdom', code: 'GB'},
    {name: 'United States', code: 'US'},
    {name: 'United States Minor Outlying Islands', code: 'UM'},
    {name: 'Uruguay', code: 'UY'},
    {name: 'Uzbekistan', code: 'UZ'},
    {name: 'Vanuatu', code: 'VU'},
    {name: 'Venezuela', code: 'VE'},
    {name: 'Viet Nam', code: 'VN'},
    {name: 'Virgin Islands, British', code: 'VG'},
    {name: 'Virgin Islands, U.S.', code: 'VI'},
    {name: 'Wallis and Futuna', code: 'WF'},
    {name: 'Western Sahara', code: 'EH'},
    {name: 'Yemen', code: 'YE'},
    {name: 'Zambia', code: 'ZM'},
    {name: 'Zimbabwe', code: 'ZW'},
  ];

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
      {step == 1 ? (
        <Formik
          initialValues={stepOneState}
          validationSchema={stepOneSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, {setErrors}) => {
            setForm({
              ...Form,
              fullName: values.fullName,
              fatherName: values.fatherName,
              surName: values.surName,
              passportNumber: values.PassportNumber,
              europeResidenceCardNo: values.europeResidenceCardNo,
              cellNumber: values.cellNumber,

              email: values.email,

              country: values.country,

              community: values.community,

              province: values.province,

              city: values.city,

              areaStreetHouse: values.areaStreetHouse,

              nativeCountry: values.nativeCountry,

              idCardNo_native: values.idCardNo_native,

              completeAddress_native: values.completeAddress_native,
            });
            console.log('step one====>', values);
            setStep(2);
          }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting,
            validateField,
            validateForm,
            setErrors,
            setFieldValue,
            values,
          }) => (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={style.form_container}>
              <TouchableOpacity
                onPress={() => {
                  refRBSheet.current.open(), validateField('avatar');
                }}
                onPressIn={() => setFieldValue('avatar', 'ImagePicked')}
                onPressOut={() => validateField('avatar')}>
                <FormImage
                  fileName={filename}
                  path={imgPath}
                  errr={errors.avatar == 'Required' ? 'red' : null}
                  img={img}
                />
              </TouchableOpacity>

              <FormField english={'Full Name:'} urdu={'name'} />
              <TextInput
                ref={step1ref}
                style={[
                  style.input,
                  errors.fullName == 'Required' &&
                    touched.fullName && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Ahmed Ali'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('fullName')}
                onChange={() => validateField('fullName')}
              />
              <FormField english={'Sur Name:'} urdu={'surName'} />
              <TextInput
                style={[
                  style.input,
                  errors.surName == 'Required' &&
                    touched.surName && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Khokhar'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('surName')}
                onChange={() => validateField('surName')}
              />
              <FormField english={'Father Name:'} urdu={'fatherName'} />
              <TextInput
                style={[
                  style.input,
                  errors.fatherName == 'Required' &&
                    touched.fatherName && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Muhammad Azhar'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('fatherName')}
                onChange={() => validateField('fatherName')}
              />

              <FormField english={'Gender:'} urdu={'gender'} />
              <TouchableOpacity
                onPress={() => {
                  setGenderoptionVisible(!GenderOptionsVisible);
                  //  handleChange(gender);
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
              <FormField english={'Passport No:'} urdu={'passport'} />
              <TextInput
                style={[
                  style.input,
                  errors.PassportNumber == 'Required' &&
                    touched.PassportNumber && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'000515552'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('PassportNumber')}
                onChange={() => validateField('PassportNumber')}
              />
              <FormField english={'Europe Residence Card No:'} />
              <FormField urdu={'euroCard'} />
              <TextInput
                placeholder={'000515552'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  errors.europeResidenceCardNo == 'Required' &&
                    touched.europeResidenceCardNo && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                onChangeText={handleChange('europeResidenceCardNo')}
                onChange={() => validateField('europeResidenceCardNo')}
              />
              <FormField english={'Cell No:'} urdu={'cell'} />
              <View
                style={
                  errors.cellNumber == 'Required' &&
                  touched.cellNumber && {
                    borderWidth: 1,
                    borderColor: 'red',
                    borderRadius: 10,
                    borderBottomWidth: 1.5,
                  }
                }>
                <IntlPhoneInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  phoneInputStyle={[
                    style.input,
                    {marginTop: 10, paddingLeft: 4},
                  ]}
                  onChangeText={e => {
                    console.log('phone', e);

                    if (e.isVerified == true) {
                      setFieldValue(
                        'cellNumber',
                        e.dialCode.toString() +
                          e.unmaskedPhoneNumber.toString(),
                      );
                      validateField('cellNumber');
                    } else {
                      setFieldValue('cellNumber', '');
                    }
                  }}
                  containerStyle={{
                    backgroundColor: color.palette.lightwhite,
                    borderRadius: 10,
                    fontSize: 16,
                    height: 55,
                    color: color.palette.black,
                  }}
                  flagStyle={{bottom: 6, right: 3}}
                  dialCodeTextStyle={{
                    fontSize: 16,
                    color: color.palette.black,
                    bottom: 2,
                  }}
                  defaultCountry={'PK'}
                  modalCountryItemCountryNameStyle={{
                    color: color.palette.black,
                    fontFamily: typography.demi,
                  }}
                />
              </View>
              {/* <TextInput
                keyboardType="numeric"
                placeholder={'000515552'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  errors.cellNumber == 'Required' &&
                    touched.cellNumber && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                onChangeText={handleChange('cellNumber')}
                onChange={() => validateField('cellNumber')}
              /> */}
              <FormField english={'Email:'} urdu={'email'} />
              <TextInput
                placeholder={'dummy@gmail.com'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  errors.email == 'Required' &&
                    touched.email && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                onChangeText={handleChange('email')}
                onChange={() => validateField('email')}
              />
              <FormField english={'Residence Country:'} urdu={'country'} />
              <TouchableOpacity
                onPress={() => {
                  setSearchModel(true);
                  setforCountry(true);
                  setlist(fetchData.countries);
                  setFieldValue('country', 'added');
                }}>
                <View
                  style={[
                    style.input,
                    {justifyContent: 'center'},
                    errors.country == 'Required' && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                  ]}>
                  <Text
                    style={[
                      style.gender_input,
                      country == 'Country'
                        ? {color: color.palette.lightgray}
                        : null,
                    ]}>
                    {country}
                  </Text>
                </View>
                <View style={[style.backDown]}>
                  <BackDown width={'100%'} height={'100%'} />
                </View>
              </TouchableOpacity>

              <FormField english={'Community:'} urdu={'community'} />
              <TouchableOpacity
                onPress={() => {
                  setSearchModel(true);
                  setforcommunity(true);
                  setlist(fetchData.communities);
                  setFieldValue('community', 'added');
                }}>
                <View
                  style={[
                    style.input,
                    {justifyContent: 'center'},
                    errors.community == 'Required' && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                  ]}>
                  <Text
                    style={[
                      style.gender_input,
                      community == 'Community'
                        ? {color: color.palette.lightgray}
                        : null,
                    ]}>
                    {community}
                  </Text>
                </View>
                <View style={[style.backDown]}>
                  <BackDown width={'100%'} height={'100%'} />
                </View>
              </TouchableOpacity>

              <FormField english={'Province:'} urdu={'province'} />
              <TouchableOpacity
                onPress={() => {
                  setSearchModel(true);
                  setforProvince(true);
                  setlist(fetchData.provinces);
                  setFieldValue('province', 'added');
                }}>
                <View
                  style={[
                    style.input,
                    {justifyContent: 'center'},
                    errors.province == 'Required' && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                  ]}>
                  <Text
                    style={[
                      style.gender_input,
                      province == 'Province'
                        ? {color: color.palette.lightgray}
                        : null,
                    ]}>
                    {province}
                  </Text>
                </View>
                <View style={[style.backDown]}>
                  <BackDown width={'100%'} height={'100%'} />
                </View>
              </TouchableOpacity>

              <FormField english={'City:'} urdu={'city'} />
              <TouchableOpacity
                onPress={() => {
                  setSearchModel(true);
                  setforcity(true);
                  setlist(fetchData.cities);
                  setFieldValue('city', 'added');
                }}>
                <View
                  style={[
                    style.input,
                    {justifyContent: 'center'},
                    errors.city == 'Required' && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                  ]}>
                  <Text
                    style={[
                      style.gender_input,
                      city == 'City' ? {color: color.palette.lightgray} : null,
                    ]}>
                    {city}
                  </Text>
                </View>
                <View style={[style.backDown]}>
                  <BackDown width={'100%'} height={'100%'} />
                </View>
              </TouchableOpacity>

              <FormField english={'Area/Street/House No:'} urdu={'area'} />
              <TextInput
                placeholder={'Area/Street/House No'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  {height: 90, textAlignVertical: 'top'},
                  errors.areaStreetHouse == 'Required' &&
                    touched.areaStreetHouse && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                multiline={true}
                numberOfLines={3}
                onChangeText={handleChange('areaStreetHouse')}
                onChange={() => validateField('areaStreetHouse')}
              />
              <FormField english={'Native Country:'} urdu={'nativeCountry'} />
              <TouchableOpacity
                onPress={() => {
                  setSearchModel(true);
                  setForNative(true);
                  setFetchData({...fetchData, native: Nations});
                  setlist(Nations);
                  setFieldValue('nativeCountry', 'added');
                }}
                onPressOut={() => {
                  //setFieldValue('country', 'added')
                }}>
                <View
                  style={[
                    style.input,
                    {justifyContent: 'center'},
                    errors.nativeCountry == 'Required' && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                  ]}>
                  <Text
                    style={[
                      style.gender_input,
                      native == 'Native Country'
                        ? {color: color.palette.lightgray}
                        : null,
                    ]}>
                    {native}
                  </Text>
                </View>
                <View style={[style.backDown]}>
                  <BackDown width={'100%'} height={'100%'} />
                </View>
              </TouchableOpacity>
              {/* <TextInput
                placeholder={'Native Country'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  errors.nativeCountry == 'Required' &&
                    touched.nativeCountry && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                onChangeText={handleChange('nativeCountry')}
                onChange={() => validateField('nativeCountry')}
              /> */}
              <FormField english={'ID Card No.(native country):'} />
              <FormField urdu={'CNIC'} />
              <TextInput
                placeholder={'000515552'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  errors.idCardNo_native == 'Required' &&
                    touched.idCardNo_native && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                onChangeText={handleChange('idCardNo_native')}
                onChange={() => validateField('idCardNo_native')}
              />
              <FormField english={'Complete Address.(native country):'} />
              <FormField urdu={'completeAddress'} />
              <TextInput
                placeholder={'Complete Address.(native country)'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  {height: 90, textAlignVertical: 'top'},
                  errors.completeAddress_native == 'Required' &&
                    touched.completeAddress_native && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                multiline={true}
                numberOfLines={3}
                onChangeText={handleChange('completeAddress_native')}
                onChange={() => validateField('completeAddress_native')}
              />
              <View style={style.log_btn_view}>
                <TouchableOpacity
                  style={{alignItems: 'flex-end'}}
                  onPress={() => {
                    console.log('errors', isSubmitting);

                    handleSubmit();
                    step1ref.current.focus();
                    if (upload) {
                      showMessage({
                        message: 'please Upload Image',
                        type: 'danger',
                        duration: 3000,
                      });
                    }
                  }}>
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
                <>
                  <Modal visible={searchModel} transparent animationType="fade">
                    <View style={style.search_cont}>
                      <LinearGradient
                        colors={[
                          color.palette.darkblue,
                          color.palette.lightBlue,
                        ]}
                        style={style.search_Model}>
                        <View style={style.search_bar_container}>
                          <TextInput
                            style={style.search_input}
                            placeholderTextColor={color.palette.lightgray}
                            placeholder={'Search'}
                            onChangeText={e => {
                              searchItem(e);
                            }}
                          />
                          <View style={style.search_icon_container}>
                            <SearchIcon width={'100%'} height={'100%'} />
                          </View>
                        </View>
                        <ScrollView style={style.search_item}>
                          {forCountry ? (
                            <>
                              {fetchData.countries.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={{
                                      height: 50,
                                      borderBottomWidth: 1,
                                    }}
                                    onPress={() => {
                                      setFieldValue('country', item.id);
                                      setlocation({
                                        ...location,
                                        country: item.id,
                                      });
                                      setCountry(item.name),
                                        setSearchModel(false);
                                      setforCountry(false);
                                      fetchCommunity(item.id);
                                      validateField('country');
                                    }}>
                                    <Text style={style.search_item_text}>
                                      {item.name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                            </>
                          ) : null}
                          {forCommunity ? (
                            <>
                              {fetchData.communities.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={{
                                      height: 50,
                                      borderBottomWidth: 1,
                                    }}
                                    onPress={() => {
                                      setFieldValue('community', item.id);
                                      setCommunity(item.name),
                                        setlocation({
                                          ...location,
                                          community: item.id,
                                        });
                                      validateField('community');

                                      setSearchModel(false);
                                      setforcommunity(false);
                                      fetchProvince(item.id);
                                    }}>
                                    <Text style={style.search_item_text}>
                                      {item.name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                            </>
                          ) : null}
                          {forProvince ? (
                            <>
                              {fetchData.provinces.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={{
                                      height: 50,
                                      borderBottomWidth: 1,
                                    }}
                                    onPress={() => {
                                      setFieldValue('province', item.id);
                                      setlocation({
                                        ...location,
                                        province: item.id,
                                      });

                                      setprovince(item.name),
                                        setSearchModel(false);
                                      setforProvince(false);
                                      fetchCity(item.id);
                                      validateField('province');
                                    }}>
                                    <Text style={style.search_item_text}>
                                      {item.name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                            </>
                          ) : null}
                          {forcity ? (
                            <>
                              {fetchData.cities.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={{
                                      height: 50,
                                      borderBottomWidth: 1,
                                    }}
                                    onPress={() => {
                                      setFieldValue('city', item.id);
                                      setlocation({...location, city: item.id});

                                      setcity(item.name), setSearchModel(false);
                                      setforcity(false);
                                      validateField('city');

                                      fetchCity(item.id);
                                    }}
                                    // onPressOut={() => {
                                    //   validateField('city');
                                    // }}
                                  >
                                    <Text style={style.search_item_text}>
                                      {item.name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                            </>
                          ) : null}
                          {forNative ? (
                            <>
                              {fetchData.native.map((item, index) => {
                                return (
                                  <TouchableOpacity
                                    key={index}
                                    style={{
                                      height: 50,
                                      borderBottomWidth: 1,
                                    }}
                                    onPress={() => {
                                      setFieldValue('nativeCountry', item.name);
                                      /// setlocation({...location, city: item.id});
                                      setNative(item.name),
                                        setSearchModel(false);
                                      setForNative(false);
                                      validateField('nativeCountry');
                                    }}
                                    // onPressOut={() => {
                                    //  validateField('nativeCountry');
                                    // }}
                                  >
                                    <Text style={style.search_item_text}>
                                      {item.name}
                                    </Text>
                                  </TouchableOpacity>
                                );
                              })}
                            </>
                          ) : null}
                          {/* {arr
                            .filter(item => {
                              if (list === '') {
                                return item;
                              } else if (
                                item
                                  .toLowerCase()
                                  .includes(list.toLowerCase())
                              ) {
                                return item;
                              }
                            })
                            .map(item => (
                              <Text style={style.search_item_text}>
                              {item}
                            </Text>
                            ))} */}
                        </ScrollView>
                        <TouchableOpacity
                          style={[
                            style.cross_view,
                            {backgroundColor: color.palette.lightBlue},
                          ]}
                          onPress={() => {
                            setSearchModel(false);
                            setForNative(false);
                            setforCountry(false);
                            setforProvince(false);
                            setforcommunity(false);
                            setforcity(false);
                            if (values.nativeCountry == 'added') {
                              setFieldValue('nativeCountry', '');
                            } else if (values.country == 'added') {
                              setFieldValue('country', '');
                            } else if (values.community == 'added') {
                              setFieldValue('community', '');
                            } else if (values.province == 'added') {
                              setFieldValue('province', '');
                            } else if (values.city == 'added') {
                              setFieldValue('city', '');
                            }
                          }}>
                          <Cross width={'100%'} height={'100%'} />
                        </TouchableOpacity>
                      </LinearGradient>
                    </View>
                  </Modal>
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
          )}
        </Formik>
      ) : null}
      {step == 2 ? (
        <Formik
          initialValues={stepTowState}
          validationSchema={stepTwoSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, {setErrors}) => {
            setForm({
              ...Form,
              first_relative_fullName: values.first_relative_fullName,
              first_relative_relation: values.first_relative_relation,
              first_relative_cellNo: values.first_relative_cellNo,
              first_relative_completeAddress:
                values.first_relative_completeAddress,

              second_relative_fullName: values.second_relative_fullName,
              second_relative_relation: values.second_relative_relation,
              second_relative_cellNo: values.second_relative_cellNo,
              second_relative_completeAddress:
                values.second_relative_completeAddress,
            });

            setStep(step + 1);
            console.log('values', values);
          }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting,
            validateField,
            validateForm,
            setErrors,
            setFieldValue,
          }) => (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={style.form_container}>
              <Text style={style.sub_heading}>1st Relative</Text>
              <FormField english={'Full Name:'} urdu={'name'} />
              <TextInput
                ref={step2ref}
                style={[
                  style.input,
                  errors.first_relative_fullName == 'Required' &&
                    touched.first_relative_fullName && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Ahmed Ali'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('first_relative_fullName')}
                onChange={() => validateField('first_relative_fullName')}
              />
              <FormField english={'Relation:'} urdu={'relation'} />
              <TextInput
                style={[
                  style.input,
                  errors.first_relative_relation == 'Required' &&
                    touched.first_relative_relation && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Brother'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('first_relative_relation')}
                onChange={() => validateField('first_relative_relation')}
              />
              <FormField english={'Cell No:'} urdu={'cell'} />
              <View
                style={
                  errors.first_relative_cellNo == 'Required' &&
                  touched.first_relative_cellNo && {
                    borderWidth: 1,
                    borderColor: 'red',
                    borderRadius: 10,
                    borderBottomWidth: 1.5,
                  }
                }>
                <IntlPhoneInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  phoneInputStyle={[
                    style.input,
                    {marginTop: 10, paddingLeft: 4},
                  ]}
                  onChangeText={e => {
                    console.log('phone', e);

                    if (e.isVerified == true) {
                      setFieldValue(
                        'first_relative_cellNo',
                        e.dialCode.toString() +
                          e.unmaskedPhoneNumber.toString(),
                      );
                      validateField('first_relative_cellNo');
                    } else {
                      setFieldValue('first_relative_cellNo', '');
                    }
                  }}
                  containerStyle={{
                    backgroundColor: color.palette.lightwhite,
                    borderRadius: 10,
                    fontSize: 16,
                    height: 55,
                    color: color.palette.black,
                  }}
                  flagStyle={{bottom: 6, right: 3}}
                  dialCodeTextStyle={{
                    fontSize: 16,
                    color: color.palette.black,
                    bottom: 2,
                  }}
                  defaultCountry={'PK'}
                  modalCountryItemCountryNameStyle={{
                    color: color.palette.black,
                    fontFamily: typography.demi,
                  }}
                />
              </View>
              {/* <TextInput
                keyboardType="numeric"
                placeholder={'000515552'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  errors.first_relative_cellNo == 'Required' &&
                    touched.first_relative_cellNo && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                onChangeText={handleChange('first_relative_cellNo')}
                onChange={() => validateField('first_relative_cellNo')}
              /> */}
              <FormField
                english={'Complete Address:'}
                urdu={'completeAddress2'}
              />
              <TextInput
                placeholder={'Complete Address'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  {height: 90, textAlignVertical: 'top'},
                  errors.first_relative_completeAddress == 'Required' &&
                    touched.first_relative_completeAddress && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                multiline={true}
                numberOfLines={3}
                onChangeText={handleChange('first_relative_completeAddress')}
                onChange={() => validateField('first_relative_completeAddress')}
              />
              <Text style={style.sub_heading}>2nd Relative</Text>
              <FormField english={'Full Name:'} urdu={'name'} />
              <TextInput
                style={[
                  style.input,
                  errors.second_relative_fullName == 'Required' &&
                    touched.second_relative_fullName && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Ahmed Ali'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('second_relative_fullName')}
                onChange={() => validateField('second_relative_fullName')}
              />
              <FormField english={'Relation:'} urdu={'relation'} />
              <TextInput
                style={[
                  style.input,
                  errors.second_relative_relation == 'Required' &&
                    touched.second_relative_relation && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Brother'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('second_relative_relation')}
                onChange={() => validateField('second_relative_relation')}
              />
              <FormField english={'Cell No:'} urdu={'cell'} />
              <View
                style={
                  errors.second_relative_cellNo == 'Required' &&
                  touched.second_relative_cellNo && {
                    borderWidth: 1,
                    borderColor: 'red',
                    borderRadius: 10,
                    borderBottomWidth: 1.5,
                  }
                }>
                <IntlPhoneInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  phoneInputStyle={[
                    style.input,
                    {marginTop: 10, paddingLeft: 4},
                  ]}
                  onChangeText={e => {
                    console.log('phone', e);

                    if (e.isVerified == true) {
                      setFieldValue(
                        'second_relative_cellNo',
                        e.dialCode.toString() +
                          e.unmaskedPhoneNumber.toString(),
                      );
                      validateField('second_relative_cellNo');
                    } else {
                      setFieldValue('second_relative_cellNo', '');
                    }
                  }}
                  containerStyle={{
                    backgroundColor: color.palette.lightwhite,
                    borderRadius: 10,
                    fontSize: 16,
                    height: 55,
                    color: color.palette.black,
                  }}
                  flagStyle={{bottom: 6, right: 3}}
                  dialCodeTextStyle={{
                    fontSize: 16,
                    color: color.palette.black,
                    bottom: 2,
                  }}
                  defaultCountry={'PK'}
                  modalCountryItemCountryNameStyle={{
                    color: color.palette.black,
                    fontFamily: typography.demi,
                  }}
                />
              </View>
              {/* <TextInput
                keyboardType="numeric"
                placeholder={'000515552'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  errors.second_relative_cellNo == 'Required' &&
                    touched.second_relative_cellNo && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                onChangeText={handleChange('second_relative_cellNo')}
                onChange={() => validateField('second_relative_cellNo')}
              /> */}
              <FormField
                english={'Complete Address:'}
                urdu={'completeAddress2'}
              />
              <TextInput
                placeholder={'Complete Address'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  {height: 90, textAlignVertical: 'top'},
                  errors.second_relative_completeAddress == 'Required' &&
                    touched.second_relative_completeAddress && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                multiline={true}
                numberOfLines={3}
                onChangeText={handleChange('second_relative_completeAddress')}
                onChange={() =>
                  validateField('second_relative_completeAddress')
                }
              />
              <View style={style.log_btn_view2}>
                <TouchableOpacity onPress={() => setStep(step - 1)}>
                  <LinearGradient
                    useAngle={true}
                    colors={[color.palette.darkblue, color.palette.lightBlue]}
                    style={style.power_container}>
                    <View style={[style.powerIcon_view]}>
                      <LeftArrow width={'100%'} height={'100%'} />
                    </View>
                    <Text style={[style.text, {marginLeft: 5}]}>Back</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleSubmit(), step2ref.current.focus();
                  }}>
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
          )}
        </Formik>
      ) : null}
      {step == 3 ? (
        <Formik
          initialValues={stepThreeState}
          validationSchema={stepThreeSchma}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, {setErrors}) => {
            setForm({
              ...Form,
              first_relative_fullName_native:
                values.first_relative_fullName_native,
              first_relative_relation_native:
                values.first_relative_relation_native,
              first_relative_cellNo_native: values.first_relative_cellNo_native,
              first_relative_completeAddress_native:
                values.first_relative_completeAddress_native,

              second_relative_fullName_native:
                values.second_relative_fullName_native,
              second_relative_relation_native:
                values.second_relative_relation_native,
              second_relative_cellNo_native:
                values.second_relative_cellNo_native,
              second_relative_completeAddress_native:
                values.second_relative_completeAddress_native,
            });

            setStep(step + 1);

            console.log('values', values);
          }}>
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            errors,
            touched,
            isSubmitting,
            validateField,
            validateForm,
            setErrors,
            setFieldValue,
          }) => (
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={style.form_container}>
              <Text style={style.sub_heading}>1st Relative</Text>

              <FormField english={'Full Name:'} urdu={'name'} />
              <TextInput
                ref={step3ref}
                style={[
                  style.input,
                  errors.first_relative_fullName_native == 'Required' &&
                    touched.first_relative_fullName_native && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Ahmed Ali'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('first_relative_fullName_native')}
                onChange={() => validateField('first_relative_fullName_native')}
              />
              <FormField english={'Relation:'} urdu={'relation'} />
              <TextInput
                style={[
                  style.input,
                  errors.first_relative_relation_native == 'Required' &&
                    touched.first_relative_relation_native && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Brother'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('first_relative_relation_native')}
                onChange={() => validateField('first_relative_relation_native')}
              />
              <FormField english={'Cell No:'} urdu={'cell'} />
              <View
                style={
                  errors.first_relative_cellNo_native == 'Required' &&
                  touched.first_relative_cellNo_native && {
                    borderWidth: 1,
                    borderColor: 'red',
                    borderRadius: 10,
                    borderBottomWidth: 1.5,
                  }
                }>
                <IntlPhoneInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  phoneInputStyle={[
                    style.input,
                    {marginTop: 10, paddingLeft: 4},
                  ]}
                  onChangeText={e => {
                    console.log('phone', e);

                    if (e.isVerified == true) {
                      setFieldValue(
                        'first_relative_cellNo_native',
                        e.dialCode.toString() +
                          e.unmaskedPhoneNumber.toString(),
                      );
                      validateField('first_relative_cellNo_native');
                    } else {
                      setFieldValue('first_relative_cellNo_native', '');
                    }
                  }}
                  containerStyle={{
                    backgroundColor: color.palette.lightwhite,
                    borderRadius: 10,
                    fontSize: 16,
                    height: 55,
                    color: color.palette.black,
                  }}
                  flagStyle={{bottom: 6, right: 3}}
                  dialCodeTextStyle={{
                    fontSize: 16,
                    color: color.palette.black,
                    bottom: 2,
                  }}
                  defaultCountry={'PK'}
                  modalCountryItemCountryNameStyle={{
                    color: color.palette.black,
                    fontFamily: typography.demi,
                  }}
                />
              </View>
              {/* <TextInput
                keyboardType="numeric"
                placeholder={'000515552'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  errors.first_relative_cellNo_native == 'Required' &&
                    touched.first_relative_cellNo_native && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                onChangeText={handleChange('first_relative_cellNo_native')}
                onChange={() => validateField('first_relative_cellNo_native')}
              /> */}
              <FormField
                english={'Complete Address:'}
                urdu={'completeAddress2'}
              />
              <TextInput
                placeholder={'Complete Address'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  {height: 90, textAlignVertical: 'top'},
                  errors.first_relative_completeAddress_native == 'Required' &&
                    touched.first_relative_completeAddress_native && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                multiline={true}
                numberOfLines={3}
                onChangeText={handleChange(
                  'first_relative_completeAddress_native',
                )}
                onChange={() =>
                  validateField('first_relative_completeAddress_native')
                }
              />
              <Text style={style.sub_heading}>2nd Relative</Text>
              <FormField english={'Full Name:'} urdu={'name'} />
              <TextInput
                style={[
                  style.input,
                  errors.second_relative_fullName_native == 'Required' &&
                    touched.second_relative_fullName_native && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Ahmed Ali'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('second_relative_fullName_native')}
                onChange={() =>
                  validateField('second_relative_fullName_native')
                }
              />
              <FormField english={'Relation:'} urdu={'relation'} />
              <TextInput
                style={[
                  style.input,
                  errors.second_relative_relation_native == 'Required' &&
                    touched.second_relative_relation_native && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                placeholder={'Brother'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('second_relative_relation_native')}
                onChange={() =>
                  validateField('second_relative_relation_native')
                }
              />
              <FormField english={'Cell No:'} urdu={'cell'} />
              <View
                style={
                  errors.second_relative_cellNo_native == 'Required' &&
                  touched.second_relative_cellNo_native && {
                    borderWidth: 1,
                    borderColor: 'red',
                    borderRadius: 10,
                    borderBottomWidth: 1.5,
                  }
                }>
                <IntlPhoneInput
                  placeholder={'000515552'}
                  placeholderTextColor={color.palette.lightgray}
                  phoneInputStyle={[
                    style.input,
                    {marginTop: 10, paddingLeft: 4},
                  ]}
                  onChangeText={e => {
                    console.log('phone', e);

                    if (e.isVerified == true) {
                      setFieldValue(
                        'second_relative_cellNo_native',
                        e.dialCode.toString() +
                          e.unmaskedPhoneNumber.toString(),
                      );
                      validateField('second_relative_cellNo_native');
                    } else {
                      setFieldValue('second_relative_cellNo_native', '');
                    }
                  }}
                  containerStyle={{
                    backgroundColor: color.palette.lightwhite,
                    borderRadius: 10,
                    fontSize: 16,
                    height: 55,
                    color: color.palette.black,
                  }}
                  flagStyle={{bottom: 6, right: 3}}
                  dialCodeTextStyle={{
                    fontSize: 16,
                    color: color.palette.black,
                    bottom: 2,
                  }}
                  defaultCountry={'PK'}
                  modalCountryItemCountryNameStyle={{
                    color: color.palette.black,
                    fontFamily: typography.demi,
                  }}
                />
              </View>
              {/* <TextInput
                keyboardType="numeric"
                placeholder={'000515552'}
                placeholderTextColor={color.palette.lightgray}
                onChangeText={handleChange('second_relative_cellNo_native')}
                onChange={() => validateField('second_relative_cellNo_native')}
                style={[
                  style.input,
                  errors.second_relative_cellNo_native == 'Required' &&
                    touched.second_relative_cellNo_native && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
              /> */}
              <FormField
                english={'Complete Address:'}
                urdu={'completeAddress2'}
              />
              <TextInput
                placeholder={'Complete Address'}
                placeholderTextColor={color.palette.lightgray}
                style={[
                  style.input,
                  {height: 90, textAlignVertical: 'top'},
                  errors.second_relative_completeAddress_native == 'Required' &&
                    touched.second_relative_completeAddress_native && {
                      borderWidth: 1,
                      borderColor: 'red',
                    },
                ]}
                multiline={true}
                onChangeText={handleChange(
                  'second_relative_completeAddress_native',
                )}
                onChange={() =>
                  validateField('second_relative_completeAddress_native')
                }
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
                    <Text style={[style.text, {marginLeft: 5}]}>Back</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleSubmit(), step3ref.current.focus();
                  }}>
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
          )}
        </Formik>
      ) : null}
      {step == 4 ? (
        <>
          {updating == true ? (
            <Formik
              initialValues={stepFourState}
              validationSchema={stepFourSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={(values, {setErrors}) => {
                setForm({
                  ...Form,
                  representive_fullName: values.representive_fullName,
                  representive_surName: values.representive_surName,
                  representive_passportNo: values.representive_passportNo,

                  representive_cellNo: values.representive_cellNo,

                  representive_completeAddress:
                    values.representive_completeAddress,
                  step4_agree: values.step4_agree,
                });

                setStep(step + 1);
                setchecked(false);
              }}>
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                errors,
                touched,
                isSubmitting,
                validateField,
                validateForm,
                setErrors,
                setFieldValue,
              }) => (
                <>
                  <View
                    showsVerticalScrollIndicator={false}
                    style={style.form_container}>
                    <View style={{width: '80%', alignSelf: 'center'}}>
                      <FormField english={'Full Name:'} urdu={'name'} />
                      <TextInput
                        style={[
                          style.input,
                          errors.representive_fullName == 'Required' &&
                            touched.representive_fullName && {
                              borderWidth: 1,
                              borderColor: 'red',
                            },
                        ]}
                        placeholder={'Ahmed Ali'}
                        placeholderTextColor={color.palette.lightgray}
                        onChangeText={handleChange('representive_fullName')}
                        onChange={() => validateField('representive_fullName')}
                      />
                      <FormField english={'Sur Name:'} urdu={'surName'} />
                      <TextInput
                        style={[
                          style.input,
                          errors.representive_surName == 'Required' &&
                            touched.representive_surName && {
                              borderWidth: 1,
                              borderColor: 'red',
                            },
                        ]}
                        placeholder={'Khokhar'}
                        placeholderTextColor={color.palette.lightgray}
                        onChangeText={handleChange('representive_surName')}
                        onChange={() => validateField('representive_surName')}
                      />
                      <FormField english={'Passport No:'} urdu={'passport'} />
                      <TextInput
                        style={[
                          style.input,
                          errors.representive_passportNo == 'Required' &&
                            touched.representive_passportNo && {
                              borderWidth: 1,
                              borderColor: 'red',
                            },
                        ]}
                        placeholder={'000515552'}
                        placeholderTextColor={color.palette.lightgray}
                        onChangeText={handleChange('representive_passportNo')}
                        onChange={() =>
                          validateField('representive_passportNo')
                        }
                      />
                      <FormField english={'Cell No:'} urdu={'cell'} />
                      <View
                        style={
                          errors.representive_cellNo == 'Required' &&
                          touched.representive_cellNo && {
                            borderWidth: 1,
                            borderColor: 'red',
                            borderRadius: 10,
                            borderBottomWidth: 1.5,
                          }
                        }>
                        <IntlPhoneInput
                          placeholder={'000515552'}
                          placeholderTextColor={color.palette.lightgray}
                          phoneInputStyle={[
                            style.input,
                            {marginTop: 10, paddingLeft: 4},
                          ]}
                          onChangeText={e => {
                            console.log('phone', e);

                            if (e.isVerified == true) {
                              setFieldValue(
                                'representive_cellNo',
                                e.dialCode.toString() +
                                  e.unmaskedPhoneNumber.toString(),
                              );
                              validateField('representive_cellNo');
                            } else {
                              setFieldValue('representive_cellNo', '');
                            }
                          }}
                          containerStyle={{
                            backgroundColor: color.palette.lightwhite,
                            borderRadius: 10,
                            fontSize: 16,
                            height: 55,
                            color: color.palette.black,
                          }}
                          flagStyle={{bottom: 6, right: 3}}
                          dialCodeTextStyle={{
                            fontSize: 16,
                            color: color.palette.black,
                            bottom: 2,
                          }}
                          defaultCountry={'PK'}
                          modalCountryItemCountryNameStyle={{
                            color: color.palette.black,
                            fontFamily: typography.demi,
                          }}
                        />
                      </View>
                      {/* <TextInput
                        keyboardType="numeric"
                        placeholder={'000515552'}
                        placeholderTextColor={color.palette.lightgray}
                        style={[
                          style.input,
                          errors.representive_cellNo == 'Required' &&
                            touched.representive_cellNo && {
                              borderWidth: 1,
                              borderColor: 'red',
                            },
                        ]}
                        onChangeText={handleChange('representive_cellNo')}
                        onChange={() => validateField('representive_cellNo')}
                      /> */}
                      <FormField
                        english={'Complete Address:'}
                        urdu={'completeAddress2'}
                      />
                      <TextInput
                        placeholder={'Complete Address'}
                        placeholderTextColor={color.palette.lightgray}
                        style={[
                          style.input,
                          {height: 90, textAlignVertical: 'top'},
                          errors.representive_completeAddress == 'Required' &&
                            touched.representive_completeAddress && {
                              borderWidth: 1,
                              borderColor: 'red',
                            },
                        ]}
                        multiline={true}
                        onChangeText={handleChange(
                          'representive_completeAddress',
                        )}
                        onChange={() =>
                          validateField('representive_completeAddress')
                        }
                        numberOfLines={3}
                      />
                      <View style={style.agree_conatiner}>
                        <TouchableOpacity
                          onPress={() => {
                            setchecked(true);
                            validateField('step4_agree');
                          }}
                          onPressIn={() => setFieldValue('step4_agree', 'true')}
                          onPressOut={() => validateField('step4_agree')}
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
                              errors.step4_agree == 'Required'
                                ? {color: 'red'}
                                : null,
                            ]}>
                            Have you informed him that you are appointing this
                            person as your Representative in FSF and this person
                            will be authorized to collect your remaining amount?
                          </Text>
                        </View>
                      </View>
                      <FormField urdu={'agreement'} />
                    </View>
                    <CustomAlert />
                  </View>

                  <View
                    style={[
                      style.log_btn_view2,
                      {width: '80%', alignSelf: 'center'},
                    ]}>
                    <TouchableOpacity onPress={() => setStep(step - 1)}>
                      <LinearGradient
                        useAngle={true}
                        colors={[
                          color.palette.darkblue,
                          color.palette.lightBlue,
                        ]}
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
                        colors={[
                          color.palette.darkblue,
                          color.palette.lightBlue,
                        ]}
                        style={style.power_container}>
                        <Text style={style.text}>Next</Text>
                        <View style={style.powerIcon_view}>
                          <RightArrow width={'100%'} height={'100%'} />
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </>
              )}
            </Formik>
          ) : (
            <Formik
              initialValues={stepFourState}
              validationSchema={stepFourSchema}
              validateOnChange={false}
              validateOnBlur={false}
              onSubmit={(values, {setErrors, setSubmitting}) => {
                setForm({
                  ...Form,
                  representive_fullName: values.representive_fullName,
                  representive_surName: values.representive_surName,
                  representive_passportNo: values.representive_passportNo,

                  representive_cellNo: values.representive_cellNo,

                  representive_completeAddress:
                    values.representive_completeAddress,
                  step4_agree: values.step4_agree,
                });

                setStep(step + 1);
                setchecked(false);
              }}>
              {({
                handleSubmit,
                handleChange,
                handleBlur,
                errors,
                touched,
                isSubmitting,
                validateField,
                validateForm,
                setErrors,
                setFieldValue,
              }) => (
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  style={style.form_container}>
                  <FormField english={'Full Name:'} urdu={'name'} />
                  <TextInput
                    style={[
                      style.input,
                      errors.representive_fullName == 'Required' &&
                        touched.representive_fullName && {
                          borderWidth: 1,
                          borderColor: 'red',
                        },
                    ]}
                    ref={step4ref}
                    placeholder={'Ahmed Ali'}
                    placeholderTextColor={color.palette.lightgray}
                    onChangeText={handleChange('representive_fullName')}
                    onChange={() => validateField('representive_fullName')}
                  />
                  <FormField english={'Sur Name:'} urdu={'surName'} />
                  <TextInput
                    style={[
                      style.input,
                      errors.representive_surName == 'Required' &&
                        touched.representive_surName && {
                          borderWidth: 1,
                          borderColor: 'red',
                        },
                    ]}
                    placeholder={'Khokhar'}
                    placeholderTextColor={color.palette.lightgray}
                    onChangeText={handleChange('representive_surName')}
                    onChange={() => validateField('representive_surName')}
                  />
                  <FormField english={'Passport No:'} urdu={'passport'} />
                  <TextInput
                    style={[
                      style.input,
                      errors.representive_passportNo == 'Required' &&
                        touched.representive_passportNo && {
                          borderWidth: 1,
                          borderColor: 'red',
                        },
                    ]}
                    placeholder={'000515552'}
                    placeholderTextColor={color.palette.lightgray}
                    onChangeText={handleChange('representive_passportNo')}
                    onChange={() => validateField('representive_passportNo')}
                  />
                  <FormField english={'Cell No:'} urdu={'cell'} />
                  <View
                    style={
                      errors.representive_cellNo == 'Required' &&
                      touched.representive_cellNo && {
                        borderWidth: 1,
                        borderColor: 'red',
                        borderRadius: 10,
                        borderBottomWidth: 1.5,
                      }
                    }>
                    <IntlPhoneInput
                      placeholder={'000515552'}
                      placeholderTextColor={color.palette.lightgray}
                      phoneInputStyle={[
                        style.input,
                        {marginTop: 10, paddingLeft: 4},
                      ]}
                      onChangeText={e => {
                        setFieldValue(
                          'representive_cellNo',
                          e.dialCode.toString() +
                            e.unmaskedPhoneNumber.toString(),
                        );
                        validateField('representive_cellNo');
                      }}
                      containerStyle={{
                        backgroundColor: color.palette.lightwhite,
                        borderRadius: 10,
                        fontSize: 16,
                        height: 50,
                        color: color.palette.black,
                      }}
                      flagStyle={{bottom: 5, right: 2}}
                      dialCodeTextStyle={{
                        fontSize: 16,
                        color: color.palette.black,
                      }}
                      defaultCountry={'PK'}
                    />
                  </View>
                  {/* <TextInput
                    keyboardType="numeric"
                    placeholder={'000515552'}
                    placeholderTextColor={color.palette.lightgray}
                    style={[
                      style.input,
                      errors.representive_cellNo == 'Required' &&
                        touched.representive_cellNo && {
                          borderWidth: 1,
                          borderColor: 'red',
                        },
                    ]}
                    onChangeText={handleChange('representive_cellNo')}
                    onChange={() => validateField('representive_cellNo')}
                  /> */}
                  <FormField
                    english={'Complete Address:'}
                    urdu={'completeAddress2'}
                  />
                  <TextInput
                    placeholder={'Complete Address'}
                    placeholderTextColor={color.palette.lightgray}
                    style={[
                      style.input,
                      {height: 90, textAlignVertical: 'top'},
                      errors.representive_completeAddress == 'Required' &&
                        touched.representive_completeAddress && {
                          borderWidth: 1,
                          borderColor: 'red',
                        },
                    ]}
                    multiline={true}
                    onChangeText={handleChange('representive_completeAddress')}
                    onChange={() =>
                      validateField('representive_completeAddress')
                    }
                    numberOfLines={3}
                  />
                  <View style={style.agree_conatiner}>
                    <TouchableOpacity
                      onPress={() => {
                        setchecked(!checked);
                        validateField('step4_agree');
                      }}
                      onPressIn={() => setFieldValue('step4_agree', 'true')}
                      onPressOut={() => validateField('step4_agree')}
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
                          errors.step4_agree == 'Required'
                            ? {color: 'red'}
                            : null,
                        ]}>
                        Have you informed him that you are appointing this
                        person as your Representative in FSF and this person
                        will be authorized to collect your remaining amount?
                      </Text>
                    </View>
                  </View>
                  <FormField urdu={'agreement'} />
                  <View style={style.log_btn_view2}>
                    <TouchableOpacity onPress={() => setStep(step - 1)}>
                      <LinearGradient
                        useAngle={true}
                        colors={[
                          color.palette.darkblue,
                          color.palette.lightBlue,
                        ]}
                        style={style.power_container}>
                        <View style={style.powerIcon_view}>
                          <LeftArrow width={'100%'} height={'100%'} />
                        </View>
                        <Text style={[style.text, {marginLeft: 5}]}>Back</Text>
                      </LinearGradient>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        handleSubmit(), step4ref.current.focus();
                      }}>
                      <LinearGradient
                        useAngle={true}
                        colors={[
                          color.palette.darkblue,
                          color.palette.lightBlue,
                        ]}
                        style={style.power_container}>
                        <Text style={style.text}>Next</Text>
                        <View style={style.powerIcon_view}>
                          <RightArrow width={'100%'} height={'100%'} />
                        </View>
                      </LinearGradient>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              )}
            </Formik>
          )}
        </>
      ) : null}
      {step == 5 ? (
        <Formik
          initialValues={stepFiveState}
          validationSchema={stepFiveSchema}
          validateOnChange={false}
          validateOnBlur={false}
          onSubmit={(values, {setErrors, isSubmitting}) => {
            // setForm({
            //   ...Form,
            //   whereBurried: values.whereBurried,
            //   relative_involve_fund: values.relative_involve_fund,
            //   pay_annually: values.pay_annually,
            //   signature: values.signature,
            //   step5_agree: values.step5_agree,
            //   passportNumber: values.relative_passportNo,
            // });
            console.log('first', isSubmitting);
            if (updating == true) {
              UpdateEnrollment(
                values.whereBurried,
                values.relative_involve_fund,
                values.pay_annually,
                values.relative_passportNo,
              );
            } else {
              SubmitCompleteForm(
                values.whereBurried,
                values.relative_involve_fund,
                values.pay_annually,
                values.relative_passportNo,
              );
            }
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
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={style.form_container}>
              <FormField english={'Where do you want to buried?'} />
              <FormField urdu={'buried'} />
              <View style={style.radio_container}>
                <RadioGroup
                  layout="row"
                  radioButtons={buriedRadio}
                  onPress={e => {
                    if (e[0].id == 0 && e[0].selected == true) {
                      setFieldValue('whereBurried', 'NATIVE');
                      console.log('first');
                    } else {
                      setFieldValue('whereBurried', 'RESIDENTIAL');
                      console.log('second');
                    }
                    setTimeout(() => {
                      validateField('whereBurried');
                    }, 1000);
                  }}
                  containerStyle={[
                    {width: '100%'},
                    errors.whereBurried == 'Required' ? {} : null,
                  ]}
                />
                <Text>
                  {errors.whereBurried == 'Required'
                    ? ((buriedRadio[0].color = 'red'),
                      (buriedRadio[1].color = 'red'))
                    : ((buriedRadio[0].color = color.palette.darkblue),
                      (buriedRadio[1].color = color.palette.darkblue))}
                </Text>
              </View>

              <FormField
                english={'Do you have any relative registered in this fund?'}
              />
              <FormField urdu={'relativeInvolve'} />
              <View style={style.radio_container}>
                <RadioGroup
                  layout="row"
                  radioButtons={relativeInvolveRadio}
                  onPress={e => {
                    e[0].selected ? setrealtive(true) : setrealtive(false);
                    if (e[0].id == 0 && e[0].selected == true) {
                      setFieldValue('relative_involve_fund', '0');
                      setFieldValue('relative_passportNo', 'null');

                      console.log('first');
                    } else {
                      setFieldValue('relative_involve_fund', '0');
                      setFieldValue('relative_passportNo', 'null');

                      console.log('second');
                    }
                    setTimeout(() => {
                      validateField('relative_involve_fund');
                    }, 1000);
                  }}
                />
                <Text style={{color: 'white'}}>
                  {errors.relative_involve_fund == 'Required'
                    ? ((relativeInvolveRadio[0].color = 'red'),
                      (relativeInvolveRadio[1].color = 'red'))
                    : ((relativeInvolveRadio[0].color = color.palette.darkblue),
                      (relativeInvolveRadio[1].color = color.palette.darkblue))}
                </Text>
              </View>
              {relativeInvolveRadio[0].selected ? (
                <View>
                  <FormField english={'Passport No:'} urdu={'passport'} />
                  <TextInput
                    style={[
                      style.input,
                      errors.relative_passportNo == 'Required' &&
                        relativeInvolveRadio[0].selected && {
                          borderWidth: 1,
                          borderColor: 'red',
                        },
                    ]}
                    onChangeText={e => setRelPassport(e)}
                    placeholder={'000515552'}
                    placeholderTextColor={color.palette.lightgray}
                  />
                  <TouchableOpacity
                    style={{alignSelf: 'flex-end'}}
                    onPress={async () => {
                      setIndicator(true);
                      const res = await fetch(
                        `https://fsfeu.org/es/fsf/api/get_passport/info/${relPassport}/${user.id}/${token}`,
                        {
                          method: 'get',
                          headers: {
                            'content-type': 'application/json',
                          },
                        },
                      );
                      const jsonRes = await res.json();
                      console.log('resss', jsonRes);
                      if (jsonRes.status == 200) {
                        setIndicator(false);
                        setPassportInfo(true);
                        setpassportData(jsonRes.user);
                        setFieldValue('relative_passportNo', relPassport);
                        setFieldValue('relative_involve_fund', '1');
                      } else {
                        setFieldValue('relative_passportNo', 'null');
                        setFieldValue('relative_involve_fund', '0');

                        showMessage({
                          message: jsonRes.message,
                          type: 'danger',
                          duration: 3000,
                        });
                        console.log(jsonRes);
                        setIndicator(false);
                      }
                    }}>
                    <LinearGradient
                      useAngle={true}
                      colors={[color.palette.darkblue, color.palette.lightBlue]}
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
                  {PassportInfo ? (
                    <View style={style.data_conianer}>
                      <View style={style.data_view}>
                        <Text style={style.data_text}>Name:</Text>
                        <Text style={style.data_text}>
                          {passportData.full_name}
                        </Text>
                      </View>
                      <View style={style.data_view}>
                        <Text style={style.data_text}>Father Name:</Text>
                        <Text style={style.data_text}>
                          {passportData.father_name}
                        </Text>
                      </View>
                      <View style={style.data_view}>
                        <Text style={style.data_text}>Registration No:</Text>
                        <Text style={style.data_text}>
                          {passportData.registeration_number}
                        </Text>
                      </View>
                      <View
                        style={[style.data_view, {flexDirection: 'column'}]}>
                        <Text style={style.data_text}>Address:</Text>
                        <View style={style.data_address_view}>
                          <Text style={style.data_address_text}>
                            {passportData.area}
                          </Text>
                          <Text style={style.data_address_text}>
                            {passportData.city}
                          </Text>
                          <Text style={style.data_address_text}>
                            {passportData.country}
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
                    setPayRadio(e);
                    if (e[0].id == 0 && e[0].selected == true) {
                      setFieldValue('pay_annually', '0');
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
                    onTouchStart={() =>
                      setFieldValue('signature', 'SignPicked')
                    }
                    onTouchEnd={() => {
                      singRef.current.saveImage(), validateField('signature');
                    }}
                    style={style.sign}
                    saveImageFileInExtStorage={true}
                    showNativeButtons={false}
                    showTitleLabel={true}
                    onSaveEvent={img => {
                      setSign(img.pathName), validateField('signature');
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
                    setchecked1(!checked1);
                    validateField('step5_agree');
                  }}
                  onPressIn={() => setFieldValue('step5_agree', 'true')}
                  onPressOut={() => validateField('step5_agree')}
                  style={style.tick_square}>
                  {checked1 ? (
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
                      errors.step5_agree == 'Required' ? {color: 'red'} : null,
                    ]}>
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
                    <Text style={[style.text, {marginLeft: 5}]}>Back</Text>
                  </LinearGradient>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleSubmit();
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
          )}
        </Formik>
      ) : null}

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
    marginBottom: 10,
    color: color.palette.black,
    fontFamily: typography.Regular,
  },
  gender_input: {
    color: color.palette.black,
    fontSize: 16,
    fontFamily: typography.Regular,
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
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  log_btn_view2: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 10,
  },

  power_container: {
    height: 34,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 12,
    paddingRight: 12,
  },
  text: {
    color: color.palette.white,
    marginLeft: 8,
    fontFamily: typography.medium,
  },
  powerIcon_view: {
    width: 17,
    height: 17,
    marginLeft: 5,
  },
  input_icon: {
    width: 16,
    height: 16,
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 17,
    top: 17,
  },
  text: {
    color: color.palette.white,
    fontSize: 15,
  },
  form_title_view: {
    marginTop: 10,
    width: '80%',
    alignSelf: 'center',
    paddingBottom: 10,
  },
  form_title: {
    color: color.palette.black,
    fontSize: 18,
    fontFamily: typography.demi,
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

    borderWidth: 1,
    borderBottomLeftRadius: 15,
    borderStyle: 'dashed',
    borderTopRightRadius: 30,
  },
  clear_sign_text: {
    color: color.palette.darkblue,
    fontWeight: fontWeights.bold,
  },
  search_cont: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  search_Model: {
    width: '80%',
    height: 380,
    borderRadius: 25,
    top: '10%',
  },

  search_bar_container: {
    backgroundColor: color.palette.white,
    width: '80%',
    alignSelf: 'center',
    borderRadius: 17,
    top: '7%',
    height: 50,
  },
  search_input: {
    paddingLeft: '20%',
    borderColor: 'red',
    fontSize: 18,
  },

  search_icon_container: {
    width: 25,
    height: 25,
    position: 'absolute',
    marginTop: 12,
    marginLeft: 12,
  },
  search_item: {
    flex: 0.9,
    alignSelf: 'center',
    width: '80%',
    top: '7%',
    marginBottom: 20,
  },
  search_item_text: {
    fontSize: 20,
    color: color.palette.white,
    paddingLeft: 15,
    top: 10,
  },
});

const stepOneState = {
  //step 1
  avatar: '',
  fullName: '',
  fatherName: '',
  surName: '',
  gender: '',
  dateOfBirth: '',
  PassportNumber: '',
  europeResidenceCardNo: '',
  cellNumber: '',
  email: '',
  country: '',
  community: '',
  province: '',
  city: '',
  areaStreetHouse: '',
  nativeCountry: '',
  idCardNo_native: '',
  completeAddress_native: '',
};
const stepTowState = {
  // //step 2
  first_relative_fullName: '',
  first_relative_relation: '',
  first_relative_cellNo: '',
  first_relative_completeAddress: '',

  second_relative_fullName: '',
  second_relative_relation: '',
  second_relative_cellNo: '',
  second_relative_completeAddress: '',
};
const stepThreeState = {
  // //step 3

  first_relative_fullName_native: '',
  first_relative_relation_native: '',
  first_relative_cellNo_native: '',
  first_relative_completeAddress_native: '',

  second_relative_fullName_native: '',
  second_relative_relation_native: '',
  second_relative_cellNo_native: '',
  second_relative_completeAddress_native: '',
};
const stepFourState = {
  // //step 4

  representive_fullName: '',
  representive_surName: '',
  representive_passportNo: '',
  representive_cellNo: '',
  representive_completeAddress: '',
  step4_agree: '',
};
const stepFiveState = {
  // // step 5
  whereBurried: '',
  relative_involve_fund: '',
  relative_passportNo: '',
  pay_annually: '',
  signature: '',
  step5_agree: '',
};
