import { Container, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { apiRequest } from '../../services/request'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import './FormLogin.css'

function logar(e,  email, senha) {
    e.preventDefault()
    apiRequest.post('/users/login',
        {
            senha,
            email
        }, 
        {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

export default function AddUser() {

    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

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
                    id="senha"
                    label="Senha"
                    type="password"
                    fullWidth
                    margin='normal'
                    value={senha}
                    onChange={(event) => setSenha(event.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => logar(e, email, senha)}
                    startIcon={<AccountCircleIcon/>}
                    className="mb-4 mt-3"
                >
                    Entrar
                </Button>
            </form>
        </Container>
    )
}