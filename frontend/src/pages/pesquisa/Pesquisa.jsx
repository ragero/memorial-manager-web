import {useState, createRef} from 'react'
import Content from '../../template/Content'
import DescriptionIcon from '@material-ui/icons/Description'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Publicacoes from './Publicacoes'
import Autenticacao from '../../services/authentication'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import StdDialog from '../../template/StdDialog'
import FileCopyIcon from '@material-ui/icons/FileCopy';
import './Pesquisa.css'


export default function Pesquisa(props) {

    const [displayDialog,setDisplayDialog] = useState('none')
    const refTexto = createRef()

    if (!Autenticacao.isAuthenticade()) {
        return (
            <Content titulo='Pesquisa' subtitulo='Publicações, projetos e grupos de pesquisa' icone={DescriptionIcon}>
                <p>Área restrita</p>
                <p>Loge-se no sistema para acessar esta opção</p>
            </Content>
        )

    } else {
        return (
            <Content titulo='Pesquisa' subtitulo='Publicações, projetos e grupos de pesquisa' icone={DescriptionIcon}>
                <Box display={displayDialog}>
                    <StdDialog titulo="Código Latex dos itens de pesquisa" setDisplayDialog={setDisplayDialog}>
                        <textarea ref={refTexto} rows="25" className="itens-latex form-control">
                            dfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsa
                            dfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsadfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsadfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsadfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsadfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsadfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsadfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsadfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsadfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsadfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsadfajdajkfa
                            f dasjfakldfa
                            fdakjfdajklfjdaksf
                            asfdaklfdjaklfsjkdaf
                            daskfjasjkdlfajskldf
                            asfjaksfdjkalsfjkads
                            fdajkfdlajfkldajfkdas
                            fdakjfdajklfjdaksffdajkldfjkal
                            fdajklfdjakldsfjka
                            adfjklafjdkladsa
                        </textarea>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className="mb-3"
                            onClick={
                                (e) => {
                                    console.log(refTexto)
                                    alert('aqui')
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
                        <LibraryBooksIcon className="mr-3" />Gerar Caderno de comprovantes
                    </Button>
                </div>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography variant="h5" component="h3">Publicações</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Publicacoes />
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