import './Header.css'
import Link from '@material-ui/core/Link'

export default function Header(props) {
    return (
        <header className='cabecalho'>
            <h2><props.icone className="mr-2"/>{props.titulo}</h2>
            <hr />
            <div className="cabecalho-sub pr-3">
                <h5>{props.subtitulo}</h5>
                <div className="cabecalho-sub-links">
                    <Link href="/login" className="mr-2">
                        Entrar
                    </Link>
                    |
                    <Link href="/cadastrar-usuario" className="ml-2">
                            Criar Conta
                    </Link>
                </div>
            </div>
        </header>
    )
}

