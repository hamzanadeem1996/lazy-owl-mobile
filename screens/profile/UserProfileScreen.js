import React from 'react';
import { StatusBar, ScrollView, Dimensions, StyleSheet, ImageBackground, Platform} from 'react-native';
import autoBind from 'react-autobind';
import { colors, wp } from '../introduction/slider/styles/index.style.js';
import { Block, Text, theme } from 'galio-framework';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HeaderHeight } from "../../constants/utils.js";

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class UserProfileScreen extends React.Component {
    constructor(props){
        super(props);
        autoBind(this);
        this.state = {
            
        }
    }

    render() {
        var profileImage = "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80";
        return (
            <Block flex style={styles.profile}>
              <Block flex>
                <ImageBackground
                  source={{uri: profileImage}}
                  style={styles.profileContainer}
                  imageStyle={styles.profileImage}>
                    
                  <Block flex style={styles.profileDetails}>
                    <Block style={styles.profileTexts}>
                      <Text color="white" size={32} style={{ paddingBottom: 8 }}>Rachel Brown</Text>
                      <Block row space="between">
                        <Block row>
                          
                          <Text size={19} color="#FF9800">
                            4.8 <Icon name="star" size={24} color="#FF9800" />
      
                          </Text>
                        </Block>
                        <Block>
                          <Text color="#FFFFFF" size={16}>
                            <Icon name="home" size={24} color="#FFFFFF" /> Los Angeles, CA
                          </Text>
                        </Block>
                      </Block>
                    </Block>
                  </Block>
                </ImageBackground>
              </Block>
              <Block flex style={styles.options}>
                <ScrollView showsVerticalScrollIndicator={false}>
                  
                  <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
                    <Text size={18} color={colors.mainColor}>Personal Information</Text>
                  </Block>
                  
                  <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
      
                    <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                      <Text>Gender :</Text>
                      <Text>Male</Text>
                    </Block>
      
                    <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                      <Text>City :</Text>
                      <Text>Lahore</Text>
                    </Block>
      
                    <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                      <Text>Address :</Text>
                      <Text>Wapda Twon, Lahore</Text>
                    </Block>
      
                    <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                      <Text>Description :</Text>
                      <Text>
                        Test Description
                      </Text>
                    </Block>

                    <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                      <Text>Portfolio :</Text>
                      <Text style={{color: colors.mainColor}}>
                        <Icon name="download" size={12}></Icon> portfolio.png
                      </Text>
                    </Block>
                  </Block>

                  <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
                    <Text size={18} color={colors.mainColor}>Services</Text>
                  </Block>

                  <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                      <Text>Description :</Text>
                      <Text>
                        Test Description
                      </Text>
                  </Block>

                  <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                      <Text>Description :</Text>
                      <Text>
                        Test Description
                      </Text>
                    </Block>

                    <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                      <Text>Description :</Text>
                      <Text>
                        Test Description
                      </Text>
                    </Block>
                </ScrollView>
              </Block>
            </Block>
          );
    }
}

const styles = StyleSheet.create({
    profile: {
      marginTop: Platform.OS === 'android' ? -HeaderHeight : 0,
      marginBottom: -HeaderHeight * 2,
    },
    profileImage: {
      width: width * 1.1,
      height: 'auto',
    },
    profileContainer: {
      width: width,
      height: height / 2,
    },
    profileDetails: {
      paddingTop: theme.SIZES.BASE * 4,
      justifyContent: 'flex-end',
      position: 'relative',
    },
    profileTexts: {
      paddingHorizontal: theme.SIZES.BASE * 2,
      paddingVertical: theme.SIZES.BASE * 2,
      zIndex: 2
    },
    pro: {
      backgroundColor: '#FE2472',
      paddingHorizontal: 6,
      marginRight: theme.SIZES.BASE / 2,
      borderRadius: 4,
      height: 19,
      width: 38,
    },
    seller: {
      marginRight: theme.SIZES.BASE / 2,
    },
    options: {
      position: 'relative',
      padding: theme.SIZES.BASE,
      marginHorizontal: theme.SIZES.BASE,
      marginTop: -theme.SIZES.BASE * 7,
      borderTopLeftRadius: 13,
      borderTopRightRadius: 13,
      backgroundColor: theme.COLORS.WHITE,
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 8,
      shadowOpacity: 0.2,
      zIndex: 2,
    },
    thumb: {
      borderRadius: 4,
      marginVertical: 4,
      alignSelf: 'center',
      width: thumbMeasure,
      height: thumbMeasure
    },
    gradient: {
      zIndex: 1,
      left: 0,
      right: 0,
      bottom: 0,
      height: '30%',
      position: 'absolute',
    },
  });