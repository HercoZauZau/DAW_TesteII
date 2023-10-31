import styled from 'styled-components';
import colors from '../../config/colors';

export const Form = styled.form`
  margin: 30px;
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
  }

  input {
    height: 40px;
    border: 1px solid;
    padding: 0 10px;
    border-radius: 4px;
    margin-top: 10px;
    margin-bottom: 20px;
    background: transparent;

    &:focus {
      border: 1px solid ${colors.primaryColor};
    }
  }
`;
