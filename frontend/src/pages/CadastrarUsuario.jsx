import Content from '../template/Content'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import FormAddUser from './forms/FormAddUser'
export default function CadastrarUsuario(){
    return(
        <Content titulo='Cadastrar' subtitulo='Insira suas informações para se cadastrar no sistema' icone={PersonAddIcon}>
           <FormAddUser/>
        </Content>
    )
}