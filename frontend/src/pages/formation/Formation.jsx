import {useState, Fragment} from 'react'

import {Accordion, AccordionSummary, AccordionDetails, Box, Typography} from '@material-ui/core'

import LayersIcon from '@material-ui/icons/Layers'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

import Content from '../../template/Content'
import RestrictedArea from '../../template/RestrictedArea'
import Autenticacao from '../../services/authentication'
import StdDialog from '../../template/StdDialog'
import {GenerateLatexButton, ProofsBookButton} from '../../template/buttons'

import ProfessionalActivities from './prefessional-activities/ProfessionalActivities'
import './Formation.css'



export default function Formation(props) {

    const [displayDialog,setDisplayDialog] = useState('none')
    

    const closeScreen = () => {
        setDisplayDialog('none')
    }

    const openScreen = () => {
        setDisplayDialog('block')
    }

    let content = undefined 
    if (!Autenticacao.isAuthenticade()) {
        content = <RestrictedArea/>
    }else{ 
        content = (
            <Fragment>
                <Box display={displayDialog}>
                    <StdDialog titulo="Código Latex dos itens de pesquisa" closeScreen={closeScreen}>
                        teste
                    </StdDialog>
                </Box>
                <div className="pesquisa-botoes">
                    <GenerateLatexButton openScreen={openScreen}/>
                    <ProofsBookButton />
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
                        <ProfessionalActivities/>
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