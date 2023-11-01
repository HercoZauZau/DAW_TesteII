/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';
import { Form, Avalia } from './styled';

export default function ProfileRegister() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [nome, setNome] = React.useState('');
  const [sobrenome, setSobrenome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [avaliacoes, setAvaliacoes] = React.useState([]);
  const [restaurantes, setRestaurantes] = React.useState([]);

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/usuario/${id}`);
        const restaurante = await axios.get(`/restaurante`);
        const avaliacao = await axios.get(`/avaliacao`);

        let lista = [];

        for (let i = 0; i < avaliacao.data.length; i++) {
          if (avaliacao.data[i].user_id == id) {
            lista.push(avaliacao.data[i]);

            setAvaliacoes([...lista]);
          }
        }

        setRestaurantes([...restaurante.data]);

        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setPassword(data.password);

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
        await axios.put(`/usuario/${id}`, {
          nome,
          sobrenome,
          email,
          // password,
        });

        toast.success('Perfil editado com sucesso');
      } else {
        await axios.post('/usuario', {
          nome,
          sobrenome,
          email,
          password,
        });

        toast.success('Perfil criado com sucesso');
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

      <h1>{id ? 'Editar Perfil' : 'Registar Perfil'}</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          <span>Nome</span>

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label htmlFor="sobrenome">
          <span>Sobrenome</span>

          <input
            type="text"
            value={sobrenome}
            onChange={(e) => setSobrenome(e.target.value)}
          />
        </label>

        <label htmlFor="email">
          <span>E-mail</span>

          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label htmlFor="password">
          <span>Password</span>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button type="submit">Salvar</button>
      </Form>

      <Avalia>
        {id &&
          avaliacoes.length > 0 &&
          avaliacoes.map((i) => (
            <div key={i.id}>
              {restaurantes.map((r) => {
                if (r.id == i.rest_id) {
                  return (
                    <div key={r.id}>
                      <span>Nome do Restaurante: {r.nome}</span>
                      <span>Comentário: {i.comentario}</span>
                      <span>Nota: {i.nota}</span>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
      </Avalia>
    </Container>
  );
}
