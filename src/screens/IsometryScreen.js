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
import BtnReload from '../assets/images/buttons/btn-reload.png'
import BtnPause from '../assets/images/buttons/btn-pause.png'
import Countdown from '../components/Countdown'
import IconCog from '../assets/images/icons/icon-cog.png'
import Selector from '../components/Selector'
import SoundAlert from '../assets/sounds/alert.wav'
import Time from '../components/Time'
import Title from '../components/Title'

class IsometryScreen extends Component {
  state = {
    objective: 'free',
    counter: 0,
    countdown: 1,
    countdownValue: 5,
    isRunning: false,
    keyboardIsVisible: false,
    isPaused: false,
    time: 10 //seconds
  }

  componentDidMount() {
    Orientation.lockToPortrait()
    Sound.setCategory('Playback', true)

    this.keyboardHide = Keyboard.addListener('keyboardDidHide', this.toggleKeyboardState)
    this.keyboardShow = Keyboard.addListener('keyboardDidShow', this.toggleKeyboardState)
    this.soundAlert = new Sound(SoundAlert)
  }

  componentWillUnmount() {
    this.keyboardHide.remove()
    this.keyboardShow.remove()
  }

  clearTimers = () => {
    if (this.timerCounter) {
      clearInterval(this.timerCounter)
    }

    if (this.timerCountdown) {
      clearInterval(this.timerCountdown)
    }
  }

  handleAction = (action) => {
    switch (action) {
      case 'back':

        if (this.state.isRunning) {

          if (!this.state.isPaused) {
            return
          }
          
          // clear all timers
          this.clearTimers()

          this.setState({ 
            countdown: 1,
            countdownValue: 5,
            counter: 0,
            isRunning: false,
            isPaused: false,
          })

        } else {
          this.props.navigation.goBack()
        }

        break
      case 'play':

        this.setState({ isRunning: true })
        this.initializeCountdown()

        break
      case 'pause':

        this.setState(state => {
          return { isPaused: !state.isPaused }
        })

        break
      case 'reload':

        if (!this.state.isPaused) {
          return
        }

        // clear all timers
        this.clearTimers()

        this.setState({
          countdown: 1,
          countdownValue: 5,
          counter: 0,
          isPaused: false
        }, () => {
          this.initializeCountdown()
        })

        break
      case 'stop':

        // clear all timers
        this.clearTimers()

        break
      default:
    }
  }

  handleChangeSeconds = (time) => {
    if (time > 0 && time <= 60) {
      this.setState({ time })
    }
  }

  handleOption = (objective) => {
    this.setState({ objective })
  }

  initializeCountdown = () => {

    const counter = () => {

      if (!this.state.isPaused && this.state.countdownValue == 0) {
        if (this.state.counter >= this.state.time - 5
          && this.state.counter < this.state.time) {
          this.soundAlert.play()
        }

        this.setState({ counter: this.state.counter + 1 })
      }
      
    }

    this.timerCountdown = setInterval(() => {

      if (this.state.isPaused) {
        return
      }

      this.soundAlert.play()
      this.setState({ countdownValue: this.state.countdownValue - 1 }, () => {

        // finishing the countdown timer
        if (this.state.countdownValue === 0) {
          clearInterval(this.timerCountdown)
          this.timerCounter = setInterval(counter, 1000)
        }

      })

    }, 1000)

  }

  toggleKeyboardState = () => {
    this.setState(state => {
      return { keyboardIsVisible: !state.keyboardIsVisible }
    })
  }

