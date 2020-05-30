import React from 'react';
import AddSubscriptionView from '../../components/AddSubscriptionView.js';
const STRIPE_ERROR = 'Payment service error. Try again later.';
const SERVER_ERROR = 'Server error. Try again later.';
const STRIPE_PUBLISHABLE_KEY = 'pk_test_gbAS4IqAqtTmlYAX8vpTNmoa00KUFn3qko';

const doPayment = (token) => {
  return fetch('https://api.stripe.com/v1/charge', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    method: 'post',
    body: {
      amount: 999,
      currency: 'usd',
      description: 'Example charge',
      source: token,
    }
  }).then(respons => response.json());
}

const getCreditCardToken = (creditCardData) => {
  const card = {
    'card[number]': creditCardData.values.number.replace(/ /g, ''),
    'card[exp_month]': creditCardData.values.expiry.split('/')[0],
    'card[exp_year]': creditCardData.values.expiry.split('/')[1],
    'card[cvc]': creditCardData.values.cvc
  };
  return fetch('https://api.stripe.com/v1/tokens', {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Bearer ${STRIPE_PUBLISHABLE_KEY}`
    },
    method: 'post',
    body: Object.keys(card)
      .map(key => key + '=' + card[key])
      .join('&')
  }).then(response => response.json());
};

const subscribeUser = (creditCardToken) => {
  return new Promise((resolve) => {
    console.log('Credit card token\n', creditCardToken);
    setTimeout(() => {
      resolve({ status: true });
    }, 1000)
  });
};

export default class PaymentMethodsScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      error: null, 
      userRole: 2
    }
  }
  
  onSubmit = async (creditCardInput) => {
    // const { navigation } = this.props;
    
    this.setState({ submitted: true });
    let creditCardToken;
    try {
      
      creditCardToken = await getCreditCardToken(creditCardInput).then(response => {
        if (response.error) {
          this.setState({ submitted: false, error: STRIPE_ERROR });
          return;
        } else {

        }
      });
      
      // if (creditCardToken.error) {
      //   this.setState({ submitted: false, error: STRIPE_ERROR });
      //   return;
      // }
    } catch (e) {
      this.setState({ submitted: false, error: STRIPE_ERROR });
      return;
    }
    
    const { error } = await subscribeUser(creditCardToken);
   
    if (error) {
      this.setState({ submitted: false, error: SERVER_ERROR });
    } else {
      this.setState({ submitted: false, error: null });
      // navigation.navigate('Home')
    }
  };
  
  // render the subscription view component and pass the props to it
  render() {
    const { submitted, error, userRole } = this.state;
    return (
        <AddSubscriptionView
          {...this.props}
          userRole={userRole}
          error={error}
          submitted={submitted}
          onSubmit={this.onSubmit}
        />
    );
  }
}