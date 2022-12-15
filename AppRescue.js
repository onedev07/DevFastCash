/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';

import {View, SafeAreaView, StyleSheet, Text} from 'react-native';
// import {createAppContainer} from 'react-navigation';
import {Dimension} from 'react-native';
//import { createDrawerNavigator } from '@react-navigation/drawer';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Feather} from '@expo/vector-icons';

import Navigation from './src/navigation';
import Home from './src/screens/HomeScreen';



const App = () => {
    return (
        <SafeAreaView style = { styles.container }>
            <Navigation />            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: '#F9FBFC'
    },


    /* sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    }, */
});

export default App;