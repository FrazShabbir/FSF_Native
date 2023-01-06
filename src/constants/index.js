import {Platform, StatusBar, useColorScheme} from 'react-native';
import {selectStyle} from '../theme/styles';

export const STATUSBAR_HEIGHT =
  Platform.OS === 'ios'
    ? selectStyle({iphoneX: 44, default: 20})
    : StatusBar.currentHeight;

export const isDarkMode = useColorScheme() === 'dark';

export const baseUrl=""
