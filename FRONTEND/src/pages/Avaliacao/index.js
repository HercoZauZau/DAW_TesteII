/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
import React from 'react';
import { get, toInteger } from 'lodash';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { BsFillStarFill } from 'react-icons/bs';
import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';
import { Form } from './styled';

export default function ProfileRegister() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.id);

  const { id } = useParams();
  const [comentario, setComentario] = React.useState('');
  const [nota, setNota] = React.useState(0);
  const [avaliacaoID, setAvaliacaoID] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [notaExiste, setNotaExiste] = React.useState(false);

  const [excluido, setExcluido] = React.useState(false);

  const toggleExcluido = () => {
    setExcluido(!excluido);
  };

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        let { data } = await axios.get(`/avaliacao`);

        for (let i = 0; i < data.length; i++) {
          if (data[i].rest_id == id && data[i].user_id == userId) {
            data = data[i];

            setNotaExiste(true);
            break;
          }
        }

        setComentario(data.comentario);
        setAvaliacaoID(data.id);
        setNota(data.nota);
        setExcluido(data.estado);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    setNota(toInteger(nota));

    try {
      setIsLoading(true);

      if (notaExiste) {
        await axios.put(`/avaliacao/${avaliacaoID}`, {
          // user_id: toInteger(userId),
          // rest_id: toInteger(id),
          // nota: 0,
          comentario,
          estado: excluido,
        });

        toast.success('Avaliação editada com sucesso');
      } else {
        await axios.post('/avaliacao', {
          user_id: toInteger(userId),
          rest_id: toInteger(id),
          nota: 5,
          comentario,
          estado: excluido,
        });

        toast.success('Avaliação criada com sucesso');
      }

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      const status = get(error, 'response.status', 0);
      const data = get(error, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((err) => toast.error(err));
      } else {
        toast.error('Erro desconhecido');
      }

      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isLoading={isLoading} />

      <h1>{notaExiste ? 'Editar Avaliação' : 'Registar Avaliação'}</h1>

      <Form onSubmit={handleSubmit}>
        <span>
          <BsFillStarFill />
          <BsFillStarFill />
          <BsFillStarFill />
          <BsFillStarFill />
          <BsFillStarFill />
        </span>

        <span>{nota}</span>

        <label htmlFor="comentario">
          <span>Comentario</span>

          <textarea
            value={comentario}
            onChange={(e) => setComentario(e.target.value)}
          />
        </label>

        <div>
          <p>Estado: {excluido ? 'Disponivel' : 'Excluido'}</p>
          <button type="button" onClick={toggleExcluido}>
            Alternar Estado
          </button>
        </div>

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
