import React, { useState } from 'react';
import "../alterarSenha/AlterarSenha.css"
import Body from '../../componentes/Body/Body';
import MenuTwo from "../../componentes/Menus/MenuTwo/MenuTwo";
import MenuOne from "../../componentes/Menus/MenuOne/Menu";
import Footer from '../../componentes/Footer/Footer';
import api from '../../api';
import { useNavigate } from 'react-router-dom';

function AlterarSenha() {
    const nomeUsuario = sessionStorage.getItem('nomeUsuario');
    const idUsuario = sessionStorage.getItem('idUser');
    const [senhaNova, setSenhaNova] = useState('');

    const navigate = useNavigate();

    function atualizarSenha(){
        api
        .put(`/usuarios/alterar-senha/${idUsuario}?novaSenha=${senhaNova}`, )
        .then((res) => {
            console.log('senha atualizada')
            navigate("/principal")
        })
        .catch((erro) => {
            console.log('deu erro', erro)
        })
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

                <div className='div-novaSenha'>
                    <div className='box'>
                        <h1 className='pop'>Nova senha</h1>
                        <div className='verde'></div>
                    </div>

                    <label>Senha atual:</label>
                    <input type="password"  placeholder='senha atual'/>

                    <label>Nova senha:</label>
                    <input
                    defaultValue={senhaNova}
                    name='senhaNova'
                    onChange={(e) => setSenhaNova(e.target.value)}
                    type="password"  placeholder='********'/>

                    <button onClick={atualizarSenha}>Salvar senha</button>

                </div>




                <Footer />
            </Body>
        </>
    );
}

export default AlterarSenha;