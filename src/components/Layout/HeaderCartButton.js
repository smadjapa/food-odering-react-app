import { useContext, useEffect, useState } from 'react';

import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

/**
 * HeaderCartButton Component
 * @param {Object} props Contains the onClick handler
 * @returns {JSX} HeaderCartButton JSX
 */
const HeaderCartButton = props => {

    /**
     * Decalring the constants i.e. 
     * @const cartCtx
     * Cart button highlight ststes
     * Destructured @const items variable from the cartCtx object
     */
    const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
    const cartCtx = useContext(CartContext);
    const { items } = cartCtx;

    /**
     * @const cartItemsQty
     * total quantity of all the items in the cart
     */
    const cartItemsQty = items.reduce((currentNumber,item) => {
        return currentNumber + item.amount;
    }, 0);

    /**
     * Conditioned animating css classes for the cart button
     * @const {String} btnClasses
     */
    const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`;

    useEffect(() => {
        if (items.length === 0) {
            return;
        }
        setBtnIsHighlighted(true);

        const timer = setTimeout(() => {
            setBtnIsHighlighted(false);
        }, 300);

        return () => {
            clearTimeout(timer);
        }
    }, [items]);

    return (
        <button className={btnClasses} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon />
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {cartItemsQty}
            </span>
        </button>
    );
};

export default HeaderCartButton;