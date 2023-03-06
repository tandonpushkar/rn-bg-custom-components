import React, {useEffect, useRef, useState} from 'react';
import CircularTabView from './components/CircularTabView';

const CircularTabScreen = () => {
  return <CircularTabView isLoopEnabled={true} tabButtonAnimation={true} />;
};

export default CircularTabScreen;
