import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Table as TableMaterial } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 650,
  },
  logTable: {
    minWidth: 650,
  },
}));

export default function Table(props) {

  const classes = useStyles();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  const [logDialogOpened, setLogDialogOpened] = React.useState(false);

  const logDialogOpen = () => {
    setLogDialogOpened(true);
  };

  const logDialogClose = () => {
    setLogDialogOpened(false);
  };

  useEffect(() => {
    if (props.rows) {
      setColumns(props.columns);
      setRows(props.rows);
    }
  }, [props.columns, props.rows]);

  return (
    <div>

      <Paper className={classes.root}>
        <TableMaterial className={classes.table} size="small">
          <TableHead>
            <TableRow>
              {columns.map(column => (
              <TableCell>{column}</TableCell>
              ))}
              <TableCell>Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.name}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell component="th" scope="row">
                  <IconButton aria-label="delete" onClick={logDialogOpen}>
                    <Icon color="action">list</Icon>
                  </IconButton>
                  <IconButton aria-label="delete">
                    <Icon color="action">remove_red_eye</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableMaterial>
      </Paper>
      <Dialog
        open={logDialogOpened}
        onClose={logDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = {'md'}
      >
        <DialogTitle id="alert-dialog-title">Histórico de mudanças</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <TableMaterial className={classes.logTable} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Responsável</TableCell>
                  <TableCell>Data</TableCell>
                  <TableCell>Campo</TableCell>
                  <TableCell>Anterior</TableCell>
                  <TableCell>Atual</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell component="th" scope="row">
                    DAA
                  </TableCell>
                  <TableCell component="th" scope="row">
                    c
                  </TableCell>
                  <TableCell component="th" scope="row">
                    nome
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Biologia
                  </TableCell>
                  <TableCell component="th" scope="row">
                    Ciências Biológicas
                  </TableCell>
                </TableRow>
              </TableBody>
            </TableMaterial>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={logDialogClose} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
