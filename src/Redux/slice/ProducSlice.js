import {createSlice} from '@reduxjs/toolkit';

const ProducSlice = createSlice({
    name: 'myData',
    initialState: {
        products: [],
    },
    reducers: {
        products: (state, action) => {
            state.products = action.payload;
        },
    },
});

export const {products} = ProducSlice.actions;

export default ProducSlice.reducer;