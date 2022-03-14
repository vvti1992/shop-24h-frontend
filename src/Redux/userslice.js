import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    product: [],
    number: 0,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateNumber: (state, action) => {
            state.number =action.payload.number + state.number;
            // console.log(action);
        },
        addProduct: (state, action) => {
            state.product.push(action.payload);
        
        },
        increaseQuatity: (state, action) => {
            state.product[action.payload].number = state.product[action.payload].number + 1;
        },
        decreaseQuatity: (state, action) => {
            if(state.product[action.payload].number > 1)
            state.product[action.payload].number = state.product[action.payload].number - 1;
        },
        deleteProduct: (state, action) => {
            state.number =state.number - state.product[action.payload].number;
            state.product.splice(action.payload,1);
           
        
        }
    }
});
export const {updateNumber} = userSlice.actions;
export const {addProduct} = userSlice.actions;
export const {increaseQuatity} = userSlice.actions;
export const {decreaseQuatity} = userSlice.actions;
export const {deleteProduct} = userSlice.actions;

export const selectNumber = state => state.user.number;
export const selectProduct = state => state.user.product;


export default userSlice.reducer;