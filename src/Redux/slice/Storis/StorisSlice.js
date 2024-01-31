import {createSlice} from '@reduxjs/toolkit';

const StorisSlice = createSlice({
    name: 'myData',
    initialState: {
        stosis: [],
    },
    reducers: {
        stories: (state, action) => {
            state.stosis = action.payload;
        },
    },
});

export const {stories} = StorisSlice.actions;

export default StorisSlice.reducer;