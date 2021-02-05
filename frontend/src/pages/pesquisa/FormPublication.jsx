import {Component} from 'react'
import { Typography, Container, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import SaveAltIcon from '@material-ui/icons/SaveAlt'
import CloseIcon from '@material-ui/icons/Close'
import './FormPublication.css'
import {apiRequest} from '../../services/request'

const initialState = {
    titulo: '',
    tipo: 'Periódico',
    local: '',
    autores: [],
    nomeArquivo: '',
    qualis: '',
    paginaInicial: '',
    paginaFinal: '',
    anoPublicacao: '',
    comprovante: ''
}

export default class AddPublication extends Component {

    constructor(props) {
        super(props)
        this.state = { ...initialState }
        this.addAutor = this.addAutor.bind(this)
        this.atualizaArquivo = this.atualizaArquivo.bind(this)
        this.atualizarCampo = this.atualizarCampo.bind(this)
        this.atualizarImagem = this.atualizarImagem.bind(this)
        this.cadastrarPublicacao = this.cadastrarPublicacao.bind(this)
    }

    atualizarCampo(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    atualizarImagem(e){
        this.setState({imagem : e.target.files[0]})
    }

    atualizaAutor(e, indice) {
        const autores = this.state.autores
        autores[indice] = e.target.value
        this.setState({ autores: autores })
    }

    atualizaArquivo(e) {
        this.setState({ nomeArquivo: e.target.files[0].name, comprovante: e.target.files[0]})
    }

    addAutor() {
        const autores = this.state.autores
        autores.push('')
        this.setState({ autores: autores })
        
    }

    cadastrarPublicacao(e){
        e.preventDefault()
        let formData = new FormData()
        formData.append('titulo', this.state.titulo)
        formData.append('tipo', this.state.tipo)
        formData.append('local', this.state.local)
        formData.append('qualis', this.state.qualis)
        formData.append('paginaInicial', this.state.paginaInicial)
        formData.append('paginaFinal', this.state.paginaFinal)
        formData.append('anoPublicacao', this.state.anoPublicacao)
        formData.append('comprovante', this.state.comprovante)        
        apiRequest.post("/publications", formData)
        .then(resposta => resposta.data)
        .then(dados => {
            console.log(dados)
            if(dados.erros === undefined){
                alert('Usuário cadastrado com sucesso')
                this.resetarDados()
            }else{ 
                const listaErros = dados.erros.map((erro) => <li key={erro.param}>Houve um erro no campo {erro.param}: {erro.msg}</li>)
                    this.setState({erros : <ul className='mb-0'>{listaErros}</ul>})
                    console.log(listaErros)
            }
        })
        .catch(erro => console.log(erro))
    }

    componentDidMount() {
        this.addAutor()
    }

    render() {
        return (
            <div className="screen-form">
                <Container maxWidth="sm" className="screen-form-container" >
                    <div className="screen-form-container-title-bar pt-2">
                        <Typography variant="h5" component="h3" className='ml-2'>Cadastrar publicação </Typography>
                        <Button color='secondary' size='small' onClick={(e) => this.props.closeFunction('none')}><CloseIcon /></Button>
                    </div>
                    <form>
                        <TextField
                            id="titulo"
                            name='titulo'
                            label="Título da Publicação"
                            fullWidth
                            margin='normal'
                            value={this.state.titulo}
                            onChange={this.atualizarCampo}
                        />
                        <FormControl style={{minWidth: 100}}>
                            <InputLabel id="select-label-tipo">Tipo</InputLabel>
                            <Select
                                id="tipo"
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
                            id="local"
                            name="local"
                            label={`Título do(a) ${this.state.tipo}`}
                            fullWidth
                            margin='normal'
                            value={this.state.local}
                            onChange={this.atualizarCampo}
                        />

                        <FormControl style={{minWidth: 100}}>
                            <InputLabel id="select-label-tipo">Qualis</InputLabel>
                            <Select
                                id="qualis"
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
                            {this.state.autores.map((autor, indice) => <TextField
                                id={`autor${indice}`}
                                key={indice}
                                label={`Nome do ${indice + 1}º autor`}
                                fullWidth
                                margin='normal'
                                value={autor}
                                onChange={(e) => this.atualizaAutor(e, indice)}
                            />)}
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
                                id="ano-publicacao"
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
                                id="pagina-inicial"
                                name='paginaInicial'
                                label="Página Inicial"
                                margin='normal'
                                type="number"
                                value={this.state.paginaInicial}
                                onChange={this.atualizarCampo}
                            />
                            <TextField
                                className="ml-3"
                                id="pagina-final"
                                name='paginaFinal'
                                label="Página Final"
                                margin='normal'
                                type="number"
                                value={this.state.paginaFinal}
                                onChange={this.atualizarCampo}
                            />
                        </div>
                        <input
                            accept="image/*"
                            hidden
                            id="contained-button-file"
                            multiple
                            type="file"
                            onChange={this.atualizaArquivo}
                        />
                        <div className='mt-4 mb-5'>
                            <label htmlFor="contained-button-file">
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
                            onClick={this.cadastrarPublicacao}
                        >
                            Cadastrar
                        </Button>
                    </form>
                </Container>
            </div>
        )
    }
}


