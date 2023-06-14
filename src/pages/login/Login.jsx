import React, { useState } from 'react';
import MenuThree from '../../componentes/Menus/MenuThree/MenuThree';
import Body from '../../componentes/Body/Body';
import "../login/Login.css";
import BotaoPrimario from '../../componentes/Botoes/BotaoPrimario/BotaoPrimario';
import Footer from '../../componentes/Footer/Footer';
import TituloLinhaVerde from '../../componentes/TituloLinhaVerde/TituloLinhaVerde';
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

function Login ()
{
    const [ isModalOpen, setIsModalOpen ] = useState( false );
    const navigate = useNavigate();
    const [ usuario, setUsuario ] = useState( {
        email: '',
        senha: ''
    } );

    function handleChange ( event )
    {
        const { name, value } = event.target;
        setUsuario( prevUsuario => ( {
            ...prevUsuario,
            [ name ]: value
        } ) );
    }

    function handleSubmit ( event )
    {
        event.preventDefault();

        api.post( 'usuarios/login', usuario )
            .then( response =>
            {
                const token = response.data.token;
                const usuarioLogado = response.data;
                
                sessionStorage.setItem( 'token', token );
                sessionStorage.setItem( 'usuarioLogado', JSON.stringify( usuarioLogado ) )                
                navigate( '/principal' );

                sessionStorage.setItem('nomeUsuario', usuarioLogado.nome);
                sessionStorage.setItem('idUser', usuarioLogado.userId);
                sessionStorage.setItem( 'emailUsuario', usuarioLogado.email );

            } )
            .catch( error =>
            {
                setIsModalOpen( true );
                setTimeout(() => {
                    setIsModalOpen(false);
                  }, 5000);
            } );
    }

    function closeModal ()
    {
        setIsModalOpen( false );
    }
    const handleCadastroClick = () => {
        navigate("/cadastro");
      };

    return (
        <>
            <MenuThree />
            <Body>
                <div className='containerLogin'>
                    <div className='divInfoLogin'>
                        <div className="divFraseLogin">
                            <h1 className='fraseLogin'>AINDA <h1 className='palavraVerde'>NÃO</h1> POSSUI UMA <h1 className='palavraVerde'>CONTA?</h1></h1>
                        </div>
                        <a className='hrefStyleNone'onClick={handleCadastroClick}><BotaoPrimario tituloBtn="Cadastrar" /></a>
                    </div>
                    <form onSubmit={ handleSubmit } className='divLogin'>
                        <div className='divInputsLogin'>
                            <div className='tituloCard'>
                                <TituloLinhaVerde className="login" titulo="Login" />
                            </div>
                            <div className='divInputEmailSenha'>
                                <label className='emailSenha' htmlFor='email'><h3>Email:</h3></label>
                                <input className='inputEmailSenha' type="email" name='email' id='email' placeholder='Email' required onChange={ handleChange } value={ usuario.email } />
                                <label className='emailSenha' htmlFor='senha'><h3>Senha:</h3></label>
                                <input className='inputEmailSenha' type="password" name='senha' id='senha' placeholder='Senha' required onChange={ handleChange } value={ usuario.senha } />
                            </div>
                            <div className="botaoLogin">
                                <BotaoPrimario type="submit" tituloBtn="Entrar" />
                            </div>
                            <Modal
                                        overlayClassName="custom-overlay"
                                        className="modalSucesso"
                                        isOpen={ isModalOpen }
                                        onRequestClose={ closeModal }
                                        contentLabel="E-mail ou senha incorretos!"
                                    >
                                        <h2 className="tituloModal">E-mail ou senha incorretos! <br /> Tente novamente... <img src='' alt="" /></h2>
                                        <button className="btnEditarDados" onClick={ closeModal }> <span className="tituloBotaoEditar">Fechar</span> </button>
                                    </Modal>
                        </div>
                    </form>
                </div>
                <Footer />
            </Body >
        </>
    );
}

export default Login;
