import styled from 'styled-components';

import { FormGroup } from '../styles';

export const CustomFormGroup = styled(FormGroup)`
  &#totalValueFormGroup,
  &#valuePaidFormGroup {
    width: 25%;
  }

  &#cashPaymentFormGroup {
    width: 73%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    margin: auto 0;
    transform: translateY(12px);
    cursor: pointer;

    label {
      margin: 0 0 0 10px;
    }
  }

  &#paymentMethodFormGroup {
    width: 50%;
    margin: 15px auto 15px 2%;
  }
`;

export const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid #b7b7b7 !important;
  margin: 20px 0;
`;
