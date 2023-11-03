import styled from 'styled-components';
// import colors from '../../config/colors';

export const Main = styled.div`
  header {
    /* border-bottom: 2px solid black; */
  }

  .cmtfoto {
    width: 160px;
    height: 240px;
  }
`;

export const ProfilePicture = styled.div`
  img {
    width: 100%;
    height: 500px;
    margin: auto;
  }
`;
//   margin: auto;
//   display: flex;
//   justify-content: center;
//   align-items: center;
//   margin-bottom: 20px;
//   position: relative;
//   width: fit-content;

//   img,
//   .FaUserCircle {
//     border: 0.5px solid grey;
//     height: 185px;
//     width: 185px;
//     border-radius: 50%;
//   }
// `;

// export const PhotosContainer = styled.div`
//   display: flex;
//   align-items: flex-start;
//   justify-content: flex-start;
//   margin: auto;
//   margin-left: -15px;
//   height: fi;
//   overflow: scroll;

//   &::-webkit-scrollbar {
//     display: none;
//   }

//   img {
//     width: 130px;
//     height: 130px;
//     border-radius: 10px;
//     display: inline-block;
//     margin: 10px;
//     box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px;

//     &:first-of-type {
//       display: none;
//     }
//   }

//   span {
//     margin: 40px auto;
//     color: gray;
//   }
// `;

// export const ProfileContainer = styled.div`
//   text-align: center;

//   h1 {
//     margin-bottom: 5px;
//   }

//   h3 {
//     text-align: left;
//     margin-bottom: 10px;
//     color: gray;
//   }

//   .pmdata {
//     span {
//       color: gray;
//       font-style: italic;
//       font-size: 0.95em;
//     }
//   }

//   .pdata {
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     margin: 40px 15px 25px 15px;

//     button {
//       border-radius: 10px;
//     }

//     div {
//       span {
//         display: block;

//         &:last-of-type {
//           margin-top: 2px;
//           font-weight: bold;
//         }
//       }
//     }
//   }
// `;

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
