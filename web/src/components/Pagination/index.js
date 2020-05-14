import React from 'react';
import PropTypes from 'prop-types';

import { Container, PaginationButton } from './styles';

export default function Pagination({
  itensAmount,
  currentPage,
  onPrevPage,
  onNextPage,
}) {
  return (
    <Container>
      <PaginationButton
        disabled={currentPage === 1 ? 1 : 0}
        onClick={onPrevPage}
      >
        Anterior
      </PaginationButton>
      <PaginationButton
        disabled={Math.ceil(itensAmount / 10) <= currentPage ? 1 : 0}
        onClick={onNextPage}
      >
        Próximo
      </PaginationButton>
    </Container>
  );
}

Pagination.propTypes = {
  itensAmount: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPrevPage: PropTypes.func.isRequired,
  onNextPage: PropTypes.func.isRequired,
};
