/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { get, toInteger } from 'lodash';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';

import { BsTrash } from 'react-icons/bs';
import axios from '../../services/axios';
import Loading from '../../components/Loading';
import { Form, Main } from './styled';

export default function ProfileRegister() {
  const { id } = useParams();
  const [nome, setNome] = React.useState('');
  const [preco, setPreco] = React.useState('');
  const [menu, setMenu] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const menus = await axios.get(`/prato/${id}`);

        setMenu(menus.data);

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

      await axios.post('/prato', {
        nome,
        um: preco,
        rest_id: toInteger(id),
        estado: true,
      });

      toast.success('Prato criado com sucesso');

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

  const handleDelete = async (e, pId) => {
    e.preventDefault();

    try {
      setIsLoading(true);

      await axios.delete(`/prato/${pId}`);

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

  return (
    <Main>
      <Loading isLoading={isLoading} />

      <h1>Menu</h1>

      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          <input
            type="text"
            placeholder="prato"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </label>

        <label htmlFor="preco">
          <input
            type="number"
            min={0}
            placeholder="preço"
            value={preco}
            onChange={(e) => setPreco(e.target.value)}
          />
        </label>

        <button type="submit">Adicionar</button>
      </Form>

      <div className="pratos">
        {menu.length > 0 &&
          menu.map((i) => (
            <div
              onClick={(e) => {
                handleDelete(e, i.id);
              }}
            >
              {i.nome} <BsTrash />
            </div>
          ))}
      </div>
    </Main>
  );
}
