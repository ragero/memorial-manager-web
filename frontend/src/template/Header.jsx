import './Header.css'

export default function Header(props){
    return(
        <header className='cabecalho'>
            <h2><props.icone/>{props.titulo}</h2>
            <hr/>
            <h5>{props.subtitulo}</h5>
        </header>
    )
}