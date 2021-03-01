import { Component } from "react"
import { Typography, Container} from "@material-ui/core"
import {CloseButton} from './buttons'



export default class Form extends Component {
     constructor(props) {
          super(props)
          this.state = props.data
          this.updateFile = this.updateFile.bind(this)
          this.updateField = this.updateField.bind(this)
          this.updateImage = this.updateImage.bind(this)
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

     componentDidUpdate(prevProps) {
          console.log(this.props.data)
          if (prevProps !== this.props) {
               this.setState({ ...this.props.data })
          }
     }

     render() {
          return (
               <div className="screen-form">
                    <Container maxWidth="sm" className="screen-form-container shadow-sm">
                         <div className="screen-form-container-title-bar pt-2">
                              <Typography variant="h5" component="h3" className="ml-1">
                                   {this.props.sendType} {this.props.itemType}{" "}
                              </Typography>
                              <CloseButton  
                                   closeScreen  = {this.props.closeRegistrationScreen}
                              />     

                         </div>
                         {this.props.children}
                    </Container>
               </div>
          )
     }
}
