import React, { useEffect, useState, Fragment } from 'react';
import { Table as TableMaterial } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import {
  Checkbox,
  FormControlLabel,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import HelpIcon from '@material-ui/icons/Help';

import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto',
  },
  table: {
    minWidth: 1150,
  },
  paper: {
    padding: theme.spacing(3, 2),
  },
  help:{
    paddingLeft: 5,
    paddingBottom: 3,
  },
}));

const HelpTooltip = withStyles(theme => ({
  tooltip: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}))(Tooltip);

const vagasDefault = {
  matutino: {
    status: false,
    prazoMinimoIntregralizacao: '',
    vagasNovas: '',
    vagasRemanecentes: '',
    vagasProgramasEspeciais: '',
    inscritosVagasNovas: '',
    inscritosVagasRemanecentes: '',
    inscritosVagasProgramasEspeciais: '',
  },
  vespertino: {
    status: false,
    prazoMinimoIntregralizacao: '',
    vagasNovas: '',
    vagasRemanecentes: '',
    vagasProgramasEspeciais: '',
    inscritosVagasNovas: '',
    inscritosVagasRemanecentes: '',
    inscritosVagasProgramasEspeciais: '',
  },
  noturno: {
    status: false,
    prazoMinimoIntregralizacao: '',
    vagasNovas: '',
    vagasRemanecentes: '',
    vagasProgramasEspeciais: '',
    inscritosVagasNovas: '',
    inscritosVagasRemanecentes: '',
    inscritosVagasProgramasEspeciais: '',
  },
  integral: {
    status: false,
    prazoMinimoIntregralizacao: '',
    vagasNovas: '',
    vagasRemanecentes: '',
    vagasProgramasEspeciais: '',
    inscritosVagasNovas: '',
    inscritosVagasRemanecentes: '',
    inscritosVagasProgramasEspeciais: '',
  },
};

