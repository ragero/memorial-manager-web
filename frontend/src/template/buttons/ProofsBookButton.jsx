import { Button } from "@material-ui/core"
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';

export default function ProofsBookButton(props) {
     return (
          <Button onClick={props.openScreen}>
              <LibraryBooksIcon className="mr-3" />Gerar Caderno de Comprovantes
          </Button>
     )
}
