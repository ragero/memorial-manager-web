import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import PageviewIcon from '@material-ui/icons/Pageview'
import Tooltip from '@material-ui/core/Tooltip'
import { apiRequest, baseURLFiles } from '../../services/request'


const columns = [
    { id: 'titulo', label: 'Título', minWidth: 250 },
    { id: 'tipo', label: 'Tipo', minWidth: 50 },
    {
        id: 'anoPublicacao',
        label: 'Ano',
        minWidth: 50,
        align: 'center',
    },
    {
        id: 'qualis',
        label: 'Qualis',
        minWidth: 50,
        align: 'center',
    },
    {
        id: 'acoes',
        label: 'Ações',
        minWidth: 50,
        align: 'center',
    }
];



const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function remover(id, atualizaPublicacoes) {
    apiRequest.delete(`/publications/${id}`)
        .then(resposta => resposta.data)
        .then(resposta => {
            console.log(resposta.result)
            if (resposta.result.nModified === 1) {
                alert("Publicacao deletada")
                atualizaPublicacoes()
            } else {
                alert("Não foi possível realizar a deleção")
            }

        })
        .catch(erro => console.log(erro))

}

export default function TablePublications(props) {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
        

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    console.log('props==========')
    console.log(props.atualizaPublicacoes)

    return (
        <React.Fragment>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{ minWidth: column.minWidth }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {props.dados.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                console.log('===========ROWWWW=========')
                                console.log(row)
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];

                                            if (column.id === 'acoes') {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Tooltip title="Editar" aria-label="editar">
                                                            <Button onClick={(e) => {
                                                                props.atualizarTipoEnvio('Atualizar')
                                                                props.atualizarPublicacaoCorrente(row)
                                                                props.abrirTelaCadastro()
                                                            }}><EditIcon/></Button>
                                                        </Tooltip>
                                                        <Tooltip title="Remover" aria-label="remover">
                                                            <Button color='secondary'><DeleteForeverIcon onClick={(e) => remover(row._id, props.atualizaPublicacoes)} /></Button>
                                                        </Tooltip>
                                                        <Tooltip title="Visualizar Comprovate" aria-label="visualizar">

                                                            <Button color='primary' disabled={!row.pathArquivo} target="_blank" href={`${baseURLFiles}/${row.pathArquivo}`}><PageviewIcon /></Button>
                                                        </Tooltip>
                                                    </TableCell>
                                                )
                                            } else {
                                                return (<TableCell key={column.id} align={column.align}>
                                                    {column.format && typeof value === 'number' ? column.format(value) : value}
                                                </TableCell>)
                                            }


                                        })}
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    labelRowsPerPage={"Entradas por página"}
                    component="div"
                    count={props.dados.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </React.Fragment>
    );
}
