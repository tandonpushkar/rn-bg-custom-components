import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {screenOption} from './constants/options';
import {Platform, StyleSheet, View} from 'react-native';

import {ScreenNames} from './constants/ScreenNames';
import Home from '../../screens/Home';
import SwipeModals from '../../screens/SwipeModals';
import CircularTabScreen from '../../screens/CircularTabScreen';
const Stack = createNativeStackNavigator();

export const MainStack = () => {
  return (
    <Stack.Navigator
      initialRouteName={ScreenNames.HOME}
      screenOptions={screenOption}>
      <Stack.Screen name={ScreenNames.HOME} component={Home} />
      <Stack.Screen
        name={ScreenNames.CIRCULAR_TAB}
        component={CircularTabScreen}
      />
      <Stack.Screen name={ScreenNames.SWIPE_MODALS} component={SwipeModals} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({});
