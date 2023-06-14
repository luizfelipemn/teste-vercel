import React from "react";
import
    {
        BrowserRouter,
        Routes,
        Route
    } from "react-router-dom";

import Index from "./pages/index/Index";
import Login from "./pages/login/Login";
import Cadastro from "./pages/cadastro/Cadastro";
import Principal from "./pages/principal/Principal";
import Lista from "./pages/lista/Lista";
import Avaliacao from "./pages/avaliacao/Avaliacao";
import SobreNos from "./pages/sobre-nos/SobreNos";
import Perfil from "./pages/lista/Lista";
import NotFound from './pages/notFound/NotFound';
import Dashboard from "./pages/dashboard/Dashboard";
import Cadastro2 from "./pages/ContinuaCadastro/Cadastro2";
import AlterarSenha from "./pages/alterarSenha/AlterarSenha";

function Rotas ()
{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Index /> } />
                <Route path="/login" element={ <Login /> } />
                <Route path="/cadastro" element={ <Cadastro /> } />
                <Route path="/cadastro2" element={ <Cadastro2/> } />
                <Route path="/principal" element={ <Principal /> } />
                <Route path="/lista/:idLista/:nomeLista" element={ <Lista /> } />
                <Route path="/avaliacao/:id" element={ <Avaliacao /> } />
                <Route path="/sobreNos" element={ <SobreNos /> } />
                <Route path="/perfil" element={ <Perfil /> } />
                <Route path="/dashboard" element={ <Dashboard /> } />
                <Route path="/alterarSenha" element={ <AlterarSenha /> } />
                <Route path="*" element={ <NotFound /> } />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas;