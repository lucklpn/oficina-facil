import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, useField } from '@rocketseat/unform';
import ReactSelect from 'react-select';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { customSelectStyles } from './styles';

export default function CustomerCarsSelect({
  name,
  defaultValue,
  customerId,
  disabled,
}) {
  const { registerField } = useField(name);

  const [customerCar, setCustomerCar] = useState({ value: '', label: '' });
  const [defaultOptions, setDefaultOptions] = useState([]);

  const ref = useRef();

  useEffect(() => {
    async function loadCustomerCars() {
      try {
        const response = await api.get(`customers/${customerId}/cars`);

        setDefaultOptions(
          response.data.map((car) => ({
            value: car.id,
            label: `${car.model}, ${car.manufacture_year} | Placa: ${car.license_plate}`,
          }))
        );
      } catch (err) {
        toast.error('Erro ao buscar veículos');
      }
    }

    if (customerId) {
      loadCustomerCars();
    }
  }, [customerId]);

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
    setCustomerCar({ value: defaultValue, label: defaultValue });
  }, [defaultValue]);

  return (
    <>
      <ReactSelect
        options={defaultOptions}
        isSearchable
        placeholder=""
        noOptionsMessage={() => 'Não encontrado'}
        value={customerCar}
        onChange={(selectedOption) => setCustomerCar(selectedOption)}
        styles={customSelectStyles}
        isDisabled={disabled}
      />

      <Input
        name={name}
        value={customerCar.value || ''}
        onChange={() => {}}
        hidden
      />
    </>
  );
}

CustomerCarsSelect.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  customerId: PropTypes.number,
  disabled: PropTypes.bool,
};

CustomerCarsSelect.defaultProps = {
  defaultValue: '',
  customerId: undefined,
  disabled: false,
};
