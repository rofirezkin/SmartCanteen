import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { normalizeFont } from '../../../utils/normalizeFont'

const Paragraph = ({text, style}) => {
    return (
        <Text style={[styles.fontParagraph, style]}>{text}</Text>
    )
}

export {
    Paragraph
}

const styles = StyleSheet.create({
    fontParagraph : {
        fontSize : normalizeFont(16)
    }
})