import {Dimensions, StyleSheet, Text, View} from 'react-native';
import React, {useImperativeHandle, useState} from 'react';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get('window');

type ModalSheetProps = {
  depth?: number;
  direction?: string;
  children?: React.ReactNode;
};

export type ModalSheetRefProps = {
  scrollTo: (destination: number, directionValue: string) => void;
};

const directionConfig = (depth: number, direction: string) => {
  switch (direction) {
    case 'top':
      return {
        width: '100%',
        height: depth,
        bottom: SCREEN_HEIGHT - 80, // for margin
      };
    case 'bottom':
      return {
        width: '100%',
        height: depth,
        top: SCREEN_HEIGHT - 80, // for margin
      };
    case 'left':
      return {
        width: depth,
        height: '100%',
        left: -Math.abs(depth),
      };
    case 'right':
      return {
        width: depth,
        height: '100%',
        right: -Math.abs(depth),
      };
    default:
      return {
        bottom: SCREEN_HEIGHT,
      };
  }
};

const ModalSheet = React.forwardRef<ModalSheetRefProps, ModalSheetProps>(
  ({depth = 200, children}, ref) => {
    const [direction, setDirection] = useState('bottom');
    let isX = direction == 'top' || direction == 'bottom' ? false : true;
    const translateY = useSharedValue(0);
    const translateX = useSharedValue(0);

    const scrollTo = (destination: number, directionValue: string) => {
      'worklet';
      setDirection(directionValue);
      let isXf =
        directionValue == 'top' || directionValue == 'bottom' ? false : true;
      if (isXf) {
        translateX.value = withSpring(destination, {damping: 50});
      } else {
        translateY.value = withSpring(destination, {damping: 50});
      }
    };

    useImperativeHandle(ref, () => ({scrollTo}), [scrollTo]);

    const rModalSheetStyleX = useAnimatedStyle(() => {
      return {
        transform: [{translateX: translateX.value}],
      };
    });
    const rModalSheetStyleY = useAnimatedStyle(() => {
      return {
        transform: [{translateY: translateY.value}],
      };
    });

    const handleGesture = (evt: any) => {
      scrollTo(0, direction);
    };

    return (
      <PanGestureHandler onGestureEvent={handleGesture}>
        <Animated.View
          style={[
            styles.modalSheetContainer,
            directionConfig(depth, direction),
            isX ? rModalSheetStyleX : rModalSheetStyleY,
          ]}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    );
  },
);

const styles = StyleSheet.create({
  modalSheetContainer: {
    backgroundColor: 'white',
    position: 'absolute',
    borderRadius: 25,
  },
});

export default ModalSheet;
