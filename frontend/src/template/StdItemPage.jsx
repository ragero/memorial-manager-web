import { Component } from "react"
import path from "path"

import { Box } from "@material-ui/core"

// import ProfessionalActivitiesForm from "./ProfessionalActivitiesForm"

import { apiRequest } from "../services/request"
import TableData from "../template/TableData"
import {AddNewItemButton} from '../template/buttons'
// import { runInThisContext } from "vm"

export default class ProfessionalActivities extends Component {
     constructor(props) {
          super(props)
          this.updateItems = this.updateItems.bind(this)
          this.closeRegistrationScreen = this.closeRegistrationScreen.bind(this)
          this.openRegistrationScreen = this.openRegistrationScreen.bind(this)
          this.updateCurrentItem = this.updateCurrentItem.bind(this)
          this.updateSendType = this.updateSendType.bind(this)
          this.resetState = this.resetState.bind(this)
     }

     updateItems() {
          
          apiRequest
               .get(this.route)
               .then((response) => {
                    return response.data
               })
               .then((response) => {
                    console.log('==========================================================')
                    console.log('BaseItem:', this.baseItem)
                    console.log('SpecificItem:', this.specificItem)
                    let listItems = response.map((item) => item[this.baseItem][this.specificItem])
                    this.setState({ items: listItems })
                    console.log(listItems)
                    alert('Aqui o update')
               })
               .catch((erro) => {
                    console.log(erro)
               })
     }

     resetState() {
          this.setState({
               currentItem: {
                    ...this.initialStateItem,
               },
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
                         <AddNewItemButton
                              resetState = {this.resetState}
                              updateSendType = {this.updateSendType}
                              openRegistrationScreen = {this.openRegistrationScreen}
                         >
                              {`Adicionar ${this.buttonAddContent}`}
                         </AddNewItemButton>
                    </div>
                    <hr />
                    {this.state.items === undefined || this.state.items.length === 0 ? (
                         this.textNoData
                    ) : (
                         <TableData
                              data={this.state.items}
                              updateSendType={this.updateSendType}
                              updateItems={this.updateItems}
                              openRegistrationScreen={this.openRegistrationScreen}
                              updateCurrentItem={this.updateCurrentItem}
                              route={this.route}
                              columns={this.columns}
                         ></TableData>
                    )}
                    <Box display={this.state.displayForm}>
                         <this.Form
                              sendType={this.state.sendType}
                              itemType={this.itemType}
                              data={this.state.currentItem}
                              closeRegistrationScreen={this.closeRegistrationScreen}
                              updateItems={this.updateItems}
                              route={this.route}
                         />
                    </Box>
               </div>
          )
     }
}
