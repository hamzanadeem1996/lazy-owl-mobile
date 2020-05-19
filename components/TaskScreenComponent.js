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
        }
    }

    handleTggleModal = () => {
        this.setState({isModalVisible: !this.state.isModalVisible});
    }

    handleTggleDeleteModal = () => {
        this.setState({isDeleteModalVisible: !this.state.isDeleteModalVisible});
    }

    render() {

        var { cards } = this.props;
        var { isModalVisible, isDeleteModalVisible } = this.state;

        const Header = (props) => (
            <View {...props}>
                <Block style={{paddingVertical: "3%"}}>
                    <Text category='h6'>Hamza Nadeem</Text>
                </Block>
                <Divider />
                
                <Block style={{display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                    <Block style={{paddingTop: "2%"}}>
                        <Text category='s1'>Electronics</Text>
                        <Text category='s1'>Washing Machine</Text>
                    </Block>
                    <Block style={{paddingTop: "2%", alignItems: "flex-end"}}>
                        <Text category='s1' style={{color: colors.mainColor}}>$66889</Text>
                        <Text category='s1'>Lahore</Text>
                    </Block>
                </Block>
                
            </View>
            );
        
            const Footer = (props) => (
                <View {...props} style={[props.style, styles.footerContainer]}>
                    <TouchableWithoutFeedback onPress={this.handleTggleModal}>
                        <Icon name="eye" size={20} style={{padding: "3%"}}></Icon>
                    </TouchableWithoutFeedback>
                    
                    <TouchableWithoutFeedback onPress={() => this.props.props.navigation.navigate('AddTaskScreen')}>
                        <Icon name="edit" size={20} style={{padding: "3%"}}></Icon>
                    </TouchableWithoutFeedback>
        
                    <TouchableWithoutFeedback onPress={() => this.props.props.navigation.navigate('TaskBidsScreen')}>
                        <Icon name="gavel" size={20} style={{padding: "3%"}}></Icon>
                    </TouchableWithoutFeedback>
        
                    <TouchableWithoutFeedback onPress={this.handleTggleDeleteModal}>
                        <Icon name="trash" size={20} style={{padding: "3%"}}></Icon>
                    </TouchableWithoutFeedback>
        
                    <TouchableWithoutFeedback onPress={() => this.props.props.navigation.navigate('TaskComplainScreen')}>
                        <Icon name="envelope" size={20} style={{padding: "3%"}}></Icon>
                    </TouchableWithoutFeedback>
                </View>
            );

        return(
            <Block>
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
                                        <Text category='h5' style={{color: colors.mainColor}}>Project Title</Text>
                                    </Block>

                                    <Block style={{alignItems: "center", marginTop: "2%"}}>
                                        <Text>Category</Text>
                                        <Text style={{marginTop: "1%"}}>Sub Category</Text>
                                    </Block>

                                    <Divider style={{marginTop: "1%"}} />

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Location:</Text>
                                        </Block>

                                        <Block>
                                            <Text>Lahore</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Budget:</Text>
                                        </Block>

                                        <Block>
                                            <Text>$467688</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>People Required:</Text>
                                        </Block>

                                        <Block>
                                            <Text>6</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Due Date:</Text>
                                        </Block>

                                        <Block>
                                            <Text>12-12-2019</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Status:</Text>
                                        </Block>

                                        <Block>
                                            <Text style={{color: "#00ff00"}}>Active</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Assigned:</Text>
                                        </Block>

                                        <Block>
                                            <Text style={{color: "#4449d5"}}>Unassigned</Text>
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
                                            <Text>12-12-2019</Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%", display: "flex", flexDirection: "row", justifyContent:'space-between'}}>
                                        <Block>
                                            <Text>Posted By:</Text>
                                        </Block>

                                        <Block>
                                            <Text style={{color: colors.mainColor}}>
                                                Hamza Nadeem
                                            </Text>
                                        </Block>
                                    </Block>

                                    <Block style={{marginTop: "4%"}}>
                                        <Block>
                                            <Text>Description:</Text>
                                        </Block>

                                        <Block>
                                            <Text>
                                                In a RGB color space, hex #00ff00 (also known as Green, Electric green) is composed of 0% red, 100% green and 0% blue. Whereas in a CMYK color space, it is composed of 100% cyan, 0% magenta, 100% yellow and 0% black. It has a hue angle of 120 degrees, a saturation of 100% and a lightness of 50%. #00ff00 color hex could be obtained by blending #00ff00 with #00ff00. #00ff00 (or #0f0) is a websafe color.
                                                In a RGB color space, hex #00ff00 (also known as Green, Electric green) is composed of 0% red, 100% green and 0% blue. Whereas in a CMYK color space, it is composed of 100% cyan, 0% magenta, 100% yellow and 0% black. It has a hue angle of 120 degrees, a saturation of 100% and a lightness of 50%. #00ff00 color hex could be obtained by blending #00ff00 with #00ff00. #00ff00 (or #0f0) is a websafe color.

                                            </Text>
                                        </Block>
                                    </Block>

                                    <Button
                                        style={[styles.footerControl, {backgroundColor: colors.mainColor, borderColor: colors.mainColor, marginTop: "15%"}]}
                                        // onPress={() => this.toggleBidModal()}
                                    >
                                        BID ON THIS
                                    </Button>
                                </ScrollView>
                            </Block>
                        </Block>
                    </Block>
                </Modal>

                <ScrollView>
                    {cards.map((key, value) => {
                        return(
                            <Layout style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Card style={styles.card} header={Header} footer={Footer}>
                                    <Text>
                                        The Maldives, officially the Republic of Maldives, is a small country in South Asia, located in the Arabian Sea
                                        of the Indian Ocean. It lies southwest of Sri Lanka and India, about 1,000 kilometres (620 mi) from the Asian
                                        continent
                                    </Text>
                                </Card>
                            </Layout>
                        );
                    })}
                </ScrollView>
            </Block>
        );
    }
}