import React from 'react';
import Body from "../../componentes/Body/Body"
import "../notFound/NotFound.css"


function NotFound() {
  return <>

    <Body>
      <div className="div-notFound">
        <h1 >
          404 <br/>Not Found
        </h1>
      </div>
      <div className='div-walle'></div>
    </Body>
  </>

}

export default NotFound;