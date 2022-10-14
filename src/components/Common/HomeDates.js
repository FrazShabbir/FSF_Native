import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import { color } from '../../theme'

export const HomeDates = () => {
  return (
    <View style={style.constainer}>
      <Text style={style.date}>Registration Date:10-January-22</Text>
      <Text style={style.date}>Expire Date:10-january-2022</Text>
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
        fontSize:9,
        color:color.palette.black,

    }
})
