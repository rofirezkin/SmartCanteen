const initFilterMenu = {
    all: [],
    newTaste: [],
    popular: [],
    recommended: [],
    severalNewTaste: [],
    severalPopular: [],
    severalRecommended: [],
    allMenu: [],
    foodMenuUsers: [],
    beveragesMenu: []
}

export const menuReducer = (state= initFilterMenu, action) => {

    if(action.type === 'SET_ALL_MENU')
    {
        return{
            ...state,
            all: action.value
        }
    }

    if(action.type === 'SET_NEW_TASTE')
    {
        return{
            ...state,
            newTaste: action.value
        }
    }

    if(action.type === 'SET_POPULAR')
    {
        return{
            ...state,
            popular: action.value
        }
    }

    if(action.type === 'SET_RECOMMENDED')
    {
        return{
            ...state,
            recommended: action.value
        }
    }

    
    if(action.type === 'SET_SEVERAL_RECOMMENDED')
    {
        return{
            ...state,
            severalRecommended: action.value
        }
    }

    if(action.type === 'SET_SEVERAL_NEW_TASTE')
    {
        return{
            ...state,
            severalNewTaste: action.value
        }
    }

    if(action.type === 'SET_SEVERAL_POPULAR')
    {
        return{
            ...state,
            severalPopular: action.value
        }
    }

    if(action.type === 'SET_USERS_MENU')
    {
        return{
            ...state,
            allMenu: action.value
        }
    }

    if(action.type === 'SET_FOOD_MENU')
    {
        return{
            ...state,
            foodMenuUsers: action.value
        }
    }

    if(action.type === 'SET_BEVERAGES_MENU')
    {
        return{
            ...state,
            beveragesMenu: action.value
        }
    }

    return state
}