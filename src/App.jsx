import 'bootstrap/dist/css/bootstrap.min.css'; 
import './App.css'; 
import NavBar from './components/NavBar.jsx';
import ItemListContainer from './components/ItemListContainer.jsx';


function App() {
  return (
    <>
      <NavBar />
      <ItemListContainer mensaje="¡Bienvenido a Emprenred!" />
      <div className="container mt-5">
        <p>Un espacio para que los emprendedores puedan exponer sus productos.</p>
        <img src="imagencentral.png" alt="Logo Emprenred" className="img-fluid" />
      </div>
    </>
  );
}

export default App;
