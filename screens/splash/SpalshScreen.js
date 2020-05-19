import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

export default class SplashScreen extends React.Component {
    render(){
        return (
            <View style={styles.container}>
              <ImageBackground source={require('../../assets/images/splash.png')}
                  style={{ width: '100%', height: '100%' }}>
              </ImageBackground>
          </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
    }
  });