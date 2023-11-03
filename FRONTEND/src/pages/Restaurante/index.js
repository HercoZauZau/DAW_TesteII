/* eslint-disable import/named */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable prefer-const */
/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from 'react';
import { get, toInteger } from 'lodash';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';
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
  ResData,
  Main,
} from './styled';

export default function Profile() {
  const { id } = useParams();
  const [usuario, setUsuario] = React.useState([]);
  const [name, setName] = React.useState('');
  const [info, setInfo] = React.useState('');
  const [horario, setHorario] = React.useState('');
  const [local, setLocal] = React.useState('');
  const [cozinha, setCozinha] = React.useState('');
  const [media, setMedia] = React.useState(0);
  const [avaliacoes, setAvaliacoes] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  const userId = useSelector((state) => state.auth.user.id);

  const dispatch = useDispatch();

  React.useEffect(() => {
    if (!id) return;

    async function getData() {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`/restaurante/${id}`);
        const avaliacao = await axios.get(`/avaliacao`);
        const usuarios = await axios.get(`/usuario`);
        const Photos = get(data, 'FotoRs', '');

        setUsuario(usuarios.data);

        let lista = [];
        let notaMedia = 0;

        for (let i = 0; i < avaliacao.data.length; i++) {
          if (avaliacao.data[i].rest_id == id) {
            lista.push(avaliacao.data[i]);
            notaMedia += toInteger(avaliacao.data[i].nota);

            setAvaliacoes([...lista]);
            setMedia(notaMedia);
          }
        }

        setName(data.nome);
        setCozinha(data.cozinha);
        setHorario(data.horario);
        setInfo(data.info);
        setLocal(data.local);
        setPhotos([...Photos]);

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
    formData.append('rest_id', toInteger(id));
    formData.append('foto', newPhoto);

    try {
      setIsLoading(true);

      await axios.post('/fotos', formData, {
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
    <Main>
      <Loading isLoading={isLoading} />

      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:300,400"
          rel="stylesheet"
        />
        <link href="/css/all.min.css" rel="stylesheet" />
        <link href="/css/templatemo-style.css" rel="stylesheet" />
      </head>

      <body>
        <div className="container">
          {id && (
            <AddPhotos>
              <label htmlFor="foto">
                <input type="file" id="foto" onChange={handleChange} />
                <FaPlus />
              </label>
            </AddPhotos>
          )}

          <ProfilePicture>
            {photos.length > 0 && <img src={String(photos[0].url)} alt="" />}
          </ProfilePicture>

          <div>
            <ResData>
              <header className="row tm-welcome-section">
                <h2 className="col-12 text-center tm-section-title">{name}</h2>
                <p className="col-12 text-center">{info}</p>
              </header>

              <span>
                <Link to={`/novorest/${id}`}>
                  <button type="button">EDITAR</button>
                </Link>
              </span>

              {/* <h3>Fotos</h3> */}

              <span>
                <Link to={`/avaliacao/${id}`}>
                  <button type="button">AVALIAR</button>
                </Link>
              </span>

              <h4>
                Nota media:
                {avaliacoes.length > 0
                  ? (media / avaliacoes.length).toFixed(1)
                  : 0}
              </h4>
            </ResData>

            <div className="tm-container-inner tm-persons">
              <div className="row">
                {avaliacoes.length > 0 &&
                  avaliacoes.map((i) =>
                    i.estado ? (
                      <article key={i.id} className="col-lg-6">
                        <figure className="tm-person">
                          <img
                            src="/img/about-01.jpg"
                            alt="Image"
                            className="cmtfoto img-fluid tm-person-img"
                          />
                          <figcaption className="tm-person-description">
                            {usuario.map((user) =>
                              user.id == i.user_id ? (
                                <h4 className="tm-person-name">
                                  {user.nome} {user.sobrenome}
                                </h4>
                              ) : (
                                ''
                              )
                            )}

                            <p className="tm-person-title">Nota: {i.nota}</p>
                            <p className="tm-person-about">
                              Comentario: {i.comentario}
                            </p>
                          </figcaption>
                        </figure>
                      </article>
                    ) : (
                      ''
                    )
                  )}
              </div>
            </div>
            <div className="tm-container-inner tm-featured-image">
              <div className="row">
                <div className="col-12">
                  <div className="placeholder-2">
                    <div
                      className="parallax-window-2"
                      data-parallax="scroll"
                      data-image-src="img/about-05.jpg"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="tm-container-inner tm-features">
              <div className="row">
                <div className="col-lg-4">
                  <div className="tm-feature">
                    <i className="fas fa-4x fa-pepper-hot tm-feature-icon" />
                    <p className="tm-feature-description">
                      Sabor incomparável a cada mordida! Venha saborear nossos
                      pratos deliciosos no Restaurante hoje mesmo.
                    </p>
                    <a href="/" className="tm-btn tm-btn-primary">
                      Leia Mais
                    </a>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="tm-feature">
                    <i className="fas fa-4x fa-seedling tm-feature-icon" />
                    <p className="tm-feature-description">
                      O ambiente perfeito para encontros memoráveis. Faça uma
                      reserva no Restaurante e desfrute de momentos
                      inesquecíveis com a família e amigos.
                    </p>
                    <a href="/" className="tm-btn tm-btn-success">
                      Leia Mais
                    </a>
                  </div>
                </div>
                <div className="col-lg-4">
                  <div className="tm-feature">
                    <i className="fas fa-4x fa-cocktail tm-feature-icon" />
                    <p className="tm-feature-description">
                      Chefes apaixonados, ingredientes frescos, sabores
                      autênticos. Experimente a excelência culinária no
                      Restaurante.
                    </p>
                    <a href="/" className="tm-btn tm-btn-danger">
                      Leia Mais
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <script src="js/jquery.min.js" />
        <script src="js/parallax.min.js" />
      </body>
    </Main>
  );
}
