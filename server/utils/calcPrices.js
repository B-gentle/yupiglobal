 const addDecimals = (num) => {
    return (Math.round(num * 100 / 100)).toFixed(2)
}

const calcPrices = (orderItems) => {

    // calculate items price
    const itemsPrice = addDecimals(orderItems.reduce((acc, item) => acc + item.price * item.qty, 0))
    // calculate shipping price (if order is over 50000 shipping is free else 10% of item price)
    const shippingPrice = addDecimals(itemsPrice > 50000 ? 0 : (Number(itemsPrice) * 0.10).toFixed(2))
    // calculate tax price - (15% tax)
    const taxPrice = addDecimals(Number(itemsPrice * 0.15).toFixed(2))
    // calculate total price
    const totalPrice = (
        Number(itemsPrice) +
        Number(shippingPrice) +
        Number(taxPrice)
    ).toFixed(2);

    return { itemsPrice, shippingPrice, taxPrice, totalPrice }
}

module.exports = { addDecimals, calcPrices }