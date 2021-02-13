import Box from "@material-ui/core/Box"
import { Component } from "react"
import FormResearchProjects from "./FormResearchProjects"
import Button from "@material-ui/core/Button"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"
import "./ResearchProjects.css"
import { apiRequest } from "../../../services/request"
import TableData from "../../../template/TableData"
import path from "path"

const initialStateResearchProject = {
     _id: "",
     titulo: "",
     descricao: "",
     edital: "",
     anoInicio: "",
     anoFim: "",
     instituicao: "",
     fomento: false,
     agenciaFomento: "",
     coordena: false,
     nomeCoordenador: "",
     nomeArquivo: "",
     comprovante: "",
}

const initialState = {
     displayForm: "none",
     publicacoes: [],
     currentResearchProject: { ...initialStateResearchProject },
     tipoEnvio: "Cadastrar",
}

export default class Publicacoes extends Component {
     constructor(props) {
          super(props)
          this.state = { ...initialState }
          this.atualizarProjetosPesquisa = this.atualizarProjetosPesquisa.bind(this)
          this.fecharTelaCadastro = this.fecharTelaCadastro.bind(this)
          this.abrirTelaCadastro = this.abrirTelaCadastro.bind(this)
          this.atualizarProjetoPesquisaCorrente = this.atualizarProjetoPesquisaCorrente.bind(this)
          this.atualizarTipoEnvio = this.atualizarTipoEnvio.bind(this)
     }

     atualizarProjetosPesquisa() {
          apiRequest
               .get("/researchProjects")
               .then((resposta) => {
                    console.log('atualizando projetos de pesquisa')
                    console.log(resposta.data)
                    return resposta.data
               })
               .then((resposta) => {
                    let listaProjetosPesquisa = resposta.map((entrada) => entrada.projetosPesquisa)
                    console.log('=========lista de projetos de pesquisa========')
                    console.log(listaProjetosPesquisa)
                    console.log(listaProjetosPesquisa.length)
                    this.setState({
                         listaProjetosPesquisa: listaProjetosPesquisa,
                    })
               })
               .catch((erro) => {
                    console.log(erro)
               })
     }

     atualizarTipoEnvio(tipoEnvio) {
          this.setState({ tipoEnvio })
     }

     abrirTelaCadastro() {
          this.setState({ displayForm: "block" })
     }

     fecharTelaCadastro() {
          this.setState({ displayForm: "none" })
     }

     componentDidMount() {
          this.atualizarProjetosPesquisa()
          console.log(this.state.projetosPesquisa)
     }

     atualizarProjetoPesquisaCorrente(currentProject) {
          currentProject["nomeArquivo"] = path.basename(currentProject.pathArquivo)
          this.setState({ currentResearchProject: currentProject })
     }

     render() {
          return (
               <div className="publicacoes">
                    <div className="publicacoes-botoes">
                         <Button
                              variant="contained"
                              onClick={(e) => {
                                   this.setState({
                                        tipoEnvio: "Cadastrar",
                                        displayForm: "block",
                                        currentResearchProject: {
                                             ...initialStateResearchProject,
                                        },
                                   })
                              }}
                         >
                              <AddCircleOutlineIcon className="mr-3" /> Adicionar Novo Projeto
                         </Button>
                    </div>
                    <hr />
                    {(this.state.listaProjetosPesquisa === undefined) || (this.state.listaProjetosPesquisa.length) === 0 ? (
                         "Não há publicações cadastradas"
                    ) : (
                         <TableData
                              dados={this.state.listaProjetosPesquisa}
                              atualizarTipoEnvio={this.atualizarTipoEnvio}
                              atualizarDados={this.atualizarProjetosPesquisa}
                              abrirTelaCadastro={this.abrirTelaCadastro}
                              atualizarItemCorrente={this.atualizarProjetoPesquisaCorrente}
                              route="/researchProjects"
                              columns={[
                                   {
                                        id: "titulo",
                                        label: "Título",
                                        minWidth: 250,
                                   },
                                   {
                                        id: "anoInicio",
                                        label: "Início",
                                        minWidth: 50,
                                        align: "center",
                                   },
                                   {
                                        id: "anoFim",
                                        label: "Fim",
                                        minWidth: 50,
                                        align: "center",
                                   },
                                   {
                                        id: "nomeCoordenador",
                                        label: "Coordenador",
                                        minWidth: 50,
                                        align: "center",
                                   },
                                   {
                                        id: "acoes",
                                        label: "Ações",
                                        minWidth: 50,
                                        align: "center",
                                   },
                              ]}
                         ></TableData>
                    )}
                    <Box display={this.state.displayForm}>
                         <FormResearchProjects
                              tipoEnvio={this.state.tipoEnvio}
                              tipoCadastro="Projeto de Pesquisa"
                              dados={this.state.currentResearchProject}
                              fecharTelaCadastro={this.fecharTelaCadastro}
                              atualizarProjetosPesquisa={this.atualizarProjetosPesquisa}
                         />
                    </Box>
               </div>
          )
     }
}
