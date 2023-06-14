import React, { useEffect, useState } from 'react';
import "../Listas/MenuLista.css";
import iconMenu from "../../../imgs/icons/menuListIcon.svg";
import api from '../../../api';
import setaBaixo from "../../../imgs/icons/down arrow.svg";
import { Link } from 'react-router-dom';


function MenuLista() {
  const [aberto, setAberto] = useState(false);
  const [novaListaNome, setNovaListaNome] = useState('');
  const idUsuario = sessionStorage.getItem('idUser');
  const [listas, setListas] = useState([]);

  useEffect(() => {
    carregarListas();
  }, []);

  const carregarListas = () => {
    api.get(`/listas/minhas-listas?idUsuario=${idUsuario}`)
      .then((response) => {
        setListas(response.data); 
        sessionStorage.setItem('nomeLista', response.data.nomeLista);
        sessionStorage.setItem('idLista', response.data.idLista);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const toggleAberto = () => {
    setAberto(!aberto);
  };

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };

  const cadastrar = (e) => {
    e.preventDefault();
    const novaLista = {
      nomeDaLista: novaListaNome
    };

    api.post(`listas?idUsuario=${idUsuario}`, novaLista)
      .then((response) => {
        console.log(novaLista)
        const novaListaCriada = response.data;
        setListas([...listas, novaListaCriada.nomeDaLista]);
        fecharModal();
        carregarListas();
        window.location.reload();
      })
      .catch((erro) => {
        console.log(erro);
        console.log("cadastrando")
      });
      
  };

  useEffect(() => {
    carregarListas();
  }, []);
  


  const [modalAberto, setModalAberto] = useState(false);

  return (
    <>
      <div className="myList" onClick={toggleAberto}>
        <span>Minhas listas</span>
        <img src={aberto ? setaBaixo : iconMenu} alt="Ícone do Menu" />
      </div>
      {aberto && (
        <div className={`combobox ${aberto ? "open" : ""}`}>
          <ul>
            {listas.map((listaU) => (
              <Link to={`/lista/${listaU.idLista}/${listaU.nomeLista}`}>
                <li key={listaU.idLista}>{listaU.nomeLista}</li>
              </Link>
            ))}

            <li onClick={abrirModal}>Criar Lista +</li>
          </ul>
        </div>
      )}

      

      {modalAberto && (
        <div className="modal">
          <div className='div-form'>
            <form onSubmit={cadastrar}>
              <label >Nome da lista:</label>
              <br />
              <input
                placeholder='Nome da lista'
                name='novaListaNome'
                type="text"
                value={novaListaNome}
                onChange={(e) => setNovaListaNome(e.target.value)}
                required
              />

              <br />
              <div className='div-buttons'>
                <button className='botao-cancel' type="button" onClick={fecharModal}>Cancelar</button>
                <button className='botao' type="submit">Criar Lista</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default MenuLista;
