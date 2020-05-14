import React from 'react';
import PropTypes from 'prop-types';
import Popover from 'react-tiny-popover';
import { FaEllipsisV } from 'react-icons/fa';

import colors from '~/utils/colors';

import { MenuList, MenuButton } from './styles';

export default function PopoverMenu({
  isOpen,
  onClickOutside,
  onButtonClick,
  children,
}) {
  return (
    <Popover
      isOpen={isOpen}
      position={['bottom']}
      onClickOutside={onClickOutside}
      containerStyle={{
        minWidth: '160px',
        background: '#fff',
        border: '1px solid #ddd',
        borderBottom: `10px solid ${colors.primary.main}`,
        borderRadius: '10px',
        padding: '10px 0px',
      }}
      content={() => <MenuList>{children}</MenuList>}
    >
      <MenuButton type="button" onClick={onButtonClick}>
        <FaEllipsisV size={18} color="#ccc" />
      </MenuButton>
    </Popover>
  );
}

PopoverMenu.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClickOutside: PropTypes.func.isRequired,
  onButtonClick: PropTypes.func.isRequired,
  children: PropTypes.arrayOf(PropTypes.element.isRequired).isRequired,
};
