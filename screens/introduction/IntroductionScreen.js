import React, { Component } from 'react';
import { View, Platform, StatusBar, SafeAreaView } from 'react-native';
import autoBind from 'react-autobind';
import SplashScreen from '../splash/SpalshScreen.js';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import SliderEntry from './slider/SliderEntry';
import { sliderWidth, itemWidth } from './slider/styles/SliderEntry.style.js';
import styles, { colors, wp } from './slider/styles/index.style.js';
import { ENTRIES1 } from './slider/entries.js';
import { Button, Block, Text } from 'galio-framework';
import { checkFirstLogin } from "../../database/index.js";
import { NavigationActions, StackActions } from 'react-navigation';


const SLIDER_1_FIRST_ITEM = 1;
const IS_ANDROID = Platform.OS === 'android';
const StatusHeight = StatusBar.currentHeight;

export default class IntroductionScreen extends React.Component {
    constructor(props){
        super();
        autoBind(this);
        this.state = {
            showSplashScreen: true,
            slider1ActiveSlide: SLIDER_1_FIRST_ITEM,
        }
        checkFirstLogin().then(response => {
            if (response === false) {
                setTimeout(() => {
                    const resetAction = StackActions.reset({
                        index: 0,
                        actions: [NavigationActions.navigate({ routeName: 'Login' })],
                    });
                    this.props.navigation.dispatch(resetAction);
                    
                }, 1700);
            }else{
                this.hideSplashScreen();
            }
        });
    }

    hideSplashScreen = () => {
        setTimeout(() => {
            this.setState({ showSplashScreen: false });
        }, 2000);
    }

    // Slider logic start
    _renderItem ({item, index}) {
        return <SliderEntry data={item} even={(index + 1) % 2 === 0} />;
    }

    _renderItemWithParallax ({item, index}, parallaxProps) {
        return (
            <SliderEntry
              data={item}
              even={(index + 1) % 2 === 0}
              parallax={true}
              parallaxProps={parallaxProps}
            />
        );
    }

    mainExample (number, title) {
        const { slider1ActiveSlide } = this.state;

        return (
            <Block style={{backgroundColor: "#FFFFFF", marginHorizontal: wp(5), height: "100%", alignItems: "center"}}>
                <Block style={{marginTop: StatusHeight + 25}}>
                    <Text size={20}>
                        Welcome to 
                        <Text style={styles.titleIntroLazyOwl}>
                            {" "}LAZY OWL
                        </Text>
                    </Text>
                </Block>
                
                           
                <Carousel
                  ref={c => this._slider1Ref = c}
                  data={ENTRIES1}
                  renderItem={this._renderItemWithParallax}
                  sliderWidth={sliderWidth}
                  itemWidth={itemWidth}
                  hasParallaxImages={true}
                  firstItem={SLIDER_1_FIRST_ITEM}
                  inactiveSlideScale={0.94}
                  inactiveSlideOpacity={0.0}
                  containerCustomStyle={styles.slider}
                  contentContainerCustomStyle={styles.sliderContentContainer}
                  loop={false}
                  loopClonesPerSide={0}
                  autoplay={true}
                  autoplayDelay={1000}
                  autoplayInterval={7000}
                  onSnapToItem={(index) => this.setState({ slider1ActiveSlide: index }) }
                />
                {/* <Pagination
                  dotsLength={ENTRIES1.length}
                  activeDotIndex={slider1ActiveSlide}
                  containerStyle={styles.paginationContainer}
                  dotColor={'#922c88'}
                  dotStyle={styles.paginationDot}
                  inactiveDotColor={colors.black}
                  inactiveDotOpacity={0.4}
                  inactiveDotScale={0.6}
                  carouselRef={this._slider1Ref}
                  tappableDots={!!this._slider1Ref}
                /> */}
                <Block style={{marginHorizontal: wp(5), bottom: "5%", position: "absolute", alignItems: "center"}}>
                    <Button 
                        color={colors.mainColor}
                        onPress={() => this.props.navigation.navigate('Login')}
                    >
                            Get Started
                    </Button>
                    
                </Block>                
            </Block>
        );
    }

// Slider logic end

    render(){
        var { showSplashScreen } = this.state;
        const example1 = this.mainExample(1, 'Default layout | Loop | Autoplay | Parallax | Scale | Opacity | Pagination with tappable dots');
        
        if (showSplashScreen){
            return <SplashScreen/>;    
        }
        return(
            <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <StatusBar
                      translucent={true}
                      backgroundColor={'rgba(0, 0, 0, 0.3)'}
                      barStyle={'light-content'}
                    />
                    
                    { example1 }
                </View>
            </SafeAreaView>
        );
    }    
}