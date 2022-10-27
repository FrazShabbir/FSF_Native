import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { color } from '../theme'
import RightArrow from '../assets/svg/rightArrow.svg'
export const NearBtn = () => {
  return (
    <LinearGradient useAngle={true}  colors={[color.palette.darkblue,color.palette.lightBlue]} style={style.container}>
      <Text style={style.text}>Nearest Office</Text>
      <View style={style.arrow_view}>
        <RightArrow  width={"100%"} height={"100%"}/>
      </View>
    </LinearGradient>
  )
}
const style=StyleSheet.create({
    container:{
        width:142,
        height:32,
        borderRadius:20,
        flexDirection:'row',
        alignItems:"center",
        justifyContent:"space-between",
        paddingLeft:12,
        paddingRight:12
    },
    text:{
      color:color.palette.white
    },
    arrow_view:{
      width:"12%"
    }
})