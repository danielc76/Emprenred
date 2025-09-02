import React, { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import { Link } from 'react-router-dom'
// Importamos los estilos del componente
import './css/CartView.css'

const CartView = () => {
    // Traemos las funciones y el estado directamente del context
    const { cart, clearCart, removeFromCart, getCartTotal } = useContext(CartContext)

    return (
        <div className="cart-container">
            <h1>Tu carrito</h1>

            {/* Lista de productos en el carrito */}
            <div>
                {cart.map((compra) => (
                    <div key={compra.id} className="cart-item">
                        <img src={compra.img} alt={compra.name} />
                        <span>{compra.name}</span>
                        <span>${compra.price},00</span>
                        <span>unidades: {compra.quantity}</span>
                        <span>precio final: ${compra.price * compra.quantity},00</span>
                        <button className='btn btn-danger' onClick={() => removeFromCart(compra.id)}>X</button>
                    </div>
                ))}
            </div>

            {/* Total a pagar */}
            <h4>Total a pagar: ${getCartTotal()},00</h4>

            {/* Botones para limpiar carrito o finalizar compra */}
            <div className="cart-buttons">
                <button className='btn btn-danger' onClick={clearCart}>Borrar Carrito</button>
                <Link className='btn btn-success' to='/CheckOutForm'>Terminar Compra</Link>
            </div>
        </div>
    )
}

export default CartView
