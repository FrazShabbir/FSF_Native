import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import TopShape from '../../assets/HomeAssets/Svgs/topShape.svg';
import {fontWeights} from '../../theme/styles';
import {color} from '../../theme';
import Notify from '../../assets/HomeAssets/Svgs/notify.svg';
import GreenDot from '../../assets/HomeAssets/Svgs/notifyDot.svg';
import BackBtn from '../../assets/svg/back.svg'
import { useNavigation } from '@react-navigation/native';
import { RoutNames } from '../../navigation/routeNames';
export const HomeComponent = ({
  backIcon,
  title
}) => {
  const navigate=useNavigation()
  return (
    <View style={style.container}>
      <View>
        <View style={style.shape_view}>
          <TopShape width={'100%'} height={'100%'} />
        </View>
        <TouchableOpacity style={style.noti_container} onPress={()=>navigate.navigate(RoutNames.AnnouncementScreen)}>
          <Notify />
          <View style={style.dot_view}>
            <GreenDot />
          </View>
        </TouchableOpacity>
      </View>
      <View style={style.title_view}>
        <Text style={style.title}>{title}</Text>
      </View>
      {backIcon?(<TouchableOpacity style={style.back_btn_view} onPress={()=>navigate.goBack()}>
        <BackBtn width="100%" />
      </TouchableOpacity>):null}
      
    </View>
  );
};
const style = StyleSheet.create({
  container: {
    flex: 0.16,
    flexDirection: 'row',
  },
  shape_view: {
    alignSelf: 'flex-start',
    width: Dimensions.get('window').width,
  },
  title_view: {
    position: 'absolute',
    alignSelf: 'flex-end',
    left: '10%',
    bottom: '15%',
  },
  title: {
    fontSize: 28,
    fontWeight: fontWeights.extraBold,
    color: color.palette.black,
  },
  noti_container: {
    position: 'absolute',
    alignSelf: 'flex-end',
    padding: 4,
    top: 20,
    right: 30,
  },
  dot_view: {
    position: 'absolute',
    alignSelf: 'flex-end',
  },
  back_btn_view: {
    width:"15%",
    position:'absolute',
    marginTop:15,
    marginLeft:0,
    padding:8
  },
});
