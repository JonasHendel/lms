import React from 'react';
import styles from '../../styles/modules/AuthCode.module.scss';

import Input from '../core/Input';

const AuthCode = (props) => {
  const fields = [
    {
      type: 'text',
      placeholder: '1',
      class: styles.number,
    },
    {
      type: 'text',
      placeholder: '2',
      class: styles.number,
    },
    {
      type: 'text',
      placeholder: '3',
      class: styles.number,
    },
    {
      type: 'text',
      placeholder: '4',
      class: styles.number,
    },
    {
      type: 'text',
      placeholder: '5',
      class: styles.number,
    },
    {
      type: 'text',
      placeholder: '6',
      class: styles.number,
    },
  ];

  function isNumeric(str) {
    if (typeof str != 'string') return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }

  const handleKeyUp = (e) => {
    let inputs = e.target.parentElement.parentElement.children;
    inputs = [...inputs].map((input) => {
      return input.children[0];
    });
    let index = inputs.indexOf(e.target);

    if (index < inputs.length - 1) {
      if (isNumeric(e.target.value)) {
        inputs[index + 1].focus();
      }
    } else if (index === inputs.length - 1) {
      e.target.blur();
    }
  };

  return (
    <div className={styles.authCode}>
      {fields.map((field, index) => (
        <Input
          type={field.type}
          className={field.class}
          placeholder={field.placeholder}
          key={index}
          onKeyUp={handleKeyUp}
        />
      ))}
    </div>
  );
};

export default AuthCode;
