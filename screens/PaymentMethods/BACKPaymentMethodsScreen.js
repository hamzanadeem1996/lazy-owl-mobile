import React, { Component } from 'react';
import { View, Alert } from 'react-native';

import stripe from 'tipsi-stripe';
import Config from 'react-native-config';

// import ItemBox from './src/components/ItemBox';
// import pay from './src/helpers/pay';

stripe.setOptions({
    publishableKey: Config.STRIPE_PUBLISHABLE_KEY,
    androidPayMode: 'test', // test || production
});

export default class PaymentMethodsScreen extends Component {

    constructor(props) {
      super(props);
      this.access_token = "AN EXISTING USER'S ACCESS TOKEN FROM YOUR DB";
      this.currency_code = 'USD'; // the currency to be used for processing the transaction
      // item data
      this.item = {
        title: 'Loop 720',
        price: 1,
        // image: require('https://raw.githubusercontent.com/AboutReact/sampleresource/master/old_logo.png')
      };
    }

    state = {
      isPaying: false, // whether the user is currently paying for something 
      canPay: false // whether the user's device has the ability to pay using Google Pay
    }

    // next: add componentDidMount
  }

  const styles = {
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFF',
    }
  };