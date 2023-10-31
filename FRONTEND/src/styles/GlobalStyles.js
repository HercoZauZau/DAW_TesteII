import 'react-toastify/dist/ReactToastify.css';
import styled, { createGlobalStyle } from 'styled-components';

import colors from '../config/colors';

export default createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    outline: none;
    box-sizing: border-box;
 }

 body {
    font-family: sans-serif;
    background: ${colors.primaryDarkColor};
    color: ${colors.primaryDarkColor};
 }

 html, body, #root {
    height: 100%;
 }

 button {
    cursor: pointer;
    background: ${colors.primaryColor};
    border: none;
    color: #fff;
    padding: 10px 20px;
    border-radius: 4px;
    font-weight: 700;
    transform: all 300ms;

    &:hover {
      filter: brightness(85%);
    }
 }

 a {
    text-decoration: none;
 }

 ul {
    list-style: none;
 }

 h1 {
  text-align: center;
 }
`;

export const Container = styled.section`
  max-width: 500px;
  max-height: 83%;
  overflow: scroll;
  margin: 25px auto;
  padding: 25px;
  border-radius: 4px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  background: -webkit-linear-gradient(360deg, #dee1e1 10%, #f4f4f4 360%);
  background: -moz-linear-gradient(360deg, #dee1e1 10%, #f4f4f4 360%);
  background: linear-gradient(360deg, #dee1e1 10%, #f4f4f4 360%);
  padding: 25px;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const HomeContainer = styled.section`
  height: 90%;
  height: calc(100% - 60px);
  overflow: scroll;
  background: -webkit-linear-gradient(360deg, #dee1e1 10%, #f4f4f4 360%);
  background: -moz-linear-gradient(360deg, #dee1e1 10%, #f4f4f4 360%);
  background: linear-gradient(360deg, #dee1e1 10%, #f4f4f4 360%);
  padding: 25px 70px;

  &::-webkit-scrollbar {
    display: none;
  }
`;
