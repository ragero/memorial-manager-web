import Box from '@material-ui/core/Box';
import FormPublication from './FormPublication'
import Button from '@material-ui/core/Button';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import './Publicacoes.css'
import {useState} from 'react'
import {apiRequest} from '../../services/request'

const atualizaPublicacoes = (setPublicacoes) => {
    console.log('Atualizapublicações!!!')
    apiRequest.get('/publications')
        .then((resposta) => {
            return resposta.data
        })
        .then((resposta) => {
            console.log(resposta.publications)
            setPublicacoes([resposta.publications[0].titulo])
        })
        .catch((erro) => {
            console.log(erro)
        })
}


export default function Publicacoes() {

 
    const [displayForm, setDisplayForm] = useState('none')
    const [publicacoes, setPublicacoes] = useState([])

    atualizaPublicacoes(setPublicacoes)

    return (
            <div className="publicacoes">
                <Button variant="contained" onClick={(e) => setDisplayForm('block')}><AddCircleOutlineIcon className="mr-3"/> Adicionar Nova Publicação</Button>
                <hr />
                <div>
                    {publicacoes}
                </div>    
                {publicacoes.map(obj => <Button>obj.titulo</Button>)}
                <Box display={displayForm}>
                    <FormPublication closeFunction={setDisplayForm}/>
                </Box>    
            </div>

    )
}