import Modal from '../UI/Modal';
import React, { useContext, useState } from 'react';
import styles from './Cart.module.css';
import CartItem from './CartItem';
import CartContext from '../../store/cart-context';
import Checkout from './Checkout';

const Cart = props => {

    /**
     * Decalring the variables i.e. 
     * cart context variable
     * totalAmount variable (And change it to 2 dec places)
     * variable to check if there are items in the cart
     */
    const [isCheckout, setIsCheckout] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [didSubmit, setDidSubmit] = useState(false);
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

    const orderHandler = () => {
        setIsCheckout(true);
    };

    const submitOrderHandler = (userData) => {
        setIsSubmitting(true);
        fetch('https://react-http-chooks-default-rtdb.firebaseio.com/orders.json', {
            method: 'POST',
            body: JSON.stringify({
                user: userData,
                oderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
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

    const modalActions = <div className={styles.actions}>
        <button className={styles['button--alt']} onClick={props.onCloseCart}>Close</button>
        {hasItems && <button className={styles.button} onClick={orderHandler}>Order</button>}
    </div>

    const cartModalContent =
        <React.Fragment>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            {isCheckout && <Checkout onCancel={props.onCloseCart} onConfirm={submitOrderHandler} />}
            {!isCheckout && modalActions}
        </React.Fragment>

        const isSubmittingModalContent = <p>Sending order data...</p>;

        const didSubmitModalContent = <p>Successfully sent the order!</p>;

    /**
     * Cart JSX component with the modal component
     */
    return (
        <Modal onClose={props.onCloseCart}>
            {!isSubmitting && !didSubmit && cartModalContent}
            {isSubmitting && isSubmittingModalContent}
            {didSubmit && didSubmitModalContent}
        </Modal>
    );
};

export default Cart;