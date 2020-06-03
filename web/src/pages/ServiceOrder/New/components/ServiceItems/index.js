import React from 'react';
import PropTypes from 'prop-types';
import { Input } from '@rocketseat/unform';
import { FaPlus } from 'react-icons/fa';

import ServiceItemsTable from './ServiceItemsTable';

import colors from '~/utils/colors';

import { Container } from '../../styles';
import { AddButton } from './styles';

export default function ServiceItems({
  data,
  onShowModal,
  onEditItem,
  onRemoveItem,
}) {
  return (
    <>
      <Container>
        <header>
          <h2>ITENS DO SERVIÇO</h2>
        </header>

        <Input
          id="service_items"
          name="service_items"
          value={JSON.stringify(data)}
          onChange={() => {}}
          hidden
        />

        <ServiceItemsTable
          data={data}
          onEditItem={onEditItem}
          onRemoveItem={onRemoveItem}
        />

        <AddButton onClick={onShowModal}>
          <FaPlus size={16} color={colors.blue.main} />
          Adicionar Item
        </AddButton>
      </Container>
    </>
  );
}

ServiceItems.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onShowModal: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
  onRemoveItem: PropTypes.func.isRequired,
};
