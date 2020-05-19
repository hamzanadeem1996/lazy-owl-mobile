import React from 'react';
import AppNavigator from './AppNavigator';
import { enableScreens } from 'react-native-screens';
import { checkFirstLogin, createDataBase } from "./database/index.js";
import { updateFirstTimeLogin } from './actions/user.js';
import AsyncStorage from '@react-native-community/async-storage';
import { AppState } from "react-native";

enableScreens();

export default class App extends React.Component {
  constructor(props) {
    super(props);

  }

  state = {
    appState: AppState.currentState
  }

  componentWillUnmount = () => {
    AppState.removeEventListener('change', this.handleAppStateChange);
  }

  componentDidMount = async () => {
    AppState.addEventListener('change', this.handleAppStateChange);
    checkFirstLogin().then(response => {
      if (response === true) {
        this.props.store.dispatch(
          updateFirstTimeLogin(true)
        );
        createDataBase().then(responseData => {
          console.log(responseData);
        });
      }
    });
  }

  handleAppStateChange = async (nextAppState) => {
    if (nextAppState != 'active') {
      await AsyncStorage.clear()
    }
  }

  render() {

    var props = this.props;
    const persistenceKey = "persistenceKey";
    const persistNavigationState = async (navState) => {
      try {
        await AsyncStorage.setItem(persistenceKey, JSON.stringify(navState))
      } catch(err) {
        
      }
    }
    const loadNavigationState = async () => {
      const jsonString = await AsyncStorage.getItem(persistenceKey)
      return JSON.parse(jsonString)
    }
    
    return (
      <AppNavigator 
        persistNavigationState={persistNavigationState} 
        loadNavigationState={loadNavigationState}
        screenProps={props}
      />
    );
  }
}