import React from 'react'
import { Text, View } from 'react-native'

const Title = (props) => {

    const { text, description, style } = props
    return (
        <View>
            <Text style={style.header}>{ text }</Text>
            <Text style={style.subheader}>{ description }</Text>
        </View>
    )
}

export default Title