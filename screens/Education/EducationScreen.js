import React from 'react';
import autoBind from 'react-autobind';
import { Block, Text, Input, Button } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import styles, { colors, wp } from '../introduction/slider/styles/index.style.js';
import { StatusBar, Alert, ScrollView } from "react-native";
import ModalDropdown from 'react-native-modal-dropdown';
import DocumentPicker from 'react-native-document-picker';

const StatusHeight = StatusBar.currentHeight;

export default class EducationScreen extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);

        this.state = {
            showEditSection: false,
            singleFileOBJ: '',
        }
    }

    async SingleFilePicker() {
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

    switchScreen = () => {
        var { showEditSection } = this.state;
        this.setState({ showEditSection: !showEditSection })
    }

    render() {
        var { showEditSection, singleFileOBJ } = this.state;
        return(
            <Block style={{height: "100%", backgroundColor: "#FFFFFF"}}>
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
                                    <Text size={20} >Bachelors of Science</Text>
                                </Block>
                                <Block style={{marginTop: "5%", marginBottom: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                    <Text size={20} >Computer Science</Text>
                                </Block>
                            </Block>

                            <Block style={{marginHorizontal: wp(5), marginTop: "7%"}}>
                                <Block>
                                    <Text color={colors.mainColor}>Portfolio:</Text>
                                </Block>
                                <Block style={{backgroundColor: "#DEEAF8", height: "auto", marginTop: "3%", borderRadius: 20}}>
                                    <Block style={{marginTop: "5%", marginBottom: "5%", marginHorizontal: wp(10), alignItems: "center"}}>
                                        <Text size={20} >Potfolio.docx</Text>
                                    </Block>
                                </Block>
                            </Block>
                        </Block> :
                        
                        <Block style={{marginHorizontal: wp(5), alignItems: "center", height: "auto", marginTop: "7%"}}>
                            <Block style={{marginTop: "3%", width: "100%"}}>
                                <Text size={12} color={colors.mainColor} >Degree Title</Text>
                                <Block style={{backgroundColor: colors.mainColor, marginTop: "3%"}}>
                                    <ModalDropdown 
                                        style={{width: "100%"}}
                                        options={['Male Female Female Female Female', 'Female', 'Other', 'Male', 'Female', 'Other', 'Male', 'Female', 'Other', 'Male', 'Female', 'Other']}
                                        defaultIndex={0}
                                        defaultValue="Select Degree Title"
                                        animated={false}
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
                                        options={['Male Female Female Female Female', 'Female', 'Other', 'Male', 'Female', 'Other', 'Male', 'Female', 'Other', 'Male', 'Female', 'Other']}
                                        defaultIndex={0}
                                        defaultValue="Select Degree Title"
                                        animated={false}
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
                                    <Icon size={70} name="upload" onPress={() => this.SingleFilePicker()} />
                                </Block>

                                <Block style={{alignItems: "center", paddingTop: "3%"}}>
                                    <Text>{singleFileOBJ.name}</Text>
                                </Block>
                            </Block>
                        </Block>}
                    </ScrollView>
                </Block>

                <Block style={{marginHorizontal: wp(5), bottom: "5%", position: "absolute", alignItems: "center"}}>
                    <Button onPress={() => this.switchScreen()} color={colors.mainColor}>{!showEditSection ? 'Edit' : 'Submit'}</Button>
                </Block>
            </Block>
        );
    }
}