import './Menu.css'
import HomeIcon from '@material-ui/icons/Home'
import DescriptionIcon from '@material-ui/icons/Description'
import PeopleIcon from '@material-ui/icons/People'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import RedeemIcon from '@material-ui/icons/Redeem';

export default function Menu(){
    return(
        <aside className="menu">
            <nav>
                <a href='/'><HomeIcon className="mr-1"/>Home</a>
                <a href='/pesquisa'><DescriptionIcon  className="mr-1"/>Pesquisa</a>
                <a href='/extensao'><PeopleIcon className="mr-1"/>Projetos de Extensão</a>
                <a href='/administracao'><BusinessCenterIcon className="mr-1"/>Atividades Administrativas</a>
                <a href='/awards'><RedeemIcon className="mr-1"/>Prêmios</a>
            </nav>
        </aside>
    )
}