import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { NavLink, Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../service/firebase";
import "./css/Home.css";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
};

const Home = () => {
    const [emprendedoresData, setEmprendedoresData] = useState([]);

    // --- CARRUSEL: ref y funciones dentro del componente ---
    const carouselRef = useRef(null);

    const scrollCarousel = (direction) => {
        if (carouselRef.current) {
            const scrollAmount = 220; // ancho de la card + gap
            carouselRef.current.scrollBy({
                left: direction * scrollAmount,
                behavior: "smooth",
            });
        }
    };

    // Auto-slide cada 4 segundos
    useEffect(() => {
        const interval = setInterval(() => scrollCarousel(1), 4000);
        return () => clearInterval(interval);
    }, [emprendedoresData]);

    // --- FIN CARRUSEL ---

    useEffect(() => {
        const fetchEmprendedores = async () => {
            try {
                const snapshot = await getDocs(collection(db, "emprendedores"));
                const emprendedores = snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                    productos: doc.data().productos || [],
                }));
                setEmprendedoresData(emprendedores);
            } catch (err) {
                console.log("Error cargando emprendedores:", err);
            }
        };
        fetchEmprendedores();
    }, []);

    const toastConstruccion = () => toast.info("Sección en construcción");

    return (
        <div className="home-container">
            <ToastContainer />

            {/* Hero */}
            <motion.section
                className="hero"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="hero-text-container">
                    <h1 className="hero-slogan violet">
                        Estudiar y emprender,
                        <br />
                        juntxs es posible.
                    </h1>
                    <p className="hero-text">
                        EmprenRed nació como un sueño compartido entre estudiantes que entendemos
                        los desafíos de equilibrar los estudios con el desarrollo profesional. Este es
                        tu espacio seguro, donde encontrarás:
                    </p>
                    <ul className="hero-bullets">
                        <li>✅ Una comunidad activa que valora tu esfuerzo</li>
                        <li>✅ Herramientas para vender tus productos o servicios sin descuidar la cursada</li>
                        <li>✅ Oportunidades para crecer profesionalmente mientras sigues formándote</li>
                        <li>✅ Un mercado solidario donde tus creaciones tienen valor real</li>
                    </ul>
                    <div className="hero-buttons">
                        <NavLink to="/tienda" className="btn-primary">
                            Ver productos
                        </NavLink>
                        <button className="btn-primary" onClick={toastConstruccion}>
                            Unite ahora
                        </button>
                    </div>
                </div>
                <img
                    src="/assets/img/JovenesEstudiando.jpg"
                    alt="Jóvenes estudiando"
                    className="hero-img hero-img-left"
                />
            </motion.section>

            {/* Qué es EmprenRed */}
            <motion.section
                className="about"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <div className="about-content">
                    <img
                        src="/assets/img/JovenesVendiendo.jpg"
                        alt="Emprendedores"
                        className="about-img"
                    />
                    <div className="about-text">
                        <h2 className="violet">Qué es EmprenRed</h2>
                        <p>
                            EmprenRed es mucho más que una tienda online: es un puente entre tus estudios y tu futuro profesional.
                            Sabemos que trabajar y estudiar al mismo tiempo es un desafío. Esta es una red de la que sos parte donde podés comprar
                            y vender tus productos y servicios sin que se te complique la cursada. ¡Vos manejás tus tiempos!
                            Si fabricás, creás, revendés productos u ofrecés servicios, este es tu lugar.
                            Entre los estudiantes nos damos una mano. Esto es una comunidad. Un mercado solidario donde lo que hacés vale y se reconoce. Nos ayudamos entre todxs.
                            Con nuestra plataforma, podés manejar tu tiempo. Podés generar ingresos sin depender de trabajos que no se adaptan a tu vida de estudiante.
                        </p>
                    </div>
                </div>
            </motion.section>

            {/* Impacto social */}
            <motion.section
                className="impact"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <h2 className="violet">Impacto social</h2>
                <ul className="impact-list">
                    <li>✅ Apoyás directamente el sustento económico de estudiantes emprendedores</li>
                    <li>✅ Contribuís a que alguien como vos pueda seguir estudiando sin abandonar sus proyectos</li>
                    <li>✅ Fortaleces un modelo de comercio justo y colaborativo</li>
                </ul>
                <p className="impact-quote">“Juntxs es más fácil” no es solo un lema: es nuestra filosofía.</p>
                <img
                    src="/assets/img/comprando.png"
                    alt="Comprando en EmprenRed"
                    className="impact-img"
                />
            </motion.section>

            {/* Centros de estudiantes */}
            <motion.section
                className="centros"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <h2 className="violet">Centros de estudiantes / Aliados estratégicos</h2>
                <p>
                    Los centros de estudiantes son el corazón de EmprenRed. Nos ayudan a difundir la iniciativa en cada institución educativa,
                    identifican necesidades reales de quienes estudian y emprenden, y son la voz que conecta la plataforma con la comunidad educativa.
                </p>
                <ul className="centros-list">
                    <li>✅ Centros de estudiantes unidos que identificamos las mismas necesidades</li>
                    <li>✅ Estudiantes emprendedores que vivimos en carne propia el desafío de generar ingresos sin dejar nuestros estudios</li>
                    <li>✅ Profesionales jóvenes que ya pasaron por esta etapa y quieren tender puentes</li>
                </ul>
                <img
                    src="/assets/img/LaTrinchera_.jpg"
                    alt="Centros de estudiantes"
                    className="centros-img"
                />
                <img
                    src="/assets/img/ImpactoSocial.png"
                    alt="Impacto social"
                    className="centros-img"
                />
                <button className="btn-primary" onClick={toastConstruccion}>
                    Sumá tu centro de estudiantes
                </button>
            </motion.section>

            {/* Emprendimientos destacados */}
            <motion.section
                className="featured-entrepreneurs"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <h2 className="violet">Emprendimientos destacados</h2>

                <div className="carousel-container">
                    <button className="carousel-btn prev" onClick={() => scrollCarousel(-1)}>
                        &#10094;
                    </button>
                    <div className="carousel" ref={carouselRef}>
                        {emprendedoresData.length > 0 ? (
                            emprendedoresData.map((emp) => (
                                <motion.div
                                    key={emp.id}
                                    className="card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                >
                                    <Link to={`/emprendedor/${emp.nombreEmprendimiento}`}>
                                        <img src={`/assets/img/${emp.foto}`} alt={emp.nombreEmprendimiento} />
                                        <h3>{emp.nombreEmprendimiento}</h3>
                                    </Link>
                                </motion.div>
                            ))
                        ) : (
                            <p>No hay emprendimientos destacados disponibles.</p>
                        )}
                    </div>
                    <button className="carousel-btn next" onClick={() => scrollCarousel(1)}>
                        &#10095;
                    </button>
                </div>
            </motion.section>

            {/* Footer */}
            <motion.footer
                className="footer"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
            >
                <p className="footer-slogan">
                    Construyamos juntos un futuro donde estudiar y emprender sea posible.
                </p>
                <div className="footer-buttons">
                    <button className="btn-primary" onClick={toastConstruccion}>
                        Subí tu producto
                    </button>
                    <button className="btn-primary" onClick={toastConstruccion}>
                        Unite ahora
                    </button>
                    <button className="btn-primary" onClick={toastConstruccion}>
                        Sumá tu centro
                    </button>
                </div>
                <img src="/assets/img/loguito.gif" alt="Logo EmprenRed" className="footer-logo" />
            </motion.footer>
        </div>
    );
};

export default Home;
