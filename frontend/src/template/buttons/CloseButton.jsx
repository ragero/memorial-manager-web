import { Button, Tooltip } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

export default function CloseButton(props) {
     return (
          <Tooltip title="Fechar Tela" aria-label="editar">
               <Button color="secondary" size="small" onClick={(e) => props.closeScreen()}>
                    <CloseIcon />
               </Button>
          </Tooltip>
     )
}
