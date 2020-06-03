import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';

import MaskedInput from '../MaskedInput';
import StatesSelect from './StatesSelect';

import { Container, FormContainer } from '../../styles';
import { CustomFormGroup } from './styles';

export default function PersonalData({ data }) {
  return (
    <Container>
      <header>
        <h2>DADOS PESSOAIS</h2>
      </header>

      <FormContainer>
        <CustomFormGroup id="nameFormGroup">
          <label htmlFor="name">Nome</label>
          <Input id="name" name="name" />
        </CustomFormGroup>

        <CustomFormGroup id="emailFormGroup">
          <label htmlFor="email">
            Email <span>(opcional)</span>
          </label>
          <Input id="email" name="email" type="email" />
        </CustomFormGroup>
      </FormContainer>

      <FormContainer>
        <CustomFormGroup id="cpfFormGroup">
          <label htmlFor="cpf">CPF</label>
          <MaskedInput
            id="cpf"
            name="cpf"
            mask="999.999.999-99"
            defaultValue={data.cpf}
            disabled={!!data.id}
          />
        </CustomFormGroup>

        <CustomFormGroup id="phoneFormGroup">
          <label htmlFor="phone">
            Telefone <span>(opcional)</span>
          </label>
          <MaskedInput
            id="phone"
            name="phone"
            mask="(99) 99999-9999"
            defaultValue={data.phone}
          />
        </CustomFormGroup>
      </FormContainer>

      <FormContainer>
        <CustomFormGroup id="addressFormGroup">
          <label htmlFor="address">
            Endereço <span>(opcional)</span>
          </label>
          <Input id="address" name="address" />
        </CustomFormGroup>

        <CustomFormGroup id="addressNumberFormGroup">
          <label htmlFor="address_number">
            Número <span>(opcional)</span>
          </label>
          <Input id="address_number" name="address_number" />
        </CustomFormGroup>
      </FormContainer>

      <FormContainer>
        <CustomFormGroup id="addressComplementFormGroup">
          <label htmlFor="address_complement">
            Complemento <span>(opcional)</span>
          </label>
          <Input id="address_complement" name="address_complement" />
        </CustomFormGroup>

        <CustomFormGroup id="districtFormGroup">
          <label htmlFor="district">
            Bairro <span>(opcional)</span>
          </label>
          <Input id="district" name="district" />
        </CustomFormGroup>
      </FormContainer>

      <FormContainer>
        <CustomFormGroup id="zipCodeFormGroup">
          <label htmlFor="zip_code">
            CEP <span>(opcional)</span>
          </label>
          <MaskedInput
            id="zip_code"
            name="zip_code"
            mask="99999-999"
            defaultValue={data.zip_code}
          />
        </CustomFormGroup>

        <CustomFormGroup id="cityFormGroup">
          <label htmlFor="city">
            Cidade <span>(opcional)</span>
          </label>
          <Input id="city" name="city" />
        </CustomFormGroup>

        <CustomFormGroup id="stateFormGroup">
          <label htmlFor="state">
            Estado <span>(opcional)</span>
          </label>
          <StatesSelect id="state" name="state" defaultValue={data.state} />
        </CustomFormGroup>
      </FormContainer>
    </Container>
  );
}

PersonalData.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number,
    cpf: PropTypes.string,
    phone: PropTypes.string,
    zip_code: PropTypes.string,
    state: PropTypes.string,
  }),
};

PersonalData.defaultProps = {
  data: {},
};
