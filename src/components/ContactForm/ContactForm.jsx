import { useMemo, useState } from "react";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const INITIAL_STATE = {
    name: '',
    number: ''
}

export const ContactForm = ({ onSubmit }) => {
    const [state, setState] = useState({...INITIAL_STATE});
    
    const handleChange = ({target}) => {
        const { name, value } = target;

        setState({
            ...state,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        onSubmit({ ...state });
        reset();
    }

    const reset = () => {
        setState({ ...INITIAL_STATE });
    }
    
    const contactNameId = useMemo(() => nanoid(), []);
    const contactNumberId = useMemo(() => nanoid(), []);

    const { name, number } = state;

    return (
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formField}>
                    <label htmlFor={contactNameId} className={styles.formLabel}>Name</label>
                    <input className={styles.formInput} value={name} onChange={handleChange} id={contactNameId} type="text" name="name" placeholder="Name" required />
                </div>
                
                <div className={styles.formField}>
                    <label htmlFor={contactNumberId} className={styles.formLabel}>Number</label>
                    <input className={styles.formInput} value={number} onChange={handleChange} id={contactNumberId} type="tel" name="number" placeholder="Number" required />
                </div>
            
                <button type="submit" className={styles.formButton}>Add contact</button>
            </form>
        )
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
    
