import React, { Component } from 'react'
import Orientation from 'react-native-orientation'
import BtnBack from '../assets/images/buttons/btn-back.png'
import logoDevReactjJS from '../assets/images/logoDEVREACTJS.png'
import {
    Image,
    Linking,
    StyleSheet,
    Text,
    TouchableOpacity,
    ScrollView,
    View
} from 'react-native'

class AboutScreen extends Component {

    componentDidMount() {
        Orientation.lockToPortrait()
    }

    render() {
        const openURL = (url) => {
            Linking.openURL(url)
        }

        return (
            <ScrollView style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.logo}>CalisTimer</Text>
                </View>
                <View style={styles.body}>
                    <Text style={styles.heading}>About</Text>
                    <Text style={styles.text}>
                    This is my first app developed using React Native. 
                    It was an amazing experience to develop this app because 
                    I could comprehend more how incredible React library can 
                    be for mobile development. CalisTimer was a project 
                    developed while studying React Native at DevPleno.com. 
                    Thanks, Tulio and congratulations for your excellent 
                    ourse and community!
                    </Text>
    
                    <TouchableOpacity style={styles.logoButton} onPress={ () => openURL('https://devpleno.com') }>
                        <Image source={logoDevReactjJS} style={styles.logoDevReactjJS}  />
                    </TouchableOpacity>
    
                    <Text style={[ styles.heading, { marginTop: 25 } ]}>Credits</Text>
                    <Text style={styles.textCredits}>
                        Cog Icon made by Fermam Aziz from flaticon.com 
                        (https://www.flaticon.com/authors/fermam-aziz)
                    </Text>
                    <Text style={[styles.textCredits, {marginTop: 10}]}>
                        Reload Icon made by Gregor Cresnar from flaticon.com 
                        (https://www.flaticon.com/authors/gregor-cresnar)
                    </Text>
                    <Text style={[styles.textCredits, {marginTop: 10}]}>
                        Back Icon made by Roundicons from flaticon.com
                        (https://www.flaticon.com/authors/roundicons)
                    </Text>
                </View>
                <View style={styles.btnBack}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                      <Image source={BtnBack} />
                    </TouchableOpacity>
                  </View>
                <View style={styles.footer}>
                    <View style={styles.footerBox}>
                        <TouchableOpacity onPress={ () => openURL('http://calhau.me')}>
                            <Text style={styles.madeBy}>
                                Made with ♥ by Rafael Calhau (http://calhau.me)
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

AboutScreen.navigationOptions = {
    header: null
}

const styles = StyleSheet.create({
    btnBack: {
        alignItems: 'center',
    },
    container: {
        flex: 1,
        textAlign: 'center',
        backgroundColor: '#DA304A',
    },
    footer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 15,
        paddingTop: 15,
    },
    footerBox: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,.5)',
        alignItems: 'center',
        padding: 10
    },
    header: {
        backgroundColor: 'rgba(255,255,255,.1)',
        height: 120,
        paddingTop: 15,
        paddingBottom: 15,
        justifyContent: 'flex-end'
    },
    logo: {
        color: '#FFFFFF',
        fontSize: 50,
        fontFamily: 'Ubuntu-Bold',
        textAlign: 'center',
    },
    logoButton: {
        alignSelf: 'flex-end',
        width: 110,
    },
    logoDevReactjJS: {
        height: 50,
        width: 110
    },
    body: {
        flex: 4,
        justifyContent: 'flex-start',
        color: "#FFFFFF",
        padding: 25
    },
    heading: {
        color: "#FFFFFF",
        fontFamily: 'Ubuntu-Medium',
        fontSize: 25,
        marginBottom: 10
    },
    navAbout: {
        bottom: 0,
        left: 0,
        right: 0,
        color: "#FFFFFF",
        fontSize: 15,
        padding: 20,
        position: 'absolute',
        marginBottom: 25,
        textAlign: 'center',
    },
    navItem: {
        color: "#FFFFFF",
        fontFamily: 'Ubuntu-Regular',
        fontSize: 25,
        marginTop: 5,
        marginTop: 5,
        padding: 20,
        textAlign: 'center'
    },
    madeBy: {
        fontFamily: 'Ubuntu-Regular',
        color: 'white',
        fontSize: 12,
    },
    text: {
        color: "#FFFFFF",
        fontFamily: 'Ubuntu-Regular',
        fontSize: 16,
        lineHeight: 22
    },
    textCredits: {
        color: "#FFFFFF",
        fontFamily: 'Ubuntu-Regular',
        fontSize: 13,
    },
});


export default AboutScreen