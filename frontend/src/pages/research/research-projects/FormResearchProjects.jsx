import { Component } from "react"
import { Typography, Container, TextField, Button, FormControl, Select, MenuItem, InputLabel } from "@material-ui/core"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import SaveAltIcon from "@material-ui/icons/SaveAlt"
import CloseIcon from "@material-ui/icons/Close"
import "./FormResearchProjects.css"
import { apiRequest } from "../../../services/request"
import Autenticacao from "../../../services/authentication"

export default class AddPublication extends Component {
     constructor(props) {
          super(props)
          this.state = { ...props.dados }
          this.addAutor = this.addAutor.bind(this)
          this.atualizaArquivo = this.atualizaArquivo.bind(this)
          this.atualizarCampo = this.atualizarCampo.bind(this)
          this.atualizarImagem = this.atualizarImagem.bind(this)
          this.enviarProjetoPesquisa = this.enviarProjetoPesquisa.bind(this)
          this.resetarDados = this.resetarDados.bind(this)
          this.atualizarCoordenacao = this.atualizarCoordenacao.bind(this)
     }

     resetarDados(e) {
          if (e !== undefined) {
               e.preventDefault()
          }
          this.props.fecharTelaCadastro()
     }

     atualizarCoordenacao(e) {
          let nomeCoordenador = ""
          if (e.target.value === true) {
               nomeCoordenador = Autenticacao.getNome()
          }
          this.setState({ [e.target.name]: e.target.value, nomeCoordenador })
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
          if (e.target.files[0] !== undefined) {
               this.setState({
                    nomeArquivo: e.target.files[0].name,
                    comprovante: e.target.files[0],
               })
          }
     }

     addAutor() {
          const autores = this.state.autores
          autores.push("")
          this.setState({ autores: autores })
     }

     enviarProjetoPesquisa(e) {
          console.log("=======ENVIAR PROJETO PESQUISA========")
          console.log(this.state)
          console.log(this.state.anoFim)
          e.preventDefault()
          let formData = new FormData()
          formData.append("_id", this.state._id)
          formData.append("titulo", this.state.titulo)
          formData.append("descricao", this.state.descricao)
          formData.append("edital", this.state.edital)
          formData.append("anoInicio", this.state.anoInicio)
          formData.append("anoFim", this.state.anoFim)
          formData.append("instituicao", this.state.instituicao)
          formData.append("fomento", this.state.fomento)
          formData.append("coordena", this.state.coordena)
          formData.append("agenciaFomento", this.state.agenciaFomento)
          formData.append("nomeCoordenador", this.state.nomeCoordenador)
          formData.append("comprovante", this.state.comprovante)

          const methodRequest = this.props.tipoEnvio === "Cadastrar" ? "post" : "put"
          const acao = this.props.tipoEnvio === "Cadastrar" ? "cadastrado" : "atualizado"
          alert(methodRequest)
          apiRequest({
               method: methodRequest,
               url: "/researchProjects",
               data: formData,
          })
               .then((resposta) => resposta.data)
               .then((resposta) => {
                    if (resposta.erros === undefined) {
                         alert(`${this.props.tipoCadastro} ${acao} com sucesso`)
                         this.resetarDados()
                         this.props.atualizarProjetosPesquisa()
                         this.props.fecharTelaCadastro()
                    } else {
                         let aviso = "Houve os seguinte erros: \n\n"
                         aviso += resposta.erros.reduce((acumulador, erro) => `${acumulador} ${erro.msg}\n`, "")
                         alert(aviso)
                    }
               })
               .catch((erro) => console.log(erro))
     }

     componentDidUpdate(prevProps) {
          console.log(this.props.dados)
          if (prevProps !== this.props) {
               this.setState({ ...this.props.dados })
          }
     }

