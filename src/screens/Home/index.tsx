import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {ScreenNames} from '../../root/navigation/constants/ScreenNames';
import {commonStyles} from '../../styles';

const Home = ({navigation}: any) => {
  return (
    <SafeAreaView>
      <View style={styles.container}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.CIRCULAR_TAB)}
          style={[commonStyles.buttonStyle, {backgroundColor: '#F8BBD0'}]}>
          <Text style={commonStyles.textStyle}>Circular Tab View</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate(ScreenNames.SWIPE_MODALS)}
          style={[commonStyles.buttonStyle, {backgroundColor: '#B2EBF2'}]}>
          <Text style={commonStyles.textStyle}>Swipe Modals</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    height: '60%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});
