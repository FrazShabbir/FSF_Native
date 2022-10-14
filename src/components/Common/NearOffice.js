import { View, Text, StyleSheet,TouchableOpacity } from 'react-native'
import React,{useRef,useEffect} from 'react'
import { fontWeights } from '../../theme/styles'
import { color } from '../../theme'
import RBSheet from 'react-native-raw-bottom-sheet'

import Cross from '../../assets/HomeAssets/Svgs/circularArrow.svg'
import Profile from '../../assets/HomeAssets/Svgs/circularArrow.svg'
import User from '../../assets/HomeAssets/Svgs/circularArrow.svg'
import Email from '../../assets/HomeAssets/Svgs/circularArrow.svg'
import LinearGradient from 'react-native-linear-gradient'
import WhiteTick from '../../assets/HomeAssets/Svgs/circularArrow.svg'




export const NearOffice = ({
    open
}) => {
    useEffect(() => {
       { open?()=>refRBSheet.current.open():null}
    }, [open])
    

    const refRBSheet = useRef();
  return (

    <RBSheet
    ref={refRBSheet}
    closeOnDragDown={false}
    openDuration={500}
    closeOnPressMask={false}
    animationType={'slide'}
    customStyles={{
      wrapper: {
        backgroundColor:'rgba(0,0,0,0.6)',
      },
      draggableIcon: {
        backgroundColor: 'white',
      },
      container: {
        borderTopRightRadius: 50,
        borderTopLeftRadius: 50,
        
        height: '60%',
      },
    }}>
        
    <View style={style.sheet_container}>
      <View style={[style.edit_container, {}]}>
        <Text style={style.personal_text}> Edit Personal Information</Text>
        <TouchableOpacity
          style={[style.edit_icon_view, {}]}
          onPress={() => refRBSheet.current.close()}>
          <Cross width={'100%'} height={'100%'} />
        </TouchableOpacity>
      </View>
      <View style={[style.profile_container, {height: '35%'}]}>
        <View style={style.profile}>
          <Profile width={'100%'} height={'100%'} />
        </View>
      </View>
      <View style={[style.textInput_container, {height: '35%'}]}>
        <View style={style.text_view}>
          <Text style={style.info_text}>Muhammad Ali Asghar</Text>
          <View style={style.input_icon}>
            <User width={'100%'} height={'100%'} />
          </View>
        </View>
        <View style={style.text_view}>
          <Text style={style.info_text}>Dummy@gmail.com</Text>
          <View style={style.input_icon}>
            <Email width={'100%'} height={'100%'} />
          </View>
        </View>
        <View style={style.text_view}>
          <Text style={style.info_text}>0300153100534</Text>
          <View style={style.input_icon}>
            <User width={'100%'} height={'100%'} />
          </View>
        </View>
      </View>
      <View style={[style.log_btn_view,{width:"80%",alignSelf:'center'}]}>
        <LinearGradient
          useAngle={true}
          colors={[color.palette.darkblue, color.palette.lightBlue]}
          style={style.power_container}>
          <View style={style.powerIcon_view}>
            <WhiteTick width={'100%'} height={'100%'} />
          </View>
          <Text style={style.text}>Update</Text>
        </LinearGradient>
      </View>
    </View>
  </RBSheet>
  )
}
const style=StyleSheet.create({
    sheet_container: {
        top:"3%",
        flex: 1,
      },
      office_container: {
        alignSelf: 'center',
        width: '80%',
        flex: 1,
      },
      office_heading_view: {
        height: '15%',
      },
      office_heading_text: {
        fontWeight: fontWeights.extraBold,
        color: color.palette.black,
        fontSize: 16,
      },
      office_info_view: {
        height: '65%',
      },
      info_view: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        flexGrow: 1,
      },
      office_text: {
        color: color.palette.black,
      },
    
      log_btn_view: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
      },
      power_container: {
        width: '30%',
        height: 32,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 12,
        paddingRight: 12,
      },
      text: {
        color: color.palette.white,
      },
      powerIcon_view: {
        width: '20%',
      },
      edit_container: {
        height: '7%',
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '80%',
        alignSelf: 'center',
        justifyContent: 'space-between',
      },
})
