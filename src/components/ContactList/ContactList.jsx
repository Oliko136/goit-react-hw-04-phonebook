import PropTypes from 'prop-types';
import styles from './ContactList.module.css';

export const ContactList = ({ contacts, deleteContact }) => {
    const items = contacts.map(({ id, name, number }) =>
        <li className={styles.contactItem} key={id}>{name}: {number} <button className={styles.deleteButton} type='button' onClick={() => deleteContact(id)}>Delete</button></li>);

        return (
            <ul className={styles.contactList}>
                {items}
            </ul>
        )
}

ContactList.propTypes = {
    contacts: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        number: PropTypes.string.isRequired
    })).isRequired,
    deleteContact: PropTypes.func.isRequired
}

