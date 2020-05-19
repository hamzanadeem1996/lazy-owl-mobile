import React from 'react';
import autoBind from 'react-autobind';
import { Block, Text, Input, Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { StatusBar, ScrollView } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';

const StatusHeight = StatusBar.currentHeight;

export default class ChangePasswordScreen extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {

        }
    }

    render() {
        return(
            <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
                <Block style={{marginHorizontal: wp(5), top: StatusHeight}}>
                    <Block style={{alignItems: "center", marginTop: "5%"}}>
                        <Text size={20} color={colors.mainColor}>Change Password</Text>
                    </Block>

                    <Block>
                        <ScrollView>
                            <Block style={{marginTop: "10%"}}>
                                <Text>Prevois Password *</Text>
                                <Input placeholder="xyz" password viewPass style={{borderColor: colors.mainColor}} />
                            </Block>

                            <Block style={{marginTop: "3%"}}>
                                <Text>New Password *</Text>
                                <Input placeholder="xyz" password viewPass style={{borderColor: colors.mainColor}} />
                            </Block>

                            <Block style={{marginTop: "3%"}}>
                                <Text>Confirm Password *</Text>
                                <Input placeholder="xyz" password style={{borderColor: colors.mainColor}} />
                            </Block>

                            <Block style={{marginTop: "15%"}}>
                                <Button style={{backgroundColor: colors.mainColor}}>Change Password</Button>
                            </Block>
                        </ScrollView>
                    </Block>
                    
                </Block>
            </Block>
        );
    }
}