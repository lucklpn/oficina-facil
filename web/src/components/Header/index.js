import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from 'react-icons/gi';
import { IoIosClose } from 'react-icons/io';

import history from '~/services/history';

import { signOut } from '~/store/modules/auth/actions';

import {
  Wrapper,
  Content,
  MenuItem,
  User,
  Logout,
  BurguerMenuButton,
  MobileMenuWrapper,
  MobileMenuContainer,
  CloseMenu,
  MobileMenuItem,
} from './styles';

import Logo from '~/assets/logo.png';

export default function Header() {
  const [pages, setPages] = useState([
    { path: '/orders', label: 'SERVIÇOS', current: true },
    { path: '/customers', label: 'CLIENTES', current: false },
  ]);
  const [currentPath, setCurrentPath] = useState(history.location.pathname);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const profile = useSelector((state) => state.user.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    setPages(
      pages.map((page) => ({
        ...page,
        current: currentPath.includes(page.path),
      }))
    );
  }, [currentPath]); // eslint-disable-line

  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <>
      <Wrapper>
        <Content>
          <img src={Logo} alt="Logo" />

          <nav>
            <ul>
              {pages.map((page) => (
                <MenuItem key={page.path} current={page.current ? 1 : 0}>
                  <Link
                    to={page.path}
                    onClick={() => setCurrentPath(page.path)}
                  >
                    {page.label}
                  </Link>
                </MenuItem>
              ))}
            </ul>
          </nav>

          <aside>
            <img
              src="https://api.adorable.io/avatars/50/abott@adorable.png"
              alt="Avatar"
            />

            <div>
              <User>{profile.name}</User>
              <Logout onClick={handleSignOut}>sair do sistema</Logout>
            </div>
          </aside>

          <BurguerMenuButton
            onClick={() => {
              setMobileMenuActive(true);
            }}
          >
            MENU
            <GiHamburgerMenu size={25} color="#fff" />
          </BurguerMenuButton>
        </Content>
      </Wrapper>

      {mobileMenuActive && (
        <MobileMenuWrapper>
          <MobileMenuContainer>
            <CloseMenu onClick={() => setMobileMenuActive(false)}>
              <IoIosClose size={40} color="#ccc" />
            </CloseMenu>

            <img
              src="https://api.adorable.io/avatars/100/abott@adorable.png"
              alt="Avatar"
            />

            <div>
              <User>{profile.name}</User>
              <Logout onClick={handleSignOut}>sair do sistema</Logout>
            </div>

            <nav>
              <ul>
                {pages.map((page) => (
                  <MobileMenuItem
                    key={page.path}
                    current={page.current ? 1 : 0}
                  >
                    <Link
                      to={page.path}
                      onClick={() => setCurrentPath(page.path)}
                    >
                      {page.label}
                    </Link>
                  </MobileMenuItem>
                ))}
              </ul>
            </nav>
          </MobileMenuContainer>
        </MobileMenuWrapper>
      )}
    </>
  );
}
