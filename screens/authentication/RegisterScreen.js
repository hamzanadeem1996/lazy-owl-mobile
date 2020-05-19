import React from 'react';
import { StatusBar, ActivityIndicator, BackHandler } from 'react-native';
import autoBind from 'react-autobind';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { Input, Block, Button, Text  } from 'galio-framework';
import RadioGroup from 'react-native-radio-buttons-group';
import Snackbar from 'react-native-snackbar';
import Modal from 'react-native-modal';
import NetInfo from '@react-native-community/netinfo';
import { register } from "../../services/UserServices.js";
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user.js';
import { saveUserData } from "../../database/index.js";
import { NavigationActions, StackActions } from 'react-navigation';

const StatusHeight = StatusBar.currentHeight;

class RegisterScreen extends React.Component {
    constructor(props){
        super();
        autoBind(this);
        this.state = {
            name: '',
            email: '',
            password: '',
            confirmPassword: '',
            role: 2,
            validationMessage: '',
            validationError: false,
            authenticationError: false,
            internetConnected: false,
            showLoader: false,
            rolesData: [
                {
                  label: 'Hire Worker',
                  value: 2,
                  color: colors.mainColor
                },
                {
                  label: 'Earn Money',
                  value: 3,
                  color: colors.mainColor
                }
              ],
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

    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    async saveUserData(userData) {
        this.props.updateUser(userData)
        saveUserData(userData).then(response => {
            console.log("User saved to database :", response);
        });
    }

    sendRegisterReguest(){

        let { name, email, password, confirmPassword, role, internetConnected } = this.state;

        if (!internetConnected){
            Snackbar.show({
                text: 'Please check internet connection',
                duration: Snackbar.LENGTH_SHORT,
            });
        } else {
            if (name && email && password && confirmPassword){
                
                if (this.validateEmail(email)) {
                    
                    if (/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(name)){
                        
                        if (!(name.length < 3)) {
                        
                            if (!password.length >= 8) {
                                Snackbar.show({
                                    text: 'Password can not be less than 8 characters',
                                    duration: Snackbar.LENGTH_SHORT,
                                });
                            } else {
                                
                                if (password.indexOf(confirmPassword) !== -1){
                                    this.setState({showLoader: true});
                                    
                                    let data = {
                                        name: name,
                                        email: email,
                                        password: password,
                                        password_confirmation: confirmPassword,
                                        role: role
                                    }
        
                                    register(data).then(response => { 
                                        if (response.error || response.errors || response.status === 400) { 
                                            this.setState({showLoader: false});
                                            
                                            setTimeout(()=> {
                                                if (response.errors.email) {
                                                    Snackbar.show({
                                                        text: response.errors.email[0],
                                                        duration: Snackbar.LENGTH_LONG,
                                                    });
                                                } else if (response.errors.name) {
                                                    Snackbar.show({
                                                        text: response.errors.name[0],
                                                        duration: Snackbar.LENGTH_LONG,
                                                    });
                                                } else if (response.errors.password) {
                                                    Snackbar.show({
                                                        text: response.errors.password[0],
                                                        duration: Snackbar.LENGTH_LONG,
                                                    });
                                                }
                                            }, 200);
                                            
                                            if (response.error) {
                                                Snackbar.show({
                                                    text: response.error,
                                                    duration: Snackbar.LENGTH_SHORT,
                                                });
                                            }
                                            
                                        } else if(response.status === 500){
                                            this.setState({showLoader: false});
                                            Snackbar.show({
                                                text: "Network problem, please try again later",
                                                duration: Snackbar.LENGTH_SHORT,
                                            });
                                        } else {
                                            this.saveUserData(response.user);
                                            this.setState({showLoader: false});
                                            const resetAction = StackActions.reset({
                                                index: 0,
                                                actions: [NavigationActions.navigate({ routeName: 'TestScreen' })],
                                            });
                                            this.props.navigation.dispatch(resetAction);
                                        }
                                    });
                                }else{
                                    this.setState({validationError: true});
                                    Snackbar.show({
                                        text: 'Confirm password does not match',
                                        duration: Snackbar.LENGTH_SHORT,
                                    });
                                }
                            }
                        } else {
                            Snackbar.show({
                                text: 'Name can not be less than 3 characters',
                                duration: Snackbar.LENGTH_SHORT,
                            });
                        }
                    } else {
                        Snackbar.show({
                            text: 'Name can only contains letter',
                            duration: Snackbar.LENGTH_SHORT,
                        });
                    }
                    
                    
                } else {
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
                }else if (!confirmPassword){
                    Snackbar.show({
                        text: 'Confirm password required',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                }
            }
            
        }
        
        

        
    }

    setRole = (rolesData) => {
        if (rolesData[0].selected){
            this.setState({role: 2})
        }else{
            this.setState({role: 3})
        }
    }

    navigateToLoginScreen(){
        this.props.navigation.navigate('Login');
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

                <Block style={{marginTop: StatusHeight + 60, alignItems: "center"}}>
                    <Text style={{color: colors.mainColor, fontWeight: 'bold'}} size={20}>Register</Text>
                </Block>
                
                <Block style={{marginHorizontal: wp(5), marginTop: "15%"}}>
                    <Block>
                        <Input 
                            placeholder="Name" 
                            style={styles.loginScreenInputField}
                            onChangeText={(name) => this.setState({name: name})}
                        />
                    </Block>

                    <Block>
                        <Input 
                            placeholder="Email" 
                            style={styles.loginScreenInputField}
                            onChangeText={(email) => this.setState({email: email})}
                        />
                    </Block>

                    <Block>
                        <Input 
                            password 
                            viewPass
                            placeholder="Password"
                            style={styles.loginScreenInputField}
                            onChangeText={(password) => this.setState({password: password})}
                        />
                    </Block>

                    <Block>
                        <Input 
                            password 
                            viewPass
                            placeholder="Confirm Password"
                            style={styles.loginScreenInputField}
                            onChangeText={(confirmPassword) => this.setState({confirmPassword: confirmPassword})}
                        />
                    </Block>

                    <Block style={{marginVertical: "10%", alignItems:"flex-start"}}>
                        <RadioGroup 
                            radioButtons={this.state.rolesData} 
                            onPress={(role) => this.setRole(role)} 
                        />
                    </Block>

                    <Block>
                        <Button 
                            style={styles.buttonColor}
                            onPress={this.sendRegisterReguest}
                        >
                            Register
                        </Button>
                    </Block>

                    <Block style={{marginTop: "30%", alignItems: "center"}}>
                        <Text style={styles.loginScreenCreateAccountText}>
                            Already have an account? {" "} 
                                <Text
                                    onPress={this.navigateToLoginScreen}
                                    style={styles.loginScreenRegisterText
                                }>
                                    Sign In
                                </Text>
                        </Text>
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

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)