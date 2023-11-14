const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filters: [],
    filteredHeroes: [],
    selectedFilter: "all"
}

const reducer = (state = initialState, action) => {
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
                filteredHeroes: action.payload,
                heroesLoadingStatus: 'idle',
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'HEROES_REMOVING':
            const heroes = state.heroes.filter(
                item => item.id !== action.payload
            );
            return {
                ...state,
                heroes,
                filteredHeroes: [...heroes],
            }
        case 'FILTERS_FETCHING':
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED':
            return {
                ...state,
                filtersLoadingStatus: 'idle',
                filters: action.payload
            }
        case 'FILTERS_FETCHING_ERROR':
            return {
                ...state,
                filtersLoadingStatus: 'error',
            }
        case 'FILTERS_SELECT':
            const filteredHeroes = action.payload === "all" ? [...state.heroes] : state.heroes.filter(
                item => item.element === action.payload
            );
            return {
                ...state,
                filteredHeroes,
                selectedFilter: action.payload
            }
        default: return state
    }
}

export default reducer;