import * as Yup from 'yup';

const numberValidation = new RegExp(/^[0-9]{10}$/);
const nameValidation = new RegExp(/^[^\s*]{1,}[a-zA-Z0-9-_/.&\s*@'"]{1,}$/);
const addressValidation = new RegExp(
  /^[^]{1,}[a-zA-Z0-9]{1,}[a-zA-Z0-9-/.:,()\s*]{1,}$/,
);
const valueValidation = new RegExp(/^[^0]{1,}[0-9]{0,8}(.[0-9]{1,3})?$/);

export const SignInSchema = (lan_val_keys) =>
  Yup.object({
    mobile_number: Yup.string()
      .required('Please enter your mobile number')
      .matches('Please enter a valid phone number'),
  });

export const SignUpSchema = (lan_val_keys) =>
  Yup.object({
    mobile_number: Yup.string()
      .required(lan_val_keys?.Pleaseenteryoumobilenumber)
      .matches(numberValidation, lan_val_keys?.Phonenumberisnotvalid),
    full_name: Yup.string()
      .required(lan_val_keys?.Pleaseenteryourfullname)
      .matches(nameValidation, lan_val_keys?.fullNameisincorrect),
    password: Yup.string()
      .required(lan_val_keys?.Pleaseenteryourpassword)
      .min(6),
    confirm_password: Yup.string()
      .required(lan_val_keys?.Pleaseenteryourconfirmpassword)
      .min(6)
      .when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          lan_val_keys?.Bothpasswordneedtobethesame,
        ),
      }),
  });

export const SetPasswordSchema = (lan_val_keys) =>
  Yup.object({
    password: Yup.string()
      .required(lan_val_keys?.Pleaseenteryourpassword)
      .min(6),
    confirm_password: Yup.string()
      .required(lan_val_keys?.Pleaseenteryourconfirmpassword)
      .min(6)
      .when('password', {
        is: (val) => (val && val.length > 0 ? true : false),
        then: Yup.string().oneOf(
          [Yup.ref('password')],
          lan_val_keys?.Bothpasswordneedtobethesame,
        ),
      }),
  });

export const ForgotPasswordSchema = (lan_val_keys) =>
  Yup.object({
    mobile_number: Yup.string()
      .required(lan_val_keys?.Pleaseenteryoumobilenumber)
      .matches(numberValidation, lan_val_keys?.Phonenumberisnotvalid),
  });

export const AddProfileSchema = (lan_val_keys) =>
  Yup.object({
    firm_name: Yup.string()
      .required(lan_val_keys?.PleaseenteryourfirmName)
      .matches(nameValidation, lan_val_keys?.fullNameisincorrect),
    email_id: Yup.string()
      .email(lan_val_keys?.Enteravalidemailaddress)
      .required(lan_val_keys?.pleaseenteryouremailid),
    address: Yup.string()
      .required(lan_val_keys?.pleaseenteryouraddress)
      .matches(addressValidation, lan_val_keys?.addressisIncorrect),
    city: Yup.string().required(lan_val_keys?.pleaseenteryourcity),
  });

export const BuySellSchema = (lan_val_keys, type) =>
  Yup.object({
    commodity: Yup.string().required(lan_val_keys?.pleaseSelectYourCommodity),
    selectedQuality: Yup.string().required(
      lan_val_keys?.pleaseSelectYourQuality,
    ),
    // buyQuantity: Yup.string()
    //   .required(lan_val_keys?.pleaseSelectYourBuyQuantity)
    //   .matches(valueValidation, lan_val_keys?.pleaseEnterValidQuantity),
    // tentaivePrice: Yup.string().matches(
    //   valueValidation,
    //   lan_val_keys?.pleaseEnterValidPrice,
    // ),
    // buyQuantityType: Yup.string().required(
    //   lan_val_keys?.pleaseSelectYourBuyQuantity,
    // ),
    // tentaivePriceType: Yup.string().when('tentaivePrice', {
    //   is: (tentaivePrice) => (tentaivePrice !== '' ? true : false),
    //   then: Yup.string().required(lan_val_keys?.pleaseSelectYourTentativePrice),
    // }),
    //------------------------------------------//
    // corporateORuser: Yup.string().required(
    //   lan_val_keys?.pleaseSelectYourQuantity,
    // ),
    // brand: Yup.string().required(lan_val_keys?.pleaseSelectYourQuantity),
    startDate: Yup.string().when('tradeType', {
      is: (val) => (val === 'SELL' ? true : false),
      then: Yup.string().required(lan_val_keys?.pleaseSelectaStartDate),
    }),
    endDate: Yup.string().when('tradeType', {
      is: (val) => (val === 'SELL' ? true : false),
      then: Yup.string().required(lan_val_keys?.pleaseSelectaStartDate),
    }),
  });

export const manualBidSchema = (lan_val_keys) =>
  Yup.object({
    quantity: Yup.string()
      .required(lan_val_keys?.pleaseSelectYourQuantity)
      .matches(valueValidation, lan_val_keys?.pleaseEnterValidQuantity),
    rate: Yup.string()
      .required(lan_val_keys?.pleaseEnterYourRate)
      .matches(valueValidation, lan_val_keys?.pleaseEnterValidPrice),
    quantityType: Yup.string().required(lan_val_keys?.pleaseSelectYourQuantity),
    rateType: Yup.string().required(lan_val_keys?.pleaseEnterYourRate),
  });

