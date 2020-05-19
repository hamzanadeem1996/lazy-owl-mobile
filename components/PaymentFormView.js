import React from 'react';
import { StyleSheet } from 'react-native';
import { CreditCardInput } from 'react-native-credit-card-input';
import { Block, Text, Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import { colors, wp } from "../screens/introduction/slider/styles/index.style.js";

export default class PaymentFormBlock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { cardData: { valid: false } };
  }
  render() {
    const { onSubmit, submitted, error } = this.props;
    return (

        <Block>
            <Block>
                <CreditCardInput requiresName onChange={(cardData) => this.setState({ cardData })} />
            </Block>

            <Block style={{alignItems: "center", marginTop: "15%"}}>
                <Button
                    color={colors.mainColor}
                    disabled={!this.state.cardData.valid || submitted}
                    onPress={() => onSubmit(this.state.cardData)}
                >
                    Add amount
                </Button>
            </Block>

            <Block style={styles.buttonWrapper}>  
                {error && (
                    <Block style={styles.alertWrapper}>
                        <Block style={styles.alertIconWrapper}>
                            <Icon name="exclamation-circle" size={20} style={{ color: '#c22' }} />
                        </Block>
                        <Block style={styles.alertTextWrapper}>
                            <Text style={styles.alertText}>{error}</Text>
                        </Block>
                    </Block>
                )}
            </Block>

        </Block>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  buttonWrapper: {
    padding: 10,
    zIndex: 100
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alertText: {
    color: '#c22',
    fontSize: 16,
    fontWeight: '400'
  },
  alertWrapper: {
    backgroundColor: '#ecb7b7',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10
  }
});