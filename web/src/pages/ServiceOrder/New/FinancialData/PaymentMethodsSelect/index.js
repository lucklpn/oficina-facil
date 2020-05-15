import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, useField } from '@rocketseat/unform';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { customSelectStyles } from './styles';

export default function PaymentMethodsSelect({ name }) {
  const { registerField } = useField(name);

  const [paymentMethod, setPaymentMethod] = useState({ value: '', label: '' });
  const [defaultOptions, setDefaultOptions] = useState([]);

  const ref = useRef();

  useEffect(() => {
    async function loadPaymentMethods() {
      try {
        const response = await api.get(`payment_methods`);

        setDefaultOptions(
          response.data.map((method) => ({
            value: method.id,
            label: method.description,
          }))
        );
      } catch (err) {
        toast.error('Erro ao buscar métodos de pagamento');
      }
    }

    loadPaymentMethods();
  }, []);

  useEffect(() => {
    if (ref.current) {
      registerField({
        name,
        ref: ref.current,
        path: 'value.value',
      });
    }
  }, [ref, registerField, name]);

  return (
    <>
      <ReactSelect
        options={defaultOptions}
        isSearchable
        placeholder=""
        noOptionsMessage={() => 'Não encontrado'}
        value={paymentMethod}
        onChange={(selectedOption) => setPaymentMethod(selectedOption)}
        styles={customSelectStyles}
      />

      <Input
        name={name}
        value={paymentMethod.value || ''}
        onChange={() => {}}
        hidden
      />
    </>
  );
}

PaymentMethodsSelect.propTypes = {
  name: PropTypes.string.isRequired,
};
