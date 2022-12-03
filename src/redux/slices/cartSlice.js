import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cartItems: [],
    totalAmount: 0,
    totalQuantity: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItem: (state, action) => {
            const newItem = action.payload

            // Chưa có vật phẩm thì sẽ cộng số lượng lên 1
            const existingItem = state.cartItems.find(
                (item) => item.id === newItem.id
            )

            state.totalQuantity++

            // Kiểm tra nếu chưa có sp trong giỏ hàng => push Item
            if (!existingItem) {
                state.cartItems.push({
                    id: newItem.id,
                    productName: newItem.productName,
                    imgUrl: newItem.imgUrl,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price
                })
            }
            // Nếu có cộng số lượng lên đồng thời update lại totalPrice
            else {
                existingItem.quantity++
                existingItem.totalPrice = Number(existingItem.price) +
                    (newItem.price)
            }

            // tổng giá tiền
            state.totalAmount = state.cartItems.reduce((total, item) =>
                (total + Number(item.price) + Number(item.quantity)), 0
            )

        },


        deleteItem: (state, action) => {
            const id = action.payload
            const existingItem = state.cartItems.find(item => item.id === id)

            if (existingItem) {
                state.cartItems = state.cartItems.filter(item => item.id !== id)
                state.totalQuantity = state.totalQuantity - existingItem.quantity
            }
            state.totalAmount = state.cartItems.reduce((total, item) =>
                (total + Number(item.price) + Number(item.quantity)), 0
            )
        }
    }
});

export const { addItem, deleteItem } = cartSlice.actions

export default cartSlice.reducer