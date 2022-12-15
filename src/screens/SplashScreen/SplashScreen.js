
import * as React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';


import Navigation from '../../navigation';


import { AuthContext } from './src/components/AuthContext';

const SplashScreen = () => {

  return (

    <View style={styles.root}>

      
        <ActivityIndicator size="large" color="#FFFFFF" />
     
        
    </View>


    
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent:'center',
    backgroundColor:'blue'
  },
  
});

export default SplashScreen;
