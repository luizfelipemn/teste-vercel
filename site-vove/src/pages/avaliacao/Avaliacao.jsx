import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import api from '../../api';
import Body from '../../componentes/Body/Body';
import Footer from '../../componentes/Footer/Footer';
import MenuTwo from '../../componentes/Menus/MenuTwo/MenuTwo';
import TituloLinhaVerde from '../../componentes/TituloLinhaVerde/TituloLinhaVerde';
import Resenha from '../../componentes/Resenha/Resenha';
import ShowYouTubeTrailer from '../../scripts/showYouTubeTrailer';
import BotaoPrimario from '../../componentes/Botoes/BotaoPrimario/BotaoPrimario';
import netflix from "../../imgs/icons/netflix.svg";
import amazon from "../../imgs/icons/amazon.svg";
import hbo from "../../imgs/icons/hbo.svg";
import { setupVoting } from '../../scripts/votos.js';
import './Avaliacao.css';
import Modal from 'react-modal';
import MenuOne from '../../componentes/Menus/MenuOne/Menu';

function Avaliacao ( props )
{
  const [ nomeUsuario ] = useState( sessionStorage.getItem( 'nomeUsuario' ) );
  const { id } = useParams();
  const caminhoImg = "https://image.tmdb.org/t/p/original";
  const [ nome, setNome ] = useState( [] );
  const [ backdrop, setBackdrop ] = useState( [] );
  const [ trailer, setTrailer ] = useState( [] );
  const [ sinopse, setSinopse ] = useState( [] );
  const [ ondeAssistir, setOndeAssistir ] = useState( [] );
  const [ novoComentario, setNovoComentario ] = useState( '' );
  const [ spoiler, setSpoiler ] = useState( false );
  const [ enviandoComentario, setEnviandoComentario ] = useState( false );
  const [ votoSelecionado, setVotoSelecionado ] = useState( 0 );
  const [ comentarios, setComentarios ] = useState( [] );
  const [ isModalNotaOpen, setIsModalNotaOpen ] = useState( false );
  const [ isModalAvaliacaoOpen, setIsModalAvaliacaoOpen ] = useState( false );
  const [ isModalFilmeOpen, setIsModalFilmeOpen ] = useState( false );



  const filmeId = useParams();

  const handleSubmitComentario = async ( event ) =>
  {
    event.preventDefault();

    if ( enviandoComentario ) {
      return;
    }

    if ( enviandoComentario || votoSelecionado === 0 ) {
      setIsModalNotaOpen( true );
      setTimeout( () =>
      {
        setIsModalNotaOpen( false );

      }, 5000 );
      return;
    }

    try {
      if ( novoComentario.trim() !== '' ) {
        setEnviandoComentario( true );

        const comentario = {
          descricao: novoComentario,
          spoiler: spoiler,
          avaliacao: votoSelecionado,
        };

        await api.post( `/comentarios?id=${ idUsuario }&tmdbId=${ filmeId.id }`, comentario, {
          headers: {
            'Content-Type': 'application/json',
          },
        } );

        setIsModalAvaliacaoOpen( true );
        setTimeout( () =>
        {
          setIsModalAvaliacaoOpen( false );

        }, 5000 );
        window.location.reload();
      }
    } catch ( error ) {
      console.error( 'Erro ao criar comentário:', error );
      alert( 'Erro ao realizar comentário' );
    } finally {
      setEnviandoComentario( false );
    }
  };




  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try {
        const filmeNome = await api.get( `tmdb/nome/${ id }` );
        const nome = { title: filmeNome.data };
        setNome( [ nome ] );
      } catch ( erroObtido ) {
        console.log( erroObtido );
      }
    };

    fetchData();
  }, [ id ] );

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try {
        const filmeBackdrop = await api.get( `tmdb/backdrop/${ id }` );
        const backdrop = { backdrop: filmeBackdrop.data };
        setBackdrop( [ backdrop ] );
      } catch ( erroObtido ) {
        console.log( erroObtido );
      }
    };

    fetchData();
  }, [ id ] );

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try {
        const filmetrailer = await api.get( `tmdb/trailer/${ id }` );
        const trailer = { trailer: filmetrailer.data };
        setTrailer( [ trailer ] );
      } catch ( erroObtido ) {
        console.log( erroObtido );
      }
    };

    fetchData();
  }, [ id ] );

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try {
        const filmeSinopse = await api.get( `tmdb/sinopse/${ id }` );
        const sinopse = { sinopse: filmeSinopse.data };
        setSinopse( [ sinopse ] );
      } catch ( erroObtido ) {
        console.log( erroObtido );
      }
    };

    fetchData();
  }, [ id ] );

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try {
        const response = await api.get( `tmdb/onde-assistir/${ Number( id ) }` );
        // Faça algo com a resposta da API
      } catch ( error ) {
        alert( error );
        // Lida com erros na chamada da API
      }
    };

    fetchData();
  }, [ id ] );



  useEffect( () =>
  {
    setupVoting( handleVote );
  }, [] );
  const handleVote = ( vote ) =>
  {
    setVotoSelecionado( vote );
  };

  let assistir = null;
  if ( ondeAssistir.length > 0 ) {
    if ( ondeAssistir[ 0 ].ondeAssistir === "netflix" ) {
      assistir = <img src={ netflix } alt="Netflix" />;
    } else if ( ondeAssistir[ 0 ].ondeAssistir === "amazon" ) {
      assistir = <img src={ amazon } alt="Amazon" />;
    } else if ( ondeAssistir[ 0 ].ondeAssistir === "hbo" ) {
      assistir = <img src={ hbo } alt="HBO" />;
    }
  }

  const watchArea = ondeAssistir.length > 0 && (
    <div className="watchArea">
      <div className="tituloLinhaVerdeAvaliacao">
        <TituloLinhaVerde titulo="Onde assistir?" />
      </div>
      <div className="whereToWatch">{ assistir }</div>
    </div>
  );

  const trailerLink = trailer.length > 0 ? trailer[ 0 ].trailer : '';
  const imagemDeFundo = backdrop.length > 0 ? caminhoImg + backdrop[ 0 ].backdrop : '';
  const sinopseEncontrada = sinopse.length > 0 ? sinopse[ 0 ].sinopse : '';


  // --------------------------------------- ADICIONA FILME A LISTA -----------------------------------------

  const [ modalAberto, setModalAberto ] = useState( false );
  const [ listas, setListas ] = useState( [] );
  const idUsuario = sessionStorage.getItem( 'idUser' );

  // bloco de código que carrega as listas de cada usuário e abre e fecha a modal
  const abrirModal = () =>
  {
    setModalAberto( true );
  };

  const fecharModal = () =>
  {
    setModalAberto( false );
  };


  const carregarListas = () =>
  {
    api.get( `listas/minhas-listas?idUsuario=${ idUsuario }` )
      .then( ( response ) =>
      {
        setListas( response.data );
        sessionStorage.setItem( 'nomeLista', response.data.nomeLista );
        sessionStorage.setItem( 'idLista', response.data.idLista );

      } )
      .catch( ( error ) =>
      {
        console.log( error );
      } );
  };

  useEffect( () =>
  {
    carregarListas();
  }, [] );



  // bloco de código para adicionar filme à lista
  const selecionarLista = ( lista ) =>
  {
    adicionarFilme( lista.idLista );
  };

  const adicionarFilme = ( idLista ) =>
  {
    const filmeAdicionado = {
      tmdbIdFilme: filmeId.id
    };

    api.post( `listas/adicionar?idUsuario=${ idUsuario }&idLista=${ idLista }`, filmeAdicionado )
      .then( ( response ) =>
      {
        const novoFilmeAdicionado = response.data;
        sessionStorage.setItem( 'filmeId', novoFilmeAdicionado.id );

        fecharModal();
        
        setIsModalFilmeOpen( true );
        setTimeout( () =>
        {
          setIsModalFilmeOpen( false );
  
        }, 5000 );

      } )
      .catch( ( erro ) =>
      {
        console.log( erro );
      } );
  };


  //Bloco de código para realizar comentário

  const handleComentarioChange = ( event ) =>
  {
    setNovoComentario( event.target.value );
  };

  const handleSpoilerChange = ( event ) =>
  {
    if ( event.target.value == 'on' ) {
      setSpoiler( true );
    } else {

      setSpoiler( false );

    }
  };
  const comentarVotar = () =>
  {
    const comentario = {
      id: idUsuario,
      tmdbId: filmeId,
      comentario: "Seu comentário aqui" // Substitua "Seu comentário aqui" pelo texto do comentário que você deseja passar
    };

    api.post( "comentarios", comentario )
      .then( ( response ) =>
      {
        alert( "Comentário realizado com sucesso!" );
        window.location.reload();
      } )
      .catch( ( erro ) =>
      {
        console.log( erro );
        alert( "Erro ao realizar comentário" );
      } );
  };


  // --------------------------------------- Buscar ultimos comentarios -----------------------------------------

  useEffect( () =>
  {
    const fetchData = async () =>
    {
      try {
        const response = await api.get( `comentarios/ultimos-comentario-filme/${ filmeId.id }` );

        setComentarios( response.data ); // Atribuir a resposta da API ao estado comentarios
      } catch ( erroObtido ) {
        console.log( erroObtido );
      }
    };

    fetchData();
  }, [ id ] );

  function closeModal ()
  {
    setIsModalNotaOpen( false );
    setIsModalAvaliacaoOpen( false );
    setIsModalFilmeOpen( false );
  }

  return (
    <>
            {nomeUsuario ? (
        <MenuTwo userName={nomeUsuario} />
      ) : (
        <MenuOne />
      )
      }
      <Body>

        { modalAberto && (
          <div className="modalAdicionaFilme">
            <div className='div-form'>
              <form >
                <label> Escolha a lista:</label>
                <br />

                <ul>
                  { listas.map( ( listaU ) => (
                    <li onClick={ () => selecionarLista( listaU ) } key={ listaU.idLista }>
                      { listaU.nomeLista }
                    </li>
                  ) ) }

                </ul>
                <br />
                <div className='div-buttons'>
                  <button className='botao-cancelar' type="button" onClick={ fecharModal }>Cancelar</button>

                </div>
              </form>
            </div>
          </div>
        ) }
        <div className="containerTop">
          <div className="bannerFundo">
            <img style={ { backgroundImage: `url(${ imagemDeFundo })` } } alt="" className="imgBannerBackground" />
            <div className="textAndAddList">
              <div className="tituloLinhaVerdeAvaliacao">
                { backdrop.length === 0 ? (
                  <p>Carregando filme...</p>
                ) : (
                  <TituloLinhaVerde titulo={ nome[0].title } />
                ) }
              </div>
              <span onClick={ abrirModal } className="addListTop"> Adicionar a sua lista + </span>
            </div>
          </div>
        </div>
        <div className="shadowBox"></div>
        <div className="containerComment">
          <div className="votAndWatchArea">
            <div className="votArea">
              <div className="tituloLinhaVerdeAvaliacao">
                <TituloLinhaVerde titulo="Deixe sua nota:" />
              </div>
              <div className="votEyes">
                <div className="eyes">
                  <span className="eye" data-value="1"></span>
                  <span className="eye" data-value="2"></span>
                  <span className="eye" data-value="3"></span>
                  <span className="eye" data-value="4"></span>
                  <span className="eye" data-value="5"></span>
                </div>
                <div className="tooltip"></div>
              </div>
            </div>
            { watchArea }
          </div>

          <div className="commentsArea">
            <div className="commentsAreaTop">
              <div className="tituloCommentsArea">
                <TituloLinhaVerde titulo="Deixe seu comentário:" />
              </div>
              <form className="areaDeComentarioInput" onSubmit={ handleSubmitComentario }>
                <textarea
                  id="userResenha"
                  className="textArea"
                  placeholder="Deixe seu comentário sobre o filme"
                  value={ novoComentario }
                  onChange={ handleComentarioChange }
                ></textarea>
                <div className="submmitResenha">
                  <div className="checkBoxHaveSpoiler">
                    <input name="haveSpoiler" type="checkbox" onChange={ handleSpoilerChange } />
                    <label id="haveSpoilerCheck" for="haveSpoiler">Contém SPOILER</label>
                  </div>
                  <BotaoPrimario type="submit" tituloBtn="Enviar" disabled={ enviandoComentario } />
                </div>
                <Modal
                  overlayClassName="custom-overlay"
                  className="modalSucesso"
                  isOpen={ isModalNotaOpen }
                  onRequestClose={ closeModal }
                  contentLabel="Insira Nota!"
                >
                  <h2 className="tituloModal"> Insira uma nota! </h2>
                  <button className="btnEditarDados" onClick={ closeModal }> <span className="tituloBotaoEditar">Fechar</span> </button>
                </Modal>

                <Modal
                  overlayClassName="custom-overlay"
                  className="modalSucesso"
                  isOpen={ isModalAvaliacaoOpen }
                  onRequestClose={ closeModal }
                  contentLabel="Avaliado!"
                >
                  <h2 className="tituloModal">Avaliado com sucesso!</h2>
                  <button className="btnEditarDados" onClick={ closeModal }> <span className="tituloBotaoEditar">Fechar</span> </button>
                </Modal>

                <Modal
                  overlayClassName="custom-overlay"
                  className="modalSucesso"
                  isOpen={ isModalFilmeOpen }
                  onRequestClose={ closeModal }
                  contentLabel="Filme adicionado!"
                >
                  <h2 className="tituloModal"> Filme adicionado a sua lista! </h2>
                  <button className="btnEditarDados" onClick={ closeModal }> <span className="tituloBotaoEditar">Fechar</span> </button>
                </Modal>
                
              </form>
            </div>
            <div className="ultimasResenhasAvaliacao">
              { comentarios.map( ( comentario, index ) => (
                <Resenha
                  key={ index }
                  userName={ comentario.nomeUsuario }
                  userNota={ comentario.avaliacao }
                  resenha={ comentario.descricao }
                />
              ) ) }
            </div>

          </div>

          <div className="trailerAndSiposeArea">
            <div className="trailerArea">
              <div className="trailerTitle">
                <TituloLinhaVerde titulo="Trailer" />
              </div>
              <div className="trailerVideo">
                <div id="trailerFilme">
                  <ShowYouTubeTrailer trailerLink={ trailerLink } />
                </div>
              </div>
            </div>
            <div className="sinopseArea">
              <div className="sinopseTitle">
                <TituloLinhaVerde titulo="Sinopse" />
              </div>
              <div className="sinopseText">
                { sinopseEncontrada }
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </Body>
    </>
  );
}

export default Avaliacao;