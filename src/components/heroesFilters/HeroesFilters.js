import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {filtersSelect, fetchFilters, selectAll} from "./filtersSlice";
import Spinner from "../spinner/Spinner";
import getFiltersData from "../../services/FiltersData";
import store from "../../store";


// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом


const HeroesFilters = () => {

    const {filtersLoadingStatus, selectedFilter} = useSelector(state => state.filters);

    const filters = selectAll(store.getState());

    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(fetchFilters());
        // eslint-disable-next-line
    }, []);

    if (filtersLoadingStatus === "loading"){
        return <Spinner/>
    } else if (filtersLoadingStatus === "error"){
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const renderBtns = (arr) => {
        return arr.map((item, ind)=>{
            const btnData = getFiltersData(item.name, selectedFilter);
            return <button
                key={ind}
                className={`btn ${btnData.classNameBtn}`}
                onClick={()=> dispatch(filtersSelect(item.name))}
            >
                {btnData.textContent}</button>
        });
    }

    const buttons = renderBtns(filters);

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {buttons}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;