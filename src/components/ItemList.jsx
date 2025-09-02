import Item from './Item';
import './css/ItemList.css';  

const ItemList = ({ data }) => { 
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
