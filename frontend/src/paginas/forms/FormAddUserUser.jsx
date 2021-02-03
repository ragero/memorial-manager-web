import { Container, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { apiRequest } from '../../services/request'

function cadastrar(e, nome, email, senha) {
    e.preventDefault()
    console.log(nome, email, senha)
    apiRequest.post('/users',
        {
            nome,
            senha,
            email
        }, 
        {
        headers: {
            'Content-Type': 'application/json'
        }
    })
}

function AddUser() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')

    return (
        <Container maxWidth="sm">
            <form>
                <TextField
                    id="nome"
                    label="Nome"
                    fullWidth
                    margin='normal'
                    value={nome}
                    onChange={(event) => setNome(event.target.value)}
                />
                <TextField
                    id="email"
                    label="E-mail"
                    fullWidth
                    margin='normal'
                    value={email}
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
                    onClick={(e) => cadastrar(e, nome, email, senha)}
                >
                    Cadastrar
                </Button>
            </form>
        </Container>
    )
}

export default AddUser 