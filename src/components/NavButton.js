import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const NavButton = (props) => {
    const { children } = props
    return (
        <TouchableOpacity 
              onPress={ props.onPress }>
            <Text style={props.style}>
                { children }
            </Text>
        </TouchableOpacity>
    )
}

export default NavButton