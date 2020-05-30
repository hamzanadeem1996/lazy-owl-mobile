import React from 'react';
import { StatusBar, TextInput, ScrollView, ActivityIndicator } from "react-native";
import autoBind from 'react-autobind';
import { Block, Text, Input } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import ModalDropdown from 'react-native-modal-dropdown';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import * as services from "../../services/UserServices.js";
import NetInfo from '@react-native-community/netinfo';
import { updateUser } from '../../actions/user.js';

const StatusHeight = StatusBar.currentHeight;
export default class EditPersonalInformation extends React.Component {
    
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            index: 0,
            showLoader: false,
            user: {}
        }
    }

    componentDidMount = () => {
        let STATE = this.props.screenProps.store.getState();
        this.setState({user: STATE.UserReducer.user})
    }

    validateString = (data) => { 
        if (data.length === 0 || /^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(data)) {
            return true;
        } else {
            return false;
        }
    }

    validateNumber = (data) => {
        if (data.length === 0 || data.length === 11 || data.length === 13) {
            return true;
        } else {
            return false;
        }
    }

    formValidation = (data) => {
        if (data.phone) {
            if (this.validateNumber(data.phone)) {
                if (data.name.length === 0) {
                    Snackbar.show({
                        text: 'Please enter valid name',
                        duration: Snackbar.LENGTH_SHORT,
                    });
                    return false;
                }
                return true;
            } else {
                Snackbar.show({
                    text: 'Please enter valid phone number',
                    duration: Snackbar.LENGTH_SHORT,
                });
                return false;
            }
        } 

        if (data.name.length === 0) {
            Snackbar.show({
                text: 'Please enter valid name',
                duration: Snackbar.LENGTH_SHORT,
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

    handleFormSubmit = async () => {
        let { user } = this.state;
        if (this.formValidation(user)) {
            if (this.checkNetInfo) {
                this.setState({showLoader: true});
                services.updateUserProfile(user).then(async updateUserResponse => { 
                    if (updateUserResponse.status === 200) {
                        let state = this.props.screenProps.store.getState();
                        let defaultUser = state.UserReducer.user;
                        defaultUser = {...defaultUser, ...user}
                        let test = await this.props.screenProps.store.dispatch(
                            updateUser(defaultUser)
                        );
                        this.setState({showLoader: false});
                        setTimeout(() => { 
                            Snackbar.show({
                                text: 'Profile Updated Successfully!',
                                duration: Snackbar.LENGTH_LONG,
                            });
                        }, 200);
                        
                    } else {
                        this.setState({showLoader: false});
                        setTimeout(() => { 
                            Snackbar.show({
                                text: 'Please try later!',
                                duration: Snackbar.LENGTH_LONG,
                            });
                        }, 200);
                        
                    }
                });
            } 
        }
    }

    handleTextInput = (field, data) => {
        let valid = false;
        if (field === "name" || field === "city") {
            valid = this.validateString(data);
        } else {
            valid = true;
        }

        if (valid) {
            let user = this.state.user;
            user = {...user, [field]: data}
            this.setState({user})
        } else {
            Snackbar.show({
                text: `Please enter valid ${field}`,
                duration: Snackbar.LENGTH_SHORT,
            });
        }
    }

    render() {
        let { user, showLoader } = this.state;
        return(
            <Block style={{backgroundColor: colors.mainColor, height: "100%"}}>
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
                <Block style={{marginTop: StatusHeight + 10}}>
                    <Text h4 style={{color: "#FFFFFF", paddingHorizontal: wp(4)}}>
                        <Icon name="user" color="#FFFFFF" size={24} /> Personal Information
                    </Text>
                </Block>
                    
                <ScrollView>
                    <Block style={{marginTop: "7%"}}>
                        <Block style={{paddingHorizontal: wp(5)}}>
                            <Block>
                                <Text size={12} color="#FFFFFF">Name *</Text>
                                <Input placeholder="Full Name" 
                                    onChangeText={(name) => this.handleTextInput("name", name)} 
                                    value={user.name ? user.name: ""} 
                                    contextMenuHidden={true}
                                    style={styles.loginScreenInputField} />
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">Email</Text>
                                <Input bgColor="#FAFAFA" placeholder="xyz@email.com" value={user.email ? user.email: ""} style={styles.loginScreenInputField} editable={false}/>
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">Phone</Text>
                                <Input placeholder="xxxxxxxxxxx"
                                    onChangeText={(phone) => this.handleTextInput("phone", phone)} 
                                    keyboardType="numeric"
                                    contextMenuHidden={true}
                                    value={user.phone ? user.phone: ""} 
                                    style={styles.loginScreenInputField} />
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">Gender</Text>
                                <Block style={{marginTop: 8,border: 1 , borderColor: "#FFFFFF", borderRadius: 8, borderStyle: "solid", width: "100%", height: 40, backgroundColor: "#FFFFFF"}}>
                                    <ModalDropdown 
                                        style={{width: 200}}
                                        options={['Male', 'Female', 'Other']}
                                        defaultIndex={-1}
                                        onSelect={(gender) => this.handleTextInput("gender", gender)} 
                                        defaultValue={user.gender ? user.gender: "Select Gender"}
                                        animated={false}
                                        showsVerticalScrollIndicator={false}
                                        textStyle={{fontSize: 15, color: colors.mainColor, paddingHorizontal: 15, paddingVertical: 8}}
                                        dropdownStyle={{width: 100}}
                                        dropdownTextStyle={{fontSize: 12}}
                                    />
                                </Block>
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">City</Text>
                                <Input placeholder="New York" 
                                    onChangeText={(city) => this.handleTextInput("city", city)} 
                                    value={user.city ? user.city: ""} 
                                    contextMenuHidden={true}
                                    style={styles.loginScreenInputField} />
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">Address</Text>
                                <TextInput
                                    style={[styles.loginScreenInputField, {backgroundColor: "#FFFFFF", borderRadius: 8, marginTop: 8}]}
                                    multiline={true}
                                    numberOfLines={2}
                                    value={user.address ? user.address: ""}
                                    onChangeText={(address) => this.handleTextInput("address", address)} 
                                    placeholder="Lahore, Pakistan"/>
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">Description</Text>
                                <TextInput
                                    style={[styles.loginScreenInputField, {backgroundColor: "#FFFFFF", borderRadius: 8, marginTop: 8}]}
                                    multiline={true}
                                    numberOfLines={3}
                                    value={user.description ? user.description: ""}
                                    onChangeText={(description) => this.handleTextInput("description", description)} 
                                    placeholder="Write what best describes you"/>
                            </Block>
                        </Block>
                    </Block>

                    <Block style={{marginTop: "5%", marginBottom: "10%",paddingHorizontal: wp(5)}}>
                        <Block style={{backgroundColor: "#FFFFFF", height: 70, width: 70, borderRadius: 50, paddingVertical: 22, paddingHorizontal: 25}}>
                            <Icon name="arrow-right" color={colors.mainColor} size={24} onPress={() => this.handleFormSubmit()} />
                        </Block>
                    </Block>
                </ScrollView>
            </Block>
        );
    }
}

