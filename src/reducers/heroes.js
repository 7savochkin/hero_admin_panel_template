const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
}

const heroes = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle',
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_CREATING':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
            }
        case 'HEROES_REMOVING':
            const heroes = state.heroes.filter(
                item => item.id !== action.payload
            );
            return {
                ...state,
                heroes,
            }

        default:
            return state
    }
}

export default heroes;