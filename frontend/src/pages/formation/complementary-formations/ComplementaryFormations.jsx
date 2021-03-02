import ComplementaryFomationsForm from "./ComplementaryFormationsForm"
import StdItemPage from '../../../template/StdItemPage'

export default class ComplementaryFormations extends StdItemPage {
     constructor(props) {
          super(props)
          this.baseItem = 'formation'
          this.specificItem = 'complementaryFormations'
          this.initialStateItem = {
               _id: "",
               type: "",
               course: "",
               institution: "",
               workload: "",
               yearEnd: "",
               fileName: "",
               proof: "",
          }
          this.initialState = {
               displayForm: "none",
               items: [],
               currentItem: { ...this.initialStateItem },
               typeSend: "Cadastrar",
          }
          this.state = { ...this.initialState }
          this.itemType = 'Formação Complementar'
          this.route = "/formation/complementary_formations"
          this.buttonAddContent = 'Nova Formação Complementar'
          this.textNoData = 'Não há formações complementares cadastradas.'
          this.columns=[
               { id: "course", label: "Curso", minWidth: 100 },
               { id: "institution", label: "Instituição", minWidth: 100 },
               { id: "yearEnd", label: "Ano de Conclusão", minWidth: 30, align: "center" },
               { id: "acoes", label: "Ações", minWidth: 50, align: "center" },
          ]
          this.Form = ComplementaryFomationsForm
     }

     
}
