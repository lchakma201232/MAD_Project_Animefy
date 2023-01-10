import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const Loader = ({ loading }) => {
  if (!loading) {
    return null;
  }
  
  return (
    <View style={styles.loaderContainer}>
      <ActivityIndicator size="large" color="#0ffff" />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.75)',
    zIndex: 1,
  },
});

export default Loader;
