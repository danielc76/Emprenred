import Item from './Item';
import './css/ItemList.css'; // para estilos de distribución

const ItemList = ({ data }) => {
  // si no hay data, devolvemos algo simple (tu loader ya está en el container)
  if (!data || data.length === 0) {
    return <p style={{ color: "gray" }}>No hay productos en esta categoría.</p>;
  }

  return (
    <div className="item-list d-flex flex-wrap">
      {data.map((prod, index) => (
        <Item key={prod.id} prod={prod} index={index} />
      ))}
    </div>
  );
};

export default ItemList;
