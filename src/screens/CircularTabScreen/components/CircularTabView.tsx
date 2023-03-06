import {
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import {commonStyles} from '../../../styles';
import {generateNewTabData, TabData} from '../../../utils';

const width = Dimensions.get('window').width;

const CircularTabView = ({isLoopEnabled = true, tabButtonAnimation = true}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(TabData);
  const flatListRef = useRef<any>();
  const arrayData = isLoopEnabled
    ? [data[data.length - 1], ...data, data[0]]
    : [...data];
  useEffect(() => {
    isLoopEnabled && goToPage(currentPage, false);
  }, []);
  useEffect(() => {
    if (isLoopEnabled) {
      if (currentPage === data.length + 1) {
        goToPage(1, false);
        setCurrentPage(1);
      }
      if (currentPage === 0) {
        goToPage(data.length, false);
        setCurrentPage(data.length);
      }
    }
  }, [currentPage]);

  const goToPage = (page: number, isAnimated: boolean = false) => {
    flatListRef?.current?.scrollToIndex({index: page, animated: isAnimated});
  };

  const onScrollEnd = (e: any) => {
    const {contentOffset} = e.nativeEvent;
    // Divide the horizontal offset by the width of the view to see which page is visible
    const pageNum = Math.floor(contentOffset.x / width);
    isLoopEnabled ? setCurrentPage(pageNum) : setCurrentPage(pageNum + 1);
  };

  const onPressAddTab = () => {
    let newData: any = generateNewTabData(data.length + 1);
    setData((prevProps: any) => [...prevProps, ...newData]);
  };

  const removeButton = () => {
    let filteredData: any = [...data];
    filteredData.pop(); //
    setData(filteredData);
  };

  const renderPage = ({item, index}: any) => {
    return (
      <View
        key={index?.toString()}
        style={[styles.tabContainer, {backgroundColor: item?.bgColor}]}>
        <Text style={styles.tabText}>Screen {item?.screenId}</Text>
        <TouchableOpacity
          onPress={removeButton}
          style={[
            commonStyles.buttonStyle,
            {marginTop: 16, backgroundColor: '#fff'},
          ]}>
          <Text style={commonStyles.textStyle}>Remove Tab</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const onPressTabButton = (index: number) => {
    isLoopEnabled
      ? goToPage(index, tabButtonAnimation)
      : goToPage(index - 1, tabButtonAnimation);

    setCurrentPage(index);
  };

  return (
    <View>
      <View style={styles.headerStyle}>
        <TouchableOpacity
          onPress={onPressAddTab}
          style={[
            commonStyles.buttonStyle,
            {alignSelf: 'center', backgroundColor: '#C8E6C9'},
          ]}>
          <Text style={commonStyles.textStyle}>Add New Tab</Text>
        </TouchableOpacity>

        <View>
          <ScrollView showsHorizontalScrollIndicator={false} horizontal>
            {data?.map((item: {}, index: number) => {
              return (
                <TouchableOpacity
                  onPress={() => onPressTabButton(index + 1)}
                  key={index?.toString()}
                  style={[
                    commonStyles.buttonStyle,
                    {
                      backgroundColor: '#B39DDB',
                      borderWidth: currentPage === index + 1 ? 2 : 0,
                      borderColor: '#7B1FA2',
                    },
                  ]}>
                  <Text style={commonStyles.textStyle}>Tab {index + 1}</Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </View>
      <FlatList
        bounces={false}
        bouncesZoom={false}
        decelerationRate={'fast'}
        style={{height: '80%'}}
        onMomentumScrollEnd={onScrollEnd}
        ref={flatListRef}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        horizontal
        data={arrayData}
        getItemLayout={(_, index) => ({
          length: width,
          offset: width * index, //  ( WIDTH + (MARGIN_HORIZONTAL*2) ) * (index)
          index,
        })}
        renderItem={renderPage}
      />
    </View>
  );
};

// [0,1,2]

export default CircularTabView;

const styles = StyleSheet.create({
  tabText: {
    fontSize: 44,
    fontWeight: '500',
    color: '#fff',
  },
  tabContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
    height: '100%',
  },
  headerStyle: {
    height: '20%',
    justifyContent: 'space-evenly',
  },
});
