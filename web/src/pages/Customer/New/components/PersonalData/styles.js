import styled from 'styled-components';

import { FormGroup } from '../../styles';

export const CustomFormGroup = styled(FormGroup)`
  &#nameFormGroup,
  &#emailFormGroup,
  &#cpfFormGroup,
  &#phoneFormGroup,
  &#addressComplementFormGroup,
  &#districtFormGroup {
    width: 49%;
  }

  &#addressFormGroup {
    width: 80%;
  }

  &#addressNumberFormGroup {
    width: 18%;
  }

  &#zipCodeFormGroup,
  &#cityFormGroup,
  &#stateFormGroup {
    width: 32%;
  }
`;
