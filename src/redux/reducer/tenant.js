const initFilterKantin = {
    ilmuTerapan: [],
}

export const tenantReducer = (state= initFilterKantin, action) => {

    if(action.type === 'SET_ILMU_TERAPAN')
    {
        return{
            ...state,
            ilmuTerapan: action.value
        }
    }

    return state
}