import React from 'react';
import { StatusBar, TextInput, ScrollView } from "react-native";
import autoBind from 'react-autobind';
import { Block, Text, Input, Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import ModalDropdown from 'react-native-modal-dropdown';

const StatusHeight = StatusBar.currentHeight;

export default class EditPersonalInformation extends React.Component {
    
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            index: 0
        }
    }

    render() {
        return(
            <Block style={{backgroundColor: colors.mainColor, height: "100%"}}>
                <Block style={{marginTop: StatusHeight + 10}}>
                    <Text h4 style={{color: "#FFFFFF", paddingHorizontal: wp(4)}}>
                        <Icon name="user" color="#FFFFFF" size={24} /> Personal Information
                    </Text>
                </Block>
                    
                <ScrollView>
                    <Block style={{marginTop: "7%"}}>
                        <Block style={{paddingHorizontal: wp(5)}}>
                            <Block>
                                <Text size={12} color="#FFFFFF">Name</Text>
                                <Input placeholder="Full Name" style={styles.loginScreenInputField} />
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">Email</Text>
                                <Input bgColor="#FAFAFA" placeholder="xyz@email.com" style={styles.loginScreenInputField} editable={false}/>
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">Phone</Text>
                                <Input placeholder="xxxxxxxxxxx" style={styles.loginScreenInputField} />
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">Gender</Text>
                                <Block style={{marginTop: 8,border: 1 , borderColor: "#FFFFFF", borderRadius: 8, borderStyle: "solid", width: "100%", height: 40, backgroundColor: "#FFFFFF"}}>
                                    <ModalDropdown 
                                        style={{width: 200}}
                                        options={['Male', 'Female', 'Other']}
                                        defaultIndex={0}
                                        defaultValue="Select Gender"
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
                                <Input placeholder="New York" style={styles.loginScreenInputField} />
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">Address</Text>
                                <TextInput
                                    style={[styles.loginScreenInputField, {backgroundColor: "#FFFFFF", borderRadius: 8, marginTop: 8}]}
                                    multiline={true}
                                    numberOfLines={2}
                                    onChangeText={(text) => this.setState({text})}
                                    placeholder="Lahore, Pakistan"/>
                            </Block>

                            <Block style={{marginTop: 5}}>
                                <Text size={12} color="#FFFFFF">Description</Text>
                                <TextInput
                                    style={[styles.loginScreenInputField, {backgroundColor: "#FFFFFF", borderRadius: 8, marginTop: 8}]}
                                    multiline={true}
                                    numberOfLines={3}
                                    onChangeText={(text) => this.setState({text})}
                                    placeholder="Write what best describes you"/>
                            </Block>
                        </Block>
                    </Block>

                    <Block style={{marginTop: "5%", paddingHorizontal: wp(5)}}>
                        <Block style={{backgroundColor: "#FFFFFF", height: 70, width: 70, borderRadius: 50, paddingVertical: 22, paddingHorizontal: 25}}>
                            <Icon name="arrow-right" color={colors.mainColor} size={24} onPress={() => this.props.navigation.navigate('ProfileScreen')} />
                        </Block>
                    </Block>
                </ScrollView>
            </Block>
        );
    }
}

