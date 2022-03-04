import Modal from '../UI/Modal';
import { useContext } from 'react';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';

const Cart = props => {

    /**
     * Decalring the variables i.e. 
     * cart context variable
     * totalAmount variable (And change it to 2 dec places)
     * variable to check if there are items in the cart
     */
    const cartCtx = useContext(CartContext);
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    /**
     * Handles the action of removing the item from the cart
     * @param {String} id 
     */
    const cartItemRemoveHandler = id => { 
        cartCtx.removeItem(id);
    };

    /**
     * Handels the action of adding the item to the cart
     * @param {CartContext} item 
     */
    const cartItemAddHandler = item => { 
        cartCtx.addItem({
            ...item, amount: 1
        });
     };

     /**
      * CartItem component
      */
    const cartItems = <ul className={styles['cart-items']}>
        {cartCtx.items.map(
            item => <CartItem
                item={item}
                key={item.id}
                onRemove={cartItemRemoveHandler.bind(null, item.id)}
                onAdd={cartItemAddHandler.bind(null, item)} />
        )}</ul>;

    /**
     * Cart JSX component with the modal component
     */
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