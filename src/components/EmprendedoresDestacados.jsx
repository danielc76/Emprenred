// EmprendedoresDestacados.jsx
import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebase";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./css/EmprendedoresDestacados.css";

const EmprendedoresDestacados = () => {
    const [emprendedores, setEmprendedores] = useState([]);

    useEffect(() => {
        const fetchEmprendedores = async () => {
            const emprendedoresCol = collection(db, "emprendedores");
            const snapshot = await getDocs(emprendedoresCol);
            const list = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setEmprendedores(list);
        };
        fetchEmprendedores();
    }, []);

    const settings = {
        infinite: true,
        speed: 800,
        slidesToShow: 2,          // solo 2 por vez
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2500,
        arrows: true,
        dots: false,
        pauseOnHover: true,
        swipe: true,
        centerMode: true,
        centerPadding: "0px",
        variableWidth: false,
        responsive: [
            { breakpoint: 1024, settings: { slidesToShow: 2 } },
            { breakpoint: 768, settings: { slidesToShow: 1 } },
            { breakpoint: 480, settings: { slidesToShow: 1 } },
        ],
    };

    return (
        <section>
            <h2 className="violet centered-title">Emprendimientos Destacados</h2>
            <div className="emprendedores-destacados-container">
                <Slider {...settings}>
                    {emprendedores.map(emp => (
                        <div key={emp.id} className="card">
                            <Link to={`/emprendedor/${emp.nombreEmprendimiento}`}>
                                <img
                                    src={`/assets/img/${emp.foto}`}
                                    alt={emp.nombreEmprendimiento}
                                    className="emprendedor-image"
                                />
                                <h3>{emp.nombreEmprendimiento}</h3>
                            </Link>
                        </div>
                    ))}
                </Slider>
            </div>
        </section>
    );
};

export default EmprendedoresDestacados;
