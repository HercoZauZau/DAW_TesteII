import styled from 'styled-components';
import colors from '../../config/colors';

export const Form = styled.form`
  margin: 30px;
  display: flex;
  flex-direction: column;

  input {
    margin-bottom: 35px;
    width: 100%;
    height: 40px;
    padding: 0 15px;
    border-radius: 4px;
    border: 1px solid;
    background: transparent;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }

  label {
    span {
      display: block;
      margin-bottom: 10px;
    }
  }

  button {
    margin-top: 15px;
  }
`;
