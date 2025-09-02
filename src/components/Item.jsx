import React from "react";
import { Link } from "react-router-dom";
import "./css/Item.css";

const Item = ({ prod, index = 0 }) => {
  if (!prod) return null;

  return (
    <div className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className="image-container">
        <img
          className="product-img"
          src={prod.foto ? `/${prod.foto}` : "/assets/img/placeholder.jpg"}
          alt={prod.name || "Producto"}
        />
        {prod.stock === 0 && <div className="sold-out-banner">AGOTADO</div>}
      </div>

      <h5 className="product-title">{prod.name || "Sin nombre"}</h5>
      <p className="product-price">${prod.precio ?? "0"}</p>

      <Link className="btn btn-primary" to={`/item/${prod.id || "#"}`}>
        Ver detalle
      </Link>
    </div>
  );
};

export default Item;
