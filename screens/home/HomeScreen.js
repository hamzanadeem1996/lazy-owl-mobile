import React from 'react';
import { View, StatusBar, ScrollView, Dimensions, TouchableWithoutFeedback, FlatList, ActivityIndicator, PermissionsAndroid, RefreshControl, ImageBackground, Image } from 'react-native';
import autoBind from 'react-autobind';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import * as eva from '@eva-design/eva';
import { Card, ApplicationProvider, Divider, Text, Layout, Button } from '@ui-kitten/components';
import { SearchBar } from 'react-native-elements';
import { BottomNavigator }  from  "../../components/BottomNavigation.js";
import { Block, Input } from 'galio-framework';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import { getUnassignedTasks, postBidOnTask } from "../../services/TaskServices.js";
import RNFetchBlob from 'rn-fetch-blob';
import Snackbar from 'react-native-snackbar';
import * as db from "../../database/index.js";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;
const StatusHeight = StatusBar.currentHeight;
export default class TestScreen extends React.Component {
    constructor(props){
        super();
        autoBind(this);
        this.state = {
            user: null,
            search: '',
            isModalVisible: false,
            isBidModalVisible: false,
            loading: false,
            isListEnd: false,
            serverData: [],
            copyServerData: [],
            fetching_from_server: false,
            modalContent: null,
            externalStorageAllowed: false,
            refreshing: false,
            bidAmount: null,
            mediaFile: null,
            firebaseImageUri: null,
            isImageModalVisible: false
        }
        this.offset = null;
        this.limit = 5;
    }

