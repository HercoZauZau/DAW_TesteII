import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ProfileContainer = styled.div``;

export const Main = styled.div`
  .pointer {
    cursor: pointer;
  }

  .mb10 {
    margin-bottom: 20px;
  }
`;

export const ProfilePicture = styled(Link)`
  &:hover {
    /* background-color: #333; */
  }

  img {
    width: 250px;
    height: 250px;
  }
`;

export const NewProfile = styled(Link)``;
