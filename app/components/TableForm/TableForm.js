import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from './../TextField';
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

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 1150,
  },
  tableCellAction: {
    width: 180,
  },
  logTable: {
    minWidth: 650,
  },
}));

export default function TableForm(props) {

  const classes = useStyles();
  const [columns, setColumns] = useState([]);
  const [rows, setRows] = useState([]);

  useEffect(() => {
    if (props.rows) {
      setRows(props.rows);
    }
    if (props.columns) {
      setColumns(props.columns);
    }
  }, [props.columns, props.rows]);

  return (
    <div>
      <Paper className={classes.root}>
        <Table className={classes.table} size="small">
          <TableHead>
            <TableRow>
              {columns.map(column => (
              <TableCell>{column}</TableCell>
              ))}
              <TableCell >Ação</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((fields, index) => (
              <TableRow key={index}>
                {fields.map((field) => (
                <TableCell component="th" scope="row">
                  {field}
                </TableCell>
                ))}
                <TableCell component="th" scope="row" className={classes.tableCellAction}>
                  <IconButton onClick={props.logDialogHandleOpen}>
                    <Icon color="action">remove_red_eye</Icon>
                  </IconButton>
                  <IconButton>
                    <Icon color="action">link</Icon>
                  </IconButton>
                  <IconButton>
                    <Icon color="action">list</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    </div>
  );
}
