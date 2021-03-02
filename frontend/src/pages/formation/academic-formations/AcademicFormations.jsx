import AcademicFormationsForm from "./AcademicFormationsForm"
import StdItemPage from '../../../template/StdItemPage'

export default class AcademicFormations extends StdItemPage {
     constructor(props) {
          super(props)
          this.baseItem = 'formation'
          this.specificItem = 'academicFormations'
          this.initialStateItem = {
               _id: "",
               degree: "",
               course: "",
               institution: "",
               yearBegin: "",
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
          this.itemType = 'Formação Acadêmica'
          this.route = "/formation/academic_formations"
          this.buttonAddContent = 'Nova Formação Acadêmica'
          this.textNoData = 'Não há formações acadêmicas cadastratas.'
          this.columns=[
               { id: "degree", label: "Função", minWidth: 50 },
               { id: "institution", label: "Instituição", minWidth: 150 },
               { id: "yearEnd", label: "Ano de Conclusão", minWidth: 30, align: "center" },
               { id: "acoes", label: "Ações", minWidth: 50, align: "center" },
          ]
          this.Form = AcademicFormationsForm
     }

     
}
