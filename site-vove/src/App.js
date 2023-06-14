import "../src/html-css-template/css/reset.css"
import Rotas from "../src/routes";
import "./global.css"
// import  from './index
import VLibras from "@djpfs/react-vlibras"


function App() {

  return (
    <>
      <Rotas />
      <VLibras forceOnload={true} />
    </>
  );
}

export default App; // exportando componente App para ser usado em outros módulos