import {NavigationContainer} from '@react-navigation/native';
import React from 'react';

import {navigationRef, routeNameRef} from './RootNavigation';
import {MainStack} from './Routes';

const Navigator = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <MainStack />
    </NavigationContainer>
  );
};

export default Navigator;
