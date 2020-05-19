import React from 'react';
import autoBind from 'react-autobind';
import { Block, Text, Input, Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { StatusBar, ScrollView } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';

const StatusHeight = StatusBar.currentHeight;

export default class ServiceScreen extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            showEditSection: false,
        }
    }

    switchScreen = () => {
        var { showEditSection } = this.state;
        this.setState({ showEditSection: !showEditSection })
    }

    render() {
        var { showEditSection } = this.state;
        return( 
            <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
                <Block style={{marginTop: StatusHeight + 5}}>
                    <Block style={{marginHorizontal: wp(5), alignItems: "center"}}>
                        <Icon name="briefcase" color={colors.mainColor} size={150} />
                    </Block>    
                </Block>

                <Block style={{height: "80%"}}>
                    {!showEditSection ? <Block style={{height: "auto"}}>
                        <ScrollView>
                            <Block style={{marginHorizontal: wp(5), marginTop: "7%"}}>
                                <Text color={colors.mainColor}>Services:</Text>
                            </Block>
                            <Block style={{backgroundColor: "#DEEAF8", height: "auto", marginTop: "3%", borderRadius: 20, marginHorizontal: wp(5)}}>
                                <Block style={{marginTop: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                    <Text size={20} >Bachelors of Science</Text>
                                </Block>
                                <Block style={{marginTop: "5%", marginBottom: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                    <Text size={20} >Computer Science</Text>
                                </Block>
                            </Block>

                            <Block style={{backgroundColor: "#DEEAF8", height: "auto", marginTop: "3%", borderRadius: 20, marginHorizontal: wp(5)}}>
                                <Block style={{marginTop: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                    <Text size={20} >Bachelors of Science</Text>
                                </Block>
                                <Block style={{marginTop: "5%", marginBottom: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                    <Text size={20} >Computer Science</Text>
                                </Block>
                            </Block>

                            <Block style={{backgroundColor: "#DEEAF8", height: "auto", marginTop: "3%", borderRadius: 20, marginHorizontal: wp(5)}}>
                                <Block style={{marginTop: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                    <Text size={20} >Bachelors of Science</Text>
                                </Block>
                                <Block style={{marginTop: "5%", marginBottom: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                    <Text size={20} >Computer Science</Text>
                                </Block>
                            </Block>
                        </ScrollView>
                            
                        </Block> :

                        <Block style={{marginHorizontal: wp(5), alignItems: "center", height: "auto", marginTop: "7%"}}>
                            <Block style={{marginTop: "3%", width: "100%"}}>
                                <Text size={12} color={colors.mainColor} >Service Category</Text>
                                <Block style={{backgroundColor: colors.mainColor, marginTop: "3%"}}>
                                    <ModalDropdown 
                                        style={{width: "100%"}}
                                        options={['Male Female Female Female Female', 'Female', 'Other', 'Male', 'Female', 'Other', 'Male', 'Female', 'Other', 'Male', 'Female', 'Other']}
                                        defaultIndex={0}
                                        defaultValue="Select Category"
                                        animated={false}
                                        showsVerticalScrollIndicator={true}
                                        textStyle={{fontSize: 15, color: "#FFFFFF", alignItems: "center", paddingHorizontal: wp(5), paddingVertical: 8}}
                                        dropdownStyle={{width: "auto"}}
                                        dropdownTextStyle={{fontSize: 12, alignItems: "center", paddingHorizontal: wp(5)}}
                                    />
                                </Block>
                            </Block>

                            <Block style={{marginTop: "3%", width: "100%"}}>
                                <Text size={12} color={colors.mainColor} >Service Sub Category</Text>
                                <Block style={{backgroundColor: colors.mainColor, marginTop: "3%"}}>
                                    <ModalDropdown 
                                        style={{width: "100%"}}
                                        options={['Male Female Female Female Female', 'Female', 'Other', 'Male', 'Female', 'Other', 'Male', 'Female', 'Other', 'Male', 'Female', 'Other']}
                                        defaultIndex={0}
                                        defaultValue="Select Sub Category"
                                        animated={false}
                                        showsVerticalScrollIndicator={true}
                                        textStyle={{fontSize: 15, color: "#FFFFFF", alignItems: "center", paddingHorizontal: wp(5), paddingVertical: 8}}
                                        dropdownStyle={{width: "auto"}}
                                        dropdownTextStyle={{fontSize: 12, alignItems: "center", paddingHorizontal: wp(5)}}
                                    />
                                </Block>
                            </Block>
                        </Block>}
                    
                </Block> 

                <Block style={{marginHorizontal: wp(5), bottom: "8%", position: "absolute", alignItems: "center"}}>
                    <Button onPress={() => this.switchScreen()} color={colors.mainColor}>{!showEditSection ? 'Edit' : 'Submit'}</Button>
                </Block>
            </Block>
        );
    }
}