    componentDidMount = async () => {
        let state = this.props.screenProps.store.getState();
        let user = state.UserReducer.user;
        this.setState({user: user})
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
                title: "Lazy Owl External Storage Permission",
                message:
                    "Lazy Owl App needs access to your External Storage " +
                    "so you can store media.",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
            }
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            this.setState({externalStorageAllowed: granted});
        }
        this.loadMoreData();
    }

    updateSearch = search => { 
        this.setState({ search });
        this.searchFilterFunction(search);
    };

    toggleModal = (data) => {
        let name = null;
        if (data.media_url){
            if (data.media_url.indexOf("firebasestorage") > 0) {
                name = "Download File"
            } else {
                let urlSiplit = data.media_url.split('/');
                name = urlSiplit[urlSiplit.length - 1];
            }
            
        }
        this.setState({isModalVisible: !this.state.isModalVisible, modalContent: data, mediaFile: name});
    };

    toggleBidModal = () => {
        this.setState({isBidModalVisible: !this.state.isBidModalVisible});
    };

    switchToUserProfile = () => {
        this.toggleModal();
        this.props.navigation.navigate('UserProfileScreen');
    }

    downloadMediaFile = async (url) => { 
        if (this.state.externalStorageAllowed === PermissionsAndroid.RESULTS.GRANTED) {
            var date      = new Date();
            var ext       = this.extention(url);
            console.log(ext);
            ext = "."+ext[0];
            const { config, fs } = RNFetchBlob
            let PictureDir = fs.dirs.PictureDir
            let options = {
                fileCache: true,
                addAndroidDownloads : {
                    useDownloadManager : true,
                    notification : true,
                    path:  PictureDir + "/image_"+Math.floor(date.getTime() + date.getSeconds() / 2)+ext,
                    description : 'Image'
                }
            } 

            if (url.indexOf("firebasestorage") > 0) { console.log(url)
                this.setState({firebaseImageUri: url, isImageModalVisible: true})
            } else {
                config(options).fetch('GET', url).then((res) => {
                    Snackbar.show({
                        text: 'Media Downloaded Successfully!',
                        duration: Snackbar.LENGTH_LONG,
                    });
                });
            }
            
        } else {
            Snackbar.show({
                text: 'Please allow external storage permission from settings!',
                duration: Snackbar.LENGTH_LONG,
            });
        }
        
    }

    extention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

    getLoggedInUser = async () => {
        return new Promise(async (resolve) => {
            let user = null;
            let state = this.props.screenProps.store.getState();
            user = state.UserReducer.user;
            
            if (!user) {
                db.getUserData(userResponse => { 
                    if (userResponse) {
                        user = userResponse;
                        resolve(user);
                    }
                });
            } else {
                resolve(user);
            }
        })
    }

    loadMoreData = async (offset = null, limit = null) => { 
        if (!this.state.fetching_from_server && !this.state.isListEnd) {
            
            let finalOffset = null;
            let finalLimit = this.limit;
            
            if (this.offset) {
                finalOffset = this.offset;
            }

            this.setState({ fetching_from_server: true });
            
            if (offset && limit) {
                finalOffset = offset;
                finalLimit = limit;
            } 
            console.log("OFFSET :", this.offset); 

            this.getLoggedInUser().then(responseUser => {
                if (responseUser) {
                    getUnassignedTasks(responseUser.id, finalOffset, finalLimit).then(response => {  
                        if (response.status === 200 && response.tasks.length > 0) {
                            
                            if (!(offset && limit)) { 
                                if (this.offset) {
                                    this.offset = this.offset + this.limit;
                                } else {
                                    this.offset = this.limit;
                                }
                            }
                            
                            this.setState({
                                serverData: [...this.state.serverData, ...response.tasks],
                                copyServerData: [...this.state.copyServerData, ...response.tasks],
                                fetching_from_server: false,
                            });
                            
                        } else {
                            this.setState({
                                fetching_from_server: false,
                                isListEnd: true,
                            });
                        }
                    });
                }
            })
        }
    }

    onRefresh = async () => { 
        this.setState({refreshing: true, fetching_from_server: false, isListEnd: false, serverData: [], copyServerData: []});
            try {
                this.offset = 1;
                this.loadMoreData(1, this.limit);
                setTimeout(() => {
                    this.setState({refreshing: false});
                }, 1500);
            } catch (error) {
                console.error(error);
            }
    }

    searchFilterFunction = text => {    
        const newData = this.state.copyServerData.filter(item => {  

            const itemData = `${item.title.toUpperCase()}`;
            const textData = text.toUpperCase();
            
            return itemData.indexOf(textData) > -1;    
        });
        
        this.setState({ serverData: newData });  
    };

    handleSearchCancel = () => { 
        this.offset = 1;
        this.loadMoreData(1, this.limit)
    }

    updateBidText = (bidAmount) => {
        this.setState({ bidAmount });
    }

    handleBidSubmit = async () => {
        var { bidAmount, modalContent } = this.state;
        if (!bidAmount || bidAmount === 0 || bidAmount === "0") {
            Snackbar.show({
                text: 'Please enter bid amount greater than 0',
                duration: Snackbar.LENGTH_LONG,
            });
        } else {
            let state = this.props.screenProps.store.getState();
            let user = state.UserReducer.user;
    
            let data = {
                userId: user.id,
                token: user.token,
                projectId: modalContent.id,
                amount: bidAmount
            }
    
            postBidOnTask(data).then(response => { console.log(response);
                if (response.status === 200) {
                    this.setState({isBidModalVisible: false, bidAmount: null});
                    setTimeout(() => {
                        Snackbar.show({
                            text: 'Bid posted successfully!',
                            duration: Snackbar.LENGTH_LONG,
                        });
                    }, 1000)
                } else {
                    this.setState({isBidModalVisible: false, bidAmount: null});
                    setTimeout(() => {
                        Snackbar.show({
                            text: response.message,
                            duration: Snackbar.LENGTH_LONG,
                        });
                    }, 1000)
                }
            });
        }
        
    }

    toggleImageModal = () => {
        this.setState({isImageModalVisible: false})
    }

    renderFooter() {
        return (
          <View style={{
                // height: "100%",
                padding: 10,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
                backgroundColor: "#FFFFFF"
          }}>
            {this.state.fetching_from_server ? (
                <Block>
                    <ActivityIndicator color={colors.mainColor} style={{ margin: 15 }} />
                </Block>
            ) : null}
          </View>
        );
      }

    CardHeader = (props, data) => {
        return(
            <View {...props}>
                <Block style={{paddingVertical: "3%"}}>
                    <Text category='h6'>{data.title}</Text>
                </Block>
                <Divider />
                
                <Block style={{display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                    <Block style={{paddingTop: "2%"}}>
                        <Text category='s1'>{data.category}</Text>
                        <Text category='s1'>{data.sub_category}</Text>
                    </Block>
                    <Block style={{paddingTop: "2%", alignItems: "flex-end"}}>
                        <Text category='s1' style={{color: colors.mainColor}}>${data.budget}</Text>
                        <Text category='s1'>{data.location}</Text>
                    </Block>
                </Block>
                
            </View>
        );
    }

    CardFooter = (props, data) => {
        return(
            <View {...props} style={[props.style, styles.footerContainer]}>
                
                <Button
                    onPress={() => this.toggleModal(data)}
                    style={[styles.footerControl, {backgroundColor: colors.mainColor, borderColor: colors.mainColor}]}
                    size='small'>
                    Details
                </Button>
            </View>
        );
    }

    render(){

        const { search, modalContent, refreshing, bidAmount, isBidModalVisible, mediaFile, firebaseImageUri, isImageModalVisible } = this.state;

        return(
            
            <ApplicationProvider {...eva} theme={eva.light}>
                <SearchBar
                    containerStyle={{backgroundColor: "white", height: 40, marginTop: 0}}
                    inputContainerStyle={{backgroundColor: "white"}}
                    placeholder="Search Active Tasks"
                    lightTheme={true}
                    cancelIcon={true}
                    clearIcon={{name: 'clear'}}
                    onChangeText={(text) => this.updateSearch(text)}
                    value={search}
                    onClear={this.handleSearchCancel}
                    onCancel={this.handleSearchCancel}
                />
                <Modal 
                    isVisible={isImageModalVisible}
                    animationInTiming={100}
                    animationOutTiming={100}
                    backdropTransitionOutTiming={100}
                    coverScreen={true}
                    scrollHorizontal={true}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    useNativeDriver={true}
                    propagateSwipe
                    onBackdropPress={this.toggleImageModal}
                    onBackButtonPress={this.toggleImageModal}
                >
                    <Block style={{height: "100%"}}>
                        <Image source={{uri: firebaseImageUri}} style={{height: "100%"}} />
                    </Block>
                    
                </Modal>
                <Modal 
                    isVisible={isBidModalVisible}
                    animationInTiming={700}
                    animationOutTiming={500}
                    backdropTransitionOutTiming={400}
                    coverScreen={true}
                    scrollHorizontal={true}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    useNativeDriver={true}
                    propagateSwipe
                    onBackdropPress={this.toggleBidModal}
                    onBackButtonPress={this.toggleBidModal}
                >
                    <Block style={{height: "50%", backgroundColor: "#FFFFFF", borderRadius: 15}}>
                        <ScrollView style={{height: "100%"}} showsHorizontalScrollIndicator={false}>
                            <Block style={{paddingVertical: "10%", alignItems: "center", justifyContent:"center", marginHorizontal: wp(5)}}>
                                <Text style={{color: colors.mainColor}}>Enter Bid Amount</Text>
                                <Input 
                                    style={{marginBottom: "5%"}}
                                    placeholder="$999" 
                                    value={bidAmount}
                                    keyboardType={'numeric'}
                                    onChangeText={(text) => this.updateBidText(text)} 
                                />
                                <Button
                                    onPress={this.handleBidSubmit}
                                    style={[styles.footerControl, {backgroundColor: colors.mainColor, borderColor: colors.mainColor}]}
                                    size='small'>
                                    Submit
                                </Button>
                            </Block>
                        </ScrollView>
                        
                    </Block>
                </Modal>

                <Modal 
                    isVisible={this.state.isModalVisible}
                    animationInTiming={400}
                    animationOutTiming={400}
                    backdropTransitionOutTiming={400}
                    coverScreen={true}
                    scrollHorizontal={true}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    useNativeDriver={true}
                    propagateSwipe
                    onBackdropPress={this.toggleModal}
                    onBackButtonPress={this.toggleModal}
                >
                    <Block style={{backgroundColor: "#FFFFFF", height: "100%", bottom: 0, marginTop: "0%", borderRadius: 15}}>
                        <Block style={{marginHorizontal: wp(5), marginTop: "2%"}}>
                            

                            <Block style={{height: "100%"}}>
                                <ScrollView style={{height: "100%"}} showsHorizontalScrollIndicator={false}>
                                    <Block style={{marginTop: "2%", alignItems: "center"}}>
                                        <Text category='h5' style={{color: colors.mainColor}}>{modalContent ? modalContent.title: ""}</Text>
                                    </Block>

                                    <Block style={{alignItems: "center", marginTop: "2%"}}>
                                        <Text>{modalContent ? modalContent.category: ""}</Text>
                                        <Text style={{marginTop: "1%"}}>{modalContent ? modalContent.sub_category: ""}</Text>
                                    </Block>

                                    <Divider style={{marginTop: "1%"}} />

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Location:</Text>
                                        </Block>

                                        <Block>
                                            <Text>{modalContent ? modalContent.location: ""}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Budget:</Text>
                                        </Block>

                                        <Block>
                                            <Text>${modalContent ? modalContent.budget: ""}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>People Required:</Text>
                                        </Block>

                                        <Block>
                                            <Text>{modalContent ? modalContent.people_required: ""}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Due Date:</Text>
                                        </Block>

                                        <Block>
                                            <Text>{modalContent ? modalContent.due_date: ""}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Status:</Text>
                                        </Block>

                                        <Block>
                                            <Text style={{color: "#00ff00"}}>{modalContent ? modalContent.status === 1 ? "Active":"" : ""}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Assigned:</Text>
                                        </Block>

                                        <Block>
                                            <Text style={{color: "#4449d5"}}>{modalContent ? modalContent.assigned_to === null ? "Unassigned": "Assigned" : ""}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Media:</Text>
                                        </Block>

                                        <Block>
                                            {modalContent && modalContent.media ? (
                                                <Text style={{color: colors.mainColor}} onPress={() => this.downloadMediaFile(modalContent.media_url)}><Icon name="download" size={12}></Icon> {modalContent ? modalContent.media ? mediaFile: "No Media": ""}</Text>
                                            ) : ( 
                                                <Text style={{color: colors.mainColor}}>No Media</Text>
                                            )}
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Posted on:</Text>
                                        </Block>

                                        <Block>
                                            <Text>{modalContent ? modalContent.created_at: ""}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Posted By:</Text>
                                        </Block>

                                        <Block>
                                            <TouchableWithoutFeedback>
                                                <Text style={{color: colors.mainColor}}>
                                                    {modalContent ? modalContent.posted_by: ""}
                                                </Text>
                                            </TouchableWithoutFeedback>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%"}}>
                                        <Block>
                                            <Text>Description:</Text>
                                        </Block>

                                        <Block>
                                            <Text>
                                                {modalContent ? modalContent.description: ""}
                                            </Text>
                                        </Block>
                                    </Block>

                                    <Button
                                        style={[styles.footerControl, {backgroundColor: colors.mainColor, borderColor: colors.mainColor, marginTop: "15%"}]}
                                        onPress={() => this.toggleBidModal()}
                                    >
                                        BID ON THIS
                                    </Button>
                                </ScrollView>
                            </Block>
                        </Block>
                        
                        
                    </Block>
                </Modal>

                {this.state.loading ? (
                        <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
                            <ActivityIndicator size="large" color={colors.mainColor} />
                        </Block>
                    ) : (
                        <FlatList
                            style={{ width: '100%' }}
                            keyExtractor={(item, index) => index.toString()}
                            data={this.state.serverData}
                            onEndReached={() => this.loadMoreData()}
                            onEndReachedThreshold={0.5}
                            renderItem={({ item, index }) => (
                                <Layout style={{flex: 1, justifyContent: 'center', width: "100%"}} key={item.id}>
                                    <Card style={styles.card} header={(props) => this.CardHeader(props, item)} footer={(props) => this.CardFooter(props, item)}>
                                        <Text>
                                            {item.description}
                                        </Text>
                                    </Card>
                                </Layout>
                            )}
                            ListFooterComponent={this.renderFooter}
                            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={this.onRefresh} />}
                        />
                )}

                <BottomNavigator navigator={this.props} user={this.state.user} />

            </ApplicationProvider>
            
        );
    }
}