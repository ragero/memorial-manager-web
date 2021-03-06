import Box from "@material-ui/core/Box";
import { Component } from "react";
import FormPublication from "./FormPublication";
import Button from "@material-ui/core/Button";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import "./Publicacoes.css";
import { apiRequest } from "../../../services/request";
import TableData from "../../../template/TableData";
import path from "path";

const initialStatePublication = {
  _id: "",
  titulo: "",
  tipo: "Periódico",
  local: "",
  autores: [""],
  fileName: "",
  qualis: "A1",
  paginaInicial: "",
  paginaFinal: "",
  anoPublicacao: "",
  proof: "",
};

const initialState = {
  displayForm: "none",
  publicacoes: [],
  currentPublication: { ...initialStatePublication },
  tipoEnvio: "Cadastrar",
};

export default class Publicacoes extends Component {
  constructor(props) {
    super(props);
    this.state = { ...initialState };
    this.atualizaPublicacoes = this.atualizaPublicacoes.bind(this);
    this.fecharTelaCadastro = this.fecharTelaCadastro.bind(this);
    this.abrirTelaCadastro = this.abrirTelaCadastro.bind(this);
    this.atualizarPublicacaoCorrente = this.atualizarPublicacaoCorrente.bind(
      this
    );
    this.atualizarTipoEnvio = this.atualizarTipoEnvio.bind(this);
  }

  atualizaPublicacoes() {
    apiRequest
      .get("/publications")
      .then((resposta) => {
        return resposta.data;
      })
      .then((resposta) => {
        let listaPublicacoes = resposta.map((entrada) => entrada.publicacoes);
        this.setState({ publicacoes: listaPublicacoes });
      })
      .catch((erro) => {
        console.log(erro);
      });
  }

  atualizarTipoEnvio(tipoEnvio) {
    this.setState({ tipoEnvio });
  }

  abrirTelaCadastro() {
    this.setState({ displayForm: "block" });
  }

  fecharTelaCadastro() {
    this.setState({ displayForm: "none" });
  }

  componentDidMount() {
    this.atualizaPublicacoes();
  }

  atualizarPublicacaoCorrente(currentPublication) {
    console.log("Atualizando publicaçãoCorrente!!!!");
    currentPublication["fileName"] = path.basename(
      currentPublication.filePath
    );
    this.setState({ currentPublication });
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
                currentPublication: {
                  ...initialStatePublication,
                  autores: [""],
                },
              });
            }}
          >
            <AddCircleOutlineIcon className="mr-3" /> Adicionar Nova Publicação
          </Button>
        </div>
        <hr />
        {this.state.publicacoes.length === 0 ? (
          "Não há publicações cadastradas"
        ) : (
          <TableData
            dados={this.state.publicacoes}
            atualizarTipoEnvio={this.atualizarTipoEnvio}
            atualizarDados={this.atualizaPublicacoes}
            abrirTelaCadastro={this.abrirTelaCadastro}
            atualizarItemCorrente={this.atualizarPublicacaoCorrente}
            route="/publications"
            columns={
              [{ id: "titulo", label: "Título", minWidth: 250 },
              { id: "tipo", label: "Tipo", minWidth: 50 },
              {
                id: "anoPublicacao",
                label: "Ano",
                minWidth: 50,
                align: "center",
              },
              {
                id: "qualis",
                label: "Qualis",
                minWidth: 50,
                align: "center",
              },
              {
                id: "acoes",
                label: "Ações",
                minWidth: 50,
                align: "center",
              }]
            }
          ></TableData>
        )}
        <Box display={this.state.displayForm}>
          <FormPublication
            tipoEnvio={this.state.tipoEnvio}
            tipoCadastro="Publicação"
            dados={this.state.currentPublication}
            fecharTelaCadastro={this.fecharTelaCadastro}
            atualizaPublicacoes={this.atualizaPublicacoes}
          />
        </Box>
      </div>
    );
  }
}
