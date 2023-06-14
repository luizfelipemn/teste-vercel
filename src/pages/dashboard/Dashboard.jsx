import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import api from '../../api';
import InputMask from "react-input-mask";
import Body from "../../componentes/Body/Body";
import MenuOne from "../../componentes/Menus/MenuOne/Menu";
import MenuTwo from "../../componentes/Menus/MenuTwo/MenuTwo";
import Footer from "../../componentes/Footer/Footer";
import BoxEditar from "../../componentes/EditarInfoUsuario/BoxEditar";
import BoxCircleGreen from "../../componentes/boxCircleGreen/BoxCircleGreen";
import BarChart from "../../componentes/Grafico/BarChart";
import imgUsuario from "../../imgs/icons/account_circle.png";
import '../dashboard/Dashboard.css';
import Modal from 'react-modal';

function Dashboard ()
{
    const navigate = useNavigate();
    const id = sessionStorage.getItem( 'idUser' );

    const [ nome, setNome ] = useState( '' );
    const [ email, setEmail ] = useState( '' );
    const [ dataNasc, setDataNasc ] = useState( '' );
    const [ imagemSelecionada, setImagemSelecionada ] = useState( null );
    const [ isModalOpen, setIsModalOpen ] = useState( false );
    const [ isModalEditarOpen, setIsModalEditarOpen ] = useState( false );


    useEffect( () =>
    {
        // Carregar os dados do usuário ao carregar o componente
        carregarUsuario();
    }, [] );

    function carregarUsuario ()
    {
        api
            .get( `/usuarios/buscarPorId?id=${ id }` )
            .then( res =>
            {
                const { nome, email, dataNasc } = res.data;
                setNome( nome );
                setEmail( email );
                setDataNasc( dataNasc );
            } )
            .catch( error =>
            {
                console.error( 'Erro ao carregar os dados do usuário:', error );
                alert( 'ERRO CARREGAR' );
            } );
    }

    function editarUsuario ()
    {
        const usuarioAtualizar = {
            id: id,
            nome: nome !== '' ? nome : undefined,
            email: email !== '' ? email : sessionStorage.getItem( 'emailUsuario' ),
            dataNasc: dataNasc !== '' ? dataNasc : undefined,
        };

        api
            .put( `/usuarios?id=${ id }`, usuarioAtualizar )
            .then( res =>
            {
                console.log( 'Usuário atualizado com sucesso' );
                setIsModalEditarOpen( true );
                console.log( usuarioAtualizar );
                // Aqui você pode exibir uma mensagem de sucesso ou fazer alguma outra ação necessária
            } )
            .catch( error =>
            {
                console.error( 'Erro ao atualizar o usuário:', error );
                alert( 'ERRO ATUALIZAR' );
                // Aqui você pode exibir uma mensagem de erro ao usuário
            } );
    }

    function handleEditarUsuario ( event )
    {
        event.preventDefault();
        editarUsuario();
    }

    const handleInputChange = event =>
    {
        const dadoRecebido = event.target.value;
        setDataNasc( dadoRecebido );
    };


    function handleClick ()
    {
        api.get( `/txt/${ id }/exportar-txt` )
            .then( response =>
            {
                console.log( "Dados baixados" )
                setIsModalOpen( true );
                // Lógica para processar a resposta
            } )
            .catch( error =>
            {
                alert( "ERRO AO BAIXAR DADOS" )
                console.log( "Caiu no cacth, erro ao baixar dados" )
                // Lógica para lidar com erros
            } );
    }

    function closeModal ()
    {
        setIsModalOpen( false );
        setIsModalEditarOpen( false );
    }

    const [ image, setImage ] = useState( '' );
    const [ imageUrl, setImageUrl ] = useState( '' );


    const uploadImage = async ( e ) =>
    {
        e.preventDefault();
        console.log( "Upload Imagem" );
        console.log( image );

        const formData = new FormData();
        formData.append( 'image', image );

        try {
            const response = await api.post( "/arquivos/upload", formData );
            console.log( "Upload com sucesso" );

            const imageUrl = response.data.url;
            setImageUrl( imageUrl );
        } catch ( error ) {
            console.log( "Erro" );
        }
    };
    
    const handleAlterarSenhaClick = () => {
        navigate("/alterarSenha");
      };

      const handleCadastro2Click = () => {
        navigate("/cadastro2");
      };

    return (
        <>
            { nome ? <MenuTwo userName={ nome } /> : <MenuOne /> }
            <Body>
                <div className="divTituloInfoPessoal">
                    <span className="tituloInfoPessoal">Informações pessoais</span>
                </div>
                <div className="divContainerElementosDashboard">
                    <div className="divContainerInfoPessoal">
                        <div className="divBoxInfoPessoal">
                            <form className="divInfoPessoal">
                                <div className="divFotoDashboard">
                                    <div className="divBoxFotoDashboard">
                                        <img src={imgUsuario} />

                                    </div>
                                    <div className="divBotaoAddFotoDashboard" >
                                        <span className="tituloBotaoAddFoto">Adicionar foto</span>
                                    </div>

                                    {/* <div className="testeUpload">
                                        <h1>Upload</h1>
                                        <div>
                                            <label >Imagem: </label>
                                            <input type="file" name="image" onChange={ e => setImage( e.target.files[ 0 ] ) } /> <br />
                                            <button onClick={ uploadImage } type="submit">Salvar</button>
                                        </div>
                                    </div> */}

                                </div>
                                <div className="divNomeEmailDashboard">
                                    <div className="divEditarDashboard">
                                        <span className="tituloInputEditar">Username</span>
                                        <input
                                            value={ nome }
                                            className="inputEditarDashboard"
                                            type="text"
                                            onChange={ ( e ) => setNome( e.target.value ) }
                                        />
                                    </div>
                                    <div className="divEditarDashboard">
                                        <span className="tituloInputEditar">E-mail</span>
                                        <input
                                            value={ email }
                                            className="inputEditarDashboard"
                                            type="text"
                                            onChange={ ( e ) => setEmail( e.target.value ) }
                                        />
                                    </div>
                                    <div className="divEditarDashboard">
                                        <span className="tituloInputEditar">Data de Nascimento</span>
                                        <InputMask
                                            mask={ 9999 - 99 - 99 }
                                            value={ dataNasc }
                                            className="inputEditarDashboard"
                                            type="text"
                                            onChange={ handleInputChange }
                                        />
                                    </div>
                                    <div className="boxBotaoEditar">
                                        <button className="btnEditarDados" onClick={ handleEditarUsuario }><span className="tituloBotaoEditar">Editar</span></button>
                                        <button className="btnEditarDados" onClick={ () => navigate( '/dashboard' ) }><span className="tituloBotaoEditar">Cancelar</span></button>
                                    </div>
                                    <Modal
                                        overlayClassName="custom-overlay"
                                        className="modalSucesso"
                                        isOpen={ isModalEditarOpen }
                                        onRequestClose={ closeModal }
                                        contentLabel="Dados Editados!"
                                    >
                                        <h2 className="tituloModal">Dados Editados!</h2>
                                        <button className="btnEditarDados" onClick={ closeModal }> <span className="tituloBotaoEditar">Fechar</span> </button>
                                    </Modal>
                                </div>
                                <div className="divDtNascimentoSenhaDashboard">

                                    <div className="divBotaoAlterarSenha">
                                    <a className="hrefStyleNone" onClick={handleAlterarSenhaClick}><span className="tituloBotaoAddFoto">Alterar senha</span></a>
                                    </div>

                                    <div className="divBotaoAlterarSenha" onClick={ handleClick }>
                                        <span className="tituloBotaoAddFoto">Baixar dados do perfil</span>
                                    </div>

                                    <Modal
                                        overlayClassName="custom-overlay"
                                        className="modalSucesso"
                                        isOpen={ isModalOpen }
                                        onRequestClose={ closeModal }
                                        contentLabel="Dados baixados"
                                    >
                                        <h2 className="tituloModal">Dados baixados!</h2>
                                        <button className="btnEditarDados" onClick={ closeModal }> <span className="tituloBotaoEditar">Fechar</span> </button>
                                    </Modal>

                                    <div className="divBotaoAlterarSenha" onClick={ handleClick }>
                                    <a className="hrefStyleNone" onClick={handleCadastro2Click}><span className="tituloBotaoAddFoto">Completar Cadastro</span></a>
                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="divContainerDashboard">
                        <BoxCircleGreen tituloBoxCircleGreen="Total de tempo assistido" spanCircleGreen="1h50min" />
                        <div className="divMaisAssistidosDashboard">
                            <span className="tituloBoxCircleGreen">Seus gêneros de filmes mais assistidos</span>
                            <div className="divBoxGrafico">
                                <BarChart />
                            </div>
                        </div>
                        <BoxCircleGreen tituloBoxCircleGreen="Total de filmes assistidos" spanCircleGreen="666" />
                    </div>
                </div>
                <Footer />
            </Body>
        </>
    );
}

export default Dashboard;
