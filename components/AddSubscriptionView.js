import React from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import PaymentFormView from './PaymentFormView.js';
import { colors, wp } from "../screens/introduction/slider/styles/index.style.js";
import { Block, Text, Input, Button } from 'galio-framework';
import CardInformation from "./CardInformation.js";

const StatusHeight = StatusBar.currentHeight;
export default class AddSubscriptionView extends React.Component {
  render() {
    var { userRole } = this.props;
    return (
        <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
            <Block style={{marginTop: StatusHeight, marginHorizontal: wp(5), height: "100%"}}>
                <ScrollView style={{marginTop: "10%", height: "auto"}} ref={ref => (this.scrollViewRef = ref)}>
                    <Block style={{alignItems: "center"}}>
                        {userRole == 2 ? <Text style={{fontSize: 25, color: colors.mainColor}}>Add amount to wallet</Text>
                        :
                        <Text style={{fontSize: 25, color: colors.mainColor}}>Add card details</Text>}
                    </Block>
                    
                    <Block style={styles.textWrapper}>
                        {userRole == 2 && <Text style={styles.infoText}>
                            You can add $10 per transaction
                        </Text>}
                    </Block>
                    
                    <Block style={{marginTop: "10%"}}>
                    {userRole == 2 ? <PaymentFormView {...this.props}/>
                    :
                      <CardInformation />
                    }
                    </Block>
                </ScrollView>
                
                {userRole == 2 && <KeyboardSpacer
                    onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }),0)} }
                />}
            </Block>
        </Block>
      
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1
  },
  textWrapper: {
    margin: 10
  },
  infoText: {
    fontSize: 18,
    textAlign: 'center'
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10
  }
});