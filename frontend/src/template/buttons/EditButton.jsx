import { Button, Tooltip } from "@material-ui/core"
import EditIcon from "@material-ui/icons/Edit"

export default function EditButton(props) {
     return (
          <Tooltip title="Editar" aria-label="editar">
               <Button
                    onClick={(e) => {
                         props.updateSendType("Atualizar")
                         props.updateCurrentItem(props.row)
                         props.openRegistrationScreen()
                    }}
               >
                    <EditIcon />
               </Button>
          </Tooltip>
     )
}
