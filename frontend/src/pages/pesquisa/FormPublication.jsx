import { Component } from 'react'
import { Typography, Container, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import CloseIcon from '@material-ui/icons/Close'
import './FormPublication.css'
import { apiRequest } from '../../services/request'

export default class AddPublication extends Component {

    constructor(props) {
        super(props)
        this.state = { ...props.dados }
        this.addAutor = this.addAutor.bind(this)
        this.atualizaArquivo = this.atualizaArquivo.bind(this)
        this.atualizarCampo = this.atualizarCampo.bind(this)
        this.atualizarImagem = this.atualizarImagem.bind(this)
        this.enviarPublicacao = this.enviarPublicacao.bind(this)
        this.resetarDados = this.resetarDados.bind(this)
    }

    resetarDados(e) {
        if (e !== undefined) {
            e.preventDefault()
        }
        this.props.fecharTelaCadastro()
        //this.imagem.current.value = ''
        //this.imagem.file.value = ''
        //this.setState({...initialState})
    }

    atualizarCampo(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    atualizarImagem(e) {
        this.setState({ imagem: e.target.files[0] })
    }

    atualizaAutor(e, indice) {
        const autores = this.state.autores
        autores[indice] = e.target.value
        this.setState({ autores: autores })
    }

    atualizaArquivo(e) {
        if(e.target.files[0] !== undefined){
            this.setState({ nomeArquivo: e.target.files[0].name, comprovante: e.target.files[0] })
        }
        
    }



    addAutor() {
        const autores = this.state.autores
        autores.push('')
        this.setState({ autores: autores })

    }

    enviarPublicacao(e) {
        e.preventDefault()
        let formData = new FormData()
        formData.append('_id', this.state._id)
        formData.append('titulo', this.state.titulo)
        formData.append('tipo', this.state.tipo)
        formData.append('local', this.state.local)
        formData.append('qualis', this.state.qualis)
        formData.append('autores', this.state.autores)
        formData.append('paginaInicial', this.state.paginaInicial)
        formData.append('paginaFinal', this.state.paginaFinal)
        formData.append('anoPublicacao', this.state.anoPublicacao)
        formData.append('comprovante', this.state.comprovante)

        const methodRequest = this.props.tipoEnvio === 'Cadastrar' ? 'post' : 'put'
        alert(methodRequest)
        apiRequest({
            method: methodRequest,
            url: '/publications',
            data: formData
        })
            .then(resposta => resposta.data)
            .then(resposta => {
                console.log('======= Resposta da requisição =======')
                console.log(resposta)
                if (resposta.erros === undefined) {
                    alert('Publicação cadastrada com sucesso')
                    this.resetarDados()
                    this.props.atualizaPublicacoes()
                    this.props.fecharTelaCadastro()
                } else {
                    let aviso = 'Houve os seguinte erros: \n\n'
                    aviso+= resposta.erros.reduce((acumulador, erro) => `${acumulador} ${erro.msg}\n`,'')
                    alert(aviso)
                }
            })
            .catch(erro => console.log(erro))

    }

    componentDidUpdate(prevProps) {
        console.log(this.props.dados)
        if (prevProps !== this.props) {
            this.setState({ ...this.props.dados })
        }
    }

    componentDidMount() {
        if (this.state.autores.length === 0) {
            this.addAutor()
        }
    }

    render() {
        return (
            <div className="screen-form">
                <Container maxWidth="sm" className="screen-form-container" >
                    <div className="screen-form-container-title-bar pt-2">
                        <Typography variant="h5" component="h3" className='ml-2'>{this.props.tipoEnvio} publicação </Typography>
                        <Button color='secondary' size='small' onClick={this.resetarDados}><CloseIcon /></Button>
                    </div>
                    <form>
                        <TextField
                            name='_id'
                            type='hidden'
                            margin='normal'
                            value={this.state._id}
                        />
                        <TextField
                            name='titulo'
                            label="Título da Publicação"
                            fullWidth
                            margin='normal'
                            value={this.state.titulo}
                            onChange={this.atualizarCampo}
                        />
                        <FormControl style={{ minWidth: 100 }}>
                            <InputLabel>Tipo</InputLabel>
                            <Select
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.atualizarCampo}
                            >
                                <MenuItem value={'Periódico'}>Periódico</MenuItem>
                                <MenuItem value={'Conferência - Completo'}>Conferência - Completo</MenuItem>
                                <MenuItem value={'Conferência - Resumo'}>Conferência - Resumo</MenuItem>
                            </Select>
                        </FormControl>

                        <TextField
                            name="local"
                            label={`Título do(a) ${this.state.tipo}`}
                            fullWidth
                            margin='normal'
                            value={this.state.local}
                            onChange={this.atualizarCampo}
                        />

                        <FormControl style={{ minWidth: 100 }}>
                            <InputLabel >Qualis</InputLabel>
                            <Select
                                name="qualis"
                                value={this.state.qualis}
                                onChange={this.atualizarCampo}
                            >
                                <MenuItem value={'A1'}>A1</MenuItem>
                                <MenuItem value={'A2'}>A2</MenuItem>
                                <MenuItem value={'A3'}>A3</MenuItem>
                                <MenuItem value={'A4'}>A4</MenuItem>
                                <MenuItem value={'B1'}>B1</MenuItem>
                                <MenuItem value={'B2'}>B2</MenuItem>
                                <MenuItem value={'B3'}>B3</MenuItem>
                                <MenuItem value={'B4'}>B4</MenuItem>
                                <MenuItem value={'B5'}>B5</MenuItem>
                                <MenuItem value={'SQ'}>SQ</MenuItem>
                            </Select>
                        </FormControl>

                        <div className="form-lista-autores">
                            {this.state.autores.map((autor, indice) =>
                                <TextField
                                    key={indice}
                                    label={`Nome do ${indice + 1}º autor`}
                                    fullWidth
                                    margin='normal'
                                    value={autor}
                                    onChange={(e) => this.atualizaAutor(e, indice)}
                                />)
                            }
                        </div>
                        <Button
                            variant="contained"
                            color="default"
                            margin="normal"
                            startIcon={<PersonAddIcon />}
                            onClick={this.addAutor}
                        >
                            Adicionar outro autor
                    </Button>

                        <div>
                            <TextField
                                name='anoPublicacao'
                                label="Ano da Publicacao"
                                margin='normal'
                                type="number"

                                value={this.state.anoPublicacao}
                                onChange={this.atualizarCampo}
                            />
                        </div>
                        <div>
                            <TextField
                                name='paginaInicial'
                                label="Página Inicial"
                                margin='normal'
                                type="number"
                                value={this.state.paginaInicial}
                                onChange={this.atualizarCampo}
                            />
                            <TextField
                                className="ml-3"
                                name='paginaFinal'
                                label="Página Final"
                                margin='normal'
                                type="number"
                                value={this.state.paginaFinal}
                                onChange={this.atualizarCampo}
                            />
                        </div>
                        <input
                            id="comprovante-publicacao"
                            accept="application/pdf"
                            hidden
                            type="file"
                            onChange={this.atualizaArquivo}
                        />
                        <div className='mt-4 mb-5'>
                            <label htmlFor="comprovante-publicacao">
                                <Button
                                    variant="contained"
                                    component="span"
                                    startIcon={<CloudUploadIcon />}
                                >
                                    Adicionar Comprovante
                            </Button>
                            </label>
                            <label className='ml-3'>{this.state.nomeArquivo}</label>
                        </div>

                        <Button
                            variant="contained"
                            color="primary"
                            className="mb-3"
                            startIcon={<SaveAltIcon />}
                            onClick={this.enviarPublicacao}
                        >
                            {this.props.tipoEnvio}
                        </Button>
                    </form>
                </Container>
            </div>
        )
    }
}


