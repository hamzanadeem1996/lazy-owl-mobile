import React from 'react';
import { View, StatusBar, ScrollView, TextInput, TouchableOpacity} from 'react-native';
import autoBind from 'react-autobind';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import * as eva from '@eva-design/eva';
import { Card, ApplicationProvider, Divider, Layout } from '@ui-kitten/components';
import { Block, Input, Text, Button } from 'galio-framework';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-community/async-storage';
import Snackbar from 'react-native-snackbar';
import * as services from "../../services/TaskServices.js";

const StatusHeight = StatusBar.currentHeight;

export default class AddTaskScreen extends React.Component {
    constructor(props){
        super();
        autoBind(this);
        this.state = {
            singleFileOBJ: '',
            title: null,
            category: null,
            subCategory: null,
            location: null,
            dueDate: null,
            peopleRequired: null,
            budget: null,
            mediaFile: null,
            description: null,
            rawCategories: [],
            rawSubCategories: [],
            categories: [],
            subCategories: [],
            subCategoryDefaultIndex: 0
        }
    }

    componentDidMount = async () => {
        let user = await AsyncStorage.getItem("user");
        user = JSON.parse(user);
        services.getCategories(user.token).then(response => { console.log(response);
            if (response.status === 200 && response.services.length > 0) { 
                var newData = [];
                response.services.forEach(item => {
                    newData.push(item.name);
                })
                this.setState({categories: newData, rawCategories: response.services}); 
            } else {
                Snackbar.show({
                    text: 'Please login again!',
                    duration: Snackbar.LENGTH_LONG,
                });
            }
        });
    }

    handleCategorySelect = (index, value) => {
        let { rawCategories } = this.state;

        let rawSubCategories = rawCategories[index].sub_categories;
        let subCategories = [];
        rawSubCategories.forEach(item => {
            subCategories.push(item.name);
        })
        this.setState({ 
            subCategories,
            subCategory: null, 
            category: rawCategories[index].id, 
            rawSubCategories: rawCategories[index].sub_categories 
        });
    }

    hanldeSubCategorySelect = (index, value) => {
        let { rawSubCategories } = this.state;
        this.setState({subCategory: rawSubCategories[index].id, subCategoryDefaultIndex: index})
    }

    SingleFilePicker = async () => {
        try {
            // this.state.singleFileOBJ.name;
            // this.state.singleFileOBJ.type;
            // this.state.singleFileOBJ.size;
            // this.state.singleFileOBJ.uri;

          const res = await DocumentPicker.pick({
            type: [DocumentPicker.types.allFiles],
          
          });
     
          this.setState({ singleFileOBJ: res });
     
        } catch (err) {
          if (DocumentPicker.isCancel(err)) {
            Alert.alert('Canceled');
          } else {
            Alert.alert('Unknown Error: ' + JSON.stringify(err));
            throw err;
          }
        }
    }

    render() {
        var { singleFileOBJ, categories, subCategories, subCategoryDefaultIndex } = this.state;
        return(
            <Block style={{height: "100%", backgroundColor: colors.mainColor}}>
                <Block style={{top: StatusHeight, marginHorizontal: wp(5)}}>
                    <Block style={{alignItems: "center", marginTop: "5%"}}>
                        <Text size={20} color="#FFFFFF">
                            What you need to get done
                        </Text>
                    </Block>

                    <Block style={{height: "93%"}}>
                        <ScrollView showsHorizontalScrollIndicator={false}>
                            <Block style={{marginTop: "10%"}}>
                                <Text size={14} color="#FFFFFF">Task Title *</Text>
                                <Input placeholder="Repair my cycle" />
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Category *</Text>
                                <Block style={{backgroundColor: "#FFFFFF", marginTop: "3%", borderRadius: 8}}>
                                    <ModalDropdown 
                                        style={{width: "100%"}}
                                        options={categories}
                                        defaultIndex={0}
                                        onSelect={(index, value) => this.handleCategorySelect(index, value)}
                                        defaultValue="Select Category"
                                        animated={false}
                                        showsVerticalScrollIndicator={true}
                                        textStyle={{fontSize: 15, color: colors.mainColor, alignItems: "center", paddingHorizontal: wp(5), paddingVertical: 8}}
                                        dropdownStyle={{width: "auto"}}
                                        dropdownTextStyle={{fontSize: 12, alignItems: "center", paddingHorizontal: wp(5)}}
                                    />
                                </Block>
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Sub Category *</Text>
                                <Block style={{backgroundColor: "#FFFFFF", marginTop: "3%", borderRadius: 8}}>
                                    <ModalDropdown 
                                        style={{width: "100%"}}
                                        options={subCategories}
                                        onSelect={(index, value) => this.hanldeSubCategorySelect(index, value)}
                                        defaultIndex={subCategoryDefaultIndex}
                                        defaultValue="Select Category First"
                                        animated={false}
                                        showsVerticalScrollIndicator={true}
                                        textStyle={{fontSize: 15, color: colors.mainColor, alignItems: "center", paddingHorizontal: wp(5), paddingVertical: 8}}
                                        dropdownStyle={{width: "auto"}}
                                        dropdownTextStyle={{fontSize: 12, alignItems: "center", paddingHorizontal: wp(5)}}
                                    />
                                </Block>
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Location *</Text>
                                <Input placeholder="Lahore" />
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Due Date *</Text>
                                <Input placeholder="12-12-2019" />
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">People Required *</Text>
                                <Input placeholder="5" />
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Estimated Budget *</Text>
                                <Input placeholder="$786" />
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Upload File</Text>
                                <TouchableOpacity onPress={() => this.SingleFilePicker()}>
                                    <Block style={{height: 45, marginTop: "2%", backgroundColor: "#FFFFFF", borderRadius: 8, alignItems: "center", paddingTop: "3%"}}>
                                        <Text style={{color: colors.mainColor}} size={16}>Select</Text>
                                    </Block>
                                </TouchableOpacity>
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Description *</Text>
                                <TextInput
                                    style={[styles.loginScreenInputField, {backgroundColor: "#FFFFFF", borderRadius: 8, marginTop: 8}]}
                                    multiline={true}
                                    numberOfLines={5}
                                    onChangeText={(text) => this.setState({text})}
                                    placeholder="Write what best describes your task"/>
                            </Block>
                            
                            <Block style={{marginTop: "5%", marginBottom: "8%"}}>
                                <Block style={{backgroundColor: "#FFFFFF", height: 70, width: 70, borderRadius: 50, paddingVertical: 22, paddingHorizontal: 25}}>
                                    <Icon name="arrow-right" color={colors.mainColor} size={24} onPress={() => this.props.navigation.navigate('TestScreen')} />
                                </Block>
                            </Block>
                        </ScrollView>
                    </Block>
                    
                </Block>
            </Block>
        );
    }
}