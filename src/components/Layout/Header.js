import React from "react";
import mealsImage from '../../assets/meals.jpeg';
import styles from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

/**
 * Header Component
 * @param {Object} props Contains onShowCart handler
 * @returns {JSX} Header JSX
 */
const Header = props => {
    return(
        <React.Fragment>
            <header className={styles.header}>
                <h1>ReactMeals</h1>
                <HeaderCartButton onClick={props.onShowCart} />
            </header>
            <div className={styles['main-image']}>
                <img src={ mealsImage } alt="A pile of meals" />
            </div>
        </React.Fragment>
    );
};

//export the component
export default Header;