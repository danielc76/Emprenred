import ItemCount from "./ItemCount";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import './css/ItemDetail.css';

const ItemDetail = ({ detalle }) => {
    const { addToCart } = useContext(CartContext);

    const onAdd = (cantidad) => {
        if (detalle.stock === 0) return; // 🔹 Evitamos agregar si está agotado
        addToCart(
            {
                id: detalle.id,
                name: detalle.name,
                price: detalle.precio,
                img: detalle.foto,
                emprendedor: detalle.emprendedor
            },
            cantidad
        );
    };

    if (!detalle || Object.keys(detalle).length === 0) {
        return <p>Cargando detalle del producto...</p>;
    }

    return (
        <div className="item-detail-container">
            <div className="item-detail-card">
                <div className="item-detail-img">
                    <img
                        src={`/${detalle.foto}`}
                        alt={detalle.name}
                    />
                    {detalle.stock === 0 && (
                        <div className="item-soldout-detail">AGOTADO</div> // 🔹 clase nueva
                    )}
                </div>
                <div className="item-detail-info">
                    <h1 className="item-name">{detalle.name}</h1>
                    <p className="item-descripcion"><strong>Descripción:</strong> {detalle.descripcion}</p>
                    <p className="item-stock"><strong>Stock:</strong> {detalle.stock} unidades</p>
                    <p className="item-price">
                        <strong>Precio:</strong> ${detalle.precio.toLocaleString()}
                    </p>
                    <p className="item-emprendedor">
                        <strong>Emprendedor:</strong>
                        <Link to={`/emprendedor/${detalle.emprendedor}`} className="emprendedor-link">
                            {detalle.emprendedor}
                        </Link>
                    </p>
                    <ItemCount stock={detalle.stock} onAdd={onAdd} disabled={detalle.stock === 0} />                    
                </div>
            </div>
        </div>
    );
};

export default ItemDetail;
