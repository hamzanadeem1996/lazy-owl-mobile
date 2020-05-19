import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, Platform, Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { HeaderHeight } from "../../constants/utils.js";
import { colors } from '../introduction/slider/styles/index.style.js';
import autoBind from 'react-autobind';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;

export default class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      resourcePath: {},
    };
  }

  selectFile = () => {
    var options = {
      title: 'Select Image',
      customButtons: [
        { 
          name: 'customOptionKey', 
          title: 'Choose file from Custom Option' 
        },
      ],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, res => {
      console.log('Response = ', res);

      if (res.didCancel) {
        console.log('User cancelled image picker');
      } else if (res.error) {
        console.log('ImagePicker Error: ', res.error);
      } else if (res.customButton) {
        console.log('User tapped custom button: ', res.customButton);
        alert(res.customButton);
      } else {
        let source = res;
        this.setState({
          resourcePath: source,
        });
      }
    });
  }

  render() {
    var { resourcePath } = this.state;
    var profileImage;
    if (resourcePath.uri) {
      profileImage = resourcePath.uri || 'data:image/jpeg;base64,' + this.state.resourcePath.data;
    } else {
      profileImage = "https://images.unsplash.com/photo-1512529920731-e8abaea917a5?fit=crop&w=840&q=80";
    }
    
    return (
      <Block flex style={styles.profile}>
        <Block flex>
          <ImageBackground
            source={{uri: profileImage}}
            style={styles.profileContainer}
            imageStyle={styles.profileImage}>
              <Block flex style={[styles.profileDetails, {paddingTop: theme.SIZES.BASE, paddingLeft: thumbMeasure - 90}]}>
                <Icon name="camera" size={24} color="#FFFFFF" onPress={this.selectFile} />
              </Block>
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
            <Block row space="between" style={{ padding: theme.SIZES.BASE, }}>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>36</Text>
                <Text muted size={12}>Active Tasks</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>5</Text>
                <Text muted size={12}>Bids & Offers</Text>
              </Block>
              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>2</Text>
                <Text muted size={12}>Completed Tasks</Text>
              </Block>
            </Block>
            
            <Block row space="between" style={{ paddingVertical: 16, alignItems: 'baseline' }}>
              <Text size={18} color={colors.mainColor}>Personal Information</Text>
              <Text size={12} color={colors.mainColor} onPress={() => this.props.navigation.navigate('EditPersonalInformation')}>
                Edit <Icon name="pencil" size={12} color={colors.mainColor} />
              </Text>
            </Block>
            
            <Block style={{ paddingBottom: -HeaderHeight * 2 }}>
              <Block row space="between" style={{ flexWrap: 'wrap' }}>
                <Text>Email :</Text>
                <Text>hamza@gmail.com</Text>
              </Block>

              <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                <Text>Phone# :</Text>
                <Text>03366698731</Text>
              </Block>

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
                  This is the front page of the Simple English Wikipedia. Wikipedias are places where people work together to write encyclopedias in different languages. We use Simple English words and grammar here. The Simple English Wikipedia is for everyone! That includes children and adults who are learning English. There are 160,165 articles on the Simple English Wikipedia. All of the pages are free to use. They have all been published under both the Creative Commons Attribution/Share-Alike License 3.0 and the GNU Free Documentation License. You can help here! You may change these pages and make new pages. Read the help pages and other good pages to learn how to write pages here. If you need help, you may ask questions at Simple talk.
                  This is the front page of the Simple English Wikipedia. Wikipedias are places where people work together to write encyclopedias in different languages. We use Simple English words and grammar here. The Simple English Wikipedia is for everyone! That includes children and adults who are learning English. There are 160,165 articles on the Simple English Wikipedia. All of the pages are free to use. They have all been published under both the Creative Commons Attribution/Share-Alike License 3.0 and the GNU Free Documentation License. You can help here! You may change these pages and make new pages. Read the help pages and other good pages to learn how to write pages here. If you need help, you may ask questions at Simple talk.
                </Text>
              </Block>
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
