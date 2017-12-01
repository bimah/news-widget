import React from 'react';
import PropTypes from 'prop-types';
import styles from './main.scss';

const DropDown = ({ options, onChange }) => {
  const handleChange = event => onChange(event.target.value);
  return (
    <div className={styles.dropdown}>
      <select onChange={handleChange}>
        {options.map(option => (
          <option key={`opt-${option.value}`} value={option.value}>{option.label}</option>
        ))}
      </select>
    </div>
  );
};

DropDown.defaultProps = {
  options: [],
  onChange: () => {},
};

DropDown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string,
    label: PropTypes.string,
  })),
  onChange: PropTypes.func,
};

export default DropDown;
