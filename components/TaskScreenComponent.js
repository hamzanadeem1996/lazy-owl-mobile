import React from 'react';
import { View, ScrollView, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Layout, Divider, Button, Card } from '@ui-kitten/components';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Block, Text } from 'galio-framework';
import styles, { colors, wp } from "../screens/introduction/slider/styles/index.style.js";
import Modal from 'react-native-modal';
import autoBind from 'react-autobind';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight = Dimensions.get("window").height;

export default class TaskScreenComponent extends React.Component {
    constructor(props) {
        super(props);
        autoBind(this);
        this.state = {
            isModalVisible: false,
            isDeleteModalVisible: false,
            modalContent: null,
            selectedTask: null
        }
    }

    handleTggleModal = (data) => {
        this.setState({isModalVisible: !this.state.isModalVisible, modalContent: data});
    }

    handleTggleDeleteModal = () => {
        this.setState({isDeleteModalVisible: !this.state.isDeleteModalVisible});
    }

    handleTaskSelect = (data) => {
        
    }

    cardHeader = (props, data) => { console.log(data)
        return (
            <View {...props}>
                <Block style={{paddingVertical: "3%"}}>
                    <Text category='h6'>{data.posted_by}</Text>
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

    modalFooter = (props, data) => {
        return (
            <View {...props} style={[props.style, styles.footerContainer]}>
                <TouchableWithoutFeedback onPress={() => this.handleTggleModal(data)}>
                    <Icon name="eye" size={20} style={{padding: "3%"}}></Icon>
                </TouchableWithoutFeedback>
                
                {/* <TouchableWithoutFeedback onPress={() => this.props.props.navigation.navigate('AddTaskScreen')}>
                    <Icon name="edit" size={20} style={{padding: "3%"}}></Icon>
                </TouchableWithoutFeedback> */}
    
                {/* <TouchableWithoutFeedback onPress={() => this.props.props.navigation.navigate('TaskBidsScreen')}>
                    <Icon name="gavel" size={20} style={{padding: "3%"}}></Icon>
                </TouchableWithoutFeedback>
    
                <TouchableWithoutFeedback onPress={this.handleTggleDeleteModal}>
                    <Icon name="trash" size={20} style={{padding: "3%"}}></Icon>
                </TouchableWithoutFeedback>
    
                <TouchableWithoutFeedback onPress={() => this.props.props.navigation.navigate('TaskComplainScreen')}>
                    <Icon name="envelope" size={20} style={{padding: "3%"}}></Icon>
                </TouchableWithoutFeedback> */}
            </View>
        );
    }

    render() {

        var { cards } = this.props;
        var { isModalVisible, isDeleteModalVisible, modalContent } = this.state;

        return(
            <Block style={{height: "100%"}}>
                {/* Delete Modal */}
                <Modal 
                    isVisible={isDeleteModalVisible}
                    animationInTiming={400}
                    animationOutTiming={400}
                    backdropTransitionOutTiming={400}
                    coverScreen={true}
                    scrollHorizontal={true}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    useNativeDriver={true}
                    propagateSwipe
                    onBackdropPress={ this.handleTggleDeleteModal}
                    onBackButtonPress={ this.handleTggleDeleteModal}
                >
                    <Block style={{height: "30%", backgroundColor: "#FFFFFF", borderRadius: 15}}>
                        <ScrollView style={{height: "100%"}} showsHorizontalScrollIndicator={false}>
                            <Block style={{paddingVertical: "15%", marginHorizontal: wp(5)}}>

                                <Block style={{alignItems: "center", marginBottom: "10%"}}>
                                    <Text style={{color: colors.mainColor}}>Are you sure you want to delete this task?</Text>
                                </Block>

                                <Block style={{display: "flex", flexDirection: "row", justifyContent:'space-between', marginHorizontal: wp(18)}}>
                                    <Button
                                        onPress={this.handleTggleDeleteModal}
                                        style={[{backgroundColor: "#a9a9a9", borderColor: "#a9a9a9"}]}
                                        size='small'>
                                        Cancel
                                    </Button>
                                    <Button
                                        onPress={this.handleTggleDeleteModal}
                                        style={[{backgroundColor: "#F00", borderColor: "#F00", }]}
                                        size='small'>
                                        Delete
                                    </Button>
                                </Block>
                                
                            </Block>
                        </ScrollView>
                    </Block>

                </Modal>

                {/* Details Modal */}
                <Modal 
                    isVisible={isModalVisible}
                    animationInTiming={400}
                    animationOutTiming={400}
                    backdropTransitionOutTiming={400}
                    coverScreen={true}
                    scrollHorizontal={true}
                    deviceWidth={deviceWidth}
                    deviceHeight={deviceHeight}
                    useNativeDriver={true}
                    propagateSwipe
                    onBackdropPress={ this.handleTggleModal}
                    onBackButtonPress={ this.handleTggleModal}
                >
                    <Block style={{backgroundColor: "#FFFFFF", height: "100%", bottom: 0, marginTop: "0%", borderRadius: 15}}>
                        <Block style={{marginHorizontal: wp(5), marginTop: "2%"}}>
                            

                            <Block style={{height: "100%"}}>
                                <ScrollView style={{height: "100%"}} showsHorizontalScrollIndicator={false}>
                                    <Block style={{marginTop: "2%", alignItems: "center"}}>
                                        <Text category='h5' style={{color: colors.mainColor}}>{modalContent ? modalContent.title: "-"}</Text>
                                    </Block>

                                    <Block style={{alignItems: "center", marginTop: "2%"}}>
                                        <Text>{modalContent ? modalContent.category: "-"}</Text>
                                        <Text style={{marginTop: "1%"}}>{modalContent ? modalContent.sub_category: "-"}</Text>
                                    </Block>

                                    <Divider style={{marginTop: "1%"}} />

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Location:</Text>
                                        </Block>

                                        <Block>
                                            <Text>{modalContent ? modalContent.location: "-"}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Budget:</Text>
                                        </Block>

                                        <Block>
                                            <Text>${modalContent ? modalContent.budget: "-"}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>People Required:</Text>
                                        </Block>

                                        <Block>
                                            <Text>{modalContent ? modalContent.people_required: "-"}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Due Date:</Text>
                                        </Block>

                                        <Block>
                                            <Text>{modalContent ? modalContent.due_date: "-"}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Status:</Text>
                                        </Block>

                                        <Block>
                                            <Text style={{color: "#00ff00"}}>{modalContent ? modalContent.status === 1 ? "Active" : "Not Active" : "-"}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Assigned:</Text>
                                        </Block>

                                        <Block>
                                            <Text style={{color: "#4449d5"}}>{modalContent ? modalContent.assigned_to ? "Assigned" : "Unassigned" : "-"}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Media:</Text>
                                        </Block>

                                        <Block>
                                            <Text style={{color: colors.mainColor}}><Icon name="download" size={12}></Icon> file.png</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Posted on:</Text>
                                        </Block>

                                        <Block>
                                            <Text>{modalContent ? modalContent.created_at: "-"}</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Posted By:</Text>
                                        </Block>

                                        <Block>
                                            <Text style={{color: colors.mainColor}}>
                                                {modalContent ? modalContent.posted_by: "-"}
                                            </Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%"}}>
                                        <Block>
                                            <Text>Description:</Text>
                                        </Block>

                                        <Block>
                                            <Text>
                                                {modalContent ? modalContent.description: "-"}
                                            </Text>
                                        </Block>
                                    </Block>

                                    {/* <Button
                                        style={[styles.footerControl, {backgroundColor: colors.mainColor, borderColor: colors.mainColor, marginTop: "15%"}]}
                                        // onPress={() => this.toggleBidModal()}
                                    >
                                        BID ON THIS
                                    </Button> */}
                                </ScrollView>
                            </Block>
                        </Block>
                    </Block>
                </Modal>

                <ScrollView style={{height: "100%"}}>
                    {cards && cards.length > 0 && cards.map((key, value) => {
                        return(
                            <Layout style={{flex: 1, justifyContent: 'center'}}>
                                <Card style={styles.card} header={(props) => this.cardHeader(props, key)} footer={(props) => this.modalFooter(props, key)}>
                                    <Text>
                                        {key.description}
                                    </Text>
                                </Card>
                            </Layout>
                        );
                    })}
                    <Block style={{marginBottom: "20%"}}>

                    </Block>
                </ScrollView>
            </Block>
        );
    }
}