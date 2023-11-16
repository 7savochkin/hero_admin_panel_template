// import {heroesFetching, heroesFetched, heroesFetchingError} from "../components/heroesList/heroesSlice";
import {filtersFetching, filtersFetched, filtersFetchingError} from "../components/heroesFilters/filtersSlice";

// export const fetchHeroes = (request) => (dispatch) => {
//     dispatch(heroesFetching());
//     request("http://localhost:3001/heroes")
//         .then(data => dispatch(heroesFetched(data)))
//         .catch(() => dispatch(heroesFetchingError()))
// }

export const fetchFilters = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters", "GET")
        .then(data => dispatch(filtersFetched(data)))
        .catch(() => dispatch(filtersFetchingError()))
}


// import {createAction} from "@reduxjs/toolkit";

// export const heroesFetching = () => {
//     return {
//         type: 'HEROES_FETCHING'
//     }
// }

// export const heroesFetching = createAction('HEROES_FETCHING');

// export const heroesFetched = (heroes) => {
//     return {
//         type: 'HEROES_FETCHED',
//         payload: heroes
//     }
// }

// export const heroesFetched = createAction('HEROES_FETCHED');

// export const heroesFetchingError = () => {
//     return {
//         type: 'HEROES_FETCHING_ERROR'
//     }
// }

// export const heroesFetchingError = createAction('HEROES_FETCHING_ERROR');


// export const heroesCreating = (newHero) => {
//     return {
//         type: 'HEROES_CREATING',
//         payload: newHero
//     }
// }

// export const heroesCreating = createAction('HEROES_CREATING');

// export const heroesRemoving = (id) => {
//     return {
//         type: 'HEROES_REMOVING',
//         payload: id
//     }
// }

// export const heroesRemoving = createAction('HEROES_REMOVING');

// export const filtersFetching = () => {
//     return {
//         type: 'FILTERS_FETCHING'
//     }
// }
//
// export const filtersFetched = (data) => {
//     return {
//         type: 'FILTERS_FETCHED',
//         payload: data
//     }
// }
//
// export const filtersFetchingError = () => {
//     return {
//         type: 'FILTERS_FETCHING_ERROR'
//     }
// }
//
// export const filtersSelect = (filterName) => {
//     return {
//         type: 'FILTERS_SELECT',
//         payload: filterName
//     }
// }

// export const filtersSelect = (filterName) => (dispatch) => {
//     setTimeout(() => {
//         dispatch({
//         type: 'FILTERS_SELECT',
//         payload: filterName
//     });
//     }, 1000)
// }