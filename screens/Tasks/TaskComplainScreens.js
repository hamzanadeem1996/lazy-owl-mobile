import React from 'react';
import autoBind from 'react-autobind';
import { Block, Text, Input, Button } from 'galio-framework';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { StatusBar, TextInput, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome';


const StatusHeight = StatusBar.currentHeight;

export default class TaskComplainScreen extends React.Component {
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
                    <Block style={{marginTop: "5%", alignItems: "center"}}>
                        <Text size={20} color={colors.mainColor}>
                            Write your Query
                        </Text>
                    </Block>

                    <Block style={{marginTop: "10%", height: "100%"}}>
                        <ScrollView style={{height: "100%"}}>
                            <Block>
                                <Text>Task Title</Text>
                                <Input 
                                    placeholder="Repair my bike" 
                                    style={{borderColor: colors.mainColor}} editable={false} />
                            </Block>

                            <Block style={{marginTop: "3%"}}>
                                <Text>Task Title</Text>
                                <TextInput
                                    style={{borderRadius: 8, marginTop: 8, backgroundColor: "#DEEAF8"}}
                                    multiline={true}
                                    numberOfLines={15}
                                    onChangeText={(text) => this.setState({text})}
                                    placeholder="Write what best describes your task"/>
                            </Block>

                            <Block style={{marginTop: "10%"}}>
                                <Button style={{backgroundColor: colors.mainColor}}>Submit</Button>
                            </Block>
                            
                        </ScrollView>
                    </Block>
                </Block>
            </Block>
        );
    }
}