export const manualTradeBid = (lan_val_keys) =>
  Yup.object({
    companyName: Yup.string()
      .required(lan_val_keys?.pleaseEnterYourCompanyName)
      .matches(nameValidation, lan_val_keys?.companyNameisincorrect),
    quantity: Yup.string()
      .required(lan_val_keys?.pleaseSelectYourQuantity)
      .matches(valueValidation, lan_val_keys?.pleaseEnterValidQuantity),
    rate: Yup.string()
      .required(lan_val_keys?.pleaseEnterYourRate)
      .matches(valueValidation, lan_val_keys?.pleaseEnterValidPrice),
    quantityType: Yup.string().required(lan_val_keys?.pleaseSelectYourQuantity),
    rateType: Yup.string().required(lan_val_keys?.pleaseEnterYourRate),
  });
export const buyTradeBid = (lan_val_keys) =>
  Yup.object({
    quantity: Yup.string()
      .required(lan_val_keys?.pleaseSelectYourQuantity)
      .matches(valueValidation, lan_val_keys?.pleaseEnterValidQuantity),
    rate: Yup.string()
      .required(lan_val_keys?.pleaseEnterYourRate)
      .matches(valueValidation, lan_val_keys?.pleaseEnterValidPrice),
    quantityType: Yup.string().required(lan_val_keys?.pleaseSelectYourQuantity),
    rateType: Yup.string().required(lan_val_keys?.pleaseEnterYourRate),
  });

export const TradeBookManualBid = (lan_val_keys) =>
  Yup.object({
    commodity: Yup.string().required(lan_val_keys?.pleaseSelectYourCommodity),
    selectedQuality: Yup.string().required(
      lan_val_keys?.pleaseSelectYourQuality,
    ),
    companyName: Yup.string()
      .required(lan_val_keys?.pleaseEnterYourCompanyName)
      .matches(nameValidation, lan_val_keys?.companyNameisincorrect),
    buyQuantity: Yup.string()
      .required(lan_val_keys?.pleaseSelectYourBuyQuantity)
      .matches(valueValidation, lan_val_keys?.pleaseEnterValidQuantity),
    tentaivePrice: Yup.string()
      .required(lan_val_keys?.pleaseSelectYourTentativePrice)
      .matches(valueValidation, lan_val_keys?.pleaseEnterValidPrice),
    buyQuantityType: Yup.string().required(
      lan_val_keys?.pleaseSelectYourBuyQuantity,
    ),
    tentaivePriceType: Yup.string().required(
      lan_val_keys?.pleaseSelectYourTentativePrice,
    ),
  });
export const InventoryManualValidation = (lan_val_keys) =>
  Yup.object({
    commodity: Yup.string().required(lan_val_keys?.pleaseSelectYourCommodity),
    selectedQuality: Yup.string().required(
      lan_val_keys?.pleaseSelectYourQuality,
    ),
    buyQuantity: Yup.string()
      .required(lan_val_keys?.pleaseSelectYourBuyQuantity)
      .matches(valueValidation, lan_val_keys?.pleaseEnterValidQuantity),
    tentaivePrice: Yup.string()
      .required(lan_val_keys?.pleaseSelectYourTentativePrice)
      .matches(valueValidation, lan_val_keys?.pleaseEnterValidPrice),
    buyQuantityType: Yup.string().required(
      lan_val_keys?.pleaseSelectYourBuyQuantity,
    ),
    tentaivePriceType: Yup.string().required(
      lan_val_keys?.pleaseSelectYourTentativePrice,
    ),
  });

export const paymentRemainderSchema = (lan_val_keys) =>
  Yup.object({
    paymentTerms: Yup.string().required(lan_val_keys?.pleaseEnterYourDays),
    schedule: Yup.string().required(lan_val_keys?.pleaseSelectYourSchedule),
  });

export const QualityVerificationSchema = (lan_val_keys) =>
  Yup.object({
    schedule: Yup.string().required(lan_val_keys?.pleaseSelectYourSchedule),
  });

export const EditProfileSchema = (lan_val_keys) =>
  Yup.object({
    firm_name: Yup.string()
      .required(lan_val_keys?.PleaseenteryourfirmName)
      .matches(nameValidation, lan_val_keys?.fullNameisincorrect),
    email_id: Yup.string()
      .email(lan_val_keys?.Enteravalidemailaddress)
      .required(lan_val_keys?.pleaseenteryouremailid),
    address: Yup.string()
      .required(lan_val_keys?.pleaseenteryouraddress)
      .matches(addressValidation, lan_val_keys?.addressisIncorrect),
    city: Yup.string().required(lan_val_keys?.pleaseenteryourcity),
    full_name: Yup.string()
      .required(lan_val_keys?.Pleaseenteryourfullname)
      .matches(nameValidation, lan_val_keys?.fullNameisincorrect),
  });

export const tripDetail = (lan_val_keys) =>
  Yup.object({
    driverName: Yup.string().required(lan_val_keys?.pleaseEnterDriverName),
    truckDetails: Yup.string().required(lan_val_keys?.pleaseEnterTruckDetails),
  });

export const contactUsValidation = (lan_val_keys) =>
  Yup.object({
    name: Yup.string().required(lan_val_keys?.PleaseEnteraName),
    mobile_number: Yup.string()
      .required(lan_val_keys?.Pleaseenteryoumobilenumber)
      .matches(numberValidation, lan_val_keys?.Phonenumberisnotvalid),
    email: Yup.string()
      .email(lan_val_keys?.Enteravalidemailaddress)
      .required(lan_val_keys?.pleaseenteryouremailid),
    address: Yup.string()
      .required(lan_val_keys?.pleaseenteryouraddress)
      .matches(addressValidation, lan_val_keys?.addressisIncorrect),
    feedback: Yup.string()
      .required(lan_val_keys?.PleaseEnteryourfeedback)
      .matches(addressValidation, lan_val_keys?.feedbackisnotcorrect),
  });
