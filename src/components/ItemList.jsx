import Item from './Item';

const ItemList = ({ data }) => {
  // si no hay data, devolvemos algo simple (tu loader ya está en el container)
  if (!data || data.length === 0) {
    return <p style={{ color: "gray" }}>No hay productos en esta categoría.</p>;
  }

  return (
    <div className="d-flex flex-wrap justify-content-start gap-3">
      {data.map((prod, index) => (
        <Item key={prod.id} prod={prod} index={index} />
      ))}
    </div>
  );
};

export default ItemList;
