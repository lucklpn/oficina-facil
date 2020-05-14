import colors from '~/utils/colors';

export const customSelectStyles = {
  container: (provided) => ({
    ...provided,
    width: '100%',
  }),
  control: (provided, state) => ({
    ...provided,
    height: 46,
    border:
      state.isSelected || state.isFocused
        ? `1px solid ${colors.primary.main} !important`
        : '1px solid #ddd !important',
    padding: '5px 10px',
    boxShadow: 'none !important',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color:
      state.isSelected || state.isFocused
        ? `${colors.primary.main} !important`
        : `${colors.text} !important`,
  }),
  indicatorSeparator: () => ({
    display: 'none',
  }),
  input: () => ({
    height: '100%',
    margin: 0,
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    color: `${colors.text} !important`,
    fontSize: 16,
  }),
  menuList: (provided) => ({
    ...provided,
    maxHeight: '115px !important',
  }),
  option: (provided, state) => ({
    ...provided,
    borderBottom: '1px solid #ddd',
    color: state.isSelected ? colors.primary.main : colors.text,
    background: '#fff !important',
    padding: 10,
  }),
  singleValue: (provided) => ({
    ...provided,
    fontSize: 16,
    color: `${colors.text} !important`,
  }),
  valueContainer: (provided) => ({
    ...provided,
    height: '100%',
    padding: 0,
    overflow: 'visible',
  }),
};
