import { IconButton, Tooltip } from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"

const style = {
     width: '35px',
     height: '35px',
 }

export default function RemoveButton(props) {
     return (
          <Tooltip title="Remover" aria-label="remover">
               <IconButton
                    style={style}
                    color="secondary"
                    onClick={(e) => {
                         const resp = window.confirm("Deseja realmente remover este item?")
                         if (resp === true) {
                              props.remove(props.row._id, props.route)
                              props.updateItems()
                         }
                    }}
               >
                    <DeleteForeverIcon />
               </IconButton>
          </Tooltip>
     )
}
