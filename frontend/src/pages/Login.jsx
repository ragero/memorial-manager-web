import Content from '../template/Content'
import VpnKeyIcon from '@material-ui/icons/VpnKey'
import FormLogin from './forms/FormLogin'

export default function Home(){
    return(
        <Content titulo='Login' subtitulo='Autentique no sistema para poder gerenciar suas atividades' icone={VpnKeyIcon}>
           <FormLogin/>
        </Content>
    )
}