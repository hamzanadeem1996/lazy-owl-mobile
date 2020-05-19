import { StyleSheet, Dimensions } from 'react-native';

const { width: viewportWidth, height: viewportHeight } = Dimensions.get('window');

export function wp (percentage) {
    const value = (percentage * viewportWidth) / 100;
    return Math.round(value);
}

export const colors = {
    black: '#1a1917',
    gray: '#888888',
    background1: '#fcfbf7',
    background2: '#21D4FD',
    mainColor: '#922c88'
};

export default StyleSheet.create({
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    card: {
        flex: 1,
        margin: 2,
    },
    footerContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },
    footerControl: {
        marginHorizontal: 2,
    },
    safeArea: {
        flex: 1,
        backgroundColor: colors.black
    },
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    gradient: {
        ...StyleSheet.absoluteFillObject
    },
    scrollview: {
        flex: 1
    },
    exampleContainer: {
        paddingVertical: 30
    },
    exampleContainerDark: {
        backgroundColor: colors.black
    },
    exampleContainerLight: {
        backgroundColor: 'white'
    },
    title: {
        marginTop: 50,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(50, 50, 50, 0.9)',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleIntroLazyOwl : {
        color: colors.mainColor,
    },
    titleDark: {
        color: colors.black
    },
    subtitle: {
        marginTop: 5,
        paddingHorizontal: 30,
        backgroundColor: 'transparent',
        color: 'rgba(255, 255, 255, 0.75)',
        fontSize: 13,
        fontStyle: 'italic',
        textAlign: 'center'
    },
    slider: {
        marginTop: wp(15),
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: "7%" // for custom animation
    },
    paginationContainer: {
        marginTop: wp(10),
        paddingVertical: 8
    },
    paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 8
    },

    buttonColor: {
        backgroundColor: 'rgba(146, 44, 136, 0.9)',
        color: '#fff'
    },

    buttonContainer: {
        alignItems: 'center',
        marginTop: wp(23)
    },
// login screen styles start
    loginMainContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        height: viewportHeight,
        width: viewportWidth
    },

    loginScreenInputContainer: {
        marginTop: wp(20),
        width: viewportWidth - wp(15)
    },

    loginScreenTitle: {
        marginTop: wp(30),
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'Comfortaa',
        color: colors.mainColor
    },

    loginScreenInput: {
        marginTop: wp(4)
    },

    loginScreenInputField:{
        borderColor: colors.mainColor
    },

    loginScreenForgetPasswordContainer: {
        marginTop: wp(2),
        flex: 1
    },

    loginScreenForgetPasswordText: {
        textAlign: 'right',
        color: colors.mainColor
    },

    loginScreenCreateAccountTextContainer: {
        marginTop: wp(50)
    },

    loginScreenRegisterText: {
        color: colors.mainColor
    },

    // Register screen styles start
    registerScreenRadioContainer: {
        marginTop: wp(5),
        flexDirection: 'row',
        justifyContent: 'flex-start', 
    },

    registerScreenAlreadyAccountTextContainer: {
        marginTop: wp(13)
    },
    
});