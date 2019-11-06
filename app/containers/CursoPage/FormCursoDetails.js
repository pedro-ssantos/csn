import React, { useEffect, useState } from 'react';
import apiService from './../../services/apiService';
import TextField from './../../components/TextField';
import Select from './../../components/Select';
import { Grid, Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  paper: {
    margin: theme.spacing(0, 10),
  },
  inline: {
    display: 'inline',
  },
}));

const fields = [
  { id: 'nome', permission: 'update' },
  { id: 'codigoeMec', permission: 'update' },
  { id: 'nivelAcademico', permission: 'update' },
  { id: 'grauAcademico', permission: 'update' },
  { id: 'atributoIngresso', permission: 'update' },
  { id: 'modalidadeEnsino', permission: 'update' },
  { id: 'alunoVinculado', permission: 'update' },
  { id: 'situacaoFuncionamento', permission: 'update' },
  { id: 'tipoOferta', permission: 'update' },
  { id: 'teveAlunoVinculado', permission: 'update' },
];

export default function FormCursoDetails(props) {
  const { form } = props;
  const { hasPermission, canEdit } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <h2>Informações do Curso</h2>

        <div>
          {hasPermission('nome') && (
            <TextField
              name="nome"
              value={form.nome}
              handleChange={props.handleChange}
              label="Nome do curso"
              permission={canEdit('nome')}
            />
          )}
          {hasPermission('codigoeMec') && (
            <TextField
              name="codigoeMec"
              value={form.codigoeMec}
              type="number"
              inputProps={{ min: "0", max: "10", step: "1" }}
              handleChange={props.handleChange}
              label="Código do curso e-MEC"
              permission={canEdit('codigoeMec')}
            />
          )}
          {hasPermission('nivelAcademico') && (
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
          )}
          {hasPermission('grauAcademico') && (
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
          )}
          {hasPermission('atributoIngresso') && (
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
          )}
          {hasPermission('modalidadeEnsino') && (
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
          )}
          {hasPermission('alunoVinculado') && (
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
          )}
          {hasPermission('situacaoFuncionamento') && (
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
          )}
          {hasPermission('tipoOferta') && (
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
          )}
          {hasPermission('teveAlunoVinculado') && (
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
          )}
        </div>
      </Paper>
    </React.Fragment>
  );
}
