import { useRef, useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === '';
const isFiveChars = value => value.trim().length === 5;

const Checkout = (props) => {

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        poastalCode: true
    });

    const nameInputRef = useRef();
    const streetInputRef = useRef();
    const postalInputRef = useRef();
    const cityInputRef = useRef();

    const confirmHandler = (event) => {
        event.preventDefault();

        const enteredNameIsValid = !isEmpty(nameInputRef.current.value);
        const enteredStreetIsValid = !isEmpty(streetInputRef.current.value);
        const enteredPostalCodeIsValid = isFiveChars(postalInputRef.current.value);
        const enteredCityIsValid = !isEmpty(cityInputRef.current.value);

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            city: enteredCityIsValid,
            poastalCode: enteredPostalCodeIsValid
        });

        const formIsValid = enteredNameIsValid &&
            enteredStreetIsValid &&
            enteredPostalCodeIsValid &&
            enteredCityIsValid;

        if (!formIsValid) {
            return;
        }

        props.onConfirm({
            name: nameInputRef.current.value,
            street: streetInputRef.current.value,
            city: cityInputRef.current.value,
            poastalCode: postalInputRef.current.value
        });

    };


    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={`${classes.control} ${formInputsValidity.name ? '' : classes.invalid}`}>
                <label htmlFor='name'>Your Name</label>
                <input type='text' id='name' ref={nameInputRef} />
                {!formInputsValidity.name && <p>Please enter a valid name!</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.street ? '' : classes.invalid}`}>
                <label htmlFor='street'>Street</label>
                <input type='text' id='street' ref={streetInputRef} />
                {!formInputsValidity.street && <p>Please enter a valid street!</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.poastalCode ? '' : classes.invalid}`}>
                <label htmlFor='postal'>Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef} />
                {!formInputsValidity.poastalCode && <p>Please enter a valid poastal Code! (5 Character)</p>}
            </div>
            <div className={`${classes.control} ${formInputsValidity.city ? '' : classes.invalid}`}>
                <label htmlFor='city'>City</label>
                <input type='text' id='city' ref={cityInputRef} />
                {!formInputsValidity.city && <p>Please enter a valid city!</p>}
            </div>
            <div className={classes.actions}>
                <button type='button' onClick={props.onCancel}>
                    Cancel
                </button>
                <button className={classes.submit}>Confirm</button>
            </div>
        </form>
    );
};

export default Checkout;