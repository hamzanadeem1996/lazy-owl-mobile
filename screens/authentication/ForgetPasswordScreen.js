import React from 'react';
import { StatusBar, BackHandler, ActivityIndicator } from 'react-native';
import autoBind from 'react-autobind';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { Input, Block, Button, Text } from 'galio-framework';
import Snackbar from 'react-native-snackbar';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import * as services from "../../services/UserServices.js";

const StatusHeight = StatusBar.currentHeight;
export default class ForgetPasswordScreen extends React.Component {
    constructor(props){
        super();
        autoBind(this);
        this.state = {
            email: '',
            internetConnected: false,
            showLoader: false
        }
    }

    componentDidMount = () => {
        BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
        NetInfo.fetch().then(state => {
            if (!state.isConnected) {
                this.setState({internetConnected: false});
                Snackbar.show({
                    text: 'You are offline',
                    duration: Snackbar.LENGTH_LONG,
                });
            } else {
                this.setState({internetConnected: true});
            }
        });
        
        //Subscribe to network state updates
        const unsubscribe = NetInfo.addEventListener(state => {
            if (!state.isConnected) {
                Snackbar.show({
                    text: 'You are offline',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        });
        unsubscribe();   
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    sendSignInReguest(){
        /* Apply Email Validation */
        let email = this.state.email;

        if (email){
            if (this.validateEmail(email)) {
                this.setState({showLoader: true});
                let data = {email: email};
                services.forgetPassword(data).then(response => { console.log(response);
                    if (response.status === 404) {
                        this.setState({showLoader: false});
                        setTimeout(() => {
                            Snackbar.show({
                                text: response.message,
                                duration: Snackbar.LENGTH_LONG,
                            });
                        }, 200);
                        Snackbar.show({
                            text: response.message,
                            duration: Snackbar.LENGTH_LONG,
                        });
                    } else if(response.status === 500){
                        this.setState({showLoader: false});
                        setTimeout(() => {
                            Snackbar.show({
                                text: "Network problem, please try again later",
                                duration: Snackbar.LENGTH_SHORT,
                            });
                        }, 200);
                    } else if (response.status === 200){
                        this.setState({showLoader: false});
                        setTimeout(() => {
                            Snackbar.show({
                                text: response.message,
                                duration: Snackbar.LENGTH_SHORT,
                            });
                        }, 200);
                    }
                });
            } else {
                Snackbar.show({
                    text: 'Please enter a valid email address',
                    duration: Snackbar.LENGTH_SHORT,
                });
            }
        }else{
            Snackbar.show({
                text: 'Email required',
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }

    render(){
        var { showLoader } = this.state;
        return(
            <Block style={{backgroundColor: "#FFFFFF", height: "100%"}}>
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
                <Block style={{}}>
                    <Block style={{marginTop: StatusHeight + 60, alignItems: "center"}}>
                        <Text style={{color: colors.mainColor, fontWeight: 'bold'}} size={20}>Forget Password</Text>
                    </Block>

                    <Block style={{marginHorizontal: wp(5), marginTop: "30%"}}>
                        <Block>
                            <Input 
                                style={styles.loginScreenInputField}
                                placeholder="Email"  
                                onChangeText={(email) => this.setState({email: email})}
                            />
                        </Block>
                        
                        <Block style={{marginTop: "10%"}}>
                            <Button 
                                style={styles.buttonColor}
                                onPress={this.sendSignInReguest}
                            >
                                Recover Password
                            </Button>
                        </Block>
                    </Block>
                </Block>
            </Block>
        );
    }
}
