import React from 'react';
import autoBind from 'react-autobind';
import { Block, Text, Input, Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { StatusBar, ScrollView, ActivityIndicator } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import Snackbar from 'react-native-snackbar';
import * as services from "../../services/TaskServices.js";
import * as UserServices from "../../services/UserServices.js";
import NetInfo from '@react-native-community/netinfo';
import { updateUser } from '../../actions/user.js';
import Modal from 'react-native-modal';

const StatusHeight = StatusBar.currentHeight;

export default class ServiceScreen extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            showEditSection: false,
            categories: null,
            rawCategories: null,
            subCategory: null,
            subCategories: null,
            subCategoryDisabled: true,
            rawSubCategories: null,
            subCategoryDefaultIndex: 0,
            category: null,
            categoryName: null,
            subCategoryName: null
        }
    }

    componentDidMount = async () => {
        let state = this.props.screenProps.store.getState();
        let user = state.UserReducer.user;
        services.getCategories(user.token).then(response => { 
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
        this.setState({subCategory: null});
        let { rawCategories, categories } = this.state;

        let rawSubCategories = rawCategories[index].sub_categories;
        let subCategories = [];
        rawSubCategories.forEach(item => {
            subCategories.push(item.name);
        });
        
        this.setState({ 
            categoryName: categories[index],
            subCategories,
            subCategory: null, 
            subCategoryDisabled: false,
            category: rawCategories[index].id, 
            rawSubCategories: rawCategories[index].sub_categories,
        });

        if (subCategories.length === 0) {
            this.setState({subCategoryDisabled: true, subCategory: null})
        }
    }

    hanldeSubCategorySelect = (index, value) => {
        let { rawSubCategories, subCategories } = this.state;
        this.setState({subCategory: rawSubCategories[index].id, subCategoryDefaultIndex: index, subCategoryName: subCategories[index]})
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

    switchScreen = () => {
        let { showEditSection, category, subCategory, categoryName, subCategoryName } = this.state;
        let state = this.props.screenProps.store.getState();
        let user = state.UserReducer.user;

        if (showEditSection === false) {
            this.setState({ showEditSection: true})
        } else { console.log("inside else")
            if (this.checkNetInfo) {
                if (category && subCategory) {
                    let data = {
                        id: user.id,
                        token: user.token,
                        service_cat_id: [category],
                        service_sub_cat_id: [subCategory]
                    }
                    UserServices.updateUserServices(data).then(async response => {
                        let myArr = user.services_list;
                        let obj = {category: categoryName, sub_category: subCategoryName}
                        myArr.push(obj);
                        user = {...user, [services_list]: myArr}
                        let test = await this.props.screenProps.store.dispatch(
                            updateUser(user)
                        );
                        this.setState({showLoader: false});
                        setTimeout(() => {
                            Snackbar.show({
                                text: response.message,
                                duration: Snackbar.LENGTH_LONG,
                            });
                        }, 200);
                    })
                } else {
                    Snackbar.show({
                        text: 'Please select both category and sub-category',
                        duration: Snackbar.LENGTH_LONG,
                    });
                }
            }
        }
    }

    render() {
        let state = this.props.screenProps.store.getState();
        let user = state.UserReducer.user;
        let hasServices = false;
        if (user.services_list.length > 0) { 
            hasServices = true;
        }
        var { 
            showEditSection,
            categories, 
            subCategories, 
            subCategoryDefaultIndex, 
            subCategoryDisabled, 
            showLoader
         } = this.state;
        return( 
            <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
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
                <Block style={{marginTop: StatusHeight + 5}}>
                    <Block style={{marginHorizontal: wp(5), alignItems: "center"}}>
                        <Icon name="briefcase" color={colors.mainColor} size={150} />
                    </Block>    
                </Block>

                <Block style={{height: "80%"}}>
                    {!showEditSection ? <Block style={{height: "100%"}}>
                        <ScrollView>
                            <Block style={{marginHorizontal: wp(5)}}>
                                <Text color={colors.mainColor}>Services:</Text>
                            </Block>
                            {hasServices ? user.services_list.map((key) =>{
                                return(
                                    <Block style={{backgroundColor: "#DEEAF8", height: "auto", marginTop: "3%", borderRadius: 20, marginHorizontal: wp(5)}}>
                                        <Block style={{marginTop: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                            <Text size={20} >{key.category}</Text>
                                        </Block>
                                        <Block style={{marginTop: "5%", marginBottom: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                            <Text size={20} >{key.sub_category}</Text>
                                        </Block>
                                    </Block>
                                );
                                
                            })
                            :
                                <Block style={{backgroundColor: "#DEEAF8", height: "auto", marginTop: "3%", borderRadius: 20, marginHorizontal: wp(5)}}>
                                    <Text>No Services</Text>
                                </Block>
                            }
                        </ScrollView>
                            
                        </Block> :

                        <Block style={{marginHorizontal: wp(5), alignItems: "center", height: "auto", marginTop: "7%"}}>
                            <Block style={{marginTop: "3%", width: "100%"}}>
                                <Text size={12} color={colors.mainColor} >Service Category</Text>
                                <Block style={{backgroundColor: colors.mainColor, marginTop: "3%"}}>
                                    <ModalDropdown 
                                        style={{width: "100%"}}
                                        options={categories}
                                        defaultIndex={0}
                                        onSelect={(index, value) => this.handleCategorySelect(index, value)}
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
                                        options={subCategories}
                                        onSelect={(index, value) => this.hanldeSubCategorySelect(index, value)}
                                        defaultIndex={subCategoryDefaultIndex}
                                        defaultValue="Select Sub Category"
                                        animated={false}
                                        disabled={subCategoryDisabled}
                                        showsVerticalScrollIndicator={true}
                                        textStyle={{fontSize: 15, color: "#FFFFFF", alignItems: "center", paddingHorizontal: wp(5), paddingVertical: 8}}
                                        dropdownStyle={{width: "auto"}}
                                        dropdownTextStyle={{fontSize: 12, alignItems: "center", paddingHorizontal: wp(5)}}
                                    />
                                </Block>
                            </Block>
                        </Block>}
                    
                </Block> 

                <Block style={{marginHorizontal: wp(5), bottom: "4%", position: "absolute", alignItems: "center"}}>
                    <Button onPress={() => this.switchScreen()} color={colors.mainColor}>{!showEditSection ? 'Edit' : 'Submit'}</Button>
                </Block>
            </Block>
        );
    }
}