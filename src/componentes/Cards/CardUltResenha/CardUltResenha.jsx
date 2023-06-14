import React, { useState, useEffect } from "react";
import "./CardUltResenha.css";
import banner from "../../../imgs/imgsTeste/poster.png";
import addIcon from "../../../imgs/icons/add.svg";
import PerfilIcon from "../../../imgs/icons/account_circle.svg";
import BotaoPrimario from "../../Botoes/BotaoPrimario/BotaoPrimario";
import api from '../../../api';
import InputMask from "react-input-mask";

function CardUltResenha(props) {
  const estiloCard = {
    backgroundImage: `url(${props.capa ? props.capa : banner})`
  };


  const [mostrarSpoiler, setMostrarSpoiler] = useState(true);

  const usuario = sessionStorage.getItem('usuarioLogado');

  function mostrarResenha() {
    setMostrarSpoiler(false);
  }




  // informações necessárias para a modal

  const [modalAberto, setModalAberto] = useState(false);
  const [listas, setListas] = useState([]);
  const idUsuario = sessionStorage.getItem('idUser');


  // bloco de código que carrega as listas de cada usuário e abre e fecha a modal

  const abrirModal = () => {
    setModalAberto(true);
  };

  const fecharModal = () => {
    setModalAberto(false);
  };


  const carregarListas = () => {
    api.get(`listas/minhas-listas?idUsuario=${idUsuario}`)
      .then((response) => {
        setListas(response.data); 
        sessionStorage.setItem('nomeLista', response.data.nomeLista);
        sessionStorage.setItem('idLista', response.data.idLista);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    carregarListas();
  }, []);
 
 


  // bloco de código para adicionar filme à lista
  const selecionarLista = (lista) => {
    adicionarFilme(lista.idLista);
  };
  
  const adicionarFilme = (idLista) => {
    const filmeAdicionado = {
      tmdbIdFilme: props.filmeId,
    };
  
    api.post(`listas/adicionar?idUsuario=${idUsuario}&idLista=${idLista}`, filmeAdicionado)
      .then((response) => {
        const novoFilmeAdicionado = response.data;
        
        sessionStorage.setItem('filmeId', novoFilmeAdicionado.id);

        console.log(novoFilmeAdicionado);
        fecharModal();
      })
      .catch((erro) => {
        console.log(erro);
      });
  };
  

  return (
    <>

      <div className="content">

        <div className="bannerFilm" style={estiloCard}></div>
        <div className="info">
          <div className="head">
            <div className="titulo">
              <h1>{props.tituloFilme}</h1>
            </div>
            <div className="addList" onClick={abrirModal}>

              <span>
                Adicionar a sua lista <img src={addIcon} alt="icone de adicionar fime a lista" />
              </span>
            </div>
          </div>

          {props.spoiler && mostrarSpoiler ? (
            <div className="ifos-filme">
              <h1 className="alerta">Alerta de spoiler</h1>
              <button className="btnVerdeCard" onClick={mostrarResenha}>
                Ver mesmo assim
              </button>
            </div>
          ) : (
            <div className="ifos-filme">
              <div className="userInfo">
                <div className="iconUser">
                  <img src={PerfilIcon} alt="Icone de perfil do usuário" />
                </div>
                <div className="userName">{props.userName}</div>
                <div className="userNota">Nota: {props.userNota}</div>
              </div>

              <div className="resenha">
                <span className="aspas">"</span> {props.userComentario}{""}
                <span className="aspas">"</span>
              </div>
            </div>
          )}
        </div>

      </div>
      {/* precisa fazer essa modal aqui */}
      {modalAberto && (
        <div className="modal">
          <div className='div-form'>
            <form >
              <label> Escolha a lista:</label>
              <br />

              <ul>
                {listas.map((listaU) => (
                  <li onClick={() => selecionarLista(listaU)} key={listaU.idLista}>
                    {listaU.nomeLista}
                  </li>
                ))}

              </ul>
              <br />
              <div className='div-buttons'>
                <button className='botao-cancelar' type="button" onClick={fecharModal}>Cancelar</button>

              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default CardUltResenha;
