import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input, useField } from '@rocketseat/unform';
import ReactSelect from 'react-select';
import arraySort from 'array-sort';
import { toast } from 'react-toastify';

import api from '~/services/api';

import { customSelectStyles } from './styles';

export default function StatesSelect({ name, defaultValue }) {
  const { registerField } = useField(name);

  const [state, setState] = useState({ value: '', label: '' });
  const [defaultOptions, setDefaultOptions] = useState([]);

  const ref = useRef();

  useEffect(() => {
    async function loadStates() {
      try {
        const response = await api.get(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados'
        );

        setDefaultOptions(
          arraySort(
            response.data.map((s) => ({
              value: s.nome,
              label: s.nome,
            })),
            'label'
          )
        );
      } catch (err) {
        toast.error('Erro ao buscar estados');
      }
    }

    loadStates();
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

  useEffect(() => {
    setState({ value: defaultValue, label: defaultValue });
  }, [defaultValue]);

  return (
    <>
      <ReactSelect
        options={defaultOptions}
        isSearchable
        placeholder=""
        noOptionsMessage={() => 'Não encontrado'}
        value={state}
        onChange={(selectedOption) => setState(selectedOption)}
        styles={customSelectStyles}
      />

      <Input name={name} value={state.value || ''} onChange={() => {}} hidden />
    </>
  );
}

StatesSelect.propTypes = {
  name: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
};

StatesSelect.defaultProps = {
  defaultValue: '',
};
