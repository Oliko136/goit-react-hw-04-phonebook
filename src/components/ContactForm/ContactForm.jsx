import { Component } from "react";
import { nanoid } from 'nanoid';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const INITIAL_STATE = {
    name: '',
    number: ''
}

export class ContactForm extends Component {
    state = {...INITIAL_STATE}
    
    contactNameId = nanoid();
    contactNumberId = nanoid();

    handleChange = ({target}) => {
        const { name, value } = target;

        this.setState({
            [name]: value
        });
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit({ ...this.state });
        this.reset();
    }

    reset() {
        this.setState({ ...INITIAL_STATE });
    }

    render() {
        const { contactNameId, contactNumberId, handleChange, handleSubmit } = this;
        const { name, number } = this.state;

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
}

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired
}
    
