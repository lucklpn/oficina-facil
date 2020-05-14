import React, { useState } from 'react';

import MaskedInput from '../MaskedInput';
import CustomersSelect from './CustomersSelect';
import CustomerCarsSelect from './CustomerCarsSelect';

import { Container, FormContainer } from '../styles';
import { CustomFormGroup } from './styles';

export default function MainData() {
  const [mainData, setMainData] = useState({});

  return (
    <Container>
      <header>
        <h2>DADOS PRINCIPAIS</h2>
      </header>

      <FormContainer>
        <CustomFormGroup id="customerFormGroup">
          <label htmlFor="customer_id">Cliente</label>
          <CustomersSelect
            id="customer_id"
            name="customer_id"
            onChange={({ value }) => {
              setMainData({ ...mainData, customer_id: value });
            }}
          />
        </CustomFormGroup>
      </FormContainer>

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
