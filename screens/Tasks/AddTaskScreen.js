import React from 'react';
import { StatusBar, ScrollView, TextInput, TouchableOpacity, Platform, ActivityIndicator } from 'react-native';
import autoBind from 'react-autobind';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { Block, Input, Text } from 'galio-framework';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import ModalDropdown from 'react-native-modal-dropdown';
import Snackbar from 'react-native-snackbar';
import * as services from "../../services/TaskServices.js";
import DateTimePicker from '@react-native-community/datetimepicker';
import { connect } from 'react-redux';
import storage from '@react-native-firebase/storage';
import RNFileSelector from 'react-native-file-selector';

const StatusHeight = StatusBar.currentHeight;
const FireBaseStorage = storage();
class AddTaskScreen extends React.Component {
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
            description: null,
            rawCategories: [],
            rawSubCategories: [],
            categories: [],
            subCategories: [],
            subCategoryDefaultIndex: 0,
            subCategoryDisabled: true,
            subCategoryDefaultValue: "Select Category First",
            dateToSet: "Select Date",
            showDatePicker: false, 
            defaultDate: Date.now(),
            externalStorageAllowed: null,
            showFilePicker: false,
            mediaPath: null,
            showLoader: false
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
        let { rawCategories } = this.state;

        let rawSubCategories = rawCategories[index].sub_categories;
        let subCategories = [];
        rawSubCategories.forEach(item => {
            subCategories.push(item.name);
        });
        
