import Content from '../template/Content'
import PeopleIcon from '@material-ui/icons/People'

export default function Home(){
    return(
        <Content titulo='Projetos de Extensão' subtitulo='Adicione e gerencie projetos de extensão' icone={PeopleIcon}>
           Conteudo das publicações
        </Content>
    )
}