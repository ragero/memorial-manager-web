import { Component } from 'react'
import Autenticacao from '../services/authentication'
import Link from '@material-ui/core/Link';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const initialState = {
    nome: '',
    email: ''
}

class AutenticacaoUsuario extends Component {

    constructor(props) {
        super(props)
        this.deslogar = this.deslogar.bind(this)
        this.state = { ...initialState }
    }

    deslogar(e) {
        Autenticacao.logout()
        console.log('deslogandooooo')
        console.log(Autenticacao.isAuthenticade())
        window.location.href = `/`
    }

    componentDidMount() {
        if (Autenticacao.isAuthenticade()) {
            this.setState({ nome: Autenticacao.getNome(), email: Autenticacao.getEmail() })
        }
    }

    render() {
        let component = undefined
        if (this.state.nome !== '') {
            component = (<div>
                <span className="mr-2">{Autenticacao.getNome()}</span>
                |
                <Link
                    component="button"
                    className="ml-2"
                    onClick={this.deslogar}
                >
                    <ExitToAppIcon/> Sair
                </Link>

            </div>)
        } else {
            component = <div className="cabecalho-sub-links">
                <Link href="/login" className="mr-2">
                    Entrar
            </Link>
            |
            <Link href="/cadastrar-usuario" className="ml-2">
                    Criar Conta
            </Link>
            </div>
        }
        return (
            <div className='deslogar'>
                {component}
            </div>
        )
    }

}

export default AutenticacaoUsuario