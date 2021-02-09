import Content from '../../template/Content'
import DescriptionIcon from '@material-ui/icons/Description'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Publicacoes from './Publicacoes'
import Autenticacao from '../../services/authentication'





export default function Pesquisa(props) {
    
        if(!Autenticacao.isAuthenticade()){
            return(
                <Content titulo='Pesquisa' subtitulo='Publicações, projetos e grupos de pesquisa' icone={DescriptionIcon}>
                    <p>Área restrita</p>
                    <p>Loge-se no sistema para acessar esta opção</p>
                </Content>
            )
            
        }else{
            return (
                <Content titulo='Pesquisa' subtitulo='Publicações, projetos e grupos de pesquisa' icone={DescriptionIcon}>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                >
                    <Typography variant="h5" component="h3">Publicações</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Publicacoes/>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel2a-content"
                    id="panel2a-header"
                >
                    <Typography variant="h5" component="h3">Projetos</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel3a-content"
                    id="panel3a-header"
                >
                    <Typography variant="h5" component="h3">Grupos de pesquisa</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel4a-content"
                    id="panel4a-header"
                >
                    <Typography variant="h5" component="h3">Pareceres</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                        sit amet blandit leo lobortis eget.
                    </Typography>
                </AccordionDetails>
            </Accordion>
        </Content>
            )
        }
        
    
}