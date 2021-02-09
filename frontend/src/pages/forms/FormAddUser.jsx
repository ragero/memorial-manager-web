import { Container, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { apiRequest } from '../../services/request'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import "./FormAddUser.css"



export default function AddUser(props) {

    const cadastrar = (e, nome, email, senha) => {
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
        .then(resposta => resposta.data)
        .then(resposta => {
            console.log(resposta)
            if(resposta.status === 'sucesso'){
                alert('Usuário cadastrado com sucesso')
                window.location.href = '/'
            }else{
                let aviso = 'Houve os seguinte erros: \n\n'
                aviso+= resposta.erros.reduce((acumulador, erro) => `${acumulador} ${erro.msg}\n`,'')
                alert(aviso)
                
            }
        })
        .catch(erro => console.log(erro))
    }


    const [nome, setNome] = useState('')
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    const [confirmarSenha, setConfirmarSenha] = useState('')

    return (
        <Container maxWidth="sm" className="form-cadastro mt-5 shadow">
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