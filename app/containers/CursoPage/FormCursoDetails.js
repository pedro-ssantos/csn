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

export default function FormCursoDetails(props) {
  const { form, permissions } = props;
  const classes = useStyles();

  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <h2>Informações do Curso</h2>

        <div>
          {permissions.map((id, permission) => {
            let ITEM = id.id;
            let PERMISSION = id.permission;
            switch (ITEM) {
              case 'nome':
                return (
                  <TextField
                    name="nome"
                    value={form.nome}
                    handleChange={props.handleChange}
                    label="Nome do curso"
                    permission={PERMISSION}
                  />
                );
              case 'codigoeMec':
                return (
                  <TextField
                    name="codigoeMec"
                    value={form.codigoeMec}
                    handleChange={props.handleChange}
                    label="Código do curso e-MEC"
                    permission={PERMISSION}
                  />
                );
              case 'nivelAcademico':
                return (
                  <Select
                    name="nivelAcademico"
                    value={form.nivelAcademico}
                    handleChange={props.handleChange}
                    label="Nível acadêmico"
                    permission={PERMISSION}
                    options={[
                      { key: 'Graduação', label: 'Graduação' },
                      {
                        key: 'Sequencia de formação específica',
                        label: 'Sequencia de formação específica',
                      },
                    ]}
                  />
                );
              case 'grauAcademico':
                return (
                  <Select
                    name="grauAcademico"
                    value={form.grauAcademico}
                    handleChange={props.handleChange}
                    label="Grau acadêmico"
                    permission={PERMISSION}
                    options={[
                      { key: 'Bacharelado', label: 'Bacharelado' },
                      { key: 'Licenciatura', label: 'Licenciatura' },
                      { key: 'Tecnológo', label: 'Tecnológo' },
                    ]}
                  />
                );
              case 'atributoIngresso':
                return (
                  <Select
                    name="atributoIngresso"
                    value={form.atributoIngresso}
                    handleChange={props.handleChange}
                    label="Atributo de ingresso"
                    permission={PERMISSION}
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
                );
              case 'modalidadeEnsino':
                return (
                  <Select
                    name="modalidadeEnsino"
                    value={form.modalidadeEnsino}
                    handleChange={props.handleChange}
                    label="Modalidade de ensino"
                    permission={PERMISSION}
                    options={[
                      { key: 'Presencial', label: 'Presencial' },
                      { key: 'Curso a distância', label: 'Curso a distância' },
                    ]}
                  />
                );
              case 'alunoVinculado':
                return (
                  <Select
                    name="alunoVinculado"
                    value={form.alunoVinculado}
                    handleChange={props.handleChange}
                    label="Curso com Aluno vinculado"
                    permission={PERMISSION}
                    options={[
                      { key: 'Sim', label: 'Sim' },
                      { key: 'Não', label: 'Não' },
                      { key: 'Não Atualizado', label: 'Não Atualizado' },
                    ]}
                  />
                );
              case 'situacaoFuncionamento':
                return (
                  <Select
                    name="situacaoFuncionamento"
                    value={form.situacaoFuncionamento}
                    handleChange={props.handleChange}
                    label="Situação de Funcionamento"
                    permission={PERMISSION}
                    options={[
                      { key: 'Extinto', label: 'Extinto' },
                      { key: 'Em atividade', label: 'Em atividade' },
                      { key: 'Em extinção', label: 'Em extinção' },
                    ]}
                  />
                );
              case 'tipoOferta':
                return (
                  <Select
                    name="tipoOferta"
                    value={form.tipoOferta}
                    handleChange={props.handleChange}
                    label="Tipo de oferta"
                    permission={PERMISSION}
                    options={[
                      { key: 'Regular', label: 'Regular' },
                      { key: 'Especial', label: 'Especial' },
                    ]}
                  />
                );
              case 'teveAlunoVinculado':
                return (
                  <Select
                    name="teveAlunoVinculado"
                    value={form.teveAlunoVinculado}
                    handleChange={props.handleChange}
                    label="Curso teve aluno vinculado em 2019?"
                    permission={PERMISSION}
                    options={[
                      { key: 'Sim', label: 'Sim' },
                      { key: 'Não', label: 'Não' },
                    ]}
                  />
                );
              default:
                return null;
            }
          })}
        </div>
      </Paper>
    </React.Fragment>
  );
}
