export const addDecimals = (num) => {
    return (Math.round(num * 100 / 100)).toFixed(2)
}

export const updateCart = (state) => {

    // calculate items price
    state.itemsPrice = addDecimals(state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    // calculate shipping price (if order is over 50000 shipping is free else 10% of item price)
    state.shippingPrice = addDecimals(state.itemsPrice > 50000 ? 0 : (Number(state.itemsPrice) * 0.10).toFixed(2))
    // calculate tax price - (15% tax)
    state.taxPrice = addDecimals(Number(state.itemsPrice * 0.15).toFixed(2))
    // calculate total price
    state.totalPrice = (
        Number(state.itemsPrice) +
        Number(state.shippingPrice) +
        Number(state.taxPrice)
    ).toFixed(2);

    localStorage.setItem('cart', JSON.stringify(state));

    return state
}