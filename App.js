import React from 'react';
import AppNavigator from './AppNavigator';
import { enableScreens } from 'react-native-screens';
import { checkFirstLogin, createDataBase } from "./database/index.js";
import { updateFirstTimeLogin, updatePersistenceKey } from './actions/app.js';
import { AppState } from "react-native";
import { connect } from 'react-redux';

enableScreens();

class App extends React.Component {
  constructor(props) {
    super(props);

  }

  state = {
    appState: AppState.currentState
  }

  componentDidMount = async () => {
    AppState.addEventListener('change', this.handleAppStateChange);
    checkFirstLogin().then(response => {
      if (response === true) {
        this.props.updateFirstTimeLogin(true);
        createDataBase().then(responseData => {
          console.log(responseData);
        });
      }
    });
  }

  handleAppStateChange = async (nextAppState) => {
    if (nextAppState != 'active' || nextAppState != 'background' || nextAppState != 'foreground') {
      await this.props.updatePersistenceKey(null);
    }
  }

  render() {

    var props = this.props;
    const persistNavigationState = async (navState) => {
      try {
        this.props.updatePersistenceKey(navState);
      } catch(err) {
        console.log(err);
      }
    }
    const loadNavigationState = async () => {
      let state = this.props.store.getState();
      return state.AppReducer.persistenceKey;
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

const mapStateToProps = state => {
  return { 
    firstTimeLogin: state.firstTimeLogin,
    persistenceKey: state.persistenceKey
   }
};

const mapDispatchToProps = (dispatch) => {
  return {
    updatePersistenceKey: key => dispatch(updatePersistenceKey(key)),
    updateFirstTimeLogin: key => dispatch(updateFirstTimeLogin(key))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App)