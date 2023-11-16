export default function getFiltersData (name, selectedFilter) {

        switch (name){
            case "fire":
                return {
                    classNameBtn: selectedFilter === name ? "btn-danger active" : "btn-outline-danger",
                    textContent: "Огонь"
                }
            case "water":
                return {
                    classNameBtn: selectedFilter === name ? "btn-primary active" : "btn-outline-primary",
                    textContent: "Вода"
                }
            case "wind":
                return {
                    classNameBtn: selectedFilter === name ? "btn-success active" : "btn-outline-success",
                    textContent: "Ветер"
                }
            case "earth":
                return {
                    classNameBtn: selectedFilter === name ? "btn-secondary active" : "btn-outline-secondary",
                    textContent: "Земля"
                }
            default:
                return {
                    classNameBtn: selectedFilter === name ? "btn-dark active" : "btn-outline-dark",
                    textContent: "Все"
                }
        }
    }