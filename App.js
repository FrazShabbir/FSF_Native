import {SafeAreaView, View} from 'react-native';
import React from 'react';
import {RootNavigator} from './src/navigation';
import {globalStyles as styles} from './src/theme/styles';
import {StatusBar} from './src/components';
import {PersistStore, Store} from './src/Reduxs/Store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import FlashMessage from "react-native-flash-message";


const App = () => {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={PersistStore}>
        <SafeAreaView style={styles.fillAll}>
          <StatusBar />
          <View style={{flex:1}}>
          <RootNavigator />
          <FlashMessage floating position="top" />
          </View>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
};

export default App;
