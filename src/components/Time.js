import React from 'react'
import { Text } from 'react-native'

const Time = (props) => {
    const minutes = parseInt(props.counter / 60)
    const seconds = parseInt(props.counter % 60)

    const formatTime = (number) => {
        if (number < 10) {
            return '0' + number
        }

        return number
    }

    return (
        <Text style={props.style}>
            {formatTime(minutes)}:{formatTime(seconds)}
        </Text>
    )
}

export default Time