import { Typography, Container, Button} from '@material-ui/core'
import CloseIcon from '@material-ui/icons/Close'
import './StdDialog.css'

function StdDialog(props) {
    return (
        <div className="screen-dialog">
            <Container maxWidth="sm" className="screen-dialog-container" >
                <div className="screen-dialog-container-title-bar pt-2">
                    <Typography variant="h5" component="h3" className='ml-2'>{props.titulo} </Typography>
                    <Button color='secondary' size='small' onClick={(e) => props.setDisplayDialog('none')}><CloseIcon /></Button>
                </div>
                {props.children}
            </Container>
        </div>
    )
}

export default StdDialog
    
    