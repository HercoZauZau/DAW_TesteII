import styled from 'styled-components';
import { Link } from 'react-router-dom';
import colors from '../../config/colors';

export const ProfileContainer = styled.div`
  margin: auto;
  text-align: center;

  div {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
      rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
    text-align: center;
    padding: 15px;
    width: 180px;
    height: 180px;
    border-radius: 10px;
    display: inline-block;
    margin: 10px;
    background: #fff;

    &:hover {
      background: ${colors.primaryColor};
      color: #fff;
    }

    &:hover {
      background: ${colors.primaryColor};
      color: #fff;

      span:nth-of-type(2) {
        display: none;
      }

      span:last-of-type {
        margin-top: 23px;
        display: inherit;
        display: flex;
        align-items: center;
        justify-content: space-around;
      }

      img,
      .FaUserCircle {
        width: 80px;
        height: 80px;
      }
    }
  }

  .addbutton {
    background: ${colors.primaryColor};
    color: #fff;

    span:nth-of-type(n + 2) {
      color: transparent;
    }

    &:hover {
      background: #fff;
      color: ${colors.primaryColor};

      span:nth-of-type(2) {
        display: inherit;
      }
      span:nth-of-type(3) {
        display: none;
      }

      .FaPlus {
        background: ${colors.primaryColor};
        color: #fff;
      }
    }
  }

  span {
    display: block;
    word-wrap: break-word;

    &:first-of-type {
      text-transform: capitalize;
      font-weight: bold;
      margin-top: 8px;
    }

    &:nth-of-type(2) {
      display: flex;
      align-items: center;
      justify-content: space-evenly;
      margin: 8px 0 10px 0;
      color: grey;
      font-style: italic;
      font-size: 0.8em;
    }

    &:last-of-type {
      display: none;
    }
  }
`;

export const ProfilePicture = styled(Link)`
  img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }

  &,
  .FaUserCircle {
    cursor: pointer;
  }

  .FaUserCircle {
    width: 100px;
    height: 100px;
    color: #000000;
  }
`;

export const NewProfile = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;

  .FaPlus {
    background: #fff;
    color: ${colors.primaryColor};
    width: 100px;
    height: 100px;
    padding: 30px;
    border-radius: 50%;
    margin: 2px;
    box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  }
`;
