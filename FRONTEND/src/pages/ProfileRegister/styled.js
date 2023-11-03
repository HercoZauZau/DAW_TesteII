import styled from 'styled-components';
import colors from '../../config/colors';

export const Avalia = styled.div`
  border-radius: 20px;
  border: 1px solid;
  padding: 20px;
  background-color: #333;
  color: white;

  h4 {
    margin: auto;
    text-align: center;
    margin-bottom: 20px;
  }

  .com {
    border-radius: 20px;
    border: 1px solid;
    padding: 20px;
    margin-bottom: 20px;
    color: white;

    .red {
      color: red;
    }

    &:hover {
      /* background-color: grey; */
      /* cursor: pointer; */
    }

    p {
      color: white;
    }
  }
`;

export const Form = styled.form`
  margin: 30px;

  input {
    width: 100%;
    height: 40px;
    margin-bottom: 20px;
    border: 1px solid;
    border-radius: 4px;
    padding: 0 15px;
    background: transparent;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  label {
    &:nth-of-type(n + 4) {
      width: 30%;
      display: inline-block;
    }

    &:nth-of-type(5) {
      margin: 0 5% 0 5%;
    }

    span {
      display: block;
      margin-bottom: 10px;
    }
  }

  button {
    display: block;
    margin: 30px auto;
    width: 100%;
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 0 20px;
  position: relative;
  margin-top: 20px;

  img {
    height: 180px;
    width: 180px;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    border: none;
    position: absolute;
    bottom: 0;
    color: #fff;
    background: ${colors.primaryColor};
    width: 36px;
    height: 36px;
    border-radius: 50%;
  }
`;
