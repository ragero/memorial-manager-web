import { Button } from "@material-ui/core"
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline"

export default function AddNewItemButton(props) {
     return (
          <Button
               variant="contained"
               onClick={(e) => {
                    props.resetState()
                    props.updateSendType("Cadastrar")
                    props.openRegistrationScreen()
               }}
          >
               <AddCircleOutlineIcon className="mr-3" /> {props.children}
          </Button>
     )
}