     render() {
          return (
               <div className="screen-form">
                    <Container maxWidth="sm" className="screen-form-container">
                         <div className="screen-form-container-title-bar pt-2">
                              <Typography variant="h5" component="h3" className="ml-2">
                                   {this.props.tipoEnvio} {this.props.tipoCadastro}{" "}
                              </Typography>
                              <Button color="secondary" size="small" onClick={this.resetarDados}>
                                   <CloseIcon />
                              </Button>
                         </div>
                         <form>
                              <TextField name="_id" type="hidden" margin="normal" value={this.state._id} />
                              <TextField
                                   name="titulo"
                                   label="Título do Projeto"
                                   fullWidth
                                   margin="normal"
                                   value={this.state.titulo}
                                   onChange={this.atualizarCampo}
                              />
                              <TextField
                                   name="descricao"
                                   label="Descrição do Projeto"
                                   fullWidth
                                   multiline
                                   rowsMax={10}
                                   margin="normal"
                                   value={this.state.descricao}
                                   onChange={this.atualizarCampo}
                              />
                              <TextField
                                   name="edital"
                                   label="Edital"
                                   fullWidth
                                   margin="normal"
                                   value={this.state.edital}
                                   onChange={this.atualizarCampo}
                              />
                              <TextField
                                   name="instituicao"
                                   label="Instituição de Execução"
                                   fullWidth
                                   margin="normal"
                                   value={this.state.instituicao}
                                   onChange={this.atualizarCampo}
                              />
                              <div>
                                   <TextField
                                        name="anoInicio"
                                        label="Ano Inicial"
                                        margin="normal"
                                        type="number"
                                        value={this.state.anoInicio}
                                        onChange={this.atualizarCampo}
                                   />
                                   <TextField
                                        className="ml-3"
                                        name="anoFim"
                                        label="Ano Final"
                                        margin="normal"
                                        type="number"
                                        value={this.state.anoFim}
                                        onChange={this.atualizarCampo}
                                   />
                              </div>
                              <FormControl style={{ minWidth: 100 }}>
                                   <InputLabel>Fomento</InputLabel>
                                   <Select name="fomento" value={this.state.fomento} onChange={this.atualizarCampo}>
                                        <MenuItem value={false}>Não</MenuItem>
                                        <MenuItem value={true}>Sim</MenuItem>
                                   </Select>
                              </FormControl>
                              <TextField
                                   name="agenciaFomento"
                                   label="Agência de Fomento"
                                   fullWidth
                                   margin="normal"
                                   value={this.state.agenciaFomento}
                                   onChange={this.atualizarCampo}
                              />
                              <FormControl style={{ minWidth: 100 }}>
                                   <InputLabel>Coordena</InputLabel>
                                   <Select
                                        name="coordena"
                                        value={this.state.coordena}
                                        onChange={this.atualizarCoordenacao}
                                   >
                                        <MenuItem value={false}>Não</MenuItem>
                                        <MenuItem value={true}>Sim</MenuItem>
                                   </Select>
                              </FormControl>
                              <TextField
                                   name="nomeCoordenador"
                                   label="Nome do Coordenador"
                                   fullWidth
                                   margin="normal"
                                   value={this.state.nomeCoordenador}
                                   onChange={this.atualizarCampo}
                              />

                              <input
                                   id="comprovante-projeto-pesquisa"
                                   accept="application/pdf"
                                   hidden
                                   type="file"
                                   onChange={this.atualizaArquivo}
                              />
                              <div className="mt-4 mb-5">
                                   <label htmlFor="comprovante-projeto-pesquisa">
                                        <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                                             Adicionar Comprovante
                                        </Button>
                                   </label>
                                   <label className="ml-3">{this.state.nomeArquivo}</label>
                              </div>

                              <Button
                                   variant="contained"
                                   color="primary"
                                   className="mb-3"
                                   startIcon={<SaveAltIcon />}
                                   onClick={this.enviarProjetoPesquisa}
                              >
                                   {this.props.tipoEnvio}
                              </Button>
                         </form>
                    </Container>
               </div>
          )
     }
}
