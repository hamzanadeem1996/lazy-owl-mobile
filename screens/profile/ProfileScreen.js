import React from 'react';
import { StyleSheet, Dimensions, ScrollView, ImageBackground, Platform, Image, ActivityIndicator } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { HeaderHeight } from "../../constants/utils.js";
import { colors } from '../introduction/slider/styles/index.style.js';
import autoBind from 'react-autobind';
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import Snackbar from 'react-native-snackbar';
import * as services from "../../services/UserServices.js";
import { connect } from 'react-redux';
import { updateUser } from '../../actions/user.js';
import Modal from 'react-native-modal';

const { width, height } = Dimensions.get('screen');
const thumbMeasure = (width - 48 - 32) / 3;
const FireBaseStorage = storage();
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    autoBind(this);
    this.state = {
      resourcePath: {},
      showLoader: false
    };
  }

  selectFile = () => {
    var options = {
      title: 'Select Image',
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
          showLoader: true
        });
        this.uploadMediaToFireBase(source.path).then(upload => {
          if (upload.err === 0) {
            this.updateUserProfileData(upload.url).then(user => { console.log(user)
              if (user) {
                this.setState({showLoader: false});
                setTimeout(() => {
                  Snackbar.show({
                    text: 'Profile updated successfully!',
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
            })
            
          } else {
            this.setState({showLoader: false});
            setTimeout(() => {
              Snackbar.show({
                text: 'Please try again later!',
                duration: Snackbar.LENGTH_LONG,
              });
            }, 200)
          }
        })
      }
    });
  }

  updateUserProfileData = async (imageUrl) => {
    return new Promise(async (resolve) => {
      let state = this.props.screenProps.store.getState();
      let user = state.UserReducer.user;
      let data = {
        user_id: user.id,
        token: user.token,
        image: imageUrl
      }
      services.uploadUserProfileImage(data).then(async upload => { console.log(upload)
        if (upload.status === 200) {
          let state = this.props.screenProps.store.getState();
          let user = state.UserReducer.user;
          user = {...user, ['profile_image_url']: imageUrl}
          let updatedUser = await this.props.screenProps.store.dispatch(
            updateUser(user)
          );
          resolve(true);
        } else{
          resolve(false);
        }
      })
    })
  }

  uploadMediaToFireBase = (response) => { 
    return new Promise((resolve) => {
        const storageRef = FireBaseStorage.ref(`${Date.now()}`);
        storageRef.putFile(response).then(upload => {
            if (upload.state === "success") {
                storageRef.getDownloadURL().then(url => { console.log(url)
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

  render() {
    let { resourcePath, showLoader } = this.state; 
    let STATE = this.props.screenProps.store.getState(); console.log(STATE)
    let profileImage = null;
    
    if (resourcePath.uri) {
      profileImage = resourcePath.uri || 'data:image/jpeg;base64,' + this.state.resourcePath.data;
    } else {
      profileImage = STATE.UserReducer.user.profile_image_url;
    }
    
    return (
      <Block flex style={styles.profile}>
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
                <Text color="white" size={32} style={{ paddingBottom: 8 }}>{STATE.UserReducer.user.name}</Text>
                <Block row space="between">
                  <Block row>
                    
                    <Text size={19} color="#FF9800">
                      {STATE.UserReducer.user.ratings_star} <Icon name="star" size={24} color="#FF9800" />

                    </Text>
                  </Block>
                  <Block>
                    <Text color="#FFFFFF" size={16}>
                      <Icon name="home" size={24} color="#FFFFFF" /> {STATE.UserReducer.user.address ? STATE.UserReducer.user.address: "-"}
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
                <Text bold size={12} style={{marginBottom: 8}}>{STATE.UserReducer.user.active_projects_count}</Text>
                <Text muted size={12}>Active Tasks</Text>
              </Block>

              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>{STATE.UserReducer.user.assigned_projects_count}</Text>
                <Text muted size={12}>Assigned Tasks</Text>
              </Block>

              <Block middle>
                <Text bold size={12} style={{marginBottom: 8}}>{STATE.UserReducer.user.completed_projects_count}</Text>
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
                <Text>{STATE.UserReducer.user.email}</Text>
              </Block>

              <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                <Text>Phone# :</Text>
                <Text>{STATE.UserReducer.user.phone ? STATE.UserReducer.user.phone: "-"}</Text>
              </Block>

              <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                <Text>Gender :</Text>
                <Text>{STATE.UserReducer.user.gender ? STATE.UserReducer.user.gender: "-"}</Text>
              </Block>

              <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                <Text>City :</Text>
                <Text>{STATE.UserReducer.user.city ? STATE.UserReducer.user.city: "-"}</Text>
              </Block>

              <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                <Text>Address :</Text>
                <Text>{STATE.UserReducer.user.address ? STATE.UserReducer.user.address: "-"}</Text>
              </Block>

              <Block row space="between" style={{ flexWrap: 'wrap', marginTop: 5 }}>
                <Text>Description :</Text>
                <Text>
                  {STATE.UserReducer.user.description ? STATE.UserReducer.user.description: "-"}
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

// const mapStateToProps = state => {
//   return { user: state.user }
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//       updateUser: user => dispatch(updateUser(user))
//   };
// }

// export default connect(mapStateToProps, mapDispatchToProps)(ProfileScreen)
export default ProfileScreen;