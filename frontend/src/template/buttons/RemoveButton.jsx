import { Button, Tooltip } from "@material-ui/core"
import DeleteForeverIcon from "@material-ui/icons/DeleteForever"

export default function RemoveButton(props) {
     return (
          <Tooltip title="Remover" aria-label="remover">
               <Button
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
               </Button>
          </Tooltip>
     )
}
