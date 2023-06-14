import React, { useState } from 'react';
import MenuThree from '../../componentes/Menus/MenuThree/MenuThree';
import Body from '../../componentes/Body/Body';
import BotaoPrimario from '../../componentes/Botoes/BotaoPrimario/BotaoPrimario';
import Footer from '../../componentes/Footer/Footer';
import "../cadastro/Cadastro.css";
import TituloLinhaVerde from '../../componentes/TituloLinhaVerde/TituloLinhaVerde'
import api from '../../api';
import { useNavigate } from 'react-router-dom';
import Modal from 'react-modal';

function Cadastrar ()
{
    const navigate = useNavigate();
    const [ isModalOpen, setIsModalOpen ] = useState( false );
    const [ isModalSenhaOpen, setIsModalSenhaOpen ] = useState( false );
    
    function cadastrar ( event )
    {
        event.preventDefault();
        if ( event.target.senha.value != event.target.confirmar_senha.value ) {
            setIsModalSenhaOpen( true );
            setTimeout( () =>
            {
                setIsModalSenhaOpen( false );

            }, 5000 );

        } else {
            

            const novoUsuario = {
                email: event.target.email.value,
                nome: event.target.nome.value,
                data_nascimento: event.target.dataNasc.value,
                senha: event.target.senha.value,
            };

            setIsModalOpen( true );
            setTimeout( () =>
            {
                setIsModalOpen( false );

            }, 9000 );

            api.post( "/usuarios", novoUsuario )
                .then( () =>
                {
                    navigate( "/login" );
                } )

                .catch( ( erro ) =>
                {
                    alert( "Deu erro", erro )
                } )
        }
    }

    function closeModal ()
    {
        setIsModalOpen( false );
        setIsModalSenhaOpen( false );
    }
    const handleLoginClick = () => {
        navigate("/login");
      };

    return <>
        <MenuThree />
        <Body>
            <div className='containerCadastro'>
                <div className='divInfoCadastro'>
                    <div className='divFraseCadastro'>
                        <h1 className='frase'>JÁ <h1 className='palavraVerde'> POSSUÍ </h1> UMA <h1 className='palavraVerde'> CONTA? </h1></h1>
                    </div>
                    <a className='hrefStyleNone' onClick={handleLoginClick}><BotaoPrimario tituloBtn="Login" /></a>
                </div>
                <form className='divCadastro'  onSubmit={ cadastrar }>
                    <div className='divBoxCadastro'>
                        <div className='tituloCard'>
                            <TituloLinhaVerde titulo="Cadastre-se" />
                        </div>
                        <div className='divInputsCadastro'>
                            <div className="inputs">
                                <label className='emailSenha' for='email'><h3>Email:</h3></label>
                                <input className='inputEmailSenha' type="email" name='email' id='email' placeholder='Email' required />
                                <label className='emailSenha' for='apelido'><h3>Apelido:</h3></label>
                                <input className='inputEmailSenha' type="text" name='nome' id='apelido' placeholder='Username' minlength="3" required />
                                <label className='emailSenha' for='data_nascimento'><h3>Data de Nascimento:</h3></label>
                                <input className='inputEmailSenha' type="date" name='dataNasc' id='data_nascimento' required pattern="[0-9]{4}-[0-9]{2}-[0-9]{2}" />
                            </div>

                            <div className="inputs">
                                <label className='emailSenha' for='senha'><h3>Senha:</h3></label>
                                <input className='inputEmailSenha' type="password" name='senha' id='password' placeholder='Senha' minlength="8" required />
                                <label className='emailSenha' for='confirmar_senha'><h3>Confirmar senha:</h3></label>
                                <input className='inputEmailSenha' type="password" name='confirmar_senha' id='confirm_password' placeholder='Confirmar senha' />
                            </div>
                        </div>
                        <div className='botaoCadastrar'>
                            <BotaoPrimario type="submit" tituloBtn="Cadastrar" />
                        </div>
                        <Modal
                            overlayClassName="custom-overlay"
                            className="modalSucesso"
                            isOpen={ isModalOpen }
                            onRequestClose={ closeModal }
                            contentLabel="Cadastro efetuado com sucesso!"
                        >
                            <h2 className="tituloModal"> Redirecionando login... </h2>
                            <button className="btnEditarDados" onClick={ closeModal }> <span className="tituloBotaoEditar">Fechar</span> </button>
                        </Modal>

                        <Modal
                            overlayClassName="custom-overlay"
                            className="modalSucesso"
                            isOpen={ isModalSenhaOpen }
                            onRequestClose={ closeModal }
                            contentLabel="Senhas diferentes"
                        >
                            <h2 className="tituloModal"> Senhas diferentes... <br /> Digite novamente! </h2>
                            <button className="btnEditarDados" onClick={ closeModal }> <span className="tituloBotaoEditar">Fechar</span> </button>
                        </Modal>
                    </div>
                </form>
            </div>
            <Footer />
        </Body>
    </>
}

export default Cadastrar;
