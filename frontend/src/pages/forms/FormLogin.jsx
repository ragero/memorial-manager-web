import { Container, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { apiRequest } from '../../services/request'
import Autenticacao from '../../services/authentication'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './FormLogin.css'

function logar(e,  email, password) {
    e.preventDefault()
    apiRequest.post('/users/login',
        {
            password,
            email
        }, 
        {
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then((response) => response.data)
    .then((response) => {
        
        console.log(response)
        if(response.erro === undefined){
            const data = {name: response.user.name, id: response.user.id, email: response.user.email, token: response.token}
            Autenticacao.login(data)
            window.location.href = '/'
        }else{ 
            console.log(response)
            alert('Usuário ou senha inválidos')

        }
        console.log(response)
    })
    .catch((erro) => console.log(erro))

}

export default function AddUser() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <Container maxWidth="sm" className="form-login mt-5 shadow">
            <form>
                <TextField
                    id="nome"
                    label="E-mail"
                    fullWidth
                    margin='normal'
                    value={email}
                    type="email"
                    onChange={(event) => setEmail(event.target.value)}
                />
                <TextField
                    id="password"
                    label="Senha"
                    type="password"
                    fullWidth
                    margin='normal'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => logar(e, email, password)}
                    startIcon={<AccountCircleIcon/>}
                    className="mb-4 mt-3"
                >
                    Entrar
                </Button>
            </form>
        </Container>
    )
}