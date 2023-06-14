import React, { useState } from 'react';
import "../ContinuaCadastro/Cadastro2.css";
import api from '../../api';
import Body from '../../componentes/Body/Body';
import MenuTwo from "../../componentes/Menus/MenuTwo/MenuTwo";
import MenuOne from "../../componentes/Menus/MenuOne/Menu"
import Footer from '../../componentes/Footer/Footer';
import Modal from 'react-modal';

function Cadastro2 ()
{
    const nomeUsuario = sessionStorage.getItem( 'nomeUsuario' );
    const idUsuario = sessionStorage.getItem( 'idUser' );

    const [ genero, setGenero ] = useState( '' );
    const [ aparelho, setAparelho ] = useState( '' );
    const [ cepUser, setCepUser ] = useState();
    const [ sexoUser, setSexoUser ] = useState( '' );
    const [ vezes, setVezes ] = useState();
    const [ buscaAvaliacao, setbuscaAvaliacao ] = useState( false );
    const [ assinaStreaming, setAssinaStreaming ] = useState( false );
    const [ isModalOpen, setIsModalOpen ] = useState( false );





    function handleSim ( e )
    {
        setbuscaAvaliacao( e.target.checked );
        console.log( "foi", e.target.checked )
    }

    function handleAssina ( e )
    {
        setAssinaStreaming( e.target.checked );
        console.log( "assina", e.target.checked );
    }

    const completarCadastro = ( e ) =>
    {
        e.preventDefault();

        const novasInfos = {
            sexo: sexoUser,
            cep: cepUser,
            generoPreferido: genero,
            assinaStreaming: assinaStreaming,
            qtdFrequencia: vezes,
            buscaAvaliacao: buscaAvaliacao,
            aparelhoUtilizado: aparelho,
        };

        api.post( `/usuarios/completar/${ idUsuario }`, novasInfos )
            .then( ( response ) =>
            {
                console.log( "deu certo", novasInfos )
                setIsModalOpen( true );
                setTimeout( () =>
                {
                    setIsModalOpen( false );

                }, 5000 );
            } )
            .catch( ( erro ) =>
            {
                console.log( "deu errado", erro )
            } )
    }

    function closeModal ()
    {
        setIsModalOpen( false );
    }


    return (
        <>
            { nomeUsuario ? (
                <MenuTwo userName={ nomeUsuario } />
            ) : (
                <MenuOne />
            )
            }

            <Body>
                <div className='div-completar'>
                    <div className='box'>
                        <h1 className='pop'>Completar cadastro</h1>
                        <div className='verde'></div>
                    </div>

                    <div className='div-continua'>

                        <form onSubmit={ completarCadastro }>
                            <div className='div-inputs'>

                                <div className='primeiro-bloco'>
                                    <label >Gênero preferido:</label>
                                    <input name='genero'
                                        value={ genero }
                                        onChange={ ( e ) => setGenero( e.target.value ) }
                                        type="text" placeholder='Terror' />

                                    <label >Aparelho utilizado para assistir:</label>
                                    <input
                                        name='aparelho'
                                        value={ aparelho }
                                        onChange={ ( e ) => setAparelho( e.target.value ) }
                                        type="text" placeholder='Televisão' />
                                </div>

                                <div className='segundo-bloco'>
                                    <label >CEP:</label>
                                    <input
                                        name='cepUser'
                                        value={ cepUser }
                                        onChange={ ( e ) => setCepUser( e.target.value ) }
                                        type="number" placeholder='xxxxx-xxx' />

                                    <label >Sexo:</label>
                                    <input
                                        name='sexoUser'
                                        value={ sexoUser }
                                        onChange={ ( e ) => setSexoUser( e.target.value ) }
                                        type="text" placeholder='Seu sexo' />
                                </div>

                                <div className='terceiro-bloco'>
                                    <label>Quantas vezes por semana<br /> você assiste?</label>
                                    <input
                                        name='vezes'
                                        value={ vezes }
                                        onChange={ ( e ) => setVezes( e.target.value ) }
                                        type="number" placeholder='10' />
                                </div>
                            </div>

                            <div className='div-toggles'>
                                <label>Busca avaliações?</label>


                                <div className="checkBoxHaveSpoiler">
                                    <input name="buscaAvaliacao"
                                        value={ buscaAvaliacao }
                                        onChange={ handleSim }
                                        checked={ buscaAvaliacao }
                                        type="checkbox" />
                                    <label id="haveSpoilerCheck" for="haveSpoiler">Sim</label>
                                </div>

                                <label>Assina streaming??</label>


                                <div className="checkBoxHaveSpoiler">
                                    <input name="assinaStreaming"
                                        value={ assinaStreaming }
                                        onChange={ handleAssina }
                                        type="checkbox"
                                        checked={ assinaStreaming } />
                                    <label id="haveSpoilerCheck" for="haveSpoiler">Sim</label>
                                </div>
                                <button type='submit'>Salvar</button>

                                <Modal
                                    overlayClassName="custom-overlay"
                                    className="modalSucesso"
                                    isOpen={ isModalOpen }
                                    onRequestClose={ closeModal }
                                    contentLabel="Cadastro efetuado com sucesso!"
                                >
                                    <h2 className="tituloModal"> Cadastro completo! </h2>
                                    <button className="btnEditarDados" onClick={ closeModal }> <span className="tituloBotaoEditar">Fechar</span> </button>
                                </Modal>

                            </div>
                        </form>


                    </div>

                </div>
                <Footer />
            </Body>

        </>
    );
}

export default Cadastro2;