import './Menu.css'
import HomeIcon from '@material-ui/icons/Home'
import DescriptionIcon from '@material-ui/icons/Description'
import FindInPageIcon from '@material-ui/icons/FindInPage'
import PeopleIcon from '@material-ui/icons/People'
import MarkunreadMailboxIcon from '@material-ui/icons/MarkunreadMailbox'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

export default function Menu(){
    return(
        <aside className="menu">
            <nav>
                <a href='/'><HomeIcon/>Home</a>
                <a href='/publicacoes'><DescriptionIcon/>Publicações</a>
                <a href='/pesquisa'><FindInPageIcon/>Projetos de Pesquisa</a>
                <a href='/extensao'><PeopleIcon/>Projetos de Extensão</a>
                <a href='/administracao'><MarkunreadMailboxIcon/>Atividades Administrativas</a>
                <a href='/awards'><BusinessCenterIcon/>Prêmios</a>
            </nav>
        </aside>
    )
}