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
            <h1 className="cart-title">Tu carrito</h1>

            {/* Lista de productos en el carrito */}
            <div className="cart-list">
                {cart.map((compra) => (
                  
                    <div key={compra.id} className="cart-item">
                        {/* Imagen: contenida en un wrapper para controlar altura y aplicar hover */}
                        <div className="cart-img-wrap">
                            <img src={compra.img} alt={compra.name} className="cart-img" />
                        </div>

                        <div className="cart-info">
                            <span className="cart-name">{compra.name}</span>

                            <span className="cart-emprendedor">
                                {compra.emprendedor ? `Emprendimiento: ${compra.emprendedor}` : ''}
                            </span>
                        </div>

                        {/* Precios y cantidades (alineados a la derecha dentro del ítem) */}
                        <div className="cart-meta">
                            <span className="cart-price">
                                ${compra.price.toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </span>
                            <span className="cart-qty">unidades: {compra.quantity}</span>
                            <span className="cart-subtotal">
                                precio final: $
                                {(compra.price * compra.quantity).toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                            </span>
                        </div>

                        <button
                            className="btn btn-danger cart-remove"
                            onClick={() => removeFromCart(compra.id)}
                            aria-label={`Eliminar ${compra.name}`}
                        >
                            X
                        </button>
                    </div>
                ))}
            </div>

            {/* Total a pagar */}
            <h4 className="cart-total">
                Total a pagar: $
                {getCartTotal().toLocaleString("es-AR", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
            </h4>

            {/* Botones para limpiar carrito o finalizar compra */}
            <div className="cart-buttons">
                <button className="btn btn-danger" onClick={clearCart}>Borrar Carrito</button>
                <Link className="btn btn-primary" to="/CheckOutForm">Terminar Compra</Link>
            </div>
        </div>
    )
}

export default CartView
