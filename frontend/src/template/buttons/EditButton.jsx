import { IconButton, Tooltip } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"

const style = {
     width: '35px',
     height: '35px',
     color: '#9C640C'
 }

export default function EditButton(props) {
     return (
          <Tooltip title="Editar" aria-label="editar">
               <IconButton
                    style={style}
                    onClick={(e) => {
                         props.updateSendType("Atualizar")
                         props.updateCurrentItem(props.row)
                         props.openRegistrationScreen()
                    }}
               >
                    <EditIcon />
               </IconButton>
          </Tooltip>
     )
}
