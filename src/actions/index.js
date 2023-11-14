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

export const heroesRemoving = (id) => {
    return {
        type: 'HEROES_REMOVING',
        payload: id
    }
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