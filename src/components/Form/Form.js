import { View, Text ,StyleSheet} from 'react-native'
import React from 'react'
import { Formik } from 'formik'
import { ScrollView } from 'react-native-gesture-handler';
import { TextField } from '../../ui-kit';
export const Form = () => {
  return (
    <Formik
    
    >
    {()=>(
        <ScrollView style={style.form_container}>
        </ScrollView>
    )

    }
    </Formik>
  );
}
const style=StyleSheet.create({
    form_container:{
        flex:1,
        borderWidth:1,
        alignSelf:"center",
        width:"80%",
    }
})
