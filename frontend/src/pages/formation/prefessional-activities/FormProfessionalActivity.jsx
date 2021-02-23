import { Component } from "react"
import { Typography, Container, TextField, Button} from "@material-ui/core"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import SaveAltIcon from "@material-ui/icons/SaveAlt"
import CloseIcon from "@material-ui/icons/Close"

import { apiRequest } from "../../../services/request"

const idProof = 'proof-atividade-profissional'

export default class FormProfessionalActivity extends Component {
     constructor(props) {
          super(props)
          this.state = { ...props.data }
          this.updateFile = this.updateFile.bind(this)
          this.updateField = this.updateField.bind(this)
          this.updateImage = this.updateImage.bind(this)
          this.sendItem = this.sendItem.bind(this)
          this.resetData = this.resetData.bind(this)
     }

     resetData(e) {
          if (e !== undefined) {
               e.preventDefault()
          }
          this.props.closeRegistrationScreen()
     }

     updateField(e) {
          this.setState({ [e.target.name]: e.target.value })
     }

     updateImage(e) {
          this.setState({ imagem: e.target.files[0] })
     }

     atualizaAutor(e, indice) {
          const autores = this.state.autores
          autores[indice] = e.target.value
          this.setState({ autores: autores })
     }

     updateFile(e) {
          if (e.target.files[0] !== undefined) {
               this.setState({
                    fileName: e.target.files[0].name,
                    proof: e.target.files[0],
               })
          }
     }


     sendItem(e) {
          console.log("=======ENVIAR EXPERIENCIA PROFISISONAL========")
          console.log(this.state)
          console.log(this.state.yearEnd)
          e.preventDefault()
          let formData = new FormData()
          formData.append("_id", this.state._id)
          formData.append("role", this.state.role)
          formData.append("institution", this.state.institution)
          formData.append("yearBegin", this.state.yearBegin)
          formData.append("yearEnd", this.state.yearEnd)
          formData.append("proof", this.state.proof)

          const methodRequest = this.props.sendType === "Cadastrar" ? "post" : "put"
          const acao = this.props.sendType === "Cadastrar" ? "cadastrado" : "atualizado"
          alert(methodRequest)
          apiRequest({
               method: methodRequest,
               url: this.props.route,
               data: formData,
          })
               .then((resposta) => resposta.data)
               .then((resposta) => {
                    if (resposta.erros === undefined) {
                         alert(`${this.props.itemType} ${acao} com sucesso`)
                         this.resetData()
                         this.props.updateItems()
                         this.props.closeRegistrationScreen()
                    } else {
                         let aviso = "Houve os seguinte erros: \n\n"
                         aviso += resposta.erros.reduce((acumulador, erro) => `${acumulador} ${erro.msg}\n`, "")
                         alert(aviso)
                    }
               })
               .catch((erro) => console.log(erro))
     }

     componentDidUpdate(prevProps) {
          console.log(this.props.data)
          if (prevProps !== this.props) {
               this.setState({ ...this.props.data })
          }
     }

     render() {
          return (
               <div className="screen-form">
                    <Container maxWidth="sm" className="screen-form-container">
                         <div className="screen-form-container-title-bar pt-2">
                              <Typography variant="h5" component="h3" className="ml-2">
                                   {this.props.sendType} {this.props.itemType}{" "}
                              </Typography>
                              <Button color="secondary" size="small" onClick={this.resetData}>
                                   <CloseIcon />
                              </Button>
                         </div>
                         <form>
                              <TextField name="_id" type="hidden" margin="normal" value={this.state._id} />
                              <TextField
                                   name="role"
                                   label="Descrição do role"
                                   fullWidth
                                   margin="normal"
                                   value={this.state.role}
                                   onChange={this.updateField}
                              />
                              <TextField
                                   name="institution"
                                   label="Instituição ou empresa"
                                   fullWidth
                                   margin="normal"
                                   value={this.state.institution}
                                   onChange={this.updateField}
                              />
                              <div>
                                   <TextField
                                        name="yearBegin"
                                        label="Ano Inicial"
                                        margin="normal"
                                        type="number"
                                        value={this.state.yearBegin}
                                        onChange={this.updateField}
                                   />
                                   <TextField
                                        className="ml-3"
                                        name="yearEnd"
                                        label="Ano Final"
                                        margin="normal"
                                        type="number"
                                        value={this.state.yearEnd}
                                        onChange={this.updateField}
                                   />
                              </div>
                              <input
                                   id={idProof}
                                   accept="application/pdf"
                                   hidden
                                   type="file"
                                   onChange={this.updateFile}
                              />
                              <div className="mt-4 mb-5">
                                   <label htmlFor={idProof}>
                                        <Button variant="contained" component="span" startIcon={<CloudUploadIcon />}>
                                             Adicionar Comprovante
                                        </Button>
                                   </label>
                                   <label className="ml-3">{this.state.fileName}</label>
                              </div>

                              <Button
                                   variant="contained"
                                   color="primary"
                                   className="mb-3"
                                   startIcon={<SaveAltIcon />}
                                   onClick={this.sendItem}
                              >
                                   {this.props.sendType}
                              </Button>
                         </form>
                    </Container>
               </div>
          )
     }
}
