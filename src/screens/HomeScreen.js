import React, { Component } from 'react'
import Orientation from 'react-native-orientation'
import { 
  Image,
  StyleSheet,
  Text,
  View } from 'react-native'

import IconLogo from '../assets/icon.png'
import NavButton from '../components/NavButton'

class HomeScreen extends Component {

  componentDidMount() {
    Orientation.lockToPortrait()
  }
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerContents}>
            <Image source={IconLogo} style={styles.headerLogo} />
            <Text style={styles.logo}>CalisTimer</Text>
          </View>
        </View>
        <View style={styles.nav}>
          <NavButton 
            style={styles.navItem} 
            onPress={() => this.props.navigation.navigate('EMOM')}>
            EMOM
          </NavButton>
          <NavButton 
            style={styles.navItem} 
            onPress={() => this.props.navigation.navigate('AMRAP')}>
            AMRAP
          </NavButton>
          <NavButton 
            style={styles.navItem} 
            onPress={() => this.props.navigation.navigate('Isometry')}>
            Isometry
          </NavButton>
        </View>
        <View style={styles.footer}>
          <NavButton 
            style={[ styles.navItem, styles.navAbout ]} 
            onPress={() => this.props.navigation.navigate('About')}>
            About this App
          </NavButton>
        </View>
      </View>
    )
  }
}

HomeScreen.navigationOptions = {
  header: null
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    textAlign: 'center',
    backgroundColor: '#DA304A',
  },
  footer: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  header: {
    backgroundColor: 'rgba(255,255,255,.1)',
    flex: 1.2,
    justifyContent: 'flex-end'
  },
  headerContents: {
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  headerLogo: {
    width: 60,
    height: 60,
  },
  logo: {
    color: '#FFFFFF',
    fontSize: 50,
    fontFamily: 'Ubuntu-Bold',
    textAlign: 'center',
    marginBottom: 25,
  },
  nav: {
    flex: 4,
    justifyContent: 'center',
    textAlign: 'center',
  },
  navAbout: {
    color: "#FFFFFF",
    fontSize: 20,
    padding: 20,
    marginBottom: 25,
    textAlign: 'center',
  },
  navItem: {
    color: "#FFFFFF",
    fontFamily: 'Ubuntu-Medium',
    fontSize: 25,
    marginTop: 5,
    marginTop: 5,
    padding: 20,
    textAlign: 'center'
  },
});


export default HomeScreen