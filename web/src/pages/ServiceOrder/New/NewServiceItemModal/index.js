import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import MaskedInput from '../MaskedInput';

import { FormContainer } from '../styles';
import { CustomFormGroup } from './styles';

export default function NewServiceItemModal({
  isOpen,
  serviceItem,
  onAddItem,
  onEditItem,
  onClose,
}) {
  const schema = Yup.object().shape({
    description: Yup.string().required('* Campo obrigatório'),
    amount: Yup.number()
      .typeError('* Campo obrigatório')
      .required('* Campo obrigatório')
      .min(1, 'Quantidade mínima é 1'),
    value: Yup.number()
      .typeError('* Campo obrigatório')
      .required('* Campo obrigatório')
      .min(1, 'Valor mínimo é 1'),
  });

  return (
    <Modal
      isOpen={isOpen}
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
            defaultValue={serviceItem ? serviceItem.amount : undefined}
          />
        </CustomFormGroup>

        <CustomFormGroup id="valueFormGroup">
          <label htmlFor="value">Valor Unitário (R$)</label>
          <Input type="number" id="value" name="value" step="0.01" />
        </CustomFormGroup>
      </FormContainer>
    </Modal>
  );
}

NewServiceItemModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  serviceItem: PropTypes.shape({
    description: PropTypes.string,
    amount: PropTypes.number,
    value: PropTypes.number,
  }),
  onAddItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};

NewServiceItemModal.defaultProps = {
  serviceItem: undefined,
};
