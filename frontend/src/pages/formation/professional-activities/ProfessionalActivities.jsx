import ProfessionalActivitiesForm from "./ProfessionalActivitiesForm"
import StdItemPage from '../../../template/StdItemPage'

export default class ProfessionalActivities extends StdItemPage {
     constructor(props) {
          super(props)
          this.baseItem = 'formation'
          this.specificItem = 'professionalActivities'
          this.initialStateItem = {
               _id: "",
               role: "",
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
          this.itemType = 'Atividade Profissional'
          this.route = "/formation/professional_activities"
          this.buttonAddContent = 'Nova Experiência Profissional'
          this.textNoData = 'Não há experiências profissionais cadastradas.'
          this.columns=[
               { id: "role", label: "Função", minWidth: 50 },
               { id: "institution", label: "Instituição", minWidth: 150 },
               { id: "yearBegin", label: "Ano de Início", minWidth: 30, align: "center" },
               { id: "acoes", label: "Ações", minWidth: 50, align: "center" },
          ]
          this.Form = ProfessionalActivitiesForm
     }

     
}
