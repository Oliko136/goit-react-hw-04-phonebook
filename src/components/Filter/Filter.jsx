import PropTypes from 'prop-types';
import styles from './Filter.module.css';

export const Filter = ({ filter, handleFilterChange }) => {
    return (
        <input className={styles.filter} value={filter} name="filter" placeholder="Search by name" onChange={handleFilterChange}/>
    )
}

Filter.propTypes = {
    filter: PropTypes.string,
    handleFilterChange: PropTypes.func
}