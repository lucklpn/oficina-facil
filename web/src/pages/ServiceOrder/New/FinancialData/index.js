import React, { useState } from 'react';
import { Input } from '@rocketseat/unform';

import MaskedInput from '../MaskedInput';
import CustomersSelect from './CustomersSelect';
import CustomerCarsSelect from './CustomerCarsSelect';

import { Container, FormContainer } from '../styles';
import { CustomFormGroup, Divider } from './styles';

export default function FinancialData() {
  const [mainData, setMainData] = useState({});

  return (
    <Container>
      <header>
        <h2>DADOS FINANCEIROS</h2>
      </header>

      <FormContainer>
        <CustomFormGroup id="totalValueFormGroup">
          <label htmlFor="total_value">Valor Total</label>
          <Input id="total_value" name="total_value" disabled />
        </CustomFormGroup>
      </FormContainer>

      <Divider />

      <FormContainer>
        <CustomFormGroup id="customerCarFormGroup">
          <label htmlFor="customer_car_id">Veículo</label>
          <CustomerCarsSelect
            id="customer_car_id"
            name="customer_car_id"
            customerId={mainData.customer_id}
            disabled={!mainData.customer_id}
          />
        </CustomFormGroup>

        <CustomFormGroup id="dateFormGroup">
          <label htmlFor="date">Data</label>
          <MaskedInput
            id="date"
            name="date"
            mask="99/99/9999"
            defaultValue={mainData.date}
          />
        </CustomFormGroup>
      </FormContainer>
    </Container>
  );
}
