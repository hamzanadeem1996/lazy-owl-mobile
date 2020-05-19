import React from 'react';
import autoBind from 'react-autobind';
import { Block, Text } from 'galio-framework';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { StatusBar } from "react-native";
import { ApplicationProvider,Tab, TabBar, TabView, Layout, Divider, List, ListItem, Button } from '@ui-kitten/components';
import * as eva from '@eva-design/eva';
import Icon from 'react-native-vector-icons/FontAwesome';

const StatusHeight = StatusBar.currentHeight;

export default class TaskBidsScreen extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {

        }
    }

    render() {

        let data = [
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
            {title: "baby@gmail.com", amount: "$123", receipt: "this is receipt", description: "12-12-2029"},
        ]

        const renderItemIcon = (props) => (
            <Icon name='star' size={16} />
          );
        
          const renderItemAccessory = (props) => (
            <Block style={{display: "flex", flexDirection: "row"}}>
                <Button 
                    onPress={() => this.props.navigation.navigate('UserProfileScreen')}
                    size='tiny' 
                    style={{backgroundColor: colors.mainColor, borderColor: colors.mainColor, marginLeft: "5%"}}>
                    PROFILE
                </Button>
                <Button size='tiny' style={{backgroundColor: colors.mainColor, borderColor: colors.mainColor, marginLeft: "5%"}}>ACCEPT</Button>
            </Block>
          );
        
          const renderItem = ({ item, index }) => (
            <ListItem
              title={`${item.title}`}
              description={`${item.description}`}
              accessoryLeft={renderItemIcon}
              accessoryRight={renderItemAccessory}
            />
          );

        return(
            
            <ApplicationProvider {...eva} theme={eva.light}>
                <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
                    <Block style={{top:StatusHeight, marginHorizontal: wp(5)}}>

                        <Block style={{marginTop: "5%", alignItems: "center"}}>
                            <Text size={20} color={colors.mainColor}><Icon name="gavel" size={20}></Icon> Bids on this Task</Text>
                        </Block>

                        <Block style={{marginTop: "5%"}}>
                            <Layout>
                                <List
                                    data={data}
                                    ItemSeparatorComponent={Divider}
                                    renderItem={renderItem}
                                />
                            </Layout>
                        </Block>
                    </Block>
                </Block>
            </ApplicationProvider>
            
        );
    }
}