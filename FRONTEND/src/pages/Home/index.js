/* eslint-disable no-unused-vars */
import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  FaPen,
  FaPlus,
  FaTrash,
  FaUserCircle,
  FaExclamationTriangle,
} from 'react-icons/fa';

import axios from '../../services/axios';
import Loading from '../../components/Loading';
import { HomeContainer } from '../../styles/GlobalStyles';
import { ProfileContainer, ProfilePicture, NewProfile } from './styled';

export default function Home() {
  const [profiles, setProfiles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const response = await axios.get('/restaurante');
        setProfiles(response.data);

        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  const handleDeleteAsk = (e) => {
    e.preventDefault();

    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');

    e.currentTarget.remove();
  };

  const handleDelete = async (e, id, index) => {
    e.persist();

    try {
      setIsLoading(true);

      await axios.delete(`/alunos/${id}`);

      const novosAlunos = [...profiles];
      novosAlunos.splice(index, 1);
      setProfiles(novosAlunos);

      setIsLoading(false);
    } catch (error) {
      const status = get(error, 'response.status', 0);

      if (status === 401) {
        toast.error('Login necessário.');
      } else {
        toast.error('Ocorreu um erro ao excluir a conta.');
      }
    }

    setIsLoading(false);
  };

  return (
    <HomeContainer>
      <Loading isLoading={isLoading} />

      <ProfileContainer>
        {profiles.map((profile, index) => (
          <div key={String(profile.id)}>
            <Link to={`/restaurante/${profile.id}`}>
              <h1>{profile.nome}</h1>
            </Link>
          </div>
        ))}
      </ProfileContainer>
    </HomeContainer>
  );
}
