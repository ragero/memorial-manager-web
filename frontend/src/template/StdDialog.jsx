import { createRef } from "react"
import { Button, Container, Typography } from "@material-ui/core"
import FileCopyIcon from "@material-ui/icons/FileCopy"
import CloseButton from "./buttons/CloseButton"
import "./StdDialog.css"

function StdDialog(props) {
     const refTexto = createRef()

     return (
          <div className="screen-dialog">
               <Container maxWidth="sm" className="screen-dialog-container">
                    <div className="screen-dialog-container-title-bar pt-2">
                         <Typography variant="h5" component="h3" className="ml-2">
                              {props.titulo}{" "}
                         </Typography>
                         <CloseButton closeScreen={props.closeScreen} />
                    </div>
                    <textarea ref={refTexto} rows="25" className="itens-latex form-control">
                         {props.children}
                    </textarea>
                    <Button
                         variant="contained"
                         color="primary"
                         className="mb-3"
                         onClick={(e) => {
                              refTexto.current.select()
                              document.execCommand("copy")
                         }}
                    >
                         <FileCopyIcon className="mr-2" />
                         Copiar para a área de trabalho
                    </Button>
               </Container>
          </div>
     )
}

export default StdDialog