export default function TableVagas(props) {
  const classes = useStyles();

  const [vagas, setVagas] = useState(vagasDefault);
  const { handleChangeVagas, canSee } = props;

  useEffect(() => {
    if (props.vagas) {
      setVagas(props.vagas);
    }
  }, [props.vagas]);

  const handleChange = (e, turno) => {
    const reNum = /^[0-9\b]+$/;
    const name = e.target.name;
    const value =
      e.target.type === 'checkbox' ? e.target.checked : e.target.value;

    let obj = JSON.parse(JSON.stringify(vagas));
    obj[turno][name] = value;

    //Limpa o valores das vagas se o campo for desmarcado
    if (e.target.type === 'checkbox' && value === false) {
      obj[turno] = vagasDefault[turno];
    }
    setVagas(obj);
    handleChangeVagas(obj);
  };

  return (
    <Paper className={classes.root}>
      {vagas && vagas.matutino && (
        <TableMaterial className={classes.table}>
          <TableHead>
            <TableRow>
              <Fragment>
                <TableCell>
                  Turno
                  <HelpTooltip
                    title={
                      <React.Fragment>
                        <Typography align="justify" variant="body2">
                          {
                            'Período do dia em que o curso é ministrado na IES. Ex: Matutino, Vespertino, Noturno e Integral.'
                          }
                        </Typography>
                      </React.Fragment>
                    }
                  >
                    <HelpIcon fontSize="small" color="action" className={classes.help}/>
                  </HelpTooltip>
                </TableCell>
              </Fragment>

              <TableCell>
                Prazo mínimo integralização
                <HelpTooltip
                  title={
                    <React.Fragment>
                      <Typography align="justify" variant="body2">
                        {
                          'Prazo previsto para que o estudante receba a formação pretendida. O tempo total deve ser descrito em anos ou fração.'
                        }
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <HelpIcon fontSize="small" color="action" className={classes.help}/>
                </HelpTooltip>
              </TableCell>
              <TableCell>
                Vagas novas oferecidas
                <HelpTooltip
                  title={
                    <React.Fragment>
                      <Typography align="justify" variant="body2">
                        {
                          'Vagas novas oferecidas anualmente, em cada turno de funcionamento, nos processos seletivos: Vestibular, ENEM, avaliação seriada e seleção simplificada (entrevista, redação, análise de curriculum e etc).'
                        }
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <HelpIcon fontSize="small" color="action" className={classes.help}/>
                </HelpTooltip>
              </TableCell>
              <TableCell>
                Vagas remanescentes oferecidas
                <HelpTooltip
                  title={
                    <React.Fragment>
                      <Typography align="justify" variant="body2">
                        {
                          'São vagas de anos anteriores que nunca foram ocupadas ou que foram liberadas por diversos motivos: óbito, não cumprimento de desempenho mínimo (jubilamento), desistência, transferência interna (transferência entre cursos da IES) ou transferência externa (transferência de outras IES). Essas vagas se destinam aos alunos que já possuem aproveitamento de componente curricular do curso, ou seja, possuem carga horária integralizada maior que zero. A forma de ingresso nessas vagas define-se como “seleção para vagas remanescentes” (transferência externa, transferência interna, portador de curso superior e reingresso).'
                        }
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <HelpIcon fontSize="small" color="action" className={classes.help}/>
                </HelpTooltip>
              </TableCell>
              <TableCell>
                Vagas oferecidas de programas especiais
                <HelpTooltip
                  title={
                    <React.Fragment>
                      <Typography align="justify" variant="body2">
                        {
                          'São vagas de programas especiais que fomentam a oferta de turmas especiais para demandas específicas. Exemplos: PARFOR (Plano Nacional de Formação de Professores), PRONERA (Programa Nacional de Educação na Reforma Agrária) e PROCAMPO (Programa de Apoio à Formação Superior em Licenciatura em Educação do Campo).'
                        }
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <HelpIcon fontSize="small" color="action" className={classes.help}/>
                </HelpTooltip>
              </TableCell>
              <TableCell>
                Inscritos Vagas novas oferecidas
                <HelpTooltip
                  title={
                    <React.Fragment>
                      <Typography align="justify" variant="body2">
                        {
                          'Número de participantes inscritos nos processos seletivos "vestibular", "Enem", "avaliação seriada" e "processos seletivos simplificados".'
                        }
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <HelpIcon fontSize="small" color="action" className={classes.help}/>
                </HelpTooltip>
              </TableCell>
              <TableCell>
                Inscritos Vagas remanescentes oferecidas
                <HelpTooltip
                  title={
                    <React.Fragment>
                      <Typography align="justify" variant="body2">
                        {
                          'Número de participantes inscritos no processo seletivo "seleção para vagas remanescentes". As vagas remanescentes são aquelas que por algum motivo (abandono, transferências ou falecimento de aluno) ficaram ociosas.'
                        }
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <HelpIcon fontSize="small" color="action" className={classes.help}/>
                </HelpTooltip>
              </TableCell>
              <TableCell>
                Inscritos Vagas oferecidas de programas especiais
                <HelpTooltip
                  title={
                    <React.Fragment>
                      <Typography align="justify" variant="body2">
                        {
                          'Número de participantes inscritos para o processo seletivo "seleção para vagas de programas especiais".'
                        }
                      </Typography>
                    </React.Fragment>
                  }
                >
                  <HelpIcon fontSize="small" color="action" className={classes.help}/>
                </HelpTooltip>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={vagas.matutino.status}
                      name="status"
                      value={vagas.matutino.status}
                      onChange={e => {
                        handleChange(e, 'matutino');
                      }}
                    />
                  }
                  label="Matutino"
                  style={{ width: 120 }}
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.matutino.status}
                  name="prazoMinimoIntregralizacao"
                  value={vagas.matutino.prazoMinimoIntregralizacao}
                  onChange={e => {
                    handleChange(e, 'matutino');
                  }}
                  margin="normal"
                  variant="outlined"
                  type="number"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.matutino.status}
                  name="vagasNovas"
                  value={vagas.matutino.vagasNovas}
                  onChange={e => {
                    handleChange(e, 'matutino');
                  }}
                  margin="normal"
                  variant="outlined"
                  type="number"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.matutino.status}
                  name="vagasRemanecentes"
                  value={vagas.matutino.vagasRemanecentes}
                  onChange={e => {
                    handleChange(e, 'matutino');
                  }}
                  margin="normal"
                  variant="outlined"
                  type="number"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.matutino.status}
                  name="vagasProgramasEspeciais"
                  value={vagas.matutino.vagasProgramasEspeciais}
                  onChange={e => {
                    handleChange(e, 'matutino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.matutino.status}
                  name="inscritosVagasNovas"
                  value={vagas.matutino.inscritosVagasNovas}
                  onChange={e => {
                    handleChange(e, 'matutino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.matutino.status}
                  name="inscritosVagasRemanecentes"
                  value={vagas.matutino.inscritosVagasRemanecentes}
                  onChange={e => {
                    handleChange(e, 'matutino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.matutino.status}
                  name="inscritosVagasProgramasEspeciais"
                  value={vagas.matutino.inscritosVagasProgramasEspeciais}
                  onChange={e => {
                    handleChange(e, 'matutino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={vagas.vespertino.status}
                      name="status"
                      value={vagas.vespertino.value}
                      onChange={e => {
                        handleChange(e, 'vespertino');
                      }}
                    />
                  }
                  label="Vespertino"
                  style={{ width: 120 }}
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.vespertino.status}
                  name="prazoMinimoIntregralizacao"
                  value={vagas.vespertino.prazoMinimoIntregralizacao}
                  onChange={e => {
                    handleChange(e, 'vespertino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.vespertino.status}
                  name="vagasNovas"
                  value={vagas.vespertino.vagasNovas}
                  onChange={e => {
                    handleChange(e, 'vespertino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.vespertino.status}
                  name="vagasRemanecentes"
                  value={vagas.vespertino.vagasRemanecentes}
                  onChange={e => {
                    handleChange(e, 'vespertino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.vespertino.status}
                  name="vagasProgramasEspeciais"
                  value={vagas.vespertino.vagasProgramasEspeciais}
                  onChange={e => {
                    handleChange(e, 'vespertino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.vespertino.status}
                  name="inscritosVagasNovas"
                  value={vagas.vespertino.inscritosVagasNovas}
                  onChange={e => {
                    handleChange(e, 'vespertino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.vespertino.status}
                  name="inscritosVagasRemanecentes"
                  value={vagas.vespertino.inscritosVagasRemanecentes}
                  onChange={e => {
                    handleChange(e, 'vespertino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.vespertino.status}
                  name="inscritosVagasProgramasEspeciais"
                  value={vagas.vespertino.inscritosVagasProgramasEspeciais}
                  onChange={e => {
                    handleChange(e, 'vespertino');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={vagas.noturno.status}
                      name="status"
                      value={vagas.noturno.value}
                      onChange={e => {
                        handleChange(e, 'noturno');
                      }}
                    />
                  }
                  label="Noturno"
                  style={{ width: 120 }}
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.noturno.status}
                  name="prazoMinimoIntregralizacao"
                  value={vagas.noturno.prazoMinimoIntregralizacao}
                  onChange={e => {
                    handleChange(e, 'noturno');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.noturno.status}
                  name="vagasNovas"
                  value={vagas.noturno.vagasNovas}
                  onChange={e => {
                    handleChange(e, 'noturno');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.noturno.status}
                  name="vagasRemanecentes"
                  value={vagas.noturno.vagasRemanecentes}
                  onChange={e => {
                    handleChange(e, 'noturno');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.noturno.status}
                  name="vagasProgramasEspeciais"
                  value={vagas.noturno.vagasProgramasEspeciais}
                  onChange={e => {
                    handleChange(e, 'noturno');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.noturno.status}
                  name="inscritosVagasNovas"
                  value={vagas.noturno.inscritosVagasNovas}
                  onChange={e => {
                    handleChange(e, 'noturno');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.noturno.status}
                  name="inscritosVagasRemanecentes"
                  value={vagas.noturno.inscritosVagasRemanecentes}
                  onChange={e => {
                    handleChange(e, 'noturno');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.noturno.status}
                  name="inscritosVagasProgramasEspeciais"
                  value={vagas.noturno.inscritosVagasProgramasEspeciais}
                  onChange={e => {
                    handleChange(e, 'noturno');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>

            <TableRow>
              <TableCell>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={vagas.integral.status}
                      name="status"
                      value={vagas.integral.value}
                      onChange={e => {
                        handleChange(e, 'integral');
                      }}
                    />
                  }
                  label="Integral"
                  style={{ width: 120 }}
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.integral.status}
                  name="prazoMinimoIntregralizacao"
                  value={vagas.integral.prazoMinimoIntregralizacao}
                  onChange={e => {
                    handleChange(e, 'integral');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.integral.status}
                  name="vagasNovas"
                  value={vagas.integral.vagasNovas}
                  onChange={e => {
                    handleChange(e, 'integral');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.integral.status}
                  name="vagasRemanecentes"
                  value={vagas.integral.vagasRemanecentes}
                  onChange={e => {
                    handleChange(e, 'integral');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.integral.status}
                  name="vagasProgramasEspeciais"
                  value={vagas.integral.vagasProgramasEspeciais}
                  onChange={e => {
                    handleChange(e, 'integral');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.integral.status}
                  name="inscritosVagasNovas"
                  value={vagas.integral.inscritosVagasNovas}
                  onChange={e => {
                    handleChange(e, 'integral');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.integral.status}
                  name="inscritosVagasRemanecentes"
                  value={vagas.integral.inscritosVagasRemanecentes}
                  onChange={e => {
                    handleChange(e, 'integral');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
              <TableCell align="right" size="small">
                <TextField
                  disabled={!vagas.integral.status}
                  name="inscritosVagasProgramasEspeciais"
                  value={vagas.integral.inscritosVagasProgramasEspeciais}
                  onChange={e => {
                    handleChange(e, 'integral');
                  }}
                  margin="normal"
                  type="number"
                  variant="outlined"
                />
              </TableCell>
            </TableRow>
          </TableBody>
        </TableMaterial>
      )}
    </Paper>
  );
}
