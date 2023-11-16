// import {createReducer} from "@reduxjs/toolkit";
// import {
//     heroesFetching,
//     heroesFetched,
//     heroesFetchingError,
//     heroesRemoving,
//     heroesCreating
// } from "../actions";
//
//
// const initialState = {
//     heroes: [],
//     heroesLoadingStatus: 'idle',
// }
//
// const heroes = createReducer(initialState, {
//         [heroesFetching]: state => {
//             state.heroesLoadingStatus = 'loading';
//         },
//         [heroesFetched]: (state, action) => {
//             state.heroes = action.payload;
//             state.heroesLoadingStatus = 'idle';
//         },
//         [heroesFetchingError]: state => {
//             state.heroesLoadingStatus = 'error';
//         },
//         [heroesCreating]: (state, action) => {
//             state.heroes.push(action.payload);
//         },
//         [heroesRemoving]: (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload)
//         },
//     },
//     [],
//     state => state
// );


// const heroes = createReducer(initialState, builder => {
//     builder
//         .addCase(heroesFetching, state => {
//             state.heroesLoadingStatus = 'loading';
//         })
//         .addCase(heroesFetched, (state, action) => {
//             state.heroes = action.payload;
//             state.heroesLoadingStatus = 'idle';
//         })
//         .addCase(heroesFetchingError, state => {
//             state.heroesLoadingStatus = 'error';
//         })
//         .addCase(heroesCreating, (state,action) => {
//             state.heroes.push(action.payload);
//         })
//         .addCase(heroesRemoving, (state, action) => {
//             state.heroes = state.heroes.filter(item => item.id !== action.payload)
//         })
//         .addDefaultCase(() => {});
// });

// const heroes = (state = initialState, action) => {
//     switch (action.type) {
//         case 'HEROES_FETCHING':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'loading'
//             }
//         case 'HEROES_FETCHED':
//             return {
//                 ...state,
//                 heroes: action.payload,
//                 heroesLoadingStatus: 'idle',
//             }
//         case 'HEROES_FETCHING_ERROR':
//             return {
//                 ...state,
//                 heroesLoadingStatus: 'error'
//             }
//         case 'HEROES_CREATING':
//             return {
//                 ...state,
//                 heroes: [...state.heroes, action.payload],
//             }
//         case 'HEROES_REMOVING':
//             const heroes = state.heroes.filter(
//                 item => item.id !== action.payload
//             );
//             return {
//                 ...state,
//                 heroes,
//             }
//
//         default:
//             return state
//     }
// }

// export default heroes;