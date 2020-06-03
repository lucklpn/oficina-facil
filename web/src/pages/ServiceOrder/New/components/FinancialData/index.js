import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import { MdCheckBoxOutlineBlank, MdCheckBox } from 'react-icons/md';

import colors from '~/utils/colors';

import PaymentMethodsSelect from '../../../components/PaymentMethodsSelect';

import { FormContainer } from '../../../styles';
import { Container } from '../../styles';
import { CustomFormGroup, CashPaymentLabel, Divider } from './styles';

export default function FinancialData({ totalValue }) {
  const [isCashPayment, setIsCashPayment] = useState(false);
  const [serviceOrderPayment, setServiceOrderPayment] = useState({});

  function handleChangeCashPayment() {
    setIsCashPayment(!isCashPayment);
    setServiceOrderPayment({
      ...setServiceOrderPayment,
      value: isCashPayment ? '' : totalValue,
    });
  }

  function handleChangePaidValue(value) {
    setServiceOrderPayment({
      ...serviceOrderPayment,
      value,
    });
  }

  return (
    <Container>
      <header>
        <h2>DADOS FINANCEIROS</h2>
      </header>

      <FormContainer>
        <CustomFormGroup id="totalValueFormGroup">
          <label htmlFor="total_value">Valor Total (R$)</label>
          <Input
            id="total_value"
            name="total_value"
            value={totalValue ? Number(totalValue).toFixed(2) : ''}
            disabled
          />
        </CustomFormGroup>

        <CustomFormGroup
          id="cashPaymentFormGroup"
          onClick={handleChangeCashPayment}
        >
          {isCashPayment && (
            <MdCheckBox size={22} color={colors.primary.main} />
          )}

          {!isCashPayment && (
            <MdCheckBoxOutlineBlank size={22} color={colors.primary.main} />
          )}

          <CashPaymentLabel htmlFor="cash_payment" selected={!!isCashPayment}>
            Pagamento à vista
          </CashPaymentLabel>
        </CustomFormGroup>
      </FormContainer>

      <Divider />

      <FormContainer>
        <CustomFormGroup id="valuePaidFormGroup">
          <label htmlFor="payment.value">Valor Pago (R$)</label>
          <Input
            type="number"
            id="payment.value"
            name="payment.value"
            value={serviceOrderPayment.value || ''}
            onChange={(e) => {
              handleChangePaidValue(e.target.value);
            }}
            onBlur={(e) => {
              handleChangePaidValue(Number(e.target.value).toFixed(2));
            }}
            disabled={!!isCashPayment}
          />
        </CustomFormGroup>

        <CustomFormGroup id="paymentMethodFormGroup">
          <label htmlFor="payment.payment_method_id">Forma de Pagamento</label>
          <PaymentMethodsSelect
            id="payment.payment_method_id"
            name="payment.payment_method_id"
          />
        </CustomFormGroup>
      </FormContainer>
    </Container>
  );
}

FinancialData.propTypes = {
  totalValue: PropTypes.number,
};

FinancialData.defaultProps = {
  totalValue: '',
};
