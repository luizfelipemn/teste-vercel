import React, { useState, useEffect, useCallback } from "react";
import "../index/Index.css";
import Body from "../../componentes/Body/Body";
import MenuOne from "../../componentes/Menus/MenuOne/Menu";
import Footer from "../../componentes/Footer/Footer";
import BotaoPrimario from "../../componentes/Botoes/BotaoPrimario/BotaoPrimario";
import api from '../../api';

function Index() {
  const [filmes, setFilmes] = useState([]);
  const [filmeAtual, setFilmeAtual] = useState(0);

  const proximoFilme = useCallback(() => {
    setFilmeAtual((prevState) => (prevState + 1) % filmes.length);
  }, [filmes.length]);

  const filmeAnterior = () => {
    setFilmeAtual((prevState) => (prevState - 1 + filmes.length) % filmes.length);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      proximoFilme();
    }, 10000);

    return () => {
      clearInterval(timer);
    };
  }, [proximoFilme]);

  useEffect(() => {
    api
      .get("filmes/popular")
      .then((filmesResposta) => {
        setFilmes(filmesResposta.data.vetor);
      })
      .catch((erroObtido) => {
        console.log(erroObtido);
      });
  }, []);

  let caminhoImg = "https://image.tmdb.org/t/p/original"

  return (
    <>
      <MenuOne />
      <Body>
        <div className="containerIndex">
          <div className="divInfoFilmes">
            <div className="divTituloInfoFilmes">
              <h1 className="tituloIndex">
                SUA PLATAFORMA PARA AVALIAR <span className="palavraVerde">FILMES</span>
              </h1>
            </div>
            <div className="divSubtituloInfoFilmes">
              <h3 className="subtituloIndex">
                Crie listas, curta, avalie e crie resenhas para os mais diversos <span className="subtituloVerde">filmes</span>.
              </h3>
            </div>
            <div className="divBotaoInfoFilmes">
              <a className="hrefStyleNone" href="http://localhost:3000/principal"><BotaoPrimario tituloBtn="Visualizar Filmes" /></a>
            </div>
          </div>
          {filmes.length > 0 && (
            <div className="divBoxFilmes">
              <div className="divTituloBoxFilmes">
                <span className="tituloBoxFilmes">{filmes[filmeAtual].title}</span>
              </div>
              <div className="divCarroselBoxFilmes">
                <div className="divIconSetaEsquerda" onClick={filmeAnterior}></div>
                <div className="divFilmeCarrossel01">
                  <img src={caminhoImg + filmes[(filmeAtual - 1 + filmes.length) % filmes.length].poster_path} alt={filmes[(filmeAtual - 1 + filmes.length) % filmes.length].title} />
                  <p>{filmes[(filmeAtual - 1 + filmes.length) % filmes.length].sinopse}</p>
                </div>
                <div className="divFilmeCarrossel02">
                  <img src={caminhoImg + filmes[filmeAtual].poster_path} alt={filmes[filmeAtual].title} />
                  <p>{filmes[filmeAtual].sinopse}</p>
                </div>
                <div className="divFilmeCarrossel03">
                  <img src={caminhoImg + filmes[(filmeAtual + 1) % filmes.length].poster_path} alt={filmes[(filmeAtual + 1) % filmes.length].title} />
                  <p>{filmes[(filmeAtual + 1) % filmes.length].sinopse}</p>
                </div>
                <div className="divIconSetaDireita" onClick={proximoFilme}></div>
              </div>
              <div className="divLegendaBoxFilmes">
                <span className="legendaBoxFilmes">{filmes[filmeAtual].overview}</span>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </Body>
    </>
  );
}

export default Index;
