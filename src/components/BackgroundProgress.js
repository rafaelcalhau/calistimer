import React, { Component } from 'react'
import { Animated, View } from 'react-native'

class BackgroundProgress extends Component {

    constructor(props) {
        super(props)

        this.height = new Animated.Value(0)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.percentage !== this.props.percentage) {            
            Animated.timing(this.height, {
                toValue: this.props.percentage > 100 ? 100 : this.props.percentage,
                duration: 1000
            }).start()
        }
    }

    render() {
        const { children, primaryBackground, secondBackground } = this.props
        const h = this.height.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        })
        const h2 = this.height.interpolate({
            inputRange: [0, 100],
            outputRange: ['100%', '0%']
        })

        return (
            <View style={{ flex:1 }}>
                <View style={{ flex:1 }}>
                    <Animated.View 
                        style={{ backgroundColor: primaryBackground, height: h2 }}/>
                    <Animated.View 
                        style={{ backgroundColor: secondBackground, height: h }}/>
                </View>
                <View style={{ flex:1, position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}>
                    { children }
                </View>
            </View>
        )
    }

}

export default BackgroundProgress