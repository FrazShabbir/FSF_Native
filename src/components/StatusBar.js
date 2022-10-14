import {StatusBar as TopStatusBar, View} from 'react-native';
import React from 'react';
import {globalStyles as styles, colors} from '../theme/styles';

export const StatusBar = () => {
  return (
    <View style={styles.statusBarheight}>
      <TopStatusBar
        barStyle="light-content"
        backgroundColor={colors.theme.statusBarBgDark}
        showHideTransition
      />
    </View>
  );
};

