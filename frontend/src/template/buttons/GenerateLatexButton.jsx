import { Button} from "@material-ui/core"
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'

export default function GenerateLatexButton(props) {
     return (
          <Button onClick={props.openScreen}>
               <FormatListNumberedIcon className="mr-3" />
               Gerar Latex dos Itens
          </Button>
     )
}
