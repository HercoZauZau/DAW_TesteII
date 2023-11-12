import styled from 'styled-components';

export const Main = styled.div`
  header {
    /* border-bottom: 2px solid black; */
  }

  .prt {
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    margin: 20px auto;
    width: 230px;
    display: inline-block;
    border-radius: 15px;
    padding: 10px 20px;
    margin-right: 50px;
  }

  .cmtfoto {
    width: 160px;
    height: 240px;
  }

  .comment {
    border-radius: 15px;
    padding: 10px 50px;
    margin-right: 50px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    width: fit-content;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 100%;
    height: 500px;
    margin: auto;
  }
`;

export const ResData = styled.div`
  text-align: center;
  margin-bottom: 100px;

  h4 {
    margin-top: 20px;
  }

  span {
    margin-right: 20px;

    &:first-of-type button {
      background-color: green;
    }
  }
`;

export const AddPhotos = styled.form`
  position: absolute;
  bottom: 15px;
  left: 75%;

  label {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: black;
    cursor: pointer;
    border-radius: 50%;
    color: #fff;
  }

  input {
    display: none;
  }
`;
