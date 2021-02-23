import { Component } from "react"
import path from "path"

import { Box, Button } from "@material-ui/core"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"

import FormProfessionalActivity from "./FormProfessionalActivity"
import { apiRequest } from "../../../services/request"
import TableData from "../../../template/TableData"

// import "./Publicacoes.css";

const route = "/formation/professional_activities"

const initialStateItem = {
     _id: "",
     role: "",
     institution: "",
     yearBegin: "",
     yearEnd: "",
     fileName: "",
     proof: "",
}

const initialState = {
     displayForm: "none",
     items: [],
     currentItem: { ...initialStateItem },
     typeSend: "Cadastrar",
}

export default class ProfessionalActivities extends Component {
     constructor(props) {
          super(props)
          this.state = { ...initialState }
          this.updateItems = this.updateItems.bind(this)
          this.closeRegistrationScreen = this.closeRegistrationScreen.bind(this)
          this.openRegistrationScreen = this.openRegistrationScreen.bind(this)
          this.updateCurrentItem = this.updateCurrentItem.bind(this)
          this.updateSendType = this.updateSendType.bind(this)
     }

     updateItems() {
          apiRequest
               .get("/formation/professional_activities")
               .then((response) => {
                    return response.data
               })
               .then((response) => {
                    let listItems = response.map((item) => item["formation"]["professionalActivities"])
                    this.setState({ items: listItems })
               })
               .catch((erro) => {
                    console.log(erro)
               })
     }

     updateSendType(sendType) {
          this.setState({ sendType })
     }

     openRegistrationScreen() {
          this.setState({ displayForm: "block" })
     }

     closeRegistrationScreen() {
          this.setState({ displayForm: "none" })
     }

     componentDidMount() {
          this.updateItems()
     }

     updateCurrentItem(currentItem) {
          currentItem["fileName"] = path.basename(currentItem.filePath)
          this.setState({ currentItem })
     }

     render() {
          return (
               <div className="item-memorial">
                    <div className="item-memorial-buttons">
                         <Button
                              variant="contained"
                              onClick={(e) => {
                                   this.setState({
                                        sendType: "Cadastrar",
                                        displayForm: "block",
                                        currentItem: {
                                             ...initialStateItem,
                                        },
                                   })
                              }}
                         >
                              <AddCircleOutlineIcon className="mr-3" /> Adicionar Nova Experiência Profissional
                         </Button>
                    </div>
                    <hr />
                    {this.state.items.length === 0 ? (
                         "Não há experiências profissionais cadastradas."
                    ) : (
                         <TableData
                              data={this.state.items}
                              updateSendType={this.updateSendType}
                              updateItems={this.updateItems}
                              openRegistrationScreen={this.openRegistrationScreen}
                              updateCurrentItem={this.updateCurrentItem}
                              route={route}
                              columns={[
                                   { id: "role", label: "Função", minWidth: 50 },
                                   { id: "institution", label: "Instituição", minWidth: 150 },
                                   { id: "yearBegin", label: "Ano de Início", minWidth: 50, align: "center" },
                                   { id: "acoes", label: "Ações", minWidth: 50, align: "center" },
                              ]}
                         ></TableData>
                    )}
                    <Box display={this.state.displayForm}>
                         <FormProfessionalActivity
                              sendType={this.state.sendType}
                              itemType="Atividade Profissional"
                              data={this.state.currentItem}
                              closeRegistrationScreen={this.closeRegistrationScreen}
                              updateItems={this.updateItems}
                              route={route}
                         />
                    </Box>
               </div>
          )
     }
}