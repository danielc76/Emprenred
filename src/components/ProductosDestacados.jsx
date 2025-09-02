import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebase";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/ProductosDestacados.css";

const ProductosDestacados = () => {
    const [productos, setProductos] = useState([]);

    useEffect(() => {
        const fetchProductos = async () => {
            const productosCol = collection(db, "productos");
            const productosSnapshot = await getDocs(productosCol);
            const productosList = productosSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setProductos(productosList);
        };
        fetchProductos();
    }, []);

    const settings = {
        infinite: true,          // el carrusel se repite infinitamente
        speed: 800,              // duración de la animación en ms
        slidesToShow: 5,         // slides visibles
        slidesToScroll: 1,       // cantidad de slides que se mueven al avanzar
        autoplay: true,          // avanza automáticamente
        autoplaySpeed: 2000,     // tiempo entre cambios automáticos
        arrows: true,            // muestra flechas
        dots: false,             // puntos de navegación
        pauseOnHover: true,      // pausa autoplay al pasar el mouse
        swipe: true,             // permite swipe en móviles
        centerMode: true,       // centra el slide activo
        centerPadding: "0px", // sin padding lateral        
        variableWidth: false,   // <--- evitar duplicación de filas
        responsive: [
             { breakpoint: 1600, settings: { slidesToShow: 5 } },
            { breakpoint: 1536, settings: { slidesToShow: 4 } },
            { breakpoint: 1024, settings: { slidesToShow: 3 } },
            { breakpoint: 768, settings: { slidesToShow: 2 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section>
            <div className="productos-destacados-container">
                <Slider {...settings}>
                    {productos.map(prod => (
                        <div key={prod.id} className="card">
                            <Link to={`/item/${prod.id}`}>
                                <img src={`/${prod.foto}`} alt={prod.name} className="product-image" />
                                <h3>{prod.name}</h3>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>

    );
};

export default ProductosDestacados;
