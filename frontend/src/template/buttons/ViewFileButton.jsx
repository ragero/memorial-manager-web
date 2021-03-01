import { IconButton, Tooltip } from "@material-ui/core"
import PageviewIcon from "@material-ui/icons/Pageview"
import { baseURLFiles } from "../../services/request"

const style = {
     width: '35px',
     height: '35px',
 }

export default function ViewFileButton(props) {
     return (
          <Tooltip title="Visualizar Comprovate" aria-label="visualizar">
               
               <IconButton
                    style={style}
                    color="primary"
                    disabled={!props.row.filePath}
                    target="_blank"
                    href={`${baseURLFiles}/${props.row.filePath}`}
               >
                    <PageviewIcon />
               </IconButton>
          </Tooltip>
     )
}
