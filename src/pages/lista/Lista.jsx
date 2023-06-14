import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Body from "../../componentes/Body/Body"
import "./Lista.css"
import MenuTwo from '../../componentes/Menus/MenuTwo/MenuTwo';
import Footer from '../../componentes/Footer/Footer.jsx'
import Pesquisa from '../../componentes/Pesquisa/Pesquisa';
import TituloLinhaVerde from '../../componentes/TituloLinhaVerde/TituloLinhaVerde'
import Navigation from '../../componentes/Navigation/Navigation'
import CardList from '../../componentes/Cards/CardList/CardList'
import api from '../../api'
import MenuOne from '../../componentes/Menus/MenuOne/Menu';

function Lista() {
  const [filmes, setFilmes] = useState([]);
  const [paginaAtual, setPaginaAtual] = useState(1); // Estado para controlar a página atual
  const filmesPorPagina = 9; // Número de filmes a serem exibidos por página
  const indiceInicio = (paginaAtual - 1) * filmesPorPagina;
  const indiceFim = indiceInicio + filmesPorPagina;
  const [termoPesquisa, setTermoPesquisa] = useState("");
  const [barraPesquisaVazia, setBarraPesquisaVazia] = useState(true);
  const nomeUsuario = sessionStorage.getItem('nomeUsuario');


  //Pegar meus fimes
  const { idLista } = useParams();
  const { nomeLista } = useParams();

  const idUsuario = sessionStorage.getItem('idUser');

  useEffect(() => {
    api
      .get(`listas/filmes-da-lista-info?idUsuario=${idUsuario}&idLista=${idLista}`)
      .then((response) => {
        const filmesResposta = response.data; // Extrair o array de filmes da propriedade 'data'
        setFilmes(filmesResposta);
      })
      .catch((erroObtido) => {
        alert(erroObtido);
      });
  }, []);

  const totalPaginas = Math.ceil(filmes.length / filmesPorPagina);
   // Função para atualizar a página atual
   const handlePaginaClick = (pagina) => {
    setPaginaAtual(pagina);
  };

  // Filtrar os filmes a serem exibidos na página atual
  const filmesFiltrados = filmes.filter((filme) =>
  filme.nomeFilme.toLowerCase().includes(termoPesquisa.toLowerCase())
);


  const filmesPaginaAtual = filmesFiltrados.slice(indiceInicio, indiceFim);


  //FUNCAO DE PESQUISAR FILME:



  function handlePesquisa(termo) {
    setTermoPesquisa(termo);
  }

  useEffect(() => {
    setBarraPesquisaVazia(termoPesquisa === "");
  }, [termoPesquisa]);

  return (
    <>
           {nomeUsuario ? (
        <MenuTwo userName={nomeUsuario} />
      ) : (
        <MenuOne />
      )
      }
      <Body>
        <div className="listContent">
          <div className="tituloListaFav">
            <TituloLinhaVerde titulo={nomeLista} />
            <div className="buscarFilme">
              <span>Buscar Filme:</span>
              <Pesquisa onSearch={handlePesquisa} className='pesquisa' />
            </div>
          </div>
          <div className="navegacaoFavs">
            <Navigation
              paginaAtual={paginaAtual}
              handlePaginaClick={handlePaginaClick}
              totalPaginas={totalPaginas}
            />
          </div>
          <div className="cardsListaFavs">
          {filmesPaginaAtual.map((filmeAtual, index) => (
            <CardList
              key={index}
              idFilme={filmeAtual.tmdbIdFilme}
              avaliacao={filmeAtual.avaliacao}
              ondeAssistir={filmeAtual.ondeAssistir}
              nomeFilme={filmeAtual.nomeFilme}
              generoFilme={filmeAtual.genero}
              lancamentoFilme={filmeAtual.lancamento}
              duracaoFilme={filmeAtual.duracaoFilme}
              poster={filmeAtual.poster}
            />
          ))}
          </div>
        </div>
        <Footer />
      </Body>
    </>
  );
}

export default Lista;
