import React from 'react';
import { StatusBar, ActivityIndicator, BackHandler } from 'react-native';
import autoBind from 'react-autobind';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { Input, Block, Button, Text } from 'galio-framework';
import * as services from "../../services/UserServices.js";
import Snackbar from 'react-native-snackbar';
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user.js';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import { saveUserData } from "../../database/index.js";
import SplashScreen from '../splash/SpalshScreen.js';
import { NavigationActions, StackActions } from 'react-navigation';

const StatusHeight = StatusBar.currentHeight;
class LoginScreen extends React.Component {
    constructor(props){
        super();
        autoBind(this);
        this.state = {
            showSplashScreen: false,
            email: '',
            password: '',
            validationMessage: '',
            validationError: false,
            authenticationError: false,
            showLoader: false,
            internetConnected: false,
            onlineEventCount: 0
        }
    }

    componentDidMount = () => {
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

    saveUserData = async (userData) => {
        return new Promise(async (resolve) => {
            this.props.updateUser(userData);
            saveUserData(userData).then(response => {
                console.log("User saved to database :", response);
                // if (response) { 
                    resolve(response);
                // }
            });
        })
    }

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    sendSignInReguest = async () => {
        if (!this.state.internetConnected){
            Snackbar.show({
                text: 'Please check internet connection',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {

            let email = this.state.email;
            let password = this.state.password;
    
            if (email && password){
                let data = {
                    email: email,
                    password: password
                };
    
                if (this.validateEmail(email)){
                    this.setState({showLoader: true});
                    services.login(data).then(response => { 
                        if (response.error || response.status === 400) {
                            this.setState({showLoader: false});
                            setTimeout(() => {
                                Snackbar.show({
                                    text: response.error,
                                    duration: Snackbar.LENGTH_SHORT,
                                });
                            }, 500)
                            
                        } else if(response.status === 500){
                            this.setState({showLoader: false});
                            Snackbar.show({
                                text: "Network problem, please try again later",
                                duration: Snackbar.LENGTH_SHORT,
                            });
                        } else { console.log(response)
                            this.saveUserData(response.user).then(response => {
                                if (response) {
                                    this.setState({showLoader: false});
                                    const resetAction = StackActions.reset({
                                        index: 0,
                                        actions: [NavigationActions.navigate({ routeName: 'TestScreen' })],
                                    });
                                    this.props.navigation.dispatch(resetAction);
                                } else {
                                    this.setState({showLoader: false});
                                    setTimeout(() => {
                                        Snackbar.show({
                                            text: "Network problem, please try again later",
                                            duration: Snackbar.LENGTH_SHORT,
                                        });
                                    }, 200)
                                }
                            });
                        }
                    });
                } else {
                    this.setState({showLoader: false});
                    Snackbar.show({
                        text: 'Please enter a valid email address',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
                
            }else{
                this.setState({validationError: true})
                if (!email){
                    Snackbar.show({
                        text: 'Email required',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }else if(!password){
                    Snackbar.show({
                        text: 'Password required',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
            }
        }
    }

    navigateToRegisterScreen(){
        this.props.navigation.navigate('Register');
    }

    navigateToForgetPasswordScreen(){
        this.props.navigation.navigate('ForgetPassword');
    }

    render(){
        var { showLoader, showSplashScreen } = this.state;

        if (showSplashScreen){
            return <SplashScreen/>;    
        }

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
                            <Text style={{color: colors.mainColor, fontWeight: 'bold'}} size={20}>Sign In</Text>
                        </Block>
                        
                        <Block style={{marginHorizontal: wp(5), marginTop: "30%"}}>
                            <Block>
                                <Input 
                                    style={styles.loginScreenInputField}
                                    placeholder="Email"  
                                    contextMenuHidden={true}
                                    onChangeText={(email) => this.setState({email: email})}
                                />
                            </Block>

                            <Block>
                                <Input 
                                    password 
                                    viewPass
                                    placeholder="Password"
                                    contextMenuHidden={true}
                                    style={styles.loginScreenInputField}
                                    onChangeText={(password) => this.setState({password: password})}
                                />
                            </Block>

                            <Block style={styles.loginScreenForgetPasswordContainer}>
                                <Text 
                                    style={styles.loginScreenForgetPasswordText}
                                    onPress={this.navigateToForgetPasswordScreen}
                                >
                                    Forgot Password?
                                </Text>
                            </Block>
                            
                            <Block style={{marginTop: "30%"}}>
                                <Button 
                                    style={styles.buttonColor}
                                    onPress={this.sendSignInReguest}
                                >
                                    Sign In
                                </Button>
                            </Block>

                            <Block style={{alignItems: "center", marginTop: "60%"}}>
                                <Text style={styles.loginScreenCreateAccountText}>
                                    Don't have an account? {" "} 
                                        <Text
                                            onPress={this.navigateToRegisterScreen}
                                            style={styles.loginScreenRegisterText
                                        }>
                                            Register
                                        </Text>
                                </Text>
                            </Block>
                        </Block>
                    </Block>
                            
                </Block>
        );
    }
}


const mapStateToProps = state => {
    return { user: state.user }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: user => dispatch(updateUser(user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)