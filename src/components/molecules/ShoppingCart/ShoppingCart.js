import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ICCart } from '../../../assets'
import {connect} from 'react-redux'


const ShoppingCart = ({onPress}) => {
    return (
        <TouchableOpacity
            style={styles.buttonTab}
            activeOpacity={0.8}
            onPress={onPress}
            >
            <View style={{flexDirection: 'row'}}>
                <ICCart />
                <Text style={styles.textButton}>3 Items Rp20.000</Text>
            </View>
            <Text style={styles.textButton}>Order Now</Text>
        </TouchableOpacity>
    )
}

const mapStateToProps = (state) => {
    return {
        cartItems: state
    }
}


export default ShoppingCart

const styles = StyleSheet.create({
    buttonTab: {
        backgroundColor: '#2FAD24',
        padding: 15,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    textButton: {
        textAlignVertical: 'center',
        color: 'white',
        fontFamily: 'Poppins-Regular',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center',
  },
})
