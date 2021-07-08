import React from 'react';
import styles from '../../styles/modules/Input.module.scss';

const Input = (props) => {
  return (
    <div>
      <input
        className={`${styles.input} ${props.type} ${props.className}`}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        onChange={props.onChange}
        onKeyUp={props.onKeyUp}
        value={props.value}
      />
    </div>
  );
};

export default Input;
