import {SafeAreaView} from 'react-native';
import React from 'react';
import {RootNavigation} from './src/navigation';
import {globalStyles as styles} from './src/theme/styles';
import {StatusBar} from './src/components';

const App = () => {
  return (
    <SafeAreaView style={styles.fillAll}>
      <StatusBar />
      <RootNavigation />
    </SafeAreaView>
  );
};

export default App;
