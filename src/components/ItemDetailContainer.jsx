import React, { useEffect, useState, useContext } from 'react';
import ItemDetail from './ItemDetail';
import { useParams } from 'react-router-dom';
import LoaderComponent from "./LoaderComponent";

import { collection, doc, getDoc } from 'firebase/firestore';
import { db } from '../service/firebase';

// Importamos el contexto del carrito para poder agregar productos
import { CartContext } from '../context/CartContext';

const ItemDetailContainer = () => {
    const [detalle, setDetalle] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { id } = useParams();

    // Traemos la función para agregar productos al carrito desde el contexto
    const { addItem } = useContext(CartContext);

    useEffect(() => {
        setLoading(true);
        setError(null);

        // lo convierto a número porque los id en firestore los tengo como números 
        const docRef = doc(db, "productos", id)
        getDoc(docRef)
            .then((res) => {
                if (res.data()) {
                    setDetalle({ id: res.id, ...res.data() });
                } else {
                    setError(true);
                    //  navigate('/notFound')
                }
            })
            .catch((error) => console.log(error))
            .finally(() => setLoading(false));
    }, [id]);

    if (loading) return <LoaderComponent />;
    if (error) return <p style={{ color: 'red' }}>Error: {error}</p>;
    if (!detalle) return <p>No se encontró el producto.</p>;

    // Función que se pasa a ItemDetail para agregar el producto al carrito
    const handleAgregarAlCarrito = (cantidad) => {
        // Le pasamos el detalle completo del producto y la cantidad
        addItem({ ...detalle, quantity: cantidad });
    };

    return <ItemDetail detalle={detalle} onAdd={handleAgregarAlCarrito} />;
};

export default ItemDetailContainer;
