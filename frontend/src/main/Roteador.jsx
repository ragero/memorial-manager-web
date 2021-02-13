import {Switch, Route, Redirect} from 'react-router'
import Home from '../pages/Home'
import Pesquisa from '../pages/research/Pesquisa'
import ProjetosExtensao from '../pages/ProjetosExtensao'
import AtividadesAdministrativas from '../pages/AtividadesAdministrativas'
import Premios from '../pages/Premios'
import Login from '../pages/Login'
import CadastrarUsuario from '../pages/CadastrarUsuario'

export default function Roteador(){
    return(
        <Switch>
            <Route exact path='/' component={Home}/>
            <Route exact path='/pesquisa' component={Pesquisa}/>
            <Route exact path='/extensao' component={ProjetosExtensao}/>
            <Route exact path='/administracao' component={AtividadesAdministrativas}/>
            <Route exact path='/premios' component={Premios}/>
            <Route exact path='/login' component={Login}/>
            <Route exact path='/cadastrar-usuario' component={CadastrarUsuario}/>
            <Redirect from='*' to='/'></Redirect>
        </Switch>
    )
}