import { createSlice } from '@reduxjs/toolkit';

var initialState = {
    product: [],
    number: 0,
    userLogin: {
        fullName: "",
        phoneNumber: "",
        email: "",
        address: "",
        city: "",
        country: "",
    }
}
if (localStorage.getItem("product") !== null)
    initialState.product = JSON.parse(localStorage.getItem("product"));
if (localStorage.getItem("number") !== null)
    initialState.number = parseInt(localStorage.getItem("number"));
if (JSON.parse(localStorage.getItem("user")).email !== null)
    initialState.userLogin = JSON.parse(localStorage.getItem("user"));

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        updateNumber: (state, action) => {
            state.number = action.payload.number + state.number;
            localStorage.setItem("number", state.number);
        },
        addProduct: (state, action) => {
            state.product.push(action.payload);
            //convert array to string
            localStorage.setItem("product", JSON.stringify(state.product));

        },
        setUserLogin: (state, action) => {
            state.userLogin = action.payload;
            //convert array to string
            localStorage.setItem("user", JSON.stringify(state.userLogin));
        },
        increaseQuatity: (state, action) => {
            state.product[action.payload].number = state.product[action.payload].number + 1;
            state.number = state.number + 1;
            localStorage.setItem("number", state.number);
            localStorage.setItem("product", JSON.stringify(state.product));
        },
        decreaseQuatity: (state, action) => {
            if (state.product[action.payload].number > 1) {
                state.product[action.payload].number = state.product[action.payload].number - 1;
                state.number = state.number - 1;
                localStorage.setItem("number", state.number);
                localStorage.setItem("product", JSON.stringify(state.product));
            }
        },
        deleteProduct: (state, action) => {
            state.number = state.number - state.product[action.payload].number;
            state.product.splice(action.payload, 1);
            localStorage.setItem("number", state.number);
            localStorage.setItem("product", JSON.stringify(state.product));
        },
        deleteAllProduct: (state, action) => {
            state.number = 0;
            state.product = [];
            localStorage.setItem("number", state.number);
            localStorage.setItem("product", JSON.stringify(state.product));
        }
    }
});
export const { updateNumber } = userSlice.actions;
export const { addProduct } = userSlice.actions;
export const { increaseQuatity } = userSlice.actions;
export const { decreaseQuatity } = userSlice.actions;
export const { deleteProduct } = userSlice.actions;
export const { setUserLogin } = userSlice.actions;
export const { deleteAllProduct } = userSlice.actions;

export const selectNumber = state => state.user.number;
export const selectProduct = state => state.user.product;
export const selectUserLogin = state => state.user.userLogin;

export default userSlice.reducer;