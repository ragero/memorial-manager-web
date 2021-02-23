import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, 
        TableRow, Button, Tooltip} from '@material-ui/core'
import EditIcon from '@material-ui/icons/Edit'
import DeleteForeverIcon from '@material-ui/icons/DeleteForever'
import PageviewIcon from '@material-ui/icons/Pageview'

import { apiRequest, baseURLFiles } from '../services/request'

const entriesPerPageDescription = 'Entradas por página'
const rowsPerPageValues = [5,10,50,100]

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

function remove(id, updateItems, route) {
    apiRequest.delete(`${route}/${id}`)
        .then(resposta => resposta.data)
        .then(resposta => {
            console.log(resposta.result)
            if (resposta.result.nModified === 1) {
                alert("Publicacao deletada")
                updateItems()
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
    const columns = props.columns    

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    
    console.log(props.columns)
    console.log(props.data)
    return (
        <React.Fragment>
            <Paper className={classes.root}>
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {props.columns.map((column) => (
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
                            {props.data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                return (
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];

                                            if (column.id === 'acoes') {
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        <Tooltip title="Editar" aria-label="editar">
                                                            <Button onClick={(e) => {
                                                                props.updateSendType('Atualizar')
                                                                props.updateCurrentItem(row)
                                                                props.openRegistrationScreen()
                                                            }}><EditIcon/></Button>
                                                        </Tooltip>
                                                        <Tooltip title="Remover" aria-label="remover">
                                                            <Button color='secondary'>
                                                                <DeleteForeverIcon 
                                                                    onClick={(e) => {
                                                                        const resp = window.confirm('Deseja realmente remover este item?')
                                                                        if (resp === true){
                                                                            remove(row._id, props.updateItems, props.route)
                                                                        }
                                                                    } }/>
                                                                </Button>
                                                        </Tooltip>
                                                        <Tooltip title="Visualizar Comprovate" aria-label="visualizar">
                                                            <Button color='primary' disabled={!row.filePath} target="_blank" href={`${baseURLFiles}/${row.filePath}`}><PageviewIcon /></Button>
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
                    rowsPerPageOptions={rowsPerPageValues}
                    labelRowsPerPage={entriesPerPageDescription}
                    component="div"
                    count={props.data.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </React.Fragment>
    );
}
