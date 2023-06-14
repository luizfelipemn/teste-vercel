import React from 'react';
import MenuTwo from "./../../componentes/Menus/MenuTwo/MenuTwo";
import Body from "../../componentes/Body/Body"
import "../sobre-nos/SobreNos.css"
import "typeface-roboto";
import ln from "../../imgs/icons/Vector.png"
import git from "../../imgs/icons/git.png"
import Footer from '../../componentes/Footer/Footer';

function SobreNos() {
  return <>


    <MenuTwo userName="Bia" />
    <Body>
      
    <div className="div-geral">
    
      <h1 className='h1-sobre-nos'>Sobre nós</h1>
      <div className='div-verde'></div>
      <div className='div-paragrafo'>
      <p>
        "A VoVê é uma comunidade para os amantes de cinema, uma comunidade criada para avaliar, ler e escrever sobre filmes e 
        séries, onde encontramos listas com filmes populares da semana como sugestões. Onde podemos criar listas de favoritos e listas personalizadas
        para uma experiência divertida e acolhedora para todos os nossos usuários. A seguir a equipe que fez isso tudo acontecer!"
      </p>
      </div>

      
        <div className='p-imagens'>
      <div className='leka'>
      <div className='ln'>
        <a href="https://www.linkedin.com/in/jo%C3%A3o-pedro-leka-131a89251/">
          <img src={ln} alt="" className='img-ln' />
        </a>
      </div>
      <div className='git'>
        <a href="https://github.com/JoaoLeka">
          <img src={git}  className='img-git'/>
        </a>
        </div><br></br>
      <div className='nome'>
        <h2 className='h2-nomes'>João Leka</h2>
        <span className='span-funcoes'>Design / Backend</span>
      </div>
      </div>

      <div className='luiz'>
      <div className='ln'>
        <a href="https://www.linkedin.com/in/luiz-felipe-modesto-nunes-094b35178/">
          <img src={ln} alt="" className='img-ln' />
        </a>
      </div>
      <div className='git'>
        <a href="https://github.com/luizfelipemn">
          <img src={git}  className='img-git'/>
        </a>
        </div><br></br>
      <div className='nome'>
        <h2 className='h2-nomes'>Luiz Felipe</h2>
        <span className='span-funcoes'>Backend</span>
      </div>
      </div>

      <div className='victor'>
      <div className='ln'>
        <a href="https://www.linkedin.com/in/victor-souza-silveira-5b7a27170/">
          <img src={ln} alt="" className='img-ln' />
        </a>
      </div>
      <div className='git'>
        <a href="https://github.com/victchorsptech">
          <img src={git}  className='img-git'/>
        </a>
        </div><br></br>
      <div className='nome'>
        <h2 className='h2-nomes'>Victor Silveira</h2>
        <span className='span-funcoes'>Frontend</span>
      </div>
      </div>

      <div className='joao'>
      <div className='ln'>
        <a href="https://www.linkedin.com/in/jo%C3%A3o-gabriel-morata-faria-36a081169/">
          <img src={ln} alt="" className='img-ln' />
        </a>
      </div>
      <div className='git'>
        <a href="https://github.com/joaogabrielmf">
          <img src={git}  className='img-git'/>
        </a>
        </div><br></br>
      <div className='nome'>
        <h2 className='h2-nomes'>João Gabriel</h2>
        <span className='span-funcoes'>Negócios</span>
      </div>
      </div>
      </div>

      <div className='s-imagens'>
      <div className='jaque'>
      <div className='ln'>
        <a href="https://www.linkedin.com/in/jaqueline-amorim-b991a218b/">
          <img src={ln} alt="" className='img-ln' />
        </a>
      </div>
      <div className='git'>
        <a href="https://github.com/JaquelineAmorim">
          <img src={git}  className='img-git'/>
        </a>
        </div><br></br>
      <div className='nome'>
        <h2 className='h2-nomes'>Jaqueline</h2>
        <span className='span-funcoes'>Negócios / Frontend</span>
      </div>
      </div>

      <div className='bia'>
      <div className='ln'>
        <a href="https://www.linkedin.com/in/beatriz-resende-b01b00243/">
          <img src={ln} alt="" className='img-ln' />
        </a>
      </div>
      <div className='git'>
        <a href="https://github.com/resendevb">
          <img src={git}  className='img-git'/>
        </a>
        </div><br></br>
      <div className='nome'>
        <h2 className='h2-nomes'>Beatriz</h2>
        <span className='span-funcoes'>Negócios / Frontend</span>
      </div>
      </div>
      </div>
      
     

      
    </div>
    <Footer/>
    </Body>

  </>;
}

export default SobreNos;