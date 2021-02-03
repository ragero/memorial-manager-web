import Content from '../template/Content'
import DescriptionIcon from '@material-ui/icons/Description'
import FormPublication from './forms/FormPublication'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './Publicacoes.css'

export default function Home() {
    return (
        <Content titulo='Publicações' subtitulo='Adicione e gerencie publicações' icone={DescriptionIcon}>
            <div className="publicacoes">
                <Button variant="contained"><AddCircleOutlineIcon className="mr-3" /> Adicionar Nova Publicação</Button>
                <hr />
                <FormPublication />
            </div>
        </Content>
    )
}