import Form from "../../../template/Form"
import {TextField, Button, MenuItem, FormControl, InputLabel, Select} from "@material-ui/core"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import SaveAltIcon from "@material-ui/icons/SaveAlt"
import { apiRequest } from "../../../services/request"
const idProof = 'proof-academic-formations'

export default class AcademicFormationsForm extends Form {
     constructor(props) {
          super(props)
          this.state = { ...props.data }
          this.sendItem = this.sendItem.bind(this)
     }

     sendItem(e) {
          e.preventDefault()
          let formData = new FormData()
          formData.append("_id", this.state._id)
          formData.append("degree", this.state.degree)
          formData.append("course", this.state.course)
          formData.append("institution", this.state.institution)
          formData.append("yearBegin", this.state.yearBegin)
          if (this.state.yearEnd !== ''){
               formData.append("yearEnd", this.state.yearEnd)
          }
          console.log(this.state)
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

     render() {
          return (
               <Form
                    sendType={this.props.sendType}
                    itemType={this.props.itemType}
                    data={this.props.data}
                    closeRegistrationScreen={this.props.closeRegistrationScreen}
                    updateItems={this.props.updateItems}
               >
                    <form>
                         <TextField name="_id" type="hidden" margin="normal" value={this.state._id} />
                         <FormControl style={{ minWidth: 100 }}>
                              <InputLabel>Titulação</InputLabel>
                              <Select name="degree" value={this.state.degree} onChange={this.updateField}>
                                   <MenuItem value={'Doutor'}>Doutor</MenuItem>
                                   <MenuItem value={'Mestre'}>Mestre</MenuItem>
                                   <MenuItem value={'Graduado'}>Graduado</MenuItem>
                                   <MenuItem value={'Técnico'}>Técnico</MenuItem>
                                   <MenuItem value={'Técnólogo'}>Técnólogo</MenuItem>
                              </Select>
                         </FormControl>
                         <TextField
                              name="course"
                              label="Curso"
                              fullWidth
                              margin="normal"
                              value={this.state.course}
                              onChange={this.updateField}
                         />
                         <TextField
                              name="institution"
                              label="Instituição"
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
                         <input id={idProof} accept="application/pdf" hidden type="file" onChange={this.updateFile} />
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
               </Form>
          )
     }
}
