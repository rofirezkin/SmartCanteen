import axios from "axios"
import { ENDPOINT_API_SMART_CANTEEN } from "../../utils/API/httpClient"


export const getDataMenuByTypes =  (types) => async (dispatch) => {
        const result = await axios.get(`${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch?category_menu=${types}`)
            .then(res => {
                if(types === 'New Taste')
                {
                    dispatch({type: 'SET_NEW_TASTE', value: res.data.data})
                }
                if(types === 'Popular')
                {
                    dispatch({type: 'SET_POPULAR', value: res.data.data})
                }
                if(types === 'Recommended')
                {
                    dispatch({type: 'SET_RECOMMENDED', value: res.data.data})
                }
            }).catch(err => {
                console.log(err.message)
            })

        return Promise.resolve(result)
}

export const getDataFetchMenu = () => async (dispatch) => {
        const result = await axios.get(`${ENDPOINT_API_SMART_CANTEEN}users/menu/fetch`)
                    .then(res => {
                        dispatch({type: 'SET_ALL_MENU', value: res.data.data})
                    }).catch(err => {
                        console.log(err.message)
                    })
        
        return Promise.resolve(result)
}