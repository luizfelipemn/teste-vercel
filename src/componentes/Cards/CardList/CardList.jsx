import React, {useState} from 'react';
import { useParams } from "react-router-dom";
import BotaoPrimario from "../../Botoes/BotaoPrimario/BotaoPrimario"
import "./CardList.css"
import v0 from "../../../imgs/icons/voto0.svg"
import v1 from "../../../imgs/icons/voto1.svg"
import v2 from "../../../imgs/icons/voto2.svg"
import v3 from "../../../imgs/icons/voto3.svg"
import v4 from "../../../imgs/icons/voto4.svg"
import v5 from "../../../imgs/icons/voto5.svg"

import netflix from "../../../imgs/icons/netflix.svg"
import amazon from "../../../imgs/icons/amazon.svg"
import hbo from "../../../imgs/icons/hbo.svg"


import api from "../../../api"
import Modal from 'react-modal';

function CardList ( props )
{
    let voto;
    if ( props.avaliacao <= 0 ) {
        voto = v0;
    } else if ( props.avaliacao <= 1 ) {
        voto = v1;
    } else if ( props.avaliacao <= 2 ) {
        voto = v2;
    } else if ( props.avaliacao <= 3 ) {
        voto = v3;
    } else if ( props.avaliacao <= 4 ) {
        voto = v4;
    } else if ( props.avaliacao <= 5 ) {
        voto = v5;
    }

    let assistir;
    if ( props.ondeAssistir == "netflix" ) {
        assistir = <img src={ netflix } alt="Netflix" />;
    } else if ( props.ondeAssistir == "amazon" ) {
        assistir = <img src={ amazon } alt="Amazon" />;
    } else if ( props.ondeAssistir == "hbo" ) {
        assistir = <img src={ hbo } alt="HBO" />;
    }
    let caminhoImg = "https://image.tmdb.org/t/p/original"



    // REMOVER DA LISTA

    //TA FALTNADO ID DA LISTA PARA PODER DELETAR
    const { idLista } = useParams()
    const idUsuario = sessionStorage.getItem( 'idUser' )
    const idFilme = props.idFilme
    const [ isModalOpen, setIsModalOpen ] = useState( false );



    const removerFilmeDaLista = () =>
    {
        api.delete( `/listas?idUsuario=${ idUsuario }&idLista=${ idLista }&tmdbIdFilme=${ idFilme }` )
            .then( ( response ) =>
            {
                setIsModalOpen( true );
                
            } )
            .catch( ( erro ) =>
            {
                console.log( erro );
                alert( "Erro ao remover o filme" );
            } );
    };

    const desfazerRemocao = () =>
    {
        api.post( `/listas/desfazer?idUsuario=${ idUsuario }&idLista=${ idLista }` )
            .then( ( response ) =>
            {
                setIsModalOpen( false );
                console.log("remoção desfeita")
              
            } )
            .catch( ( erro ) =>
            {
                console.log( erro );
                alert( "Erro ao desfazer remoção" );
            } );
    };


    function closeModal ()
    {
        setIsModalOpen( false );
        window.location.reload();
    }


    return (
        <>
            <div className="cardList">
                <div className="contentList">
                    <div className="bannerList">
                        <img src={ caminhoImg + props.poster } alt="Banner do filme" />
                    </div>
                    <div className="text">
                        <div className="nomeFilme">
                            { props.nomeFilme }
                        </div>
                        <div className="generoFilme">
                            { props.generoFilme }
                        </div>
                        <div className="lancamentoFilme">
                            Ano: { props.lancamentoFilme }
                        </div>
                        <div className="duracaoFilme">
                            Duração: { props.duracaoFilme }m
                        </div>
                        <div className="avaliacao">
                            <img src={ voto } alt={ `Avaliação ${ props.avaliacao }` } />
                        </div>
                        <div className="ondeAssistir">
                            { assistir }
                        </div>
                    </div>
                </div>
                <div onClick={ removerFilmeDaLista } className="btnRemove">
                    <BotaoPrimario tituloBtn="Remover filme da lista" />
                </div>

                <Modal
                    overlayClassName="custom-overlay"
                    className="modalSucesso"
                    isOpen={ isModalOpen }
                    onRequestClose={ closeModal }
                    contentLabel="Filme removido!"
                >
                    <h2 className="tituloModal"> Removido da lista! <br /> Deseja desfazer remoção? </h2>
                    <div className='modalDesfazer'>
                        <button className="btnEditarDados" onClick={ desfazerRemocao }> <span className="tituloBotaoEditar">Sim</span> </button>
                        <button className="btnEditarDados" onClick={ closeModal }> <span className="tituloBotaoEditar">Não</span> </button>

                        </div>
                </Modal>

            </div>
        </>
    );
}

export default CardList;
