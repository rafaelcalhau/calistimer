import React from 'react'
import { Text } from 'react-native'

const Countdown = (props) => {
    return (
        <Text style={props.style}>
            { props.seconds }
        </Text>
    )
}

export default Countdown