  render() {

    const options = [
      {
        text: 'free',
        value: 'free'
      },
      {
        text: 'beat the time',
        value: 'time'
      },
    ]

    if (this.state.isRunning) {
      const { counter, isPaused, objective, time } = this.state
      const pctSeconds = parseInt((counter / time) * 100)
      const restOfTime = objective === 'time' ? counter <= time ? time - counter : 0 : 0
      const btnOpacity = !isPaused ? 0.4 : 1

      return (
        <BackgroundProgress
          primaryBackground='#DA304A'
          secondBackground='#3d0b0b'
          percentage={pctSeconds}>

          <View style={styles.container}>

            <KeepAwake />

            <View style={styles.header}>
              <Title
                text='Isometry'
                style={{
                  header: styles.headerStyle
                }} />
            </View>

            <View style={styles.body}>
              <Time
                counter={this.state.counter}
                style={styles.timer} />

              {
                this.state.objective === 'time' 
                ? <View style={styles.boxReverseTimer}>
                    <Time
                      counter={restOfTime}
                      style={styles.reverseTimer} />
                    <Text
                      style={{ color: 'white', fontSize: 20, marginLeft: 5, marginTop: 4 }}>
                      remaining
                    </Text>
                  </View>
                : null
              }

              {
                this.state.countdown === 1 && this.state.counter === 0 &&
                <Countdown
                  style={styles.countdown}
                  seconds={this.state.countdownValue} />
              }
            </View>

            <View style={styles.footer}>
              <View style={[styles.btnBack, { opacity: btnOpacity }]}>
                <TouchableOpacity onPress={() => this.handleAction('back')}>
                  <Image source={BtnBack} />
                </TouchableOpacity>
              </View>
              <View style={styles.btnPause}>
                <TouchableOpacity onPress={() => this.handleAction('pause')}>
                  <Image source={!isPaused ? BtnPause : BtnPlay} />
                </TouchableOpacity>
              </View>
              <View style={[styles.btnReload, { opacity: btnOpacity }]}>
                <TouchableOpacity onPress={() => this.handleAction('reload')}>
                  <Image source={BtnReload} />
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
          this.state.keyboardIsVisible ? { marginTop: -140 } : null
        ]}>

          <View style={styles.header}>
            <Title
              text='Isometry'
              style={{
                header: styles.headerStyle
              }} />
          </View>

          <View style={styles.body}>
            <View style={styles.iconCog}>
              <Image source={IconCog} />
            </View>

            <Text style={styles.label}>Training Mode</Text>

            <Selector
              selected={this.state.objective}
              options={options}
              onSelect={(option) => this.handleOption(option)} />

            {
              this.state.objective === 'time' 
              ? 
                <React.Fragment>
                  <Text style={styles.label}>How many seconds?</Text>
                  <View style={styles.seconds}>
                    <View style={styles.secondsBox}>
                      <TextInput
                        keyboardAppearance='dark'
                        keyboardType='numeric'
                        maxLength={2}
                        style={styles.secondsNumber}
                        onChangeText={text => this.handleChangeSeconds(parseInt(text))}>
                        {this.state.time}
                      </TextInput>
                    </View>
                    <Text style={styles.secondsText}>max: 60s</Text>
                  </View>
                </React.Fragment>
              : null
            }
            
          </View>

          <View style={styles.footer}>
            <View style={styles.btnBack}>
              <TouchableOpacity onPress={() => this.handleAction('back')}>
                <Image source={BtnBack} />
              </TouchableOpacity>
            </View>
            <View style={styles.btnPlay}>
              <TouchableOpacity onPress={() => this.handleAction('play')}>
                <Image source={BtnPlay} />
              </TouchableOpacity>
            </View>
          </View>

        </View>
      </KeyboardAvoidingView>
    )
  }

}

IsometryScreen.navigationOptions = {
  header: null
}

const { height: windowHeight } = Dimensions.get('window')

const styles = StyleSheet.create({
  bg: {
    backgroundColor: '#DA304A'
  },
  boxReverseTimer: { 
    justifyContent: 'center', 
    flexDirection: 'row'
  },
  btnBack: {
    alignItems: 'center',
    marginRight: 45
  },
  btnPause: {
    alignItems: 'center'
  },
  btnReload: {
    alignItems: 'center',
    marginLeft: 45
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
    height: windowHeight < 680 ? 110 : 150,
    justifyContent: 'center'
  },
  headerStyle: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: windowHeight < 680 ? 45 : 60,
    marginTop: windowHeight < 680 ? 20 : 40,
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
  label: {
    color: '#FFFFFF',
    fontFamily: 'Ubuntu-Bold',
    fontSize: windowHeight < 680 ? 20 : 22,
    marginTop: windowHeight < 680 ? 10 : 25,
    textAlign: 'center',
  },
  seconds: {
    alignItems: 'center',
    padding: 15,
  },
  secondsBox: {
    borderBottomWidth: 1,
    borderBottomColor: 'white',
    marginBottom: 5
  },
  secondsNumber: {
    fontFamily: 'Ubuntu-Regular',
    fontSize: 45,
    minWidth: 60,
    textAlign: 'center',
    padding: 2
  },
  secondsText: {
    color: 'white',
    fontFamily: 'Ubuntu-Regular',
    fontSize: 13
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

export default IsometryScreen