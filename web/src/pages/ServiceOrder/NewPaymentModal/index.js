import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import * as Yup from 'yup';

import Modal from '~/components/Modal';
import MaskedInput from '../MaskedInput';
import PaymentMethodsSelect from '../PaymentMethodsSelect';

import { FormContainer } from '../styles';
import { CustomFormGroup } from './styles';

export default function NewPaymentModal({
  isOpen,
  serviceOrderId,
  onSubmit,
  onClose,
}) {
  const [serviceOrderPayment, setServiceOrderPayment] = useState({});

  const schema = Yup.object().shape({
    date: Yup.string().required('* Campo obrigatório'),
    value: Yup.string().required('* Campo obrigatório'),
    payment_method_id: Yup.string().required('* Campo obrigatório'),
  });

  function handleChangeValue(value) {
    setServiceOrderPayment({
      ...serviceOrderPayment,
      value,
    });
  }

  async function handleSubmit(data) {
    await onSubmit(serviceOrderId, data);

    onClose();
  }

  return (
    <Modal
      isOpen={isOpen}
      title="Registrar pagamento"
      schemaValidator={schema}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <FormContainer>
        <CustomFormGroup id="dateFormGroup">
          <label htmlFor="date">Data</label>
          <MaskedInput
            id="date"
            name="date"
            mask="99/99/9999"
            defaultValue={format(new Date(), 'dd/MM/yyyy', { locale: pt })}
          />
        </CustomFormGroup>

        <CustomFormGroup id="valueFormGroup">
          <label htmlFor="value">Valor Pago (R$)</label>
          <Input
            type="number"
            id="value"
            name="value"
            value={serviceOrderPayment.value || ''}
            onChange={(e) => {
              handleChangeValue(e.target.value);
            }}
            onBlur={(e) => {
              handleChangeValue(Number(e.target.value).toFixed(2));
            }}
          />
        </CustomFormGroup>
      </FormContainer>

      <FormContainer>
        <CustomFormGroup id="paymentMethodFormGroup">
          <label htmlFor="payment_method_id">Forma de Pagamento</label>
          <PaymentMethodsSelect
            id="payment_method_id"
            name="payment_method_id"
          />
        </CustomFormGroup>
      </FormContainer>
    </Modal>
  );
}

NewPaymentModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  serviceOrderId: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
