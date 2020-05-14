import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaPen, FaTrashAlt } from 'react-icons/fa';

import TableData from '~/components/TableData';
import PopoverMenu from '~/components/PopoverMenu';

import colors from '~/utils/colors';

import { Container } from './styles';

export default function CustomerCarsTable({ cars, onEditCar, onRemoveCar }) {
  const [popoverOpen, setPopoverOpen] = useState(null);

  return (
    <Container>
      <TableData>
        <thead>
          <tr>
            <th id="modelColumn">MODELO</th>
            <th id="manufactureYearColumn">ANO</th>
            <th id="manufacturerColumn">FABRICANTE</th>
            <th id="licensePlateColumn">PLACA</th>
            <th id="menuColumn"> </th>
          </tr>
        </thead>
        <tbody>
          {cars
            .filter((car) => !car.removed)
            .map((car) => (
              <tr key={car.license_plate}>
                <td>{car.model}</td>
                <td>{car.manufacture_year}</td>
                <td>{car.manufacturer}</td>
                <td>{car.license_plate}</td>
                <td>
                  <PopoverMenu
                    isOpen={popoverOpen === car.license_plate}
                    onClickOutside={() => setPopoverOpen(null)}
                    onButtonClick={() =>
                      setPopoverOpen(
                        popoverOpen === car.license_plate
                          ? null
                          : car.license_plate
                      )
                    }
                  >
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          onEditCar(car.license_plate);
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
                          onRemoveCar(car.license_plate);
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

CustomerCarsTable.propTypes = {
  cars: PropTypes.arrayOf(
    PropTypes.shape({
      model: PropTypes.string.isRequired,
      manufacture_year: PropTypes.number.isRequired,
      manufacturer: PropTypes.string.isRequired,
      license_plate: PropTypes.string.isRequired,
    })
  ).isRequired,
  onEditCar: PropTypes.func,
  onRemoveCar: PropTypes.func,
};

CustomerCarsTable.defaultProps = {
  onEditCar: () => {},
  onRemoveCar: () => {},
};
