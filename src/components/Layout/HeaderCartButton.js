import { useContext } from 'react';

import CartIcon from "../Cart/CartIcon";
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = props => {

    const cartCtx = useContext(CartContext);
    const cartItemsQty = cartCtx.items.reduce((currentNumber,item) => {
        return currentNumber + item.amount;
    }, 0)

    return (
        <button className={styles.button} onClick={props.onClick}>
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