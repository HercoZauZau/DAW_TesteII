import styled from 'styled-components';
import colors from '../../config/colors';

export const Nav = styled.nav`
  background: ${colors.primaryColor};
  padding: 0 50px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-style: italic;

  a {
    color: #fff;
    font-weight: bold;
    height: 100%;
    width: 80px;
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      height: calc(100% + 3px);
      padding-top: 3px;
      border-bottom: 3px solid #fff;
    }

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

export const UserStatus = styled.div`
  color: #fff;
  padding: 0 25px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 10px;
  text-transform: capitalize;

  div {
    width: 10px;
    height: 10px;
    background-color: #66ff99;
    border-radius: 50%;
    position: relative;
    right: -10px;
    bottom: 1px;
  }
`;
