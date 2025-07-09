import { BsCart3 } from 'react-icons/bs';

function CartWidget() {
  return (
    <div style={{ position: 'relative' }}>
      <BsCart3 size={24} />
      <span style={{
        position: 'absolute',
        top: -8,
        right: -10,
        backgroundColor: 'red',
        color: 'white',
        borderRadius: '50%',
        padding: '0.1rem 0.4rem',
        fontSize: '0.7rem'
      }}>
        8
      </span>
    </div>
  );
}

export default CartWidget;
