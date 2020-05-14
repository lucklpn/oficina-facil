import React from 'react';
import { MdSearch } from 'react-icons/md';

import { Container } from './styles';

export default function InputSearch(props) {
  return (
    <Container>
      <MdSearch size={25} color="#999" />
      <input id="search" name="search" {...props} />
    </Container>
  );
}
