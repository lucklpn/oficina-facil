import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import MaskedInput from '../../MaskedInput';

import { FormContainer } from '../../styles';
import { CustomFormGroup } from './styles';

export default function NewServiceItemModal({
  isOpen,
  data,
  onAddItem,
  onEditItem,
  onClose,
}) {
  const [serviceItem, setServiceItem] = useState({});

  const schema = Yup.object().shape({
    description: Yup.string().required('* Campo obrigatório'),
    amount: Yup.string().required('* Campo obrigatório'),
    value: Yup.string().required('* Campo obrigatório'),
  });

  useEffect(() => {
    setServiceItem(data || {});
  }, [data]);

  function handleChangeValue(value) {
    setServiceItem({
      ...serviceItem,
      value,
    });
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Adicionar item"
      initialData={serviceItem}
      schemaValidator={schema}
      onClose={onClose}
      onSubmit={serviceItem ? onEditItem : onAddItem}
    >
      <FormContainer>
        <CustomFormGroup id="descriptionFormGroup">
          <label htmlFor="description">Descrição</label>
          <Input id="description" name="description" />
        </CustomFormGroup>
      </FormContainer>

      <FormContainer>
        <CustomFormGroup id="amountFormGroup">
          <label htmlFor="amount">Quantidade</label>

          <MaskedInput
            id="amount"
            name="amount"
            mask="9999"
            defaultValue={serviceItem ? serviceItem.amount : ''}
          />
        </CustomFormGroup>

        <CustomFormGroup id="valueFormGroup">
          <label htmlFor="value">Valor Unitário (R$)</label>
          <Input
            type="number"
            id="value"
            name="value"
            value={serviceItem.value || ''}
            onChange={(e) => {
              handleChangeValue(e.target.value);
            }}
            onBlur={(e) => {
              handleChangeValue(Number(e.target.value).toFixed(2));
            }}
          />
        </CustomFormGroup>
      </FormContainer>
    </Modal>
  );
}

NewServiceItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    description: PropTypes.string,
    amount: PropTypes.number,
    value: PropTypes.number,
  }),
  onAddItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

NewServiceItemModal.defaultProps = {
  data: undefined,
};
