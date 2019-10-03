import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Button,
  Checkbox,
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogContentText, 
  DialogTitle,
  FormControlLabel,
  Icon,
  IconButton,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';
import moment from 'moment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  logTable: {
    minWidth: 650,
  },
}));

export default function LogDialog(props) {

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (props.open != undefined) {
      setOpen(props.open)
    }
    if (props.rows != undefined) {
      setRows(props.rows)
    }
  }, [props.open, props.logRows]);

  return (
    <div>
      <Dialog
        open={open}
        // onClose={props.logDialogHandle(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = {'md'}
      >
        <DialogTitle id="alert-dialog-title">Histórico de mudanças</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <Table className={classes.logTable} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Responsável</TableCell>
                  <TableCell>Campo</TableCell>
                  <TableCell>Valor</TableCell>
                  <TableCell>Data</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((fields, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {fields.responsible}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {Object.keys(fields.changes).map((key) => (
                      <div>{key}</div>
                    ))}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {Object.values(fields.changes).map((value) => (
                      <div>{value}</div>
                    ))}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {moment(fields.date).format('DD/MM/YY HH:mm:ss')}
                  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.logDialogHandleClose} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
