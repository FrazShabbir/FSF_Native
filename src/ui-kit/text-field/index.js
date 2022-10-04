/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
} from 'react-native';
import {color, spacing, typography} from '../../theme';
import {Text} from '../text';
import {mergeAll, flatten} from 'ramda';
import {Loader} from '..';
import {countryCodeJson} from '../../screens/auth/countryCodeJson';
import {SearchComponent} from '../../components/SearchComponent';
import {Vertical} from '..';

// the base styling for the container
const CONTAINER = {
  height: 85,
};

// the base styling for the TextInput
const INPUT = {
  fontFamily: typography.primary,
  color: color.palette.black,
  minHeight: 56,
  // minHeight: 6,
  fontSize: 19,
  backgroundColor: color.palette.white,

  paddingLeft: 11,
  paddingRight: 40,
  flexDirection: 'row',
  flex: 1,
  paddingVertical: 0,
};

// Currently no variations
const VARIATIONS = {
  bordered: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.hairLineColor,
    borderRadius: 4,
  },
  underline: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.hairLineColor,
  },
  danger: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'red',
    borderRadius: 4,
  },
  disabled: {
    // borderWidth: StyleSheet.hairlineWidth,
    borderColor: color.palette.hairLineColor,
    borderRadius: 10,
    backgroundColor: color.palette.switchBackgroundColor,
  },
};

const LABEL = {
  marginBottom: 8,
  fontSize: 16,
  color: color.palette.black,
  lineHeight: 19,
  // marginRight: 10,
};

const ERROR = {
  borderColor: color.palette.red,
};

const RIGHT_CONTAINER = {
  height: '100%',
  aspectRatio: 0.5,
  justifyContent: 'center',
  position: 'absolute',
  right: 5,
};

const ICON = {
  width: 15,
  height: 15,
  marginLeft: 7,
};

const ERROR_CONTAINER = {
  // marginTop: 1,

  fontSize: 12,
};

const RIGHT_PADDING = {
  paddingRight: spacing[4],
};

const borderError = {
  position: 'absolute',
  bottom: -20,
};

const enhance = (style, styleOverride) => {
  return mergeAll(flatten([style, styleOverride]));
};

/**
 * A component which has a label and an input together.
 *
 * placeholder - The Placeholder text if no placeholder is provided.
 *
 * label - The label text
 *
 * style - Optional container style overrides useful for margins & padding.
 *
 * inputStyle - Optional style overrides for the input.
 *
 * variant - (bordered | underline)
 *
 * labelStyle - Optional style overrides for the label.
 *
 * errorMessage - Error message to display at the bottom of the text field
 *                This will automatically change the color of border or underline to red
 *
 * icon - Right icon on text input
 *
 * onIconPress - Callback to call on right icon
 *
 * required - This wil put red start at the label and make the field required to fill
 *
 * forwardedRef
 */
