import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';

import MaskedInput from '../MaskedInput';

import { FormContainer } from '../styles';
import { Container, CustomFormGroup } from './styles';

export default function NewCustomerCarModal({
  isOpen,
  data,
  onSubmit,
  onClose,
}) {
  const schema = Yup.object().shape({
    model: Yup.string().required('* Campo obrigatório'),
    manufacture_year: Yup.string().required('* Campo obrigatório'),
    manufacturer: Yup.string().required('* Campo obrigatório'),
    license_plate: Yup.string().required('* Campo obrigatório'),
  });

  return (
    <Container
      isOpen={isOpen}
      title="Adicionar veículo"
      initialData={data}
      schemaValidator={schema}
      onClose={onClose}
      onSubmit={onSubmit}
    >
      <FormContainer>
        <CustomFormGroup id="modelFormGroup">
          <label htmlFor="model">Modelo</label>
          <Input id="model" name="model" />
        </CustomFormGroup>

        <CustomFormGroup id="manufactureYearFormGroup">
          <label htmlFor="manufacture_year">Ano</label>

          <MaskedInput
            id="manufacture_year"
            name="manufacture_year"
            mask="9999"
            defaultValue={data ? data.manufacture_year : undefined}
          />
        </CustomFormGroup>
      </FormContainer>

      <FormContainer>
        <CustomFormGroup id="manufacturerFormGroup">
          <label htmlFor="manufacturer">Fabricante</label>
          <Input id="manufacturer" name="manufacturer" />
        </CustomFormGroup>

        <CustomFormGroup id="licensePlateFormGroup">
          <label htmlFor="license_plate">Placa</label>
          <Input
            id="license_plate"
            name="license_plate"
            disabled={data && !!data.id}
          />
        </CustomFormGroup>
      </FormContainer>
    </Container>
  );
}

NewCustomerCarModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  data: PropTypes.shape().isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
};
