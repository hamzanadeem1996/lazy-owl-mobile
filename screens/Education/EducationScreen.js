import React from 'react';
import autoBind from 'react-autobind';
import { Block, Text, Input, Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { StatusBar, Alert, ScrollView, TouchableOpacity, ActivityIndicator } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import DocumentPicker from 'react-native-document-picker';
import Modal from 'react-native-modal';
import Snackbar from 'react-native-snackbar';
import * as services from "../../services/UserServices.js";
import NetInfo from '@react-native-community/netinfo';
import { updateUser } from '../../actions/user.js';
import RNFetchBlob from 'rn-fetch-blob';
import RNFileSelector from 'react-native-file-selector';
import storage from '@react-native-firebase/storage';
import RNBackgroundDownloader from 'react-native-background-downloader';

const StatusHeight = StatusBar.currentHeight;
const FireBaseStorage = storage();
export default class EducationScreen extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            showEditSection: false,
            singleFileOBJ: '',
            showLoader: false,
            user: {},
            externalStorageAllowed: false,
            degreeList: [],
            degreeListRaw: [],
            selectedDegree: null,
            programmeList: [],
            programmeListRaw: [],
            selectedprogramme: null,
            isProgrammeDisabled: true,
            seletedPortfolio: null,
            showFilePicker: false
        }
    }

    componentDidMount = async () => {
        let state = this.props.screenProps.store.getState();
        let defaultUser = state.UserReducer.user;
        this.setState({user: defaultUser});

        services.getActiveDegrees(defaultUser).then(response => {
            if (response.status === 200 && response.degrees.length > 0) {
                let myArray = [];
                response.degrees.forEach(item => {
                    myArray.push(item.title);
                })
                this.setState({degreeList: myArray, degreeListRaw: response.degrees, isProgrammeDisabled: false});
            } 
        });
    }

    handleDegreeSelect = (index) => {
        let myArray = [];
        let allDegrees = this.state.degreeListRaw;
        allDegrees[index].degree_programme.forEach(item => {
            myArray.push(item.title);
        })
        this.setState({selectedDegree: allDegrees[index].id, programmeListRaw: allDegrees[index], programmeList: myArray});
    }

    handleProgrammeSelect = (index) => {
        this.setState({selectedprogramme: this.state.programmeListRaw.programmes[index].id})
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
        let { selectedDegree, selectedprogramme, seletedPortfolio, user, showEditSection, degreeList, programmeList, singleFileOBJ } = this.state;
        
        if (showEditSection) {
            if (this.checkNetInfo) {
                if ((selectedDegree && selectedprogramme) || seletedPortfolio) {
                    this.setState({showLoader: true});
                    if (seletedPortfolio) {
                        let fileExt = singleFileOBJ.split('.');
                        if (fileExt[1] === "png" || fileExt[1] === "jpg" || fileExt[1] === "jpeg" || fileExt[1] === "JPEG") {
                            this.uploadMediaToFireBase(seletedPortfolio).then(async fireBase => {
                                if (fireBase.err === 0) {
                                    this.setState({showLoader: false});
                                    console.log(fireBase);
                                    let defaultUser = {...user, 'portfolio_url': fireBase.url}
                                    let test = await this.props.screenProps.store.dispatch(
                                        updateUser(defaultUser)
                                    );
                                    let portfolioData = {
                                        id: user.id,
                                        token: user.token,
                                        portfolio_url: fireBase.url
                                    }
                                    services.updateUserPortfolio(portfolioData).then(responseServer => {
                                        if (responseServer.status !== 200) {
                                            this.setState({showEditSection: false});
                                            Snackbar.show({
                                                text: 'Please try again later!',
                                                duration: Snackbar.LENGTH_LONG,
                                            });
                                        } else {
                                            this.setState({showEditSection: false})
                                            Snackbar.show({
                                                text: responseServer.message,
                                                duration: Snackbar.LENGTH_LONG,
                                            });
                                        }
                                    })
                                    
                                } else {
                                    Snackbar.show({
                                        text: 'Please try again later!',
                                        duration: Snackbar.LENGTH_LONG,
                                    });
                                }
                            })
                        } else {
                            this.setState({showLoader: false})
                            setTimeout(() => {
                                Snackbar.show({
                                    text: 'You can only choose pictures to upload',
                                    duration: Snackbar.LENGTH_LONG,
                                });
                                return;
                            }, 200);
                            
                        }
                        
                    }

                    if (selectedDegree !== null && selectedprogramme !== null) {
                        this.setState({showLoader: true});
                        let data = {
                            degree: selectedDegree,
                            programme: selectedprogramme,
                            id: user.id,
                            token: user.token
                        }
                        
                        services.updateUserEducation(data).then(async response => {
                            if (response.status === 200) {
                                Snackbar.show({
                                    text: response.message,
                                    duration: Snackbar.LENGTH_LONG,
                                });
                                let defaultUser = {...user, 'degree_title': degreeList[selectedDegree]}
                                defaultUser = {...defaultUser, 'degree_programme_title': programmeList[selectedprogramme]}
                                let test = await this.props.screenProps.store.dispatch(
                                    updateUser(defaultUser)
                                );
                                this.setState({showEditSection: false})
                            } else {
                                Snackbar.show({
                                    text: 'Please try again later!',
                                    duration: Snackbar.LENGTH_LONG,
                                });
                            }
                        })
                    }

                   
                } else {
                    Snackbar.show({
                        text: 'Please select degree and programme title or portfolio!',
                        duration: Snackbar.LENGTH_LONG,
                    });
                }
            }
        } else {
            this.setState({showEditSection: true})
        }
    }

    downloadPortfolio = async (url) => { 
        this.setState({showLoader: true});
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
            let task = RNBackgroundDownloader.download({
                id: 'file123',
                url: url,
                destination: fs.dirs.PictureDir + "/image_"+Math.floor(date.getTime() + date.getSeconds() / 2) + ".png"
            }).begin((expectedBytes) => {
                console.log(`Going to download ${expectedBytes} bytes!`);
            }).progress((percent) => {
                console.log(`Downloaded: ${percent * 100}%`);
            }).done(() => {
                this.setState({showLoader: false});
                console.log('Download is done!');
                setTimeout(() => {
                    Snackbar.show({
                        text: 'Media Downloaded Successfully!',
                        duration: Snackbar.LENGTH_LONG,
                    });
                }, 200);
            }).error((error) => {
                this.setState({showLoader: false});
                console.log('Download canceled due to error: ', error);
                setTimeout(() => {
                    Snackbar.show({
                        text: 'Please try again later!',
                        duration: Snackbar.LENGTH_LONG,
                    });
                }, 200);
            });
        } else {
            config(options).fetch('GET', url).then((res) => {
                this.setState({showLoader: false});
                setTimeout(() => {
                    Snackbar.show({
                        text: 'Media Downloaded Successfully!',
                        duration: Snackbar.LENGTH_LONG,
                    });
                }, 200);
            });
        }
    }

    extention = (filename) => {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    }

    render() {
        var { showEditSection, singleFileOBJ, showLoader, user, degreeList, programmeList, isProgrammeDisabled, showFilePicker } = this.state;
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
                <Block style={{marginTop: StatusHeight + 5, height: "100%"}}>
                    <Block style={{marginHorizontal: wp(5), alignItems: "center"}}>
                        <Icon name="graduation-cap" color={colors.mainColor} size={150} />
                    </Block>
                    
                    <ScrollView>
                        {!showEditSection ? <Block>
                            <Block style={{marginHorizontal: wp(5), marginTop: "7%"}}>
                                <Text color={colors.mainColor}>Education:</Text>
                            </Block>
                            <Block style={{backgroundColor: "#DEEAF8", height: "auto", marginTop: "3%", borderRadius: 20, marginHorizontal: wp(5)}}>
                                <Block style={{marginTop: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                    <Text size={20} >{user.degree_title ? user.degree_title: "-"}</Text>
                                </Block>
                                <Block style={{marginTop: "5%", marginBottom: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                    <Text size={20} >{user.degree_programme_title ? user.degree_programme_title: "-"}</Text>
                                </Block>
                            </Block>

                            <Block style={{marginHorizontal: wp(5), marginTop: "7%"}}>
                                <Block>
                                    <Text color={colors.mainColor}>Portfolio:</Text>
                                </Block>
                                <TouchableOpacity onPress={() => this.downloadPortfolio(user.portfolio_url)}>
                                    <Block style={{backgroundColor: "#DEEAF8", height: "auto", marginTop: "3%", borderRadius: 20}}>
                                        <Block style={{marginTop: "5%", marginBottom: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                            <Text size={20}><Icon size={16} name="download" /> {user.portfolio_url ? "Download Portfolio": "-"}</Text>
                                        </Block>
                                    </Block>
                                </TouchableOpacity>
                            </Block>
                        </Block> :
                        
                        <Block style={{marginHorizontal: wp(5), alignItems: "center", height: "auto", marginTop: "7%"}}>
                            <Block style={{marginTop: "3%", width: "100%"}}>
                                <Text size={12} color={colors.mainColor} >Degree Title</Text>
                                <Block style={{backgroundColor: colors.mainColor, marginTop: "3%"}}>
                                    <ModalDropdown 
                                        style={{width: "100%"}}
                                        options={degreeList}
                                        defaultIndex={-1}
                                        defaultValue="Select Degree Title"
                                        animated={false}
                                        onSelect={(index) => this.handleDegreeSelect(index)}
                                        showsVerticalScrollIndicator={true}
                                        textStyle={{fontSize: 15, color: "#FFFFFF", alignItems: "center", paddingHorizontal: wp(5), paddingVertical: 8}}
                                        dropdownStyle={{width: "auto"}}
                                        dropdownTextStyle={{fontSize: 12, alignItems: "center", paddingHorizontal: wp(5)}}
                                    />
                                </Block>
                            </Block>
                            
                            <Block style={{marginTop: "3%", width: "100%"}}>
                                <Text size={12} color={colors.mainColor} >Programme Title</Text>
                                <Block style={{backgroundColor: colors.mainColor, marginTop: "3%"}}>
                                    <ModalDropdown 
                                        style={{width: "100%"}}
                                        options={programmeList}
                                        defaultIndex={-1}
                                        defaultValue="Select Programme Title"
                                        animated={false}
                                        onSelect={(index) => this.handleProgrammeSelect(index)}
                                        disabled={isProgrammeDisabled}
                                        showsVerticalScrollIndicator={true}
                                        textStyle={{fontSize: 15, color: "#FFFFFF", alignItems: "center", paddingHorizontal: wp(5), paddingVertical: 8}}
                                        dropdownStyle={{width: "auto"}}
                                        dropdownTextStyle={{fontSize: 12, alignItems: "center", paddingHorizontal: wp(5)}}
                                    />
                                </Block>
                            </Block>

                            <Block style={{backgroundColor: "#DEEAF8", height: "auto", width: "100%", marginTop: "7%", borderRadius: 20, marginHorizontal: wp(5)}}>
                                <Block style={{alignItems: "center", paddingTop: "2%"}}>
                                    <Text size={16}>Upload Portfolio</Text>
                                </Block>
                                
                                <Block style={{alignItems: "center", paddingTop: "10%"}}>
                                    <Icon size={70} name="upload" onPress={() => this.setState({showFilePicker: true})} />
                                    <RNFileSelector title={"Select File"} visible={showFilePicker} onDone={(path) => {
                                        console.log("file selected: " + path);
                                        let urlSiplit = path.split('/');
                                        let name = urlSiplit[urlSiplit.length - 1];
                                        this.setState({seletedPortfolio: path, showFilePicker: false, singleFileOBJ: name})
                                        }} onCancel={() => {
                                            console.log("cancelled");
                                        }}
                                    />
                                </Block>

                                <Block style={{alignItems: "center", paddingTop: "3%"}}>
                                    <Text>{singleFileOBJ}</Text>
                                </Block>
                            </Block>
                        </Block>}
                    </ScrollView>
                </Block>

                <Block style={{marginHorizontal: wp(5), bottom: "5%", position: "absolute", alignItems: "center"}}>
                    <Button onPress={() => this.handleFormSubmit()} color={colors.mainColor}>{!showEditSection ? 'Edit' : 'Submit'}</Button>
                </Block>
            </Block>
        );
    }
}