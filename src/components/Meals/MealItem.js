import { useContext } from 'react';
import MealItemForm from './MealItemForm';
import styles from './MealItem.module.css';
import CartContext from '../../store/cart-context';

const MealItem = props => {
    const cartCtx = useContext(CartContext);
    const price = `$${props.meal.price.toFixed(2)}`;

    const addToCartHandler = amount => {
        cartCtx.addItem({
            id: props.meal.id,
            name: props.meal.name,
            amount: amount,
            price: props.meal.price
        });

    }

    return (
        <li className={styles.meal}  >
            <div>
                <h3>{props.meal.name}</h3>
                <div className={styles.description}>{props.meal.description}</div>
                <div className={styles.price}>{price}</div>
            </div>
            <div>
                <MealItemForm onAddToCart={addToCartHandler} id={props.meal.id}/>
            </div>
        </li>
    );
};

export default MealItem;