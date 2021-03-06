import React, { Component } from 'react'
import Orientation from 'react-native-orientation'
import KeepAwake from 'react-native-keep-awake'
import Sound from 'react-native-sound'
import {
  Dimensions,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet, 
  Text, 
  TextInput, 
  TouchableOpacity,
  View 
} from 'react-native'

import BackgroundProgress from '../components/BackgroundProgress'
import BtnBack from '../assets/images/buttons/btn-back.png'
import BtnPlay from '../assets/images/buttons/btn-play.png'
import BtnStop from '../assets/images/buttons/btn-stop.png'
import Countdown from '../components/Countdown'
import IconCog from '../assets/images/icons/icon-cog.png'
import Selector from '../components/Selector'
import ProgressBar from '../components/ProgressBar'
import SoundAlert from '../assets/sounds/alert.wav'
import Time from '../components/Time'
import Title from '../components/Title'

class EMOMScreen extends Component {
  state = {
    alerts: [15],
    counter: 0,
    countdown: 1,
    countdownValue: 5,
    isRunning: false,
    keyboardIsVisible: false,
    time: 1 //minutes
  }

  componentDidMount() {
    Orientation.lockToPortrait()
    Sound.setCategory('Playback', true)

    this.keyboardHide = Keyboard.addListener('keyboardDidHide', this.toggleKeyboardState)
    this.keyboardShow = Keyboard.addListener('keyboardDidShow',  this.toggleKeyboardState)
    this.soundAlert = new Sound(SoundAlert)
  }

  componentWillUnmount() {
    this.keyboardHide.remove()
    this.keyboardShow.remove()
  }

  handleAction = (action) => {
    switch (action) {
      case 'back':

        this.props.navigation.goBack()

        break
      case 'play':

        this.setState({ isRunning: true })

        const counter = () => {
          const rest = this.state.counter % 60

          if (rest >= 55 && rest < 60) {
            this.soundAlert.play()
          }

          this.setState({ counter: this.state.counter + 1 }, () => {
            
            // verifying the alert intervals and playing the sound
            if (!this.state.alerts.includes(-1)) {
              this.state.alerts.map(item => {
                if (this.state.counter % item === 0) {
                  this.soundAlert.play()
                }
              })
            }

            // finishing the counter timer
            if (this.state.counter === this.state.time * 60) {
              clearInterval(this.timerCounter)
            }
          })
        }

        // countdown is enabled
        if (this.state.countdown === 1) {

          this.timerCountdown = setInterval(() => {

            this.soundAlert.play()
            this.setState({ countdownValue: this.state.countdownValue - 1 }, () => {
              
              // finishing the countdown timer
              if (this.state.countdownValue === 0) {
                clearInterval(this.timerCountdown)
                this.timerCounter = setInterval(counter, 1000)
              }

            })

          }, 1000)

        } else {
          this.timerCounter = setInterval(counter, 1000)
        }

        break;
      case 'stop':

        if (this.timerCounter) {
          clearInterval(this.timerCounter)
        }

        if (this.timerCountdown) {
          clearInterval(this.timerCountdown)
        }

        this.setState({ 
          counter: 0,
          countdownValue: 5,
          isRunning: false
        })

        break;
      default:
    }
  }

  handleAlertOption = (options) => {
    this.setState({ alerts: options })
  }

  handleChangeMinutes = (time) => {
    if (time > 0 && time <= 60) {
      this.setState({ time })
    }
  }

  toggleKeyboardState = () => {
    this.setState(state => {
      return { keyboardIsVisible: !state.keyboardIsVisible }
    })
  }

