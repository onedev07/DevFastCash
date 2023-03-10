/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


//import 'react-native-gesture-handler';
import * as React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';


import Navigation from './src/navigation';


const App = () => {

  return (

    
    <SafeAreaView style={styles.root} >      
      
      <Navigation />      
          
    </SafeAreaView>
    

    
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  
});

export default App;
