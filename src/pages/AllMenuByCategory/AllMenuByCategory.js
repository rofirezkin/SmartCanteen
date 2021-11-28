import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, View, Image } from 'react-native'
import { ENDPOINT_API_SMART_CANTEEN, ENDPOINT_SMART_CANTEEN } from '../../utils/API/httpClient';
import { normalizeFont } from '../../utils/normalizeFont';

const AllMenuByCategory = ({route}) => {
    const title = route.params;
    const [items,setItems] = useState([])
    
    const getItems = () => {
        axios.get(`${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch?page=1&category_menu=Recommended`)
              .then(res => {
                setItems(res.data.data.data)
              }).catch(err => {
                  console.log(err.message)
              })
    }

    const renderItem = ({item}) => {
        return (
            <View style={styles.wrapperItem}>
                <Image style={styles.imageItems} source={{ uri: `${ENDPOINT_SMART_CANTEEN}/storage/${item.picturePath}` }} />
                <Text>{item.name}</Text>
                
            </View>
        )
    }

    useEffect(() => {
       getItems()

      
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.title}>
                <Text style={styles.textTitle}>{title}</Text>
                <Text style={styles.desc}>Pilih menu favorite kamu dibawah ini</Text>
            </View>
            <View style={styles.content}>
                 <FlatList data={items} renderItem={renderItem} />
            </View>
        </View>
    )
}

export default AllMenuByCategory

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    title:{
        paddingHorizontal: 20
    },
    desc:{
        fontSize: normalizeFont(12),
        fontFamily: 'Poppins-Light'
    },
    textTitle:{
        fontSize: normalizeFont(15),
        fontFamily: 'Poppins-Regular'
    },
    wrapperItem: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderColor: '#ddd'
    },
    imageItems: {
        borderRadius: 10,
        width: 90,
        height: 90,
        marginRight: 16,
        resizeMode: 'cover'
    }
})
