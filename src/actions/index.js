export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroesCreating = (newHero) => {
    return {
        type: 'HEROES_CREATING',
        payload: newHero
    }
}

export const heroesRemoving = (id) => {
    return {
        type: 'HEROES_REMOVING',
        payload: id
    }
}

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters", "GET")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}

export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
}

export const filtersFetched = (data) => {
    return {
        type: 'FILTERS_FETCHED',
        payload: data
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const filtersSelect = (filterName) => {
    return {
        type: 'FILTERS_SELECT',
        payload: filterName
    }
}

// export const filtersSelect = (filterName) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//         type: 'FILTERS_SELECT',
//         payload: filterName
//     });
//     }, 1000)
// }