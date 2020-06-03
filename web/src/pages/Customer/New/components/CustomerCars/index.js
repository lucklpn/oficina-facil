import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import { FaPlus } from 'react-icons/fa';

import colors from '~/utils/colors';

import CustomerCarsTable from './CustomerCarsTable';

import { Container } from '../../styles';
import { AddCarButton } from './styles';

export default function CustomerCars({
  data,
  showNewCarModal,
  handleEditCar,
  handleRemoveCar,
}) {
  return (
    <Container>
      <header>
        <h2>AUTOMÓVEIS</h2>
      </header>

      <Input
        id="customer_cars"
        name="customer_cars"
        value={JSON.stringify(data)}
        onChange={() => {}}
        hidden
      />

      <CustomerCarsTable
        data={data}
        handleEditCar={handleEditCar}
        handleRemoveCar={handleRemoveCar}
      />

      <AddCarButton onClick={showNewCarModal}>
        <FaPlus size={16} color={colors.blue.main} />
        Adicionar automóvel
      </AddCarButton>
    </Container>
  );
}

CustomerCars.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  showNewCarModal: PropTypes.func.isRequired,
  handleEditCar: PropTypes.func,
  handleRemoveCar: PropTypes.func,
};

CustomerCars.defaultProps = {
  handleEditCar: undefined,
  handleRemoveCar: undefined,
};
