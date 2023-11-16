import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from 'yup';
import {useDispatch, useSelector} from "react-redux";
import getFiltersData from "../../services/FiltersData";
import {useState} from "react";
import {useHttp} from "../../hooks/http.hook";

import {v4 as uuidv4} from 'uuid';
import {heroesCreating} from "../heroesList/heroesSlice";
import {selectAll} from "../heroesFilters/filtersSlice";
import store from "../../store";

// import {heroesCreating} from "../../actions";


// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров


const HeroesAddForm = () => {

    const [formSubmit, setFormSubmit] = useState(false),
        [errorSubmit, setErrorSubmit] = useState(false);

    const filters = selectAll(store.getState());
    const dispatch = useDispatch();
    const {request} = useHttp();


    const cleanElement = (values) => {
        const errors = {},
            value = values.element;

        if (!value || value === "all" || !filters) {
            errors.element = "Обязательное поле";
        }
        return errors
    }

    const renderOptionElements = () => {
        return filters.map((item, ind) => {
            const textContent = getFiltersData(item.name).textContent
            if (item.name !== "all") {
                return <option key={ind} value={item.name}>{textContent}</option>
            }
        });
    }

    const onSuccessForm = (newHero, resetFunc) => {
        setFormSubmit(false);
        setErrorSubmit(false);
        resetFunc();
        dispatch(heroesCreating(newHero));
    }

    const onErrorForm = () => {
        setFormSubmit(false);
        setErrorSubmit(true);
    }

    return (
        <Formik
            initialValues={{
                name: "",
                description: "",
                element: ""
            }}
            validationSchema={Yup.object().shape({
                name: Yup.string()
                    .required("Обязательное поле")
                    .min(2, "Имя должно состоять минимум из 2 символов"),
                description: Yup.string()
                    .required("Обязательное поле")
                    .min(4, "Описание должно состоять минимум из 4 символов"),
                element: Yup.string()
                    .required("Обязательное поле")
            })}
            validate={cleanElement}
            onSubmit={(values, {resetForm}) => {
                setFormSubmit(true);
                request("http://localhost:3001/heroes", "POST",
                    JSON.stringify({id: uuidv4(), ...values})
                ).then((data) => onSuccessForm(data, resetForm)
                ).catch(onErrorForm)
            }}
        >
            <Form action={"POST"} className="border p-4 shadow-lg rounded">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label fs-4">Имя
                        нового героя</label>
                    <Field
                        required
                        type="text"
                        name="name"
                        className="form-control"
                        id="name"
                        placeholder="Как меня зовут?"/>
                    <ErrorMessage name="name" className="text-danger mt-1"
                                  component="div"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="description"
                           className="form-label fs-4">Описание</label>
                    <Field
                        required
                        as="textarea"
                        name="description"
                        className="form-control"
                        id="text"
                        placeholder="Что я умею?"
                        style={{"height": '130px'}}/>
                    <ErrorMessage name="description" className="text-danger mt-1"
                                  component="div"/>
                </div>

                <div className="mb-3">
                    <label htmlFor="element" className="form-label">Выбрать
                        элемент героя</label>
                    <Field
                        required
                        as="select"
                        className="form-select"
                        id="element"
                        name="element">
                        <option>Я владею элементом...</option>
                        {renderOptionElements()}
                    </Field>
                    <ErrorMessage name="element"
                                  className="text-danger mt-1"
                                  component="div"/>
                </div>

                <button type="submit" disabled={formSubmit}
                        className="btn btn-primary">Создать
                </button>
                {errorSubmit && <div className="text-danger mt-1">Ошибка сервера</div>}
            </Form>
        </Formik>
    )
}

export default HeroesAddForm;