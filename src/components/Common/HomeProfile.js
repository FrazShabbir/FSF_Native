import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import Profile from '../../assets/HomeAssets/Svgs/profilePhoto.svg';
import RightArrow from '../../assets/HomeAssets/Svgs/rightArrow.svg';
import {fontWeights} from '../../theme/styles';
import {color, typography} from '../../theme';
import {useNavigation} from '@react-navigation/native';
import {RoutNames} from '../../navigation/routeNames';
import {useSelector} from 'react-redux';
import PlusIcon from '../../assets/HomeAssets/plusicon.svg';


export const HomeProfile = ({app}) => {
  const {user} = useSelector(state => state.UserReducer);
  const navigate = useNavigation();
  return (
    <View style={style.container}>
      <View style={{flexDirection: 'row'}}>
        <View style={style.profile_view}>
          <Image
            style={{width: '100%', height: '100%', borderRadius: 50}}
            source={{uri: user.avatar}}
          />
        </View>
        <TouchableOpacity
          style={style.name_container}
          onPress={() => navigate.navigate(RoutNames.SettingScreen)}>
          <View style={style.name_view}>
            <Text style={style.name}>{user.full_name}</Text>
          </View>
          <View style={style.arrow_container}>
            <Text style={style.profile_text}>Profile</Text>
            <View style={style.arrow_view}>
              <RightArrow width={12} height={15} />
            </View>
          </View>
        </TouchableOpacity>
      </View>
      {app==0?(null):<TouchableOpacity
      onPress={()=>navigate.navigate(RoutNames.EnrolAgreement)}
      style={{left:10,paddingLeft:10,paddingRight:10,borderRadius:13,flexDirection:"row",backgroundColor:color.palette.darkblue,alignItems:"center",padding:5}}>
        <View style={{width:10,height:10,marginRight:3}}>
          <PlusIcon width={"100%"} height={"100%"} />
        </View>
        <Text style={{color:"white",fontSize:13,fontFamily:typography.Regular}}>Application</Text>
      </TouchableOpacity>}
      
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 0.08,
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    alignSelf: 'center',
    justifyContent:"space-between",
   
  },
  profile_view: {
    width: 65,
    height: 65,
    
  },
  name_container: {
    flexDirection: 'column',
    marginLeft: 5,
    justifyContent: 'center',
  },
  name_view: {},
  name: {
    fontSize: 18,
    color: color.palette.black,
    fontFamily:typography.demi
    
  },
  arrow_container: {
    flexDirection: 'row',
    alignItems: 'center',
    bottom: 3,
  },
  profile_text: {
    
    fontSize: 14,
    textAlign: 'center',
    color: color.palette.black,
    fontFamily:typography.Regular,
    
  },
  arrow_view: {
    left: 5,
  },
});
