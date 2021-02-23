import {useState, createRef, Fragment} from 'react'

import {Accordion, AccordionSummary, AccordionDetails, Box, Button, Typography} from '@material-ui/core'

import LayersIcon from '@material-ui/icons/Layers'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Content from '../../template/Content'
import RestrictedArea from '../../template/RestrictedArea'
import Autenticacao from '../../services/authentication'
import StdDialog from '../../template/StdDialog'

import FormProfessionalActivity from './prefessional-activities/ProfessionalActivities'
import './Formation.css'


export default function Formation(props) {

    const [displayDialog,setDisplayDialog] = useState('none')
    const refTexto = createRef()

    let content = undefined 
    if (!Autenticacao.isAuthenticade()) {
        content = <RestrictedArea/>
    }else{ 
        content = (
            <Fragment>
                <Box display={displayDialog}>
                    <StdDialog titulo="Código Latex dos itens de pesquisa" setDisplayDialog={setDisplayDialog}>
                        <textarea ref={refTexto} rows="25" className="itens-latex form-control">
                            Teste
                        </textarea>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className="mb-3"
                            onClick={
                                (e) => {
                                    refTexto.current.select()
                                    document.execCommand('copy')
                                }
                            }
                        >
                            <FileCopyIcon className="mr-2"/>Copiar para a área de trabalho
                        </Button>
                    </StdDialog>
                </Box>
                <div className="pesquisa-botoes">
                    <Button onClick={(e) => setDisplayDialog('block')}>
                        <FormatListNumberedIcon className="mr-3" />Gerar Latex dos Itens
                    </Button>
                    <Button>
                        <LibraryBooksIcon className="mr-3" />Gerar Caderno de Comprovantes
                    </Button>
                </div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h5" component="h3">Experiência Profissional</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <FormProfessionalActivity/>
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel2a-content"
                        id="panel2a-header"
                    >
                        <Typography variant="h5" component="h3">Formação Acadêmica</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        {/* <ResearchProjects /> */}
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3a-content"
                        id="panel3a-header"
                    >
                        <Typography variant="h5" component="h3">Formação Complementar</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        
                    </AccordionDetails>
                </Accordion>
            </Fragment>
        )
    }
    
    return (
        <Content titulo='Formação' subtitulo='Formações acadêmicas, complementares e atividades profissionais' icone={LayersIcon}>
            {content}
        </Content>
    )

}