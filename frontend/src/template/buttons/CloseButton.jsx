import { IconButton, Tooltip } from "@material-ui/core"
import CloseIcon from "@material-ui/icons/Close"

const style = {
     width: '35px',
     height: '35px',
 }

export default function CloseButton(props) {
     return (
          <Tooltip title="Fechar Tela" aria-label="editar">
               <IconButton color="secondary" size="small" style={style} onClick={(e) => props.closeScreen()}>
                    <CloseIcon />
               </IconButton>
          </Tooltip>
     )
}
