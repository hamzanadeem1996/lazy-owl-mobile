import React, { Component, useState } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import autoBind from 'react-autobind';
import styles, { colors } from '../introduction/slider/styles/index.style.js';
import { Input, Block } from 'galio-framework';
import { SearchBar, Card, ListItem, Button, Icon } from 'react-native-elements';

export default class ActiveTasksScreen extends React.Component {
    
    constructor(props){
        super();
        autoBind(this);
        this.state = {
            search: '',
        }
    }
    

    updateSearch = search => {
        this.setState({ search });
      };

    render(){
        const { search } = this.state;
        const users = [
            {
               name: 'brynn',
               avatar: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg'
            }
           ]
        return(
            <View>
                <View style={{top: 30, display: "block"}}>
                    <SearchBar
                        containerStyle={{backgroundColor: "white", height: 20}}
                        inputContainerStyle={{backgroundColor: "white"}}
                        placeholder="Search Active Tasks"
                        round={true}
                        lightTheme={true}
                        cancelIcon={true}
                        // underlineColorAndroid="#922c88"
                        // showLoading={true}
                        // placeholderTextColor="#922c88"
                        onChangeText={this.updateSearch}
                        value={search}
                    />
                </View>
                
                <View style={{marginTop: 25, padding: 5}}>
                    
                </View>
            </View>
        );
    }
}