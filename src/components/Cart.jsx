import React, { useContext } from 'react'
// Importamos el contexto del carrito
import { CartContext } from '../context/CartContext'
// Importamos la vista principal del carrito
import CartView from './CartView'
// Importamos componente que muestra carrito vacío
import EmptyCart from './EmptyCart'

const Cart = () => {
    // Traemos el array de productos del carrito desde el contexto
    const { cart } = useContext(CartContext)

    return (
        <>
            {/* Si hay productos en el carrito mostramos CartView, si no mostramos EmptyCart */}
            {cart.length ? <CartView /> : <EmptyCart />}
        </>
    )
}

export default Cart
