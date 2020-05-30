import React from 'react';
import { StyleSheet, ScrollView, StatusBar, ActivityIndicator } from 'react-native';
import PaymentFormView from './PaymentFormView.js';
import { colors, wp } from "../screens/introduction/slider/styles/index.style.js";
import { Block, Text, Input, Button } from 'galio-framework';
import CardInformation from "./CardInformation.js";
import stripe from 'tipsi-stripe';
import * as services from "../services/UserServices.js";
import Modal from 'react-native-modal';
import { updateUser } from '../actions/user.js';

stripe.setOptions({
  publishableKey: 'pk_test_gbAS4IqAqtTmlYAX8vpTNmoa00KUFn3qko',
});

const StatusHeight = StatusBar.currentHeight;

export default class AddSubscriptionView extends React.Component {

  constructor(props){
    super();
    this.state = {
      showLoader: false,
    }
  }

  componentDidMount = async () => {
    if (this.props.userRole == 2) {
      let state = this.props.screenProps.store.getState();
      let user = state.UserReducer.user;
      const options = {
        requiredBillingAddressFields: 'full',
        prefilledInformation: {
          billingAddress: {
            email: user.email,
            name: user.name,
            line1: user.address ? user.address : 'Canary Place',
            line2: user.address ? user.address : '3',
            city: user.city ? user.city :'Macon',
            state: user.city ? user.city :'Georgia',
            country: 'PAK',
            postalCode: '54000',
          },
        },
      }
      return stripe
      .paymentRequestWithCardForm(options)
      .then(stripeTokenInfo => {
        console.warn('Token created', { stripeTokenInfo });
        this.setState({showLoader: true});
        return this.doPayment(stripeTokenInfo.tokenId);
      })
      .catch(error => {
        console.warn('Payment failed', { error });
        this.props.navigation.navigate('DrawerShowcase')
      });
    }
    
  }

  doPayment = (tokenId) => {

    let state = this.props.screenProps.store.getState();
    let user = state.UserReducer.user;

    let data = {
      user_id: user.id,
      token: user.token,
      stripeToken: tokenId
    }

    services.chargeUserPayment(data).then(async response => {
      if (response.status === 200) {
        user['wallet_amount'] = parseInt(user['wallet_amount']) + 10;
        let test = await this.props.screenProps.store.dispatch(
          updateUser(user)
        );
        this.setState({showLoader: false});
        this.props.navigation.navigate('DrawerShowcase')
      }
      
    });
  }

  render() {
    
    var { userRole } = this.props;
    let { showLoader } = this.state;
    return (
        <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
          <Modal 
            isVisible={showLoader}
            animationInTiming={10}
            animationOutTiming={10}
            backdropTransitionOutTiming={10}
            coverScreen={true}
            scrollHorizontal={true}
            useNativeDriver={true}
          >
              {showLoader && <ActivityIndicator size="large" color={colors.mainColor} />}
          </Modal>
            <Block style={{marginTop: StatusHeight, marginHorizontal: wp(5), height: "100%"}}>
                <ScrollView style={{marginTop: "10%", height: "auto"}} ref={ref => (this.scrollViewRef = ref)}>
                    <Block style={{alignItems: "center"}}>
                        {/* {userRole == 2 ? <Text style={{fontSize: 25, color: colors.mainColor}}>Add amount to wallet</Text>
                        :
                        <Text style={{fontSize: 25, color: colors.mainColor}}>Add card details</Text>} */}
                        {userRole == 3 && <Text style={{fontSize: 25, color: colors.mainColor}}>Add card details</Text>}
                    </Block>
                    
                    <Block style={styles.textWrapper}>
                        {/* {userRole == 2 && <Text style={styles.infoText}>
                            You can add $10 per transaction
                        </Text>} */}
                    </Block>
                    
                    <Block style={{marginTop: "5%"}}>
                    {/* {userRole == 2 ? <PaymentFormView {...this.props} onSubmit={this.handleCardSubmit}/>
                    :
                      <CardInformation {...this.props} />
                    } */}
                    {userRole == 3 && <CardInformation {...this.props} />}
                    </Block>
                </ScrollView>
                
                {/* {userRole == 2 && <KeyboardSpacer
                    onToggle={() => { setTimeout(() => this.scrollViewRef.scrollToEnd({ animated: true }),0)} }
                />} */}
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