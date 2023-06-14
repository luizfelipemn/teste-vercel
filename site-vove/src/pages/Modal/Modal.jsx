import React from 'react';



function Modal(props) {
    const {
        fecharModal,
        handleNovaListaNomeChange,
        handleCriarListaSubmit,
        novaListaNome,
      } = props;
  return (
    <>
    

  return (
    <div className="modal">
      <form onSubmit={handleCriarListaSubmit}>
        <label htmlFor="novaListaNome">Nome da nova lista:</label>
        <input
          id="novaListaNome"
          type="text"
          value={novaListaNome}
          onChange={handleNovaListaNomeChange}
        />
        <button type="submit">Criar</button>
        <button type="button" onClick={fecharModal}>Cancelar</button>
      </form>
    </div>
  );
    </>
  )
}

export default Modal;