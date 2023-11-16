import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice
} from "@reduxjs/toolkit";
import {useHttp} from "../../hooks/http.hook";

// const initialState = {
//     filters: [],
//     selectedFilter: "all",
//     filtersLoadingStatus: "idle"
// }

const filtersAdapter = createEntityAdapter();

const initialState = filtersAdapter.getInitialState({
    selectedFilter: "all",
    filtersLoadingStatus: "idle"
})

export const fetchFilters = createAsyncThunk(
    "filters/fetchFilters",
    async () => {
        const {request} = useHttp();
        return await request("http://localhost:3001/filters", "GET")
    }
)

const filtersSlice = createSlice({
    name: "filters",
    initialState,
    reducers: {
        filtersSelect: (state, action) => {
            state.selectedFilter = action.payload;
        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchFilters.pending, state => {
                state.filtersLoadingStatus = "loading";
            })
            .addCase(fetchFilters.fulfilled, (state, action) => {
                state.filtersLoadingStatus = "idle";
                filtersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchFilters.rejected, state => {
                state.filtersLoadingStatus = "error";
            })
            .addDefaultCase(() => {})
    }
});

const {actions, reducer} = filtersSlice;
export default reducer;

export const {selectAll} = filtersAdapter.getSelectors(state => state.filters);

export const {
    filtersSelect
} = actions;
