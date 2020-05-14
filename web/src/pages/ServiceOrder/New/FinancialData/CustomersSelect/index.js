import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, useField } from '@rocketseat/unform';

import api from '~/services/api';

import { AsyncSelect, customSelectStyles } from './styles';

export default function CustomersSelect({ name, defaultValue, onChange }) {
  const { registerField } = useField(name);

  const [customer, setCustomer] = useState({ value: '', label: '' });
  const [defaultOptions, setDefaultOptions] = useState([]);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name,
        ref: ref.current,
        path: 'value.value',
      });
    }
  }, [ref, registerField, name]);

  useEffect(() => {
    async function loadDefaultOptions() {
      const response = await api.get('customers');

      setDefaultOptions(
        response.data.map((c) => ({
          value: c.id,
          label: c.name,
        }))
      );
    }

    loadDefaultOptions();
  }, []);

  useEffect(() => {
    setCustomer({ value: defaultValue, label: defaultValue });
  }, [defaultValue]);

  const loadOptions = (inputValue, callback) => {
    async function loadCustomers() {
      const response = await api.get(`customers?query=${inputValue}`);

      return response.data.map((c) => ({
        value: c.id,
        label: c.name,
      }));
    }

    setTimeout(async () => {
      const customers = await loadCustomers();

      callback(customers);
    }, 1000);
  };

  function handleChangeOption(selectedOption) {
    setCustomer(selectedOption);

    if (onChange) {
      onChange(selectedOption);
    }
  }

  return (
    <>
      <AsyncSelect
        cacheOptions
        placeholder=""
        noOptionsMessage={() => 'Não encontrado'}
        loadingMessage={() => 'Carregando...'}
        defaultOptions={defaultOptions}
        loadOptions={loadOptions}
        value={customer}
        onChange={(selectedOption) => {
          handleChangeOption(selectedOption);
        }}
        styles={customSelectStyles}
      />

      <Input
        name={name}
        value={customer.value || ''}
        onChange={() => {}}
        hidden
      />
    </>
  );
}

CustomersSelect.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  onChange: PropTypes.func,
};

CustomersSelect.defaultProps = {
  defaultValue: '',
  onChange: undefined,
};