  render() {

    const alertOptions = [
      {
        text: 'off',
        value: -1
      },
      {
        text: '15s',
        value: 15
      },
      {
        text: '30s',
        value: 30
      },
      {
        text: '45s',
        value: 45
      },
    ]
  
    const countDownOptions = [
      {
        text: 'yes',
        value: 1
      },
      {
        text: 'no',
        value: 0
      },
    ]

    if (this.state.isRunning) {
      const pctMinute = parseInt(((this.state.counter % 60) / 60) * 100)
      const pctTotal = parseInt(((this.state.counter / (this.state.time * 60))) * 100)

      return (
        <BackgroundProgress 
          primaryBackground='#DA304A' 
          secondBackground='#3d0b0b'
          percentage={pctMinute}>

          <KeepAwake />

          <View style={styles.container}>

            <View style={styles.header}>
              <Title 
                text='EMOM' 
                description='Every Minute on the Minute'
                style={{
                  header: styles.headerStyle,
                  subheader: styles.subheader
                }} />
            </View>

            <View style={styles.body}>
              <Time 
                counter={this.state.counter} 
                style={styles.timer} />

              <ProgressBar 
                color='white'
                height={3}
                percentage={`${pctTotal}%`}
                style={{ marginTop: 5, marginBottom: 5 }} />

              <View style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <Time 
                  counter={this.state.time * 60 - this.state.counter}
                  style={styles.reverseTimer} />
                <Text 
                  style={{ color: 'white', fontSize: 20, marginLeft: 5, marginTop: 4 }}>
                  remaining
                </Text>
              </View>

              {
                this.state.countdown === 1 && this.state.counter === 0 && 
                <Countdown 
                  style={styles.countdown} 
                  seconds={ this.state.countdownValue } />
              }
            </View>

            <View style={styles.footer}>
              <View style={styles.btnPlay}>
                <TouchableOpacity onPress={ () => this.handleAction('stop') }>
                  <Image source={BtnStop} />
                </TouchableOpacity>
              </View>
            </View>

          </View>
        </BackgroundProgress>
      )
    }

    return (
      <KeyboardAvoidingView style={{ flex: 1 }}>
        <View style={[
          styles.bg, 
          styles.container, 
          this.state.keyboardIsVisible ? {marginTop: -280} : null 
        ]}>
  
          <View style={styles.header}>
            <Title 
              text='EMOM' 
              description='Every Minute on the Minute'
              style={{
                header: styles.headerStyle,
                subheader: styles.subheader
              }} />
          </View>
  
          <View style={styles.body}>
            <View style={styles.iconCog}>
              <Image source={IconCog} />
            </View>
  
            <Text style={styles.label}>
              Alerts
            </Text>
  
            <Selector
              multiple={true}
              selected={this.state.alerts}
              options={alertOptions} 
              uniqueValue={-1}
              onSelect={ (option) => this.handleAlertOption(option) } />
  
            <Text style={styles.label}>
              Countdown
            </Text>
  
            <Selector
              selected={this.state.countdown}
              options={countDownOptions} 
              onSelect={ (option) => this.setState({ countdown: option }) } />
  
            <Text style={styles.label}>
              How many minutes?
            </Text>
  
            <View style={styles.minutes}>
              <View style={styles.minutesBox}>
                <TextInput
                  keyboardAppearance='dark'
                  keyboardType='numeric'
                  maxLength={2}
                  style={styles.minutesNumber}
                  onChangeText={ text => this.handleChangeMinutes( parseInt(text) ) }>
                  { this.state.time }
                </TextInput>
              </View>
            </View>
          </View>

          <View style={styles.footer}>
            <View style={styles.btnBack}>
                <TouchableOpacity onPress={() => this.handleAction('back')}>
                  <Image source={BtnBack} />
                </TouchableOpacity>
            </View>
            <View style={styles.btnPlay}>
              <TouchableOpacity onPress={ () => this.handleAction('play') }>
                <Image source={BtnPlay} />
              </TouchableOpacity>
            </View>
          </View>
          
        </View>
      </KeyboardAvoidingView>
    )
  }

}

EMOMScreen.navigationOptions = {
  header: null
}

const { height: windowHeight } = Dimensions.get('window')

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#DA304A'
  },
  btnBack: {
    alignItems: 'center',
    marginRight: 45
  },
  btnPlay: {
    alignItems: 'center'
  },
  countdown: {
    alignSelf: 'center', 
    color: '#FFB800',
    fontFamily: 'Ubuntu-Bold',
    fontSize: windowHeight < 680 ? 120 : 170
  },
  container: {
    flex: 1,
    textAlign: 'center',
  },
  header: {
    height: windowHeight < 680 ? 110 : 150
  },
  headerStyle: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: windowHeight < 680 ? 45 : 60,
    marginTop: windowHeight < 680 ? 20 : 40,
    marginBottom: 5,
    textAlign: 'center'
  },
  body: {
    backgroundColor: 'rgba(0,0,0,.2)',
    flex: 8,
    paddingBottom: 20,
    paddingTop: 20,
  },
  footer: {
    backgroundColor: 'rgba(0,0,0,.2)',
    paddingBottom: 8,
    flex: 1.5,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  iconCog: {
    alignItems: 'center'
  },
  subheader: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Regular',
    fontSize: windowHeight < 680 ? 14 : 18,
    marginBottom: windowHeight < 680 ? 20 : 30,
    textAlign: 'center'
  },
  label: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: windowHeight < 680 ? 20 : 22,
    marginTop: windowHeight < 680 ? 10 : 25,
    textAlign: 'center',
  },
  minutes: {
    alignItems: 'center',
    padding: 15,
  },
  minutesBox: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 5
  },
  minutesNumber: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: windowHeight < 680 ? 30 : 45,
    minWidth: 60,
    textAlign: 'center',
    padding: 2
  },
  timer: { 
    alignSelf: 'center', 
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: windowHeight < 680 ? 70 : 90,
    marginTop: windowHeight < 680 ? 45 : 60
  },
  reverseTimer: { 
    alignSelf: 'center', 
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: 20,
    marginTop: 5
  }
})

export default EMOMScreen