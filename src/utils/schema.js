import * as Yup from 'yup';



export const stepOneSchema = Yup.object({
    avatar:Yup.string().required('Required'),
    fullName: Yup.string().required('Required'),
    fatherName: Yup.string().required('Required'),
    surName: Yup.string().required('Required'),
    PassportNumber: Yup.string().required('Required'),
    europeResidenceCardNo: Yup.string().required('Required'),
    cellNumber: Yup.string().required('Required'),
    email: Yup.string().email("Required").required('Required'),

    country: Yup.string().required('Required'),

    community: Yup.string().required('Required'),

    province: Yup.string().required('Required'),

    city: Yup.string().required('Required'),
    areaStreetHouse: Yup.string().required('Required'),

    nativeCountry: Yup.string().required('Required'),

    idCardNo_native: Yup.string().required('Required'),

    completeAddress_native: Yup.string().required('Required'),
  });
  export const stepTwoSchema = Yup.object({
    first_relative_fullName: Yup.string().required('Required'),
    first_relative_relation: Yup.string().required('Required'),
    first_relative_cellNo: Yup.string().required('Required'),
    first_relative_completeAddress: Yup.string().required('Required'),

    second_relative_fullName: Yup.string().required('Required'),
    second_relative_relation: Yup.string().required('Required'),
    second_relative_cellNo: Yup.string().required('Required'),
    second_relative_completeAddress: Yup.string().required('Required'),
  });

  export const stepThreeSchma = Yup.object({
    first_relative_fullName_native: Yup.string().required('Required'),
    first_relative_relation_native: Yup.string().required('Required'),
    first_relative_cellNo_native: Yup.string().required('Required'),
    first_relative_completeAddress_native: Yup.string().required('Required'),

    second_relative_fullName_native: Yup.string().required('Required'),
    second_relative_relation_native: Yup.string().required('Required'),
    second_relative_cellNo_native: Yup.string().required('Required'),
    second_relative_completeAddress_native: Yup.string().required('Required'),
  });

 export const stepFourSchema = Yup.object({
    representive_fullName: Yup.string().required('Required'),
    representive_surName: Yup.string().required('Required'),
    representive_passportNo: Yup.string().required('Required'),
    representive_cellNo: Yup.string().required('Required'),
    representive_completeAddress: Yup.string().required('Required'),
    step4_agree: Yup.string().required('Required'),
  });

  export const stepFiveSchema = Yup.object({
    whereBurried: Yup.string().required('Required'),
    relative_involve_fund: Yup.string().required('Required'),
    pay_annually: Yup.string().required('Required'),
    signature: Yup.string().required('Required'),
    step5_agree: Yup.string().required('Required'), 
  });