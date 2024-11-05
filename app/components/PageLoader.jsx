import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const PageLoader = () => {

  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color="purple" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default PageLoader;