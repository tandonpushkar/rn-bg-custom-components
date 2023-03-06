// RootNavigation.js

import * as React from 'react';

export const routeNameRef: any = React.createRef();

export const isReadyRef: any = React.createRef();

export const navigationRef: any = React.createRef();

export function navigate(name: any, params: any) {
  if (isReadyRef.current && navigationRef.current) {
    // Perform navigation if the app has mounted
    navigationRef.current.navigate(name, params);
  } else {
    // You can decide what to do if the app hasn't mounted
    // You can ignore this, or add these actions to a queue you can call later
  }
}
