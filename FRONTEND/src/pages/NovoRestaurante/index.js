import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';
import { Form } from './styled';

export default function ProfileRegister() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [nome, setNome] = React.useState('');
  const [info, setInfo] = React.useState('');
  const [horario, setHorario] = React.useState('');
  const [local, setLocal] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/restaurante/${id}`);

        setNome(data.nome);
        setInfo(data.info);
        setHorario(data.horario);
        setLocal(data.local);

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

    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`/restaurante/${id}`, {
          nome,
          info,
          horario,
          local,
        });

        toast.success('Restaurante editado com sucesso');
      } else {
        await axios.post('/restaurante/', {
          nome,
          info,
          horario,
          local,
        });

        toast.success('Restaurante criado com sucesso');
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

      <h1>{id ? 'Editar Restaurante' : 'Registar Restaurante'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          <span>Nome</span>

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label htmlFor="info">
          <span>info</span>

          <input
            type="text"
            value={info}
            onChange={(e) => setInfo(e.target.value)}
          />
        </label>

        <label htmlFor="horario">
          <span>horario</span>

          <input
            type="text"
            value={horario}
            onChange={(e) => setHorario(e.target.value)}
          />
        </label>

        <label htmlFor="local">
          <span>local</span>

          <input
            type="text"
            value={local}
            onChange={(e) => setLocal(e.target.value)}
          />
        </label>

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
