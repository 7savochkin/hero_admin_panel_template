import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useHttp} from "../../hooks/http.hook";
import {filtersFetching, filtersFetched, filtersFetchingError, filtersSelect} from "../../actions";
import Spinner from "../spinner/Spinner";


// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом


const HeroesFilters = () => {

    const {filters, filtersLoadingStatus, selectedFilter} = useSelector(state => state);
    const dispatch = useDispatch();
    const {request} = useHttp();

    useEffect(()=>{
        dispatch(filtersFetching());
        request("http://localhost:3001/filters", "GET")
            .then(data => dispatch(filtersFetched(data)))
            .catch(() => dispatch(filtersFetchingError()))
    }, []);

    if (filtersLoadingStatus === "loading"){
        return <Spinner/>
    } else if (filtersLoadingStatus === "error"){
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const getBtnData = (name) => {

        switch (name){
            case "fire":
                return {
                    classNameBtn: selectedFilter === name ? "btn-danger active" : "btn-outline-danger",
                    textBtn: "Огонь"
                }
            case "water":
                return {
                    classNameBtn: selectedFilter === name ? "btn-primary active" : "btn-outline-primary",
                    textBtn: "Вода"
                }
            case "wind":
                return {
                    classNameBtn: selectedFilter === name ? "btn-success active" : "btn-outline-success",
                    textBtn: "Ветер"
                }
            case "earth":
                return {
                    classNameBtn: selectedFilter === name ? "btn-secondary active" : "btn-outline-secondary",
                    textBtn: "Земля"
                }
            default:
                return {
                    classNameBtn: selectedFilter === name ? "btn-dark active" : "btn-outline-dark",
                    textBtn: "Все"
                }
        }
    }

    const renderBtns = (arr) => {
        return arr.map((name, ind)=>{
            const btnData = getBtnData(name);
            return <button
                key={ind}
                className={`btn ${btnData.classNameBtn}`}
                onClick={()=> dispatch(filtersSelect(name))}
            >
                {btnData.textBtn}</button>
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