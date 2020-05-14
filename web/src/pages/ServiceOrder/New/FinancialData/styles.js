import styled from 'styled-components';

import { FormGroup } from '../styles';

export const CustomFormGroup = styled(FormGroup)`
  &#totalValueFormGroup {
    width: 49%;
  }

  &#dateFormGroup {
    width: 20%;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #b7b7b7 !important;
  margin: 20px 0;
`;