        this.setState({ 
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
        let { rawSubCategories } = this.state;
        this.setState({subCategory: rawSubCategories[index].id, subCategoryDefaultIndex: index})
    }

    handleDueDateChange = (date) => { 
        if (date.type === "set") {
            let newDate = new Date(date.nativeEvent.timestamp);
            let day = newDate.getDate(); 
            let month = newDate.getMonth(); 
            let year = newDate.getFullYear(); 
            let formatedDate = `${year}-${month}-${day}`;
            this.setState({dueDate: formatedDate, dateToSet: formatedDate, showDatePicker: false});
        }
    }

    launchDatePicker = () => {
        this.setState({showDatePicker: true});
    }

    handleLocationChange = (location) => {
        if (/^[a-zA-Z-,]+(\s{0,1}[a-zA-Z-, ])*$/.test(location)){ 
            this.setState({location});
        } else {
            Snackbar.show({
                text: 'Please enter a valid location!',
                duration: Snackbar.LENGTH_LONG,
            });
        }
    }

    handleNumericInput = (key, value) => {
        if (/^[0-9]+$/.test(value)) {
            this.setState({ [key]: value })
        } else {
            Snackbar.show({
                text: 'Please enter a valid value!',
                duration: Snackbar.LENGTH_LONG,
            });
        }
    }

    formValidation = (data) => {
        return new Promise((resolve) => {
            let isValid = true;
            let inputArr = ["title", "cat_id", "sub_cat_id", "description", "location", "due_date", "budget", "people_required"];
            inputArr.forEach(function (item) { 
				if (!data[item]) {
					isValid = false;
				}
            });
            resolve(isValid);
        })
    }

    getFileLocalPath = response => {
        const { path, uri } = response;
        return Platform.OS === 'android' ? path : uri;
    };

    createStorageReferenceToFile = response => {
        const { name } = response;
        return FireBaseStorage.ref(name);
    };

    uploadMediaToFireBase = (response) => { 
        return new Promise((resolve) => {
            const storageRef = FireBaseStorage.ref(`${Date.now()}`);
            storageRef.putFile(response).then(upload => {
                if (upload.state === "success") {
                    storageRef.getDownloadURL().then(url => {
                        resolve({err: 0, url: url});
                    }, (err) => {
                        console.log(err);
                        resolve({err: 1})
                    });
                } else {
                    resolve({err: 1})
                }
            });
        });
    }

    handleFormSubmit = async () => { 
        var { title, category, subCategory, location, dueDate, peopleRequired, budget, description, mediaPath, singleFileOBJ} = this.state;
        
        let state = this.props.screenProps.store.getState();
        let user = state.UserReducer.user;
        
        let data = {
            user_id: user.id,
            title: title,
            cat_id: category,
            sub_cat_id: subCategory,
            description: description,
            location: location,
            due_date: dueDate,
            budget: budget,
            people_required: peopleRequired
        }

        console.log(data);
        this.formValidation(data).then(validation => { console.log(validation);
            if (!validation) {
                Snackbar.show({
                    text: 'Please enter all the required value!',
                    duration: Snackbar.LENGTH_LONG,
                });
            } else {
                console.log("Valid data");   
                this.setState({showLoader: true})             
                if (singleFileOBJ) {
                    this.uploadMediaToFireBase(mediaPath).then(responseUpload => {
                        if (responseUpload.err === 0) {
                            data.media = responseUpload.url;
                            this.postTaskToServer(data, user.token);
                        } else {
                            this.setState({showLoader: false})
                            setTimeout(() => {
                                Snackbar.show({
                                    text: 'Please try again later!',
                                    duration: Snackbar.LENGTH_LONG,
                                });
                            }, 200) 
                        }
                    });
                } else {
                    this.postTaskToServer(data, user.token);
                }
            }
        })
    }

    postTaskToServer = (data, token) => {
        services.postTask(data, token).then(response => {
            console.log(response);
            if (response.status === 200) {
                this.setState({showLoader: false});
                setTimeout(() => {
                    Snackbar.show({
                        text: 'Task posted successfully!',
                        duration: Snackbar.LENGTH_LONG,
                    });
                }, 200)
                
            } else {
                this.setState({showLoader: false});
                setTimeout(() => {
                    Snackbar.show({
                        text: 'Please try again later!',
                        duration: Snackbar.LENGTH_LONG,
                    });
                }, 200)
            }
        });
    }

    render() {
        var { 
            singleFileOBJ, 
            categories, 
            subCategories, 
            subCategoryDefaultIndex, 
            subCategoryDisabled, 
            subCategoryDefaultValue, 
            showDatePicker, 
            defaultDate,
            location,
            description,
            dateToSet,
            showLoader
         } = this.state;
        return(
            <Block style={{height: "100%", backgroundColor: colors.mainColor}}>
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
                                <Input placeholder="Repair my cycle" onChangeText={(text) => this.setState({title: text})} />
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
                                        defaultValue={subCategoryDefaultValue}
                                        animated={false}
                                        disabled={subCategoryDisabled}
                                        showsVerticalScrollIndicator={true}
                                        textStyle={{fontSize: 15, color: colors.mainColor, alignItems: "center", paddingHorizontal: wp(5), paddingVertical: 8}}
                                        dropdownStyle={{width: "auto"}}
                                        dropdownTextStyle={{fontSize: 12, alignItems: "center", paddingHorizontal: wp(5)}}
                                    />
                                </Block>
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Location *</Text>
                                <Input placeholder="Lahore" value={location} contextMenuHidden={true} onChangeText={(location) => this.handleLocationChange(location)} />
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Due Date *</Text>
                                <TouchableOpacity onPress={() => this.launchDatePicker()}>
                                    <Block style={{height: 45, marginTop: "2%", backgroundColor: "#FFFFFF", borderRadius: 8, alignItems: "center", paddingTop: "3%"}}>
                                        <Text style={{color: colors.mainColor}} size={16}>{dateToSet}</Text>
                                    </Block>
                                </TouchableOpacity>
                                {showDatePicker && (
                                    <DateTimePicker
                                        testID="dateTimePicker"
                                        timeZoneOffsetInMinutes={0}
                                        value={defaultDate}
                                        mode="date"
                                        is24Hour={true}
                                        display="default"
                                        minimumDate={Date.now()}
                                        onChange={(date) => this.handleDueDateChange(date)}
                                  />
                                )}
                                
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">People Required *</Text>
                                <Input placeholder="5" keyboardType={'numeric'} contextMenuHidden={true} onChangeText={(people) => this.handleNumericInput("peopleRequired", people)} />
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Estimated Budget *</Text>
                                <Input placeholder="$786" keyboardType={'numeric'} contextMenuHidden={true} onChangeText={(budget) => this.handleNumericInput("budget", budget)} />
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Upload File</Text>
                                <TouchableOpacity onPress={() => this.setState({showFilePicker: true})}>
                                    <Block style={{height: 45, marginTop: "2%", backgroundColor: "#FFFFFF", borderRadius: 8, alignItems: "center", paddingTop: "3%"}}>
                                        <Text style={{color: colors.mainColor}} size={16}>{singleFileOBJ ? singleFileOBJ: "Select Media File"}</Text>
                                    </Block>
                                </TouchableOpacity>
                                <RNFileSelector title={"Select File"} visible={this.state.showFilePicker} onDone={(path) => {
                                    console.log("file selected: " + path);
                                    let urlSiplit = path.split('/');
                                    let name = urlSiplit[urlSiplit.length - 1];
                                    this.setState({mediaPath: path, showFilePicker: false, singleFileOBJ: name})
                                }} onCancel={() => {
                                    console.log("cancelled");
                                }}/>
                            </Block>

                            <Block style={{marginTop: "2%"}}>
                                <Text size={14} color="#FFFFFF">Description *</Text>
                                <TextInput
                                    style={[styles.loginScreenInputField, {backgroundColor: "#FFFFFF", borderRadius: 8, marginTop: 8}]}
                                    multiline={true}
                                    numberOfLines={5}
                                    value={description}
                                    onChangeText={(text) => this.setState({description: text})}
                                    placeholder="Write what best describes your task"/>
                            </Block>
                            
                            <Block style={{marginTop: "5%", marginBottom: "12%"}}>
                                
                                    <Block style={{backgroundColor: "#FFFFFF", height: 70, width: 70, borderRadius: 50, paddingVertical: 22, paddingHorizontal: 25}}>
                                        <Icon name="arrow-right" color={colors.mainColor} size={24} onPress={() => this.handleFormSubmit()} />
                                    </Block>
                                
                            </Block>
                        </ScrollView>
                    </Block>
                    
                </Block>
            </Block>
        );
    }
}

const mapStateToProps = state => {
    return { user: state.user }
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateUser: user => dispatch(updateUser(user))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(AddTaskScreen)