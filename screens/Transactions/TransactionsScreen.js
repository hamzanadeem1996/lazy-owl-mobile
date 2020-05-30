import React from 'react';
import { StatusBar, ActivityIndicator } from 'react-native';
import { colors, wp } from "../../screens/introduction/slider/styles/index.style.js";
import { Block, Text } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ApplicationProvider} from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import { TopNavigation } from "../../components/TopNavigation.js";
import * as services from "../../services/UserServices.js";
import Modal from 'react-native-modal';

const StatusHeight = StatusBar.currentHeight;
export default class TransactionsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoader: false,
            deposit: null,
            wallet: null 
        }
    }

    componentDidMount = async () => {
        this.setState({showLoader: true});
        let state = this.props.screenProps.store.getState();
        let user = state.UserReducer.user;
        let data = {
            id: user.id,
            token: user.token
        }
        services.getUserTransactions(data).then(async response => {
            if (response.status === 200) {
                console.log(response.payments.wallet_payments);
                
                let cardTrans = [];
                response.payments.card_payments.forEach(item => {
                    let myData = {
                        title: item.email ? item.email: "-",
                        amount: item.amount,
                        receipt: item.receipt_url,
                        description: item.created_at
                    }
                    cardTrans.push(myData);
                })

                let walletTrans = [];
                response.payments.wallet_payments.forEach(item => {
                    let myData = {
                        title: item.project_title,
                        amount: item.amount,
                        userEmail: item.user_email,
                        description: item.created_at
                    }
                    walletTrans.push(myData);
                })
                this.setState({deposit: cardTrans, wallet: walletTrans, showLoader: false}); 
            } else {
                this.props.navigation.navigate('DrawerShowcase');   
            }
        })
    }

    render() {

        let { showLoader, deposit, wallet } = this.state;

        return(
            
            <ApplicationProvider {...eva} theme={eva.light}>

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
                
                <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
                    <Block style={{marginTop: StatusHeight, marginHorizontal: wp(1)}}>
                    
                        <Block style={{marginTop: "5%", alignItems: "center"}}>
                            <Text size={20} color={colors.mainColor}><Icon name="credit-card" size={20} /> Payment History</Text>
                        </Block>

                        <Block style={{marginTop: "5%"}}>
                            <TopNavigation 
                                deposit={deposit}
                                walletTraansactions={wallet}
                             />
                        </Block>
                    </Block>
                </Block>
            </ApplicationProvider>
                    
        );
    }
}
