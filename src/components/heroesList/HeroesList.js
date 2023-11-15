import {useHttp} from '../../hooks/http.hook';
import {useCallback, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {createSelector} from "reselect";

import {fetchHeroes, heroesRemoving} from '../../actions';
import HeroesListItem from "../heroesListItem/HeroesListItem";
import Spinner from '../spinner/Spinner';


// Задача для этого компонента:
// При клике на "крестик" идет удаление персонажа из общего состояния
// Усложненная задача:
// Удаление идет и с json файла при помощи метода DELETE

const HeroesList = () => {

    // const filteredHeroes = useSelector(state => {
    //      console.log('render');
    //    if (state.filters.selectedFilter === "all"){
    //        return state.heroes.heroes;
    //    } else{
    //        return state.heroes.heroes.filter(item => item.element === state.filters.selectedFilter);
    //    }
    // });

    const filteredHeroesSelector = createSelector(
        [
            state => state.heroes.heroes,
            state => state.filters.selectedFilter
        ],
        (heroes, selectedFilter) => {
            console.log('render');
            if (selectedFilter === "all") {
                return heroes;
            } else {
                return heroes.filter(item => item.element === selectedFilter)
            }
        });

    const filteredHeroes = useSelector(filteredHeroesSelector);

    const heroesLoadingStatus = useSelector(state => state.heroes.heroesLoadingStatus);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(() => {
        dispatch(fetchHeroes(request));
        // eslint-disable-next-line
    }, []);

    const removeHero = useCallback((id) => {
        request(`http://localhost:3001/heroes/${id}`, 'DELETE')
            .then(() => dispatch(heroesRemoving(id)))
            .catch(err => console.log(err))
    }, [request]);

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderHeroesList = (arr) => {
        if (arr.length === 0) {
            return <h5 className="text-center mt-5">Героев пока нет</h5>
        }

        return arr.map(({id, ...props}) => {
            return <HeroesListItem key={id}
                                   onRemove={() => removeHero(id)} {...props}/>
        })
    }

    const elements = renderHeroesList(filteredHeroes);
    return (
        <ul>
            {elements}
        </ul>
    )
}

export default HeroesList;