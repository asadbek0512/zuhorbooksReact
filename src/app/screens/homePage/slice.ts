import { createSlice } from "@reduxjs/toolkit";
import { HomePageState } from "../../../lib/types/screen";

const initialState: HomePageState = {
    popularDishes: [],
    newDishes: [],
    topUsers: [],
};

const HomePageSlice = createSlice({ // Bitta argument pas qilinyapti va optionslarni yozilyapti
    name: "homePage",
    initialState,
    reducers: {
        setPopularDishes: (state, action) => {
            state.popularDishes = action.payload;
        },
        setNewDishes: (state, action) => {
            state.newDishes = action.payload;
        },
        setTopUsers: (state, action) => {
            state.topUsers = action.payload;
        },
    },
});

export const { setPopularDishes, setNewDishes, setTopUsers } =
    HomePageSlice.actions;

// const HomePageReducer = HomePageSlice.reducer;
// export default HomePageReducer;

export default HomePageSlice.reducer;