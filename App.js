import {SafeAreaView} from 'react-native';
import React from 'react';
import {RootNavigator} from './src/navigation';
import {globalStyles as styles} from './src/theme/styles';
import {StatusBar} from './src/components';
import { Store } from './src/Reduxs/Store';
import { Provider } from 'react-redux';
const App = () => {
  return (
    <Provider store={Store}>
    <SafeAreaView style={styles.fillAll}>
      <StatusBar />
      <RootNavigator />
    </SafeAreaView>
    </Provider>
  );
};

export default App;

