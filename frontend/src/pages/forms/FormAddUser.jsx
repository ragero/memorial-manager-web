import { Container, TextField, Button } from '@material-ui/core'
import { useState } from 'react'
import { apiRequest } from '../../services/request'
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import "./FormAddUser.css"



export default function AddUser(props) {

    const cadastrar = (e, name, email, password) => {
        e.preventDefault()
        apiRequest.post('/users',
            {
                name,
                email,
                password
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


    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    return (
        <Container maxWidth="sm" className="form-cadastro mt-5 shadow">
            <form>
                <TextField
                    id="name"
                    label="Nome completo"
                    fullWidth
                    margin='normal'
                    value={name}
                    onChange={(event) => setName(event.target.value)}
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
                    id="password"
                    label="Senha"
                    type="password"
                    fullWidth
                    margin='normal'
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                />
                <TextField
                    id="confirm-password"
                    label="Confirmar senha"
                    type="password"
                    fullWidth
                    margin='normal'
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={(e) => cadastrar(e, name, email, password)}
                    startIcon={<PersonAddIcon/>}
                    className="mb-4 mt-3"
                >
                    Cadastrar
                </Button>
            </form>
        </Container>
    )
}