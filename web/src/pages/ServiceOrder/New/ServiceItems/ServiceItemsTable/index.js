import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

import TableData from '~/components/TableData';
import PopoverMenu from '~/components/PopoverMenu';

import colors from '~/utils/colors';
import { formatToCurrency } from '~/utils/format';

import { Container } from './styles';

export default function ServiceItemsTable({ data, onEditItem, onRemoveItem }) {
  const [popoverOpen, setPopoverOpen] = useState(null);

  return (
    <Container>
      <TableData>
        <thead>
          <tr>
            <th id="amountColumn">QTD</th>
            <th id="descriptionColumn">DESCRIÇÃO</th>
            <th id="unityValueColumn">VALOR UN.</th>
            <th id="totalValueColumn">VALOR TOTAL</th>
            <th id="menuColumn"> </th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={item.id ? String(item.id) : item.description}>
              <td>{item.amount.toString().padStart(2, '0')}</td>
              <td>{item.description}</td>
              <td>{formatToCurrency(item.value)}</td>
              <td>{formatToCurrency(item.total_value)}</td>
              <td>
                <PopoverMenu
                  isOpen={popoverOpen === item.description}
                  onClickOutside={() => setPopoverOpen(null)}
                  onButtonClick={() =>
                    setPopoverOpen(
                      popoverOpen === item.description ? null : item.description
                    )
                  }
                >
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        onEditItem(item);
                      }}
                    >
                      <FaPen size={15} color={colors.yellow.main} />
                      Editar Cadastro
                    </button>
                  </li>
                  <li>
                    <button
                      type="button"
                      onClick={() => {
                        onRemoveItem(index);
                      }}
                    >
                      <FaTrashAlt size={15} color={colors.primary.main} />
                      Excluir Cadastro
                    </button>
                  </li>
                </PopoverMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </TableData>
    </Container>
  );
}

ServiceItemsTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      amount: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEditItem: PropTypes.func,
  onRemoveItem: PropTypes.func,
};

ServiceItemsTable.defaultProps = {
  onEditItem: () => {},
  onRemoveItem: () => {},
};
