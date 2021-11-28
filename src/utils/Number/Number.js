import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import NumberFormat from 'react-number-format';

const Number = ({number, type, style}) => {
    
    if(type ==='decimal')
    {
     
     return(
     <NumberFormat
            value={number} 
            renderText={(value) => <Text style={style}>{value}</Text>}
            decimalSeparator="."
            decimalScale={1}
            displayType="text"
            fixedDecimalScale
             />
     )
    }
    
    return (
       <NumberFormat
       value={number} 
       thousandSeparator="." 
       renderText={(value) => <Text style={style}>{value}</Text>}
       decimalSeparator=","
       displayType="text"
       prefix="Rp. " />
    )
}

export default Number

const styles = StyleSheet.create({})
