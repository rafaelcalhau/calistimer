import React, { Component } from 'react'
import { Animated, View } from 'react-native'

class ProgressBar extends Component {
    
    constructor(props) {
        super(props)

        this.width = new Animated.Value(0)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.percentage !== this.props.percentage)
        {
            Animated.timing(this.width, {
                toValue: parseInt(this.props.percentage),
                duration: 500
            }).start()
        }
    }

    render() {
        const { color, height } = this.props
        const w = this.width.interpolate({
            inputRange: [0, 100],
            outputRange: ['0%', '100%']
        })
        const styles = [
            { 
                backgroundColor: color ? color : 'white', 
                height: height ? height : 3, 
                width: w
            },
            this.props.style
        ]

        return (
            <View style={{ width: '100%' }}>
                <Animated.View style={styles} />
            </View>
        )
    }

}

export default ProgressBar