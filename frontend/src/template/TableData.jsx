import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import {
     Paper,
     Table,
     TableBody,
     TableCell,
     TableContainer,
     TableHead,
     TablePagination,
     TableRow,
} from "@material-ui/core"

import { EditButton, RemoveButton, ViewFileButton } from "./buttons"

import { apiRequest } from "../services/request"

const entriesPerPageDescription = "Entradas por página"
const rowsPerPageValues = [5, 10, 50, 100]

const useStyles = makeStyles({
     root: {
          width: "100%",
     },
     container: {
          maxHeight: 440,
     },
})

function remove(id, route) {
     apiRequest
          .delete(`${route}/${id}`)
          .then((resposta) => resposta.data)
          .then((resposta) => {
               console.log(resposta.result)
               if (resposta.result.nModified === 1) {
                    alert("Publicacao deletada")
               } else {
                    alert("Não foi possível realizar a deleção")
               }
          })
          .catch((erro) => console.log(erro))
}

export default function TablePublications(props) {
     const classes = useStyles()
     const [page, setPage] = React.useState(0)
     const [rowsPerPage, setRowsPerPage] = React.useState(10)
     const columns = props.columns

     const handleChangePage = (event, newPage) => {
          setPage(newPage)
     }

     const handleChangeRowsPerPage = (event) => {
          setRowsPerPage(+event.target.value)
          setPage(0)
     }

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
                                   {props.data
                                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                        .map((row) => {
                                             return (
                                                  <TableRow hover role="checkbox" tabIndex={-1} key={row._id}>
                                                       {columns.map((column) => {
                                                            const value = row[column.id]

                                                            if (column.id === "acoes") {
                                                                 return (
                                                                      <TableCell key={column.id} align={column.align}>
                                                                           <EditButton
                                                                                updateSendType={props.updateSendType}
                                                                                updateCurrentItem={
                                                                                     props.updateCurrentItem
                                                                                }
                                                                                openRegistrationScreen={
                                                                                     props.openRegistrationScreen
                                                                                }
                                                                                row={row}
                                                                           />
                                                                           <RemoveButton
                                                                                remove={remove}
                                                                                row={row}
                                                                                updateItems={props.updateItems}
                                                                                route={props.route}
                                                                           />

                                                                           <ViewFileButton row={row} />
                                                                      </TableCell>
                                                                 )
                                                            } else {
                                                                 return (
                                                                      <TableCell key={column.id} align={column.align}>
                                                                           {column.format && typeof value === "number"
                                                                                ? column.format(value)
                                                                                : value}
                                                                      </TableCell>
                                                                 )
                                                            }
                                                       })}
                                                  </TableRow>
                                             )
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
     )
}
