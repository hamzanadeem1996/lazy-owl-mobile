import React from 'react';
import { StatusBar, Image, BackHandler } from 'react-native';
import { DrawerItem, IndexPath, ApplicationProvider, Drawer } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Block, Text } from 'galio-framework';
import { colors, wp } from '../screens/introduction/slider/styles/index.style.js';

var STATE = null;
const StatusHeight = StatusBar.currentHeight;
const Header = (props) => {
  return(
    <Block style={{marginTop: 0, backgroundColor: colors.mainColor}}>
      <Block style={{display: "flex", flexDirection: "row", paddingVertical: "2%"}}>
        <Block style={{marginHorizontal: wp(3), height: "auto", display: "flex", width: "30%"}}>
          <Image 
            source={{ uri: `${STATE.UserReducer.user.profile_image_url}` }} 
            style={{width: 100, height: 100, borderRadius: 400/ 2}} 
          />
        </Block>
        <Block style={{display: "flex", width: "70%"}}>
          <Text color="#FFFFFF" size={20} style={{paddingVertical: "5%"}}>{STATE.UserReducer.user.name} </Text>
            <Text color="#FFFFFF" size={30}>${STATE.UserReducer.user.wallet_amount}</Text>
        </Block>
      </Block>
    </Block>
  );
};
const Footer = () => (
  
  <Block style={{backgroundColor: "#FFFFFF"}}>
    <Block style={{paddingVertical: "10%", marginHorizontal: wp(5)}}>
      <Text color={colors.mainColor} size={20} onPress={() => BackHandler.exitApp()}>
        <Icon name="arrow-right" size={20} /> Logout
      </Text>
    </Block>
  </Block>
);

export const DrawerShowcase = (props) => { 
    STATE = props.screenProps.store.getState();
    const myUser = STATE.UserReducer.user;
    const [User, updateUser] = React.useState(STATE.UserReducer.user);
    const [selectedIndexDrawer, setSelectedIndexDrawer] = React.useState(new IndexPath(null));

    React.useEffect(() => {
      let myState = props.screenProps.store.getState();
      updateUser(myState.UserReducer.user);
    })

    const renderScreen = (index) => {
      
      if (index.row === 0) {
        props.navigation.navigate('ProfileScreen');
      } else if (index.row === 1) {
        props.navigation.navigate('EducationScreen');
      } else if (index.row === 2) {
        props.navigation.navigate('ServiceScreen');
      } else if (index.row === 3) {
        props.navigation.navigate('PaymentMethodsScreen');
      } else if (index.row === 4) {
        props.navigation.navigate('TransactionsScreen');
      } else if (index.row === 5) {
        props.navigation.navigate('MyTasksScreen');
      } else if (index.row === 6) {
        props.navigation.navigate('ChangePasswordScreen');
      }
    }

    return (
        <ApplicationProvider {...eva} theme={eva.light}>
            <Drawer
                header={Header}
                footer={Footer}
                selectedIndex={selectedIndexDrawer}
                onSelect={index => {setSelectedIndexDrawer(index); renderScreen(index);}}>
                <DrawerItem title='Profile'/>
                <DrawerItem title='Education and Portfolio'/>
                {myUser.role === 3 && <DrawerItem title='Services'/>}
                <DrawerItem title='Payment Methods'/>
                {myUser.role === 2 && <DrawerItem title='Transactions'/>}
                <DrawerItem title='My tasks' />
                {/* <DrawerItem title='Change Password'/> */}
            </Drawer>
        </ApplicationProvider>

    );
  };