import './Menu.css'
import HomeIcon from '@material-ui/icons/Home'
import NaturePeopleIcon from '@material-ui/icons/NaturePeople'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter'
import LayersIcon from '@material-ui/icons/Layers'
import SearchIcon from '@material-ui/icons/Search'
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents'
import MenuBookIcon from '@material-ui/icons/MenuBook';

export default function Menu(){
    return(
        <aside className="menu">
            <nav>
                <a href='/'><HomeIcon className="mr-1"/>Home</a>
                <a href='/formation'><LayersIcon  className="mr-1"/>Formação</a>
                <a href='/pesquisa'><SearchIcon  className="mr-1"/>Pesquisa</a>
                <a href='/extensao'><NaturePeopleIcon className="mr-1"/>Extensão</a>
                <a href='/extensao'><MenuBookIcon className="mr-1"/>Ensino</a>
                <a href='/administracao'><BusinessCenterIcon className="mr-1"/>Administração</a>
                <a href='/awards'><EmojiEventsIcon className="mr-1"/>Premiações</a>
            </nav>
        </aside>
    )
}