import React from 'react';
import { StyleSheet, ScrollView, StatusBar } from 'react-native';
import KeyboardSpacer from 'react-native-keyboard-spacer';
import { colors, wp } from "../screens/introduction/slider/styles/index.style.js";
import { Block, Text, Input, Button } from 'galio-framework';

export default class CardInformation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        return(
            <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
                <ScrollView>
                    <Block>
                        <Text>Account Title *</Text>
                        <Input
                            style={{borderColor: colors.mainColor}}
                            placeholder="John Doe"
                        />
                    </Block>

                    <Block style={{marginTop: "3%"}}>
                        <Text>Account Number *</Text>
                        <Input
                            style={{borderColor: colors.mainColor}}
                            placeholder="xxxxxxxxxxxxxx"
                        />
                    </Block>

                    <Block style={{marginTop: "3%"}}>
                        <Text>Bank Name *</Text>
                        <Input
                            style={{borderColor: colors.mainColor}}
                            placeholder="Meezan Bank"
                        />
                    </Block>

                    <Block style={{marginTop: "3%"}}>
                        <Text>Branch Code *</Text>
                        <Input
                            style={{borderColor: colors.mainColor}}
                            placeholder="3366"
                        />
                    </Block>

                    <Block style={{marginTop: "25%"}}>
                        <Button color={colors.mainColor}>Submit</Button>
                    </Block>
                </ScrollView>
                

                
            </Block>
        );
    }
}