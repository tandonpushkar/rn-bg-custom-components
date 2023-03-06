import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import ModalSheet, {ModalSheetRefProps} from './components/ModalSheet';

const SwipeModals = () => {
  const ref = useRef<ModalSheetRefProps>(null);
  let modalDepth = 200;
  const onPress = useCallback((directionValue: string, depth: number) => {
    ref?.current?.scrollTo(depth, directionValue);
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress('bottom', -modalDepth)}>
          <Text style={styles.textButton}>Bottom Modal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress('top', modalDepth)}>
          <Text style={styles.textButton}>Top Modal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress('right', -modalDepth)}>
          <Text style={styles.textButton}>Right Modal</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onPress('left', modalDepth)}>
          <Text style={styles.textButton}>Left Modal</Text>
        </TouchableOpacity>
      </View>

      <ModalSheet depth={modalDepth} ref={ref}>
        <View style={styles.childView}>
          <Text style={styles.childHeading}>Baazi Games</Text>
          <Text style={styles.childHeading}>Common Component</Text>
          <Text style={styles.childHeading}>Swipe Me</Text>
        </View>
      </ModalSheet>
    </>
  );
};

export default SwipeModals;

const styles = StyleSheet.create({
  childHeading: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 26,
    color: '#fff',
  },
  childView: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#1565C0',
  },
  textButton: {
    fontWeight: 'bold',
    marginHorizontal: 5,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    backgroundColor: '#111',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 8,
    height: 60,
    borderRadius: 15,
    //aspectRatio: 1,
    backgroundColor: 'white',
    opacity: 0.6,
  },
});
