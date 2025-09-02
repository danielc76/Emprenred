import React from 'react'
import { Link } from 'react-router-dom'
import { BsCartX } from 'react-icons/bs' // Ícono de carrito vacío
import './css/EmptyCart.css'

const EmptyCart = () => {
    return (
        <div className="empty-cart-container">
            {/* Ícono grande del carrito vacío */}
            <BsCartX className="empty-cart-icon" />

            {/* Mensajes */}
            <h2>Tu carrito está vacío</h2>
            <p>¡Todavía no agregaste productos! <br />Explorá nuestra tienda.</p>

            {/* Botón para volver al inicio */}
            <Link className="btn btn-primary btn-back-home" to="/">Volver al inicio</Link>
        </div>
    )
}

export default EmptyCart
