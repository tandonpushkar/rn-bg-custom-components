import React from 'react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaView} from 'react-native-safe-area-context';
import Navigator from './navigation/Navigator';

const App = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <Navigator />
    </GestureHandlerRootView>
  );
};

export default App;
