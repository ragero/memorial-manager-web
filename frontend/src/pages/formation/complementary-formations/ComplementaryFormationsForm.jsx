import Form from "../../../template/Form"
import { TextField, Button, FormControl, InputLabel, Select, MenuItem } from "@material-ui/core"
import CloudUploadIcon from "@material-ui/icons/CloudUpload"
import SaveAltIcon from "@material-ui/icons/SaveAlt"
import { apiRequest } from "../../../services/request"
const idProof = "proof-academic-formation"

export default class ComplementaryFormationsForm extends Form {
     constructor(props) {
          super(props)
          this.state = { ...props.data }
          this.sendItem = this.sendItem.bind(this)
     }

     sendItem(e) {
          e.preventDefault()
          let formData = new FormData()
          formData.append("_id", this.state._id)
          formData.append("type", this.state.type)
          formData.append("course", this.state.course)
          formData.append("institution", this.state.institution)
          formData.append("workload", this.state.workload)
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
                         alert(`${this.props.itemType} ${acao}(a) com sucesso`)
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
                              <InputLabel>Tipo</InputLabel>
                              <Select name="type" value={this.state.type} onChange={this.updateField}>
                                   <MenuItem value={"Curso de Curta Duração"}>Curso de Curta Duração</MenuItem>
                                   <MenuItem value={"Extensão Universitária"}>Extensão Universitária</MenuItem>
                                   <MenuItem value={"MBA"}>MBA</MenuItem>
                                   <MenuItem value={"Outro"}>Outro</MenuItem>
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
                                   name="workload"
                                   label="Carga Horária"
                                   type="number"
                                   margin="normal"
                                   value={this.state.workload}
                                   onChange={this.updateField}
                              />
                              <TextField
                                   className="ml-3"
                                   name="yearEnd"
                                   label="Ano de Conclusão"
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
