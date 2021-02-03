import Content from '../template/Content'
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';

export default function Home(){
    return(
        <Content titulo='Atividades Administrativas' subtitulo='Adicione e gerencie as atividades administrativas' icone={BusinessCenterIcon}>
           Conteudo das publicações
        </Content>
    )
}