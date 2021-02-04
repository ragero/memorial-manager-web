
import { Component } from 'react'
import { Container, TextField, Button, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import PersonAddIcon from '@material-ui/icons/PersonAdd'
import SaveAltIcon from '@material-ui/icons/SaveAlt';

const initialState = {
    titulo: '',
    tipo: 'Periódico',
    local: '',
    listaAutores: [],
    nomeArquivo: '',
    paginaInicial: '',
    paginaFinal: '',
    anoPublicacao: ''
}

export default class AddPublication extends Component {

    constructor(props) {
        super(props)
        this.state = { ...initialState }
        this.addAutor = this.addAutor.bind(this)
        this.atualizaArquivo = this.atualizaArquivo.bind(this)
        this.atualizarCampo = this.atualizarCampo.bind(this)
    }

    atualizarCampo(e) {
        console.log('Atualizando campos')
        console.log(e.target.name)
        console.log(e.target.value)
        this.setState({ [e.target.name]: e.target.value })

    }

    atualizaAutor(e, indice) {
        const autores = this.state.listaAutores
        autores[indice] = e.target.value
        this.setState({ listaAutores: autores })
    }

    atualizaArquivo(e) {
        this.setState({ nomeArquivo: e.target.files[0].name })
    }

    addAutor() {
        const listaAutores = this.state.listaAutores
        listaAutores.push('')
        this.setState({ listaAutores: listaAutores })
        console.log('Atualizou a lista')
        console.log(this.state)
    }

    componentDidMount() {
        this.addAutor()
    }

    render() {
        return (
            <Container maxWidth="sm">
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
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">Tipo  </InputLabel>
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
                    {this.state.listaAutores.map((autor, indice) => <TextField
                        id={`autor${indice}`}
                        key={indice}
                        label={`Nome do ${indice + 1}º autor`}
                        fullWidth
                        margin='normal'
                        value={autor}
                        onChange={(e) => this.atualizaAutor(e, indice)}
                    />)}
                    <Button
                        variant="contained"
                        color="default"
                        margin="normal"
                        startIcon={<PersonAddIcon />}
                        onClick={this.addAutor}
                    >
                        Adicionar outro autor
                    </Button>
                    <input
                        accept="image/*"
                        hidden
                        id="contained-button-file"
                        multiple
                        type="file"
                        onChange={this.atualizaArquivo}
                    />
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
                        startIcon={<SaveAltIcon />}
                    >
                        Cadastrar
                </Button>
                </form>
            </Container>
        )
    }
}

