import React from 'react';
import { ScrollView, ActivityIndicator } from 'react-native';
import { colors, wp } from "../screens/introduction/slider/styles/index.style.js";
import { Block, Text, Input, Button } from 'galio-framework';
import Snackbar from 'react-native-snackbar';
import NetInfo from '@react-native-community/netinfo';
import * as services from "../services/UserServices.js";
import Modal from 'react-native-modal';

export default class CardInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accTitle: null,
            accNumber: null,
            bankName: null,
            branchCode: null,
            cardDetails: null,
            showLoader: false
        };
    }

    componentDidMount = async () => {
        let state = this.props.screenProps.store.getState();
        let user = state.UserReducer.user;
        let data = {
            id: user.id,
            token: user.token
        }
        services.getUserCardDetails(data).then(response => {
            this.setState({cardDetails: response.card})
        })
    }

    formValidation = (data) => {
        let required = ['accTitle', 'accNumber', 'bankName', 'branchCode'];
        required.forEach(item => {
            if (!data[item]) {
                Snackbar.show({
                    text: 'Please enter all the required fields',
                    duration: Snackbar.LENGTH_LONG,
                });
                return false;
            }
        });
        
        if (!(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(data.accTitle))) {
            Snackbar.show({
                text: 'Please enter valid account title',
                duration: Snackbar.LENGTH_LONG,
            });
            return false;
        }

        if (!(/^[0-9]+$/.test(data.accNumber)) || data.accNumber.length < 11) {
            Snackbar.show({
                text: 'Please enter valid account number',
                duration: Snackbar.LENGTH_LONG,
            });
            return false;
        }

        if (!(/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(data.bankName))) {
            Snackbar.show({
                text: 'Please enter valid bank name',
                duration: Snackbar.LENGTH_LONG,
            });
            return false;
        }

        if (!(/^[0-9]+$/.test(data.branchCode)) || data.branchCode.length < 4) {
            Snackbar.show({
                text: 'Please enter valid branch code',
                duration: Snackbar.LENGTH_LONG,
            });
            return false;
        }
        return true;
    }

    checkNetInfo = () => {
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                Snackbar.show({
                    text: 'You are offline',
                    duration: Snackbar.LENGTH_LONG,
                });
                return false;
            } else {
                return true;
            }
        });
    }

    handleSubmit = () => {
        let { accTitle, accNumber, bankName, branchCode, cardDetails } = this.state;

        let data = { 
            accTitle: accTitle || cardDetails.acc_title, 
            accNumber: accNumber || cardDetails.acc_number, 
            bankName: bankName || cardDetails.bank_name, 
            branchCode: branchCode || cardDetails.branch_code 
        }

        if (this.formValidation(data)) {
            if (this.checkNetInfo) {
                let state = this.props.screenProps.store.getState();
                let user = state.UserReducer.user;

                let dataToSend = {
                    user_id: user.id,
                    payment_method_id: 4,
                    token: user.token,
                    bank_name: bankName || cardDetails.bank_name,
                    acc_title: accTitle || cardDetails.acc_title,
                    acc_number: accNumber || cardDetails.acc_number,
                    branch_code: branchCode || cardDetails.branch_code
                }

                services.updateUserCardDetails(dataToSend).then(response => {
                    if (response) {
                        Snackbar.show({
                            text: response.message,
                            duration: Snackbar.LENGTH_LONG,
                        });
                    }
                })
            }
        }
    }

    render() {
        let { cardDetails, showLoader } = this.state;
        return(
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
                <ScrollView>
                    <Block>
                        <Text>Account Title *</Text>
                        <Input
                            value={cardDetails ? cardDetails.acc_title: ""}
                            style={{borderColor: colors.mainColor}}
                            contextMenuHidden={true}
                            placeholder="John Doe"
                            onChangeText={(value) => this.setState({accTitle: value})}
                        />
                    </Block>

                    <Block style={{marginTop: "3%"}}>
                        <Text>Account Number *</Text>
                        <Input
                            value={cardDetails ? cardDetails.acc_number: ""}
                            style={{borderColor: colors.mainColor}}
                            contextMenuHidden={true}
                            keyboardType={'numeric'}
                            placeholder="xxxxxxxxxxxxxx"
                            onChangeText={(value) => this.setState({accNumber: value})}
                        />
                    </Block>

                    <Block style={{marginTop: "3%"}}>
                        <Text>Bank Name *</Text>
                        <Input
                            value={cardDetails ? cardDetails.bank_name: ""}
                            style={{borderColor: colors.mainColor}}
                            contextMenuHidden={true}
                            placeholder="Meezan Bank"
                            onChangeText={(value) => this.setState({bankName: value})}
                        />
                    </Block>

                    <Block style={{marginTop: "3%"}}>
                        <Text>Branch Code *</Text>
                        <Input
                            value={cardDetails ? cardDetails.branch_code: ""}
                            style={{borderColor: colors.mainColor}}
                            contextMenuHidden={true}
                            keyboardType={'numeric'}
                            placeholder="3366"
                            onChangeText={(value) => this.setState({branchCode: value})}
                        />
                    </Block>

                    <Block style={{marginTop: "25%"}}>
                        <Button color={colors.mainColor} onPress={() => this.handleSubmit()}>Submit</Button>
                    </Block>
                </ScrollView>
                

                
            </Block>
        );
    }
}