import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, useField } from '@rocketseat/unform';
import ReactInputMask from 'react-input-mask';

export default function MaskedInput({ name, mask, defaultValue }) {
  const { registerField } = useField(name);

  const [inputValue, setInputValue] = useState('');

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      registerField({
        name,
        ref: inputRef.current,
        path: 'value',
      });
    }
  }, [inputRef, registerField, name]);

  useEffect(() => {
    setInputValue(defaultValue);
  }, [defaultValue]);

  return (
    <ReactInputMask
      mask={mask}
      maskChar=" "
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
    >
      {() => <Input name={name} type="text" />}
    </ReactInputMask>
  );
}

MaskedInput.propTypes = {
  name: PropTypes.string.isRequired,
  mask: PropTypes.string.isRequired,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

MaskedInput.defaultProps = {
  defaultValue: '',
};
