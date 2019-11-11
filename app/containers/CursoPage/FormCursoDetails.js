import React, { useEffect, useState, Fragment } from 'react';
import apiService from './../../services/apiService';
import TextField from './../../components/TextField';
import InputWithHelp from './../../components/InputWithHelp';
import { CustomIconButton } from './../../components/CustomIconButton';
import Select from './../../components/Select';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import HelpIcon from '@material-ui/icons/Help';
import Grid from '@material-ui/core/Grid';
import CustomizedSnackbars from './../../components/CustomizedSnackbars';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(0, 10),
  },
  inline: {
    display: 'inline',
  },
  icon: {
    margin: 'none',
  },
}));

export default function FormCursoDetails(props) {
  const { form } = props;
  const { hasPermission, canEdit } = props;
  const classes = useStyles();

  const HelpTooltip = withStyles(theme => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <h2>Informações do Curso</h2>

        <div>
          {hasPermission('nome') && (
            <Fragment>
              <TextField
                name="nome"
                value={form.nome}
                handleChange={props.handleChange}
                label="Nome do curso"
                permission={canEdit('nome')}
              />
              <HelpTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Nome Do curso</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                    <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <HelpIcon fontSize="small" />
              </HelpTooltip>
            </Fragment>
          )}
          {hasPermission('codigoeMec') && (
            <Fragment>
              <TextField
                name="codigoeMec"
                value={form.codigoeMec}
                type="number"
                inputProps={{ min: '0', max: '10', step: '1' }}
                handleChange={props.handleChange}
                label="Código do curso e-MEC"
                permission={canEdit('codigoeMec')}
              />
              <HelpTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Nome Do curso</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                    <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <HelpIcon fontSize="small" />
              </HelpTooltip>
            </Fragment>
          )}
          {hasPermission('nivelAcademico') && (
            <Fragment>
              <Select
                name="nivelAcademico"
                value={form.nivelAcademico}
                handleChange={props.handleChange}
                label="Nível acadêmico"
                permission={canEdit('nivelAcademico')}
                options={[
                  { key: 'Graduação', label: 'Graduação' },
                  {
                    key: 'Sequencia de formação específica',
                    label: 'Sequencia de formação específica',
                  },
                ]}
              />
              <HelpTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Nome Do curso</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                    <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <HelpIcon fontSize="small" />
              </HelpTooltip>
            </Fragment>
          )}
          {hasPermission('grauAcademico') && (
            <Fragment>
              <Select
                name="grauAcademico"
                value={form.grauAcademico}
                handleChange={props.handleChange}
                label="Grau acadêmico"
                permission={canEdit('grauAcademico')}
                options={[
                  { key: 'Bacharelado', label: 'Bacharelado' },
                  { key: 'Licenciatura', label: 'Licenciatura' },
                  { key: 'Tecnológo', label: 'Tecnológo' },
                ]}
              />
              <HelpTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Nome Do curso</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                    <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <HelpIcon fontSize="small" />
              </HelpTooltip>
            </Fragment>
          )}
          {hasPermission('atributoIngresso') && (
            <Fragment>
              <Select
                name="atributoIngresso"
                value={form.atributoIngresso}
                handleChange={props.handleChange}
                label="Atributo de ingresso"
                permission={canEdit('atributoIngresso')}
                options={[
                  { key: 'Normal', label: 'Normal' },
                  { key: 'Área Básica', label: 'Área Básica' },
                  {
                    key: 'Bacharelado Interdisciplinar',
                    label: 'Bacharelado Interdisciplinar',
                  },
                  {
                    key: 'Licenciatura Interdisciplinar',
                    label: 'Licenciatura Interdisciplinar',
                  },
                ]}
              />
              <HelpTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Nome Do curso</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                    <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <HelpIcon fontSize="small" />
              </HelpTooltip>
            </Fragment>
          )}
          {hasPermission('modalidadeEnsino') && (
            <Fragment>
              <Select
                name="modalidadeEnsino"
                value={form.modalidadeEnsino}
                handleChange={props.handleChange}
                label="Modalidade de ensino"
                permission={canEdit('modalidadeEnsino')}
                options={[
                  { key: 'Presencial', label: 'Presencial' },
                  { key: 'Curso a distância', label: 'Curso a distância' },
                ]}
              />
              <HelpTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Nome Do curso</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                    <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <HelpIcon fontSize="small" />
              </HelpTooltip>
            </Fragment>
          )}
          {hasPermission('alunoVinculado') && (
            <Fragment>
              <Select
                name="alunoVinculado"
                value={form.alunoVinculado}
                handleChange={props.handleChange}
                label="Curso com Aluno vinculado"
                permission={canEdit('alunoVinculado')}
                options={[
                  { key: 'Sim', label: 'Sim' },
                  { key: 'Não', label: 'Não' },
                  { key: 'Não Atualizado', label: 'Não Atualizado' },
                ]}
              />
              <HelpTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Nome Do curso</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                    <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <HelpIcon fontSize="small" />
              </HelpTooltip>
            </Fragment>
          )}
          {hasPermission('situacaoFuncionamento') && (
            <Fragment>
              <Select
                name="situacaoFuncionamento"
                value={form.situacaoFuncionamento}
                handleChange={props.handleChange}
                label="Situação de Funcionamento"
                permission={canEdit('situacaoFuncionamento')}
                options={[
                  { key: 'Extinto', label: 'Extinto' },
                  { key: 'Em atividade', label: 'Em atividade' },
                  { key: 'Em extinção', label: 'Em extinção' },
                ]}
              />
              <HelpTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Nome Do curso</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                    <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <HelpIcon fontSize="small" />
              </HelpTooltip>
            </Fragment>
          )}
          {hasPermission('tipoOferta') && (
            <Fragment>
              <Select
                name="tipoOferta"
                value={form.tipoOferta}
                handleChange={props.handleChange}
                label="Tipo de oferta"
                permission={canEdit('tipoOferta')}
                options={[
                  { key: 'Regular', label: 'Regular' },
                  { key: 'Especial', label: 'Especial' },
                ]}
              />
              <HelpTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Nome Do curso</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                    <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <HelpIcon fontSize="small" />
              </HelpTooltip>
            </Fragment>
          )}
          {hasPermission('teveAlunoVinculado') && (
            <Fragment>
              <Select
                name="teveAlunoVinculado"
                value={form.teveAlunoVinculado}
                handleChange={props.handleChange}
                label="Curso teve aluno vinculado em 2019?"
                permission={canEdit('teveAlunoVinculado')}
                options={[
                  { key: 'Sim', label: 'Sim' },
                  { key: 'Não', label: 'Não' },
                ]}
              />
              <HelpTooltip
                title={
                  <React.Fragment>
                    <Typography color="inherit">Nome Do curso</Typography>
                    <em>{"And here's"}</em> <b>{'some'}</b>{' '}
                    <u>{'amazing content'}</u>. {"It's very engaging. Right?"}
                  </React.Fragment>
                }
              >
                <HelpIcon fontSize="small" />
              </HelpTooltip>
            </Fragment>
          )}
        </div>
      </Paper>      
    </React.Fragment>
  );
}
