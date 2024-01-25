import {
    createSlice
} from '@reduxjs/toolkit';
import {
    updateCart
} from '../../utils/cartUtils';

const initialState = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : {
    cartItems: [],
    shippingAddress: {},
    paymentMethod: 'payStack'
}

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const item = action.payload;
            const itemExist = state.cartItems.find((itm) => itm._id === item._id);

            if (itemExist) {
                state.cartItems = state.cartItems.map((itm) => itm._id === itemExist._id ? item : itm)
            } else {
                state.cartItems = [...state.cartItems, item]
            }

            return updateCart(state)
        },

        removeFromCart: (state, action) => {
            state.cartItems = state.cartItems.filter((itm) => itm._id !== action.payload)
            return updateCart(state)
        },

        saveShippingAddress: (state, action) => {
            state.shippingAddress = action.payload;
            return updateCart(state)
        },

        savePaymentMethod: (state, action) => {
            state.paymentMethod = action.payload;
            return updateCart(state)
        },

        clearCartItems: (state, action) => {
            state.cartItems = []
            return updateCart(state);
        },
        resetCart: (state) => (state = initialState)
    }
});

export const {
    addToCart,
    removeFromCart,
    saveShippingAddress,
    savePaymentMethod,
    clearCartItems,
    resetCart
} = cartSlice.actions

export default cartSlice.reducer