export function TextField(props) {
  const {
    placeholder,
    variant = 'bordered',
    style: styleOverride,
    inputStyle: inputStyleOverride,
    iconStyle: iconStyleOverride,
    errorStyle: errorStyleOver,
    containerStyle: containerStyleOverride,
    forwardedRef,
    errorMessage,
    onIconPress = () => {},
    icon,
    label,
    disabled,
    labelStyle: labelStyleOverride,
    required,
    loading,
    lftSymbol,
    autoCompleteOff = true,
    greenTick,
    checkVerify = false,
    v_title,
    v_press,
    v_load,
    countryCode = true,
    flagIcon,
    codeNumber,
    handleCountryCode = () => {},
    countryData,
    selectCountry = false,
    textBoxStyle,
    ...rest
  } = props;

  const [showPopUp, setShowPopUp] = useState(false);
  const [s_text, setText] = useState();
  const [filterData, setFilterData] = useState();
  let errorStyleOverride = errorMessage ? ERROR : {};

  let containerStyle = enhance(CONTAINER, containerStyleOverride);

  let inputStyle = enhance(
    {...INPUT, ...VARIATIONS[variant]},
    inputStyleOverride,
  );

  inputStyle = enhance(inputStyle, errorStyleOverride);

  let iconStyle = enhance(ICON, iconStyleOverride);

  let labelStyle = enhance(LABEL, labelStyleOverride);

  let errorStyle =
    variant === 'bordered'
      ? enhance(ERROR_CONTAINER, borderError, errorStyleOver)
      : enhance(ERROR_CONTAINER, errorStyleOver);

  let isRightPaddingRequired = icon || loading;
  const data = s_text?.length ? filterData : countryCodeJson;

  useEffect(() => {
    if (s_text) {
      const resultCommo = countryCodeJson.filter((commodityName) =>
        commodityName?.name?.en
          ?.toLowerCase()
          .includes(s_text?.trim()?.toLowerCase()),
      );
      setFilterData(resultCommo);
    }
  }, [s_text]);

  return (
    <View style={[containerStyle]}>
      {label && (
        <View style={{flexDirection: 'row'}}>
          <Text variant={'fieldLabel'} style={labelStyle} numberOfLines={1}>
            {label}
          </Text>
        </View>
      )}

      <View
        style={[
          styles.textbox,
          {
            height: textBoxStyle === true ? 42 : null,
            width: textBoxStyle === true ? 135 : null,
            flex: textBoxStyle === true ? 0 : 1,
          },
        ]}>
        {selectCountry && (
          <>
            <TouchableOpacity
              style={{
                alignSelf: 'center',
                marginRight: 19,
                flexDirection: 'row',
                alignItems: 'center',
              }}
              onPress={() => {
                setShowPopUp(true);
              }}>
              {countryCode && (
                <Text
                  style={{
                    // marginTop: 6,
                    fontSize: 20,

                    alignSelf: 'center',
                    marginRight: 9,
                    // backgroundColor:disabled?:color.palette
                  }}>
                  {countryData?.flag ?? '🇮🇳'}
                </Text>
              )}

              <Image
                style={{height: 5, width: 9}}
                source={require('../../assets/images/dropDown.png')}
              />
            </TouchableOpacity>
            <Text
              style={{
                color: '#000000',
                opacity: 0.2,
                alignSelf: 'center',
                marginRight: 15,
              }}>
              {countryData?.dial_code ?? '+91'}
            </Text>
          </>
        )}
        <View style={{flex: 1}}>
          <TextInput
            placeholder={placeholder}
            placeholderTextColor={color.palette.warmGrey}
            underlineColorAndroid={'transparent'}
            {...rest}
            editable={!disabled}
            // style={[inputStyle, !isRightPaddingRequired && RIGHT_PADDING]}
            ref={forwardedRef}
            autoCorrect={false}
            allowFontScaling={false}
            // onFocus={() => {
            //   onPress();
            // }}
            {...(autoCompleteOff && {autoCompleteType: 'off'})}
          />
        </View>
      </View>
      {checkVerify && (
        <TouchableOpacity
          style={{
            backgroundColor: color.palette.btnColor,
            borderRadius: 30,
            width: 23,
            height: 23,
            aspectRatio: 0.5,
            alignItems: 'center',
            justifyContent: 'center',
            position: 'absolute',
            right: 15,
            top: 45,
          }}
          // activeOpacity={0.8}
          hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
          onPress={onIconPress}>
          <Image
            source={require('../../assets/images/check.png')}
            style={{width: 15, height: 10, tintColor: color.palette.white}}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      )}
      {!loading ? (
        icon && (
          <TouchableOpacity
            style={RIGHT_CONTAINER}
            activeOpacity={0.8}
            hitSlop={{top: 15, left: 15, bottom: 15, right: 15}}
            onPress={onIconPress}>
            <Image source={icon} style={iconStyle} resizeMode={'contain'} />
          </TouchableOpacity>
        )
      ) : (
        <View style={RIGHT_CONTAINER}>
          <ActivityIndicator color={color.primary} size={'small'} />
        </View>
      )}
      {/* </View> */}
      {!!errorMessage && (
        <Text variant="fieldError" style={errorStyle}>
          {errorMessage.includes('server') || errorMessage.includes('undefined')
            ? null
            : errorMessage}
        </Text>
      )}
      {/* {showPopUp?? } */}
      {showPopUp ? (
        <Modal
          transparent={true}
          visible={showPopUp}
          animationType="fade"
          style={{alignSelf: 'center'}}>
          {!loading ? (
            <Pressable
              onPress={() => {
                setShowPopUp(false);
              }}
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.3)',
                flex: 1,
                justifyContent: 'center',
                // alignItems: 'center',
                // borderRadius: 5,
              }}>
              <View
                style={[
                  {
                    backgroundColor: color.palette.white,
                    marginTop: 30,
                    borderRadius: 10,
                    flex: 1,
                  },
                  styleOverride,
                  // styles.paddingPosition,
                ]}>
                <Vertical size={20} />
                <Image
                  source={require('../../assets/images/searchCancel.png')}
                  style={{
                    height: 20,
                    width: 20,
                    alignSelf: 'flex-end',
                    marginRight: 20,
                  }}
                />
                <Vertical size={20} />
                <SearchComponent
                  text={s_text}
                  setText={setText}
                  placeholder={'Search a country code'}
                  borderStyle={{borderRadius: 10, marginHorizontal: 10}}
                />
                <Vertical size={20} />
                {data?.length ? (
                  <ScrollView>
                    {data?.map((item, index) => {
                      return (
                        <TouchableOpacity
                          key={item?.flag}
                          onPress={() => {
                            handleCountryCode(item);
                            setShowPopUp(false);
                            setText(null);
                          }}>
                          <View
                            style={{
                              flexDirection: 'row',
                              marginHorizontal: 20,
                              marginVertical: 10,
                            }}>
                            <Text style={{marginRight: 20}}>{item?.flag}</Text>
                            <Text>
                              {item?.name?.en} ({item?.dial_code})
                            </Text>
                          </View>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                ) : (
                  <View style={styles.dropDownView}>
                    <Text style={styles.noRecord}>No Country Found</Text>
                  </View>
                )}
              </View>
            </Pressable>
          ) : (
            <View style={[styles.dropDownView]}>
              <Loader style={{marginTop: 20}} />
            </View>
          )}
        </Modal>
      ) : null}
    </View>
    // </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  check: {
    height: 12,
    width: 12,
    // position: 'absolute',
    // left: 110,
    // top: 5,
    marginTop: 5,
    marginLeft: 5,
  },
  verify: {
    marginLeft: 5,
    backgroundColor: color.palette.brown,
    height: 23,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 10,
  },
  v_text: {
    fontFamily: typography.secondary,
    fontSize: 12,
    lineHeight: 15.08,
    color: color.palette.white,
  },
  noRecord: {
    fontFamily: typography.primary,
    alignSelf: 'center',
    marginBottom: 20,
    color: color.palette.red,
  },
  textbox: {
    flexDirection: 'row',
    flex: 1,
    borderWidth: 1,
    borderColor: color.palette.btnColor,
    borderRadius: 5,
    paddingHorizontal: 20,
  },
});
