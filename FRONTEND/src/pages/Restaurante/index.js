/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from 'react';
import { get, toInteger } from 'lodash';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { FaUserCircle, FaPlus } from 'react-icons/fa';
import { BsFillStarFill } from 'react-icons/bs';

import axios from '../../services/axios';
import Loading from '../../components/Loading';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import {
  ProfilePicture,
  PhotosContainer,
  ProfileContainer,
  AddPhotos,
} from './styled';

export default function Profile() {
  const { id } = useParams();
  const [name, setName] = React.useState('');
  const [info, setInfo] = React.useState('');
  const [horario, setHorario] = React.useState('');
  const [local, setLocal] = React.useState('');
  const [cozinha, setCozinha] = React.useState('');
  const [media, setMedia] = React.useState(0);
  const [avaliacoes, setAvaliacoes] = React.useState([]);
  // const [photos, setPhotos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const userId = 1;

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/restaurante/${id}`);
        const avaliacao = await axios.get(`/avaliacao`);
        // const Photos = get(data, 'Fotos', '');
        console.log(avaliacao);

        let lista = [];
        let notaMedia = 0;

        for (let i = 0; i < avaliacao.data.length; i++) {
          if (avaliacao.data[i].rest_id == id) {
            // console.log(avaliacao.data[i]);
            // setAvaliacoes((avalia) => [...avalia, avaliacao.data[i]]);
            lista.push(avaliacao.data[i]);
            notaMedia += toInteger(avaliacao.data[i].nota);

            setAvaliacoes([...lista]);
            setMedia(notaMedia);
          }
        }

        // console.log(lista);

        console.log(avaliacoes);

        setName(data.nome);
        setCozinha(data.cozinha);
        setHorario(data.horario);
        setInfo(data.info);
        setLocal(data.local);
        // setPhotos([...Photos]);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        const status = get(error, 'response.status', 0);
        const errors = get(error, 'response.data.errors', []);

        if (status === 400) errors.map((err) => toast.error(err));
      }
    }

    getData();
  }, [id]);

  const handleChange = async (e) => {
    const newPhoto = e.target.files[0];

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('foto', newPhoto);

    try {
      setIsLoading(true);

      await axios.post('/fotos/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto enviada com sucesso');

      setIsLoading(false);

      window.location.reload(false);
    } catch (error) {
      setIsLoading(false);

      const { status } = get(error, 'response', '');
      toast.error('Erro ao enviar a foto');

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <ProfileContainer>
        {/* {id && (
          <ProfilePicture>
            {photos.length > 0 ? (
              <img src={String(photos[0].url)} alt="" />
            ) : (
              <FaUserCircle className="FaUserCircle" />
            )}

            <AddPhotos>
              <label htmlFor="foto">
                <input type="file" id="foto" onChange={handleChange} />
                <FaPlus />
              </label>
            </AddPhotos>
          </ProfilePicture>
        )} */}

        <div className="pmdata">
          <h1>{name}</h1>

          <span>{info}</span>
        </div>

        <div className="pdata">
          <div>
            <span>cozinha</span> <span>{cozinha}</span>
          </div>

          <div>
            <span>Altura</span> <span>{horario}</span>
          </div>

          <div>
            <span>Peso</span> <span>{local}</span>
          </div>

          <Link to={`/novorest/${id}`}>
            <button type="button">Editar</button>
          </Link>
        </div>

        <h3>Fotos</h3>

        <div>
          <Link to={`/avaliacao/${id}`}>
            <button type="button">AVALIAR</button>
          </Link>
        </div>

        <span>
          Nota media:
          {avaliacoes.length > 1 ? (media / avaliacoes.length).toFixed(1) : 0}
        </span>

        <div>
          {avaliacoes.length > 1 ? (
            avaliacoes.map((i) => <p key={i.id}>{i.comentario}</p>)
          ) : (
            <span>Nenhuma avaliacao adicionada</span>
          )}
        </div>

        {/* <PhotosContainer>
          {photos.length > 1 ? (
            photos.map((i) => <img src={String(i.url)} alt="" />)
          ) : (
            <span>Nenhuma foto adicionada</span>
          )}
        </PhotosContainer> */}
      </ProfileContainer>
    </Container>
  );
}
