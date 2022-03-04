import Modal from '../UI/Modal';
import { useContext } from 'react';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

const Cart = props => {

    const cartCtx = useContext(CartContext);

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => { 
        cartCtx.removeItem(id);
    };

    const cartItemAddHandler = item => { 
        cartCtx.addItem({
            ...item, amount: 1
        });
     };

    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map(
            item => <CartItem
                item={item}
                key={item.id}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)} />
        )}</ul>;

    return (
        <Modal onClose={props.onCloseCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onCloseCart}>Close</button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
};

export default Cart;