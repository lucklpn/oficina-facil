import styled from 'styled-components';

import colors from '~/utils/colors';

export const Wrapper = styled.header`
  width: 100%;
  height: 60px;
  background: transparent;
  transition: background 300ms;

  &:hover {
    background: rgba(42, 42, 42, 0.8);
  }
`;

export const Content = styled.div`
  width: 90%;
  height: 100%;
  max-width: 1200px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;

  > img {
    max-height: 20px;
  }

  nav {
    height: 100%;
    margin-left: 10%;

    @media screen and (max-width: 767px) {
      display: none;
    }

    ul {
      height: 100%;
      display: inline-flex;
    }
  }

  aside {
    max-width: 170px;
    height: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    margin-left: auto;

    @media screen and (max-width: 767px) {
      display: none;
    }

    img {
      width: 35px;
      height: 35px;
      border-radius: 17.5px;
      margin-right: 10px;
    }

    div {
      max-width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
  }
`;

export const MenuItem = styled.li`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 5px solid
    ${(props) => (props.current ? colors.primary.main : 'transparent')};
  padding: 0 5px;
  cursor: pointer;
  transition: border 300ms;

  &:hover {
    border-color: ${colors.primary.main};
  }

  & + li {
    margin-left: 15px;
  }

  a {
    height: 100%;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 15px;
    text-transform: uppercase;
  }
`;

export const User = styled.span`
  max-width: 100%;
  color: #fff;
  font-size: 14px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`;

export const Logout = styled.span`
  display: block;
  color: #ccc;
  font-size: 11px;
  cursor: pointer;
  transition: color 150ms;

  &:hover {
    color: ${colors.primary.main};
  }
`;

export const BurguerMenuButton = styled.button`
  display: flex;
  align-items: center;
  border: none;
  background: transparent;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  margin-left: auto;

  &:hover {
    background: transparent !important;

    svg {
      color: ${colors.primary.lighten} !important;
    }
  }

  @media screen and (min-width: 768px) {
    display: none;
  }

  svg {
    margin-left: 15px;
    transition: color 150ms;
  }
`;

/** MOBILE MENU */
export const MobileMenuWrapper = styled.div`
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.8);
  top: 0;
  left: 0;
  z-index: 999;

  @media screen and (min-width: 768px) {
    display: none;
  }
`;

export const MobileMenuContainer = styled.aside`
  position: relative;
  width: 300px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background: #2a2a2a;
  padding: 35px 15px;
  margin-left: auto;

  img {
    width: 60px;
    height: 60px;
    border-radius: 30px;
  }

  div {
    width: 100%;
    border-bottom: 1px solid #ccc;
    text-align: center;
    padding-bottom: 20px;
    margin: 20px 0;
  }

  nav {
    width: 100px;
  }
`;

export const CloseMenu = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  top: 15px;
  right: 15px;

  svg {
    transition: color 150ms;
  }

  &:hover {
    background: transparent !important;

    svg {
      color: ${colors.primary.lighten} !important;
    }
  }
`;

export const MobileMenuItem = styled.li`
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 5px solid
    ${(props) => (props.current ? colors.primary.main : 'transparent')};
  padding: 0 5px;
  cursor: pointer;
  transition: border 300ms;

  &:hover {
    border-color: ${colors.primary.main};
  }

  & + li {
    margin-top: 15px;
  }

  a {
    display: block;
    color: #fff;
    font-size: 15px;
    text-transform: uppercase;
  }
`;
