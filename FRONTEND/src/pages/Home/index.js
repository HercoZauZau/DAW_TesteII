/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-unused-vars */
import React from 'react';
import { get } from 'lodash';
import { Link } from 'react-router-dom';

import axios from '../../services/axios';
import Loading from '../../components/Loading';
import { ProfileContainer, ProfilePicture, Main } from './styled';

export default function Home() {
  const [profiles, setProfiles] = React.useState([]);
  const [photos, setPhotos] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    async function getData() {
      try {
        setIsLoading(true);

        const response = await axios.get('/restaurante');
        const Photos = get(response.data, 'FotoRs', '');

        setProfiles(response.data);
        setPhotos([...Photos]);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    }

    getData();
  }, []);

  async function orderData(i) {
    try {
      setIsLoading(true);

      const response = await axios.get(`/restaurante/order/${i}`);
      const Photos = get(response.data, 'FotoRs', '');

      setProfiles(response.data);
      setPhotos([...Photos]);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  // const handleDeleteAsk = (e) => {
  //   e.preventDefault();

  //   const exclamation = e.currentTarget.nextSibling;
  //   exclamation.setAttribute('display', 'block');

  //   e.currentTarget.remove();
  // };

  // const handleDelete = async (e, id, index) => {
  //   e.persist();

  //   try {
  //     setIsLoading(true);

  //     await axios.delete(`/alunos/${id}`);

  //     const novosAlunos = [...profiles];
  //     novosAlunos.splice(index, 1);
  //     setProfiles(novosAlunos);

  //     setIsLoading(false);
  //   } catch (error) {
  //     const status = get(error, 'response.status', 0);

  //     if (status === 401) {
  //       toast.error('Login necessário.');
  //     } else {
  //       toast.error('Ocorreu um erro ao excluir a conta.');
  //     }
  //   }

  //   setIsLoading(false);
  // };

  return (
    <Main>
      <Loading isLoading={isLoading} />

      <head>
        <link
          href="https://fonts.googleapis.com/css?family=Open+Sans:400"
          rel="stylesheet"
        />
        <link href="/css/templatemo-style.css" rel="stylesheet" />
      </head>

      <body>
        <div className="container">
          <main>
            <header className="row tm-welcome-section">
              <h2 className="col-12 text-center tm-section-title">
                Bem-vindo ao Site de Avaliação de Restaurantes!
              </h2>
              <p className="col-12 text-center">
                É um prazer tê-lo conosco. No nosso site, você encontrará uma
                comunidade de amantes da gastronomia que compartilham
                experiências, descobrem novos sabores e contribuem para criar
                uma plataforma rica em informações sobre restaurantes de todo o
                mundo.
              </p>
            </header>

            <h4 className="text-center mb10">Pesquise por categorias</h4>

            <div className="tm-paging-links">
              <nav>
                <ul>
                  <li className="pointer tm-paging-item">
                    <div
                      onClick={() => {
                        orderData(0);
                      }}
                      className="tm-paging-link"
                    >
                      Nome
                    </div>
                  </li>
                  <li className="pointer tm-paging-item">
                    <div
                      onClick={() => {
                        orderData(1);
                      }}
                      className="tm-paging-link"
                    >
                      Tipo de Cozinha
                    </div>
                  </li>
                  <li className="pointer tm-paging-item">
                    <div
                      onClick={() => {
                        orderData(2);
                      }}
                      className="tm-paging-link"
                    >
                      Localização
                    </div>
                  </li>
                </ul>
              </nav>
            </div>

            <div className="row tm-gallery">
              <div id="tm-gallery-page-pizza" className="tm-gallery-page">
                {profiles.map((profile, index) => (
                  <ProfilePicture to={`/restaurante/${profile.id}`}>
                    <article
                      key={String(profile.id)}
                      className="col-lg-3 col-md-4 col-sm-6 col-12 tm-gallery-item"
                    >
                      <figure>
                        {get(profile, 'FotoRs[0].url', false) ? (
                          <img
                            alt="Image"
                            className="img-fluid tm-gallery-img"
                            src={String(profile.FotoRs[0].url)}
                          />
                        ) : (
                          <img
                            src="img/gallery/01.jpg"
                            alt="Image"
                            className="img-fluid tm-gallery-img"
                          />
                        )}

                        <figcaption>
                          <h4 className="tm-gallery-title">{profile.nome}</h4>
                          <p className="tm-gallery-description">
                            {profile.info}
                          </p>
                          <p className="tm-gallery-price">{profile.horario}</p>
                          {/* <p className="tm-gallery-price">{profile.local}</p> */}
                        </figcaption>
                      </figure>
                    </article>
                  </ProfilePicture>
                ))}
              </div>
            </div>
            <div className="tm-section tm-container-inner">
              <div className="row">
                <div className="col-md-6">
                  <figure className="tm-description-figure">
                    <img
                      src="https://img.freepik.com/fotos-gratis/hamburguer-de-vista-frontal-em-um-carrinho_141793-15542.jpg?w=1060&t=st=1698746953~exp=1698747553~hmac=9659590dc1922c53b8abf71c93f52f9ab6200eaae69879b12132fe4b76880ba6"
                      alt="Image"
                      className="img-fluid"
                    />
                  </figure>
                </div>
                <div className="col-md-6">
                  <div className="tm-description-box">
                    <h4 className="tm-gallery-title">
                      Bom apetite e boas avaliações!
                    </h4>
                    <p className="tm-mb-45">
                      Nossa missão é ajudar você a encontrar os melhores
                      restaurantes, desde aqueles escondidos gemas locais até os
                      renomados estabelecimentos internacionais. Se você é um
                      apreciador de boa comida e deseja compartilhar suas
                      descobertas ou está em busca de recomendações, você está
                      no lugar certo.
                    </p>
                    <a href="#" className="tm-btn tm-btn-default tm-right">
                      Saiba Mais
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </main>

          <footer className="tm-footer text-center">
            <p>Copyright &copy; 2023 UEM | Design: DMI</p>
          </footer>
        </div>
        <script src="js/jquery.min.js" />
        <script src="js/parallax.min.js" />
        <script src="js/intro.js" />
      </body>
    </Main>
  );
}
