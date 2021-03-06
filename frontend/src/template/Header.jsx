import './Header.css'
import AutenticacaoUsuario from './UserAuth'

export default function Header(props) {
    return (
        <header className='cabecalho'>
            <h2><props.icone className="mr-2"/>{props.titulo}</h2>
            <hr />
            <div className="cabecalho-sub pr-3 text-secondary">
                <h5>{props.subtitulo}</h5>
                <AutenticacaoUsuario/>
            </div>
        </header>
    )
}

