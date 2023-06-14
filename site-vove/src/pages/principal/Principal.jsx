import React, { useEffect, useState } from 'react';
import MenuTwo from "./../../componentes/Menus/MenuTwo/MenuTwo";
import Body from "../../componentes/Body/Body"
import "../principal/Principal.css"
import Pesquisa from '../../componentes/Pesquisa/Pesquisa';
import Footer from '../../componentes/Footer/Footer';
import CardPrincipal from '../../componentes/Cards/CardPrincipal/CardPrincipal';
import CardUltResenha from '../../componentes/Cards/CardUltResenha/CardUltResenha';
import Arrow from '../../imgs/icons/arrow_circle_up.png';
import api from '../../api';
import MenuOne from "./../../componentes/Menus/MenuOne/Menu"
import { Link } from 'react-router-dom';

function Principal() {

  const [filmes, setFilmes] = useState([]);
  const [filmesResenha, setFilmesResenha] = useState([]);

  const [termoPesquisa, setTermoPesquisa] = useState("");


  const [resenhasPorPagina, setResenhasPorPagina] = useState(2);
  const [resenhasExibidas, setResenhasExibidas] = useState(2);

  const [barraPesquisaVazia, setBarraPesquisaVazia] = useState(true);

  const [logado, setLogado] = useState(false);

  const nomeUsuario = sessionStorage.getItem('nomeUsuario');


  function handleCarregarMaisResenhas() {
    setResenhasExibidas(resenhasExibidas + resenhasPorPagina);
  }

  function handlePesquisa(termo) {
    setTermoPesquisa(termo);
  }


  let caminhoImg = "https://image.tmdb.org/t/p/original"
  useEffect(() => {
    api
      .get("filmes/popular")
      .then((filmesResposta) => {
        console.log("resposta", filmesResposta,)
        setFilmes(filmesResposta.data.vetor); // Acessando os dados da resposta e definindo como o valor do estado

      })
      .catch((erroObtido) => {
        // console.log(erroObtido);
      });
  }, []);

  useEffect(() => {
    api
      .get("/filmes/testeDto")
      .then((filmesResenhaResposta) => {
        console.log("resposta", filmesResenhaResposta,)

        setFilmesResenha(filmesResenhaResposta.data); // Acessando os dados da resposta e definindo como o valor do estado
        sessionStorage.setItem('filmeId', filmesResenhaResposta.data.idFilme);
        sessionStorage.setItem('resenhaSpoiler', filmesResenhaResposta.spoiler);

      })
      .catch((erroObtido) => {
        // console.log(erroObtido);
      });
  }, []);

  useEffect(() => {
    setBarraPesquisaVazia(termoPesquisa === "");
  }, [termoPesquisa]);



  // useEffect(() => {
  //   api.get("usuarios/autenticado")
  //     .then(response => {
  //       setLogado(response.data.logado);
  //       setUsuario(response.data.usuario);
  //     })
  //     .catch(error => console.error(error));
  // }, []);

  


  return (
    <>
      {nomeUsuario ? (
        <MenuTwo userName={nomeUsuario} />
      ) : (
        <MenuOne />
      )
      }


      <Body>
        <div className='container'>
          <div className='box'>
            <h1 className='pop'>Populares</h1>
            <div className='verde'></div>
          </div>
          <div className='navegacao'>
            <h1 className='buscar'>Buscar filme: </h1>
            <Pesquisa onSearch={handlePesquisa} className='pesquisa' />

          </div>



        </div>
        <div className='cards'>
          {
            filmes.map((filme, index) => (
              <React.Fragment key={filme.id}>
                  <Link to={`/avaliacao/${filme.id}`}>
                    <CardPrincipal
                      id={filme.id}
                      nomeFilme={filme.title}
                      nota={filme.vote_average}
                      capa={caminhoImg + filme.poster_path} />
                  </Link>
              </React.Fragment>
            ))
          }
        </div>

        <div className='two-container'>
          <div className='box'>
            <h1 className='pop'>Últimas resenhas</h1>
            <div className='verde'></div>
          </div>
        </div>

        <div className='principal-resenhas'>
          <div className='p-resenhas'>
            {barraPesquisaVazia ? (
              filmesResenha.slice(0, resenhasExibidas).map((filmeResenha, id) => (
                <React.Fragment key={filmeResenha.filmeId}>
                  <CardUltResenha
                    filmeId={filmeResenha.idFilme}
                    tituloFilme={filmeResenha.nomeFilme}
                    userName={filmeResenha.nomeUsuario}
                    userNota={filmeResenha.notaGeral}
                    capa={caminhoImg + filmeResenha.posterPath}
                    userComentario={filmeResenha.comentario}
                    spoiler={filmeResenha.spoiler}
                  />
                  <div className='principal-verde'></div>
                </React.Fragment>
              ))
            ) : (
              filmesResenha
                .filter(filmeResenha => filmeResenha.nomeFilme.toLowerCase().includes(termoPesquisa.toLowerCase()))
                .map(filmeResenha => (
                  <React.Fragment key={filmeResenha.filmeId}>
                    <CardUltResenha
                      filmeId={filmeResenha.tmdbIdFilme}
                      tituloFilme={filmeResenha.nomeFilme}
                      userName={filmeResenha.nomeUsuario}
                      userNota={filmeResenha.notaGeral}
                      capa={caminhoImg + filmeResenha.posterPath}
                      userComentario={filmeResenha.comentario}
                      spoiler={filmeResenha.spoiler}
                    />

                  </React.Fragment>
                ))
            )}


            <div className='voltar-topo'>
              <div onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className='a-voltar-topo'>
                <img src={Arrow} />
                <span className='span-voltar'>Voltar ao topo</span>
              </div>
            </div>
            {resenhasExibidas < filmes.length && (
              <button onClick={handleCarregarMaisResenhas} className='button-carregar'>Carregar mais</button>
            )}
          </div>
        </div>
        <Footer />
      </Body>
    </>
  );
}

export default Principal;