/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable eqeqeq */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-const */
import React from 'react';
import { get, toInteger } from 'lodash';
import { toast } from 'react-toastify';
import { useParams, Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';
import { Form, Avalia } from './styled';

export default function ProfileRegister() {
  const dispatch = useDispatch();

  const userId = useSelector((state) => state.auth.user.id);

  const { id } = useParams();
  const [nome, setNome] = React.useState('');
  const [sobrenome, setSobrenome] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [avaliacoes, setAvaliacoes] = React.useState([]);
  // const [media, setMedia] = React.useState(0);
  const [restaurantes, setRestaurantes] = React.useState([]);
  const [prato, setPrato] = React.useState([]);

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/usuario/${id}`);
        const restaurante = await axios.get(`/restaurante`);
        const avaliacao = await axios.get(`/avaliacao`);
        const pratos = await axios.get(`/menu/${userId}`);

        let lista = [];

        for (let i = 0; i < avaliacao.data.length; i++) {
          if (avaliacao.data[i].user_id == id) {
            lista.push(avaliacao.data[i]);

            setAvaliacoes([...lista]);
          }
        }

        setRestaurantes([...restaurante.data]);
        setPrato([...pratos.data]);

        // let total = 0;

        // for (let i = 0; i < prato.length; i++) {
        //   // total += toInteger(prato[i].um);
        //   setMedia(media + toInteger(prato[i].um));
        // }

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

  const handleDelete = async (e, pId) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await axios.delete(`/menu/${pId}`);

      toast.success('Prato eliminado com sucesso');

      setIsLoading(false);

      window.location.reload(false);
    } catch (error) {
      setIsLoading(false);

      const data = get(error, 'response.data', {});
      const errors = get(data, 'errors', []);

      if (errors.length > 0) {
        errors.map((err) => toast.error(err));
      } else {
        toast.error('Erro desconhecido');
      }
    }
  };

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
        <h4>Avaliações</h4>

        {id &&
          avaliacoes.length > 0 &&
          avaliacoes.map((i) => (
            <div key={i.id}>
              {restaurantes.map((r) => {
                if (r.id == i.rest_id) {
                  return (
                    <div className="com" key={r.id}>
                      <p>Restaurante: {r.nome}</p>
                      <p>Comentário: {i.comentario}</p>
                      <p>Nota: {i.nota}</p>

                      <Link className="red" to={`/restaurante/${r.id}`}>
                        Editar
                      </Link>
                    </div>
                  );
                }
                return null;
              })}
            </div>
          ))}
      </Avalia>

      <Avalia>
        <h4>Pratos</h4>

        {id &&
          prato.length > 0 &&
          prato.map((i) => (
            <div
              onClick={(e) => {
                handleDelete(e, i.id);
              }}
              className="menu"
              key={i.id}
            >
              <span>{i.prato}</span>
              <span>{i.um} MZN</span>
            </div>
          ))}

        {/* <h3>Total: {media} MZN</h3> */}
      </Avalia>
    </Container>
  );
}
