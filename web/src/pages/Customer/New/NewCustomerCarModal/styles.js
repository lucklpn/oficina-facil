import styled from 'styled-components';

import Modal from '~/components/Modal';

import { FormGroup } from '../styles';

export const Container = styled(Modal)`
  position: relative;
  width: 100%;
`;

export const CustomFormGroup = styled(FormGroup)`
  &#modelFormGroup {
    width: 80%;
  }

  &#manufactureYearFormGroup {
    width: 18%;
  }

  &#manufacturerFormGroup {
    width: 70%;
  }

  &#licensePlateFormGroup {
    width: 28%;
  }
`;
