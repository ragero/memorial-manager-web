import { Button, Tooltip } from "@material-ui/core"
import PageviewIcon from "@material-ui/icons/Pageview"
import { baseURLFiles } from "../../services/request"

export default function ViewFileButton(props) {
     return (
          <Tooltip title="Visualizar Comprovate" aria-label="visualizar">
               <Button
                    color="primary"
                    disabled={!props.row.filePath}
                    target="_blank"
                    href={`${baseURLFiles}/${props.row.filePath}`}
               >
                    <PageviewIcon />
               </Button>
          </Tooltip>
     )
}
