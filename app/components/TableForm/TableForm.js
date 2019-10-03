import React, { useEffect, useState } from 'react';
import apiService from './../../services/apiService';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
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
  Link,
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
  const [linkDialogOpen, setLinkDialogOpen] = useState(false);
  const [formConfigs, setFormConfigs] = useState([]);

  useEffect(() => {
    if (props.rows) {
      setRows(props.rows);
    }
    if (props.columns) {
      setColumns(props.columns);
    }
  }, [props.columns, props.rows]);

  const getLinks = async (formId) => {
    try {
      const res = await apiService.request(
        'get',
        'formConfig?formId='+formId,
      );
      setFormConfigs(res.data);
      setLinkDialogOpen(true);
    } catch (error) {
      alert('Erro ao buscar histórico de mudanças');
    }
  }

  return (
    <div>
      <Paper className={classes.root}>
        <Table size="small">
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
                {fields.map((field, index) => {
                  if (index > 0) {
                    return (
                      <TableCell component="th" scope="row">
                        {field}
                      </TableCell>
                    )
                  }
                })}
                <TableCell component="th" scope="row" className={classes.tableCellAction}>
                  <IconButton onClick={props.logDialogHandleOpen}>
                    <Icon color="action">remove_red_eye</Icon>
                  </IconButton>
                  <IconButton>
                    <Icon color="action" onClick={() => getLinks(fields[0])}>link</Icon>
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

      <Dialog
        open={linkDialogOpen}
        onClose={() => {setLinkDialogOpen(false)}}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth = {'md'}
      >
        <DialogTitle id="alert-dialog-title">Links</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">

            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Responsável</TableCell>
                  <TableCell>Link</TableCell>
                  <TableCell>Validade</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {formConfigs.map((formConfig, index) => (
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    {formConfig.responsible}
                  </TableCell>
                  <TableCell component="th" scope="row">
                    <Link href={'/curso/'+formConfig._id} target="_blank" rel="noopener" className={classes.link}>
                        curso/{formConfig._id}
                    </Link>
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {moment(formConfig.deadline).format('DD/MM/YY')}
                  </TableCell>
                </TableRow>
                ))}
              </TableBody>
            </Table>

          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => {setLinkDialogOpen(false)}} color="primary" autoFocus>
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
