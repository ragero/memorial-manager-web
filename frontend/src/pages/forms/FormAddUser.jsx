import { Container, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { apiRequest } from '../../services/request'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import "./FormAddUser.css"

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

export default function AddUser() {

    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    return (
        <Container maxWidth="sm" className="form-cadastro mt-5">
            <form>
                <TextField
                    id="nome"
                    label="Nome completo"
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
                    type="email"
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
                <TextField
                    id="confirmar-senha"
                    label="Confirmar senha"
                    type="password"
                    fullWidth
                    margin='normal'
                    value={confirmarSenha}
                    onChange={(event) => setConfirmarSenha(event.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => cadastrar(e, nome, email, senha)}
                    startIcon={<PersonAddIcon/>}
                    className="mb-4 mt-3"
                >
                    Cadastrar
                </Button>
            </form>
        </Container>
    )
}