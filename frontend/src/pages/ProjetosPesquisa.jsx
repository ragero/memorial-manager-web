import Content from '../template/Content'
import FindInPageIcon from '@material-ui/icons/FindInPage'

export default function Home(){
    return(
        <Content titulo='Projetos de Pesquisa' subtitulo='Adicione e gerencie seus projetos de pesquisa' icone={FindInPageIcon}>
           Conteudo das publicações
        </Content>
    )
}