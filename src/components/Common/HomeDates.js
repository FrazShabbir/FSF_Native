import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { color, typography } from '../../theme'
import { useSelector } from 'react-redux'

export const HomeDates = () => {
  const {HomeStats}=useSelector((state)=>state.UserReducer)
  const FormatDate=(date)=>{
    
   const year= date.slice(0,4);
   const mon=date.slice(5,7);
   const day=date.slice(8,10)
   return day+"-"+mon+"-"+year;
  }
  return (
    <View style={style.constainer}>
      <Text style={style.date}>Registration Date: {FormatDate(HomeStats.regDate)}</Text>
      <Text style={style.date}>Expire Date: {FormatDate(HomeStats.expDate)}</Text>
    </View>
  )
}
const style=StyleSheet.create({
    constainer:{
        flex:0.02,
        width:'80%',
        alignSelf:'center',
        flexDirection:"row",
        justifyContent:"space-between",
        
    },
    date:{
        fontSize:10,
        color:color.palette.black,
        fontFamily:typography.medium

    }
})
