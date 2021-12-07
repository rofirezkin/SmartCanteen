import axios from "axios"
import { ENDPOINT_API_SMART_CANTEEN } from "../../utils/API/httpClient"


export const getDataTenant = (types)  =>  async (dispatch) => {

    const result = await axios.get(`${ENDPOINT_API_SMART_CANTEEN}tenant/fetch/several?lokasi_kantin=${types}`)
            .then(res => {
                if(types === "Fakultas Ilmu Terapan")
                {
                        dispatch({type: 'SET_ILMU_TERAPAN', value: res.data.data})
                }
            }).catch(err => {
                console.log(err.message)
            })

            return Promise.resolve(result)
}