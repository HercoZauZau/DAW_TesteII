import React from 'react';
import { get } from 'lodash';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { isEmail, isInt, isFloat } from 'validator';

import axios from '../../services/axios';
import { Container } from '../../styles/GlobalStyles';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/Loading';
import { Form } from './styled';

export default function ProfileRegister() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [age, setAge] = React.useState('');
  const [weight, setWeight] = React.useState('');
  const [height, setHeight] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/alunos/${id}`);

        setName(data.nome);
        setSurname(data.sobrenome);
        setEmail(data.email);
        setAge(data.idade);
        setWeight(data.peso);
        setHeight(data.altura);

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

    let formErrors = false;

    if (name.length < 3 || name.length > 50) {
      toast.error('O nome precisa ter entre 3 e 50 caracteres');
      formErrors = true;
    }

    if (surname.length < 3 || surname.length > 50) {
      toast.error('O sobrenome precisa ter entre 3 e 50 caracteres');
      formErrors = true;
    }

    if (!isEmail(email)) {
      toast.error('E-mail inválido');
      formErrors = true;
    }

    if (!isInt(String(age))) {
      toast.error('Idade inválida');
      formErrors = true;
    }

    if (!isFloat(String(weight))) {
      toast.error('Peso inválido');
      formErrors = true;
    }

    if (!isFloat(String(height))) {
      toast.error('Altura inválida');
      formErrors = true;
    }

    if (formErrors) return;

    try {
      setIsLoading(true);

      if (id) {
        await axios.put(`/alunos/${id}`, {
          nome: name,
          sobrenome: surname,
          email,
          idade: age,
          peso: weight,
          altura: height,
        });

        toast.success('Perfil editado com sucesso');
      } else {
        await axios.post('/alunos/', {
          nome: name,
          sobrenome: surname,
          email,
          idade: age,
          peso: weight,
          altura: height,
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
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label htmlFor="sobrenome">
          <span>Sobrenome</span>

          <input
            type="text"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
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

        <label htmlFor="idade">
          <span>Idade</span>

          <input
            type="text"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </label>

        <label htmlFor="peso">
          <span>Peso</span>

          <input
            type="text"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
          />
        </label>

        <label htmlFor="altura">
          <span>Altura</span>

          <input
            type="text"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
          />
        </label>

        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
