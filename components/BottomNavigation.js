import React from 'react';
import { StyleSheet } from 'react-native';
import { BottomNavigation, BottomNavigationTab, Text } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';

export const BottomNavigator = (props, user) => { 

  let STATE = props.navigator.screenProps.store.getState();
  let myuser = STATE.UserReducer.user;
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  React.useEffect(() => {
    setSelectedIndex(1)
  });

  const changeScreen = (screen) => {
    if (screen === 0) {
      props.navigator.navigation.navigate('DrawerShowcase');
    } else if (screen === 2) { 
      props.navigator.navigation.navigate('AddTaskScreen');
    }
  }
  
  return (
    <BottomNavigation
        selectedIndex={selectedIndex}
        onSelect={index => {setSelectedIndex(index); changeScreen(index)}}
        indicatorStyle={{backgroundColor: "#922c88"}} 
    >
      <BottomNavigationTab 
        title={<Text style={{color: "#ffffff", backgroundColor: "#922c88"}}>
          <Icon name="bars" color="#FFFFFF" size={14} /> MENU
          </Text>} style={{backgroundColor: "#922c88"}} />
      <BottomNavigationTab title={<Text style={{color: "#ffffff", backgroundColor: "#922c88"}}>
          <Icon name="search" color="#FFFFFF" size={14} /> TASK
          </Text>} style={{backgroundColor: "#922c88"}} />
      {myuser.role === 2 && <BottomNavigationTab title={<Text style={{color: "#ffffff", backgroundColor: "#922c88"}}>
          <Icon name="plus" color="#FFFFFF" size={14} /> ADD
          </Text>} style={{backgroundColor: "#922c88"}} />}
    </BottomNavigation>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 32,
    height: 32,
  },
});


