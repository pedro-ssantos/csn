import React, {useEffect, useState} from 'react';
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
  const { form } = props;
  const classes = useStyles();


  return (
    <React.Fragment>
      <Paper className={classes.paper}>
        <h2>Informações do Curso</h2>

        <Grid container>
          <Grid item xs={4}>
            <TextField
              name="nome"
              value={form.nome}
              handleChange={props.handleChange}
              label="Nome do curso"
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              name="codigoeMec"
              value={form.codigoeMec}
              handleChange={props.handleChange}
              label="Código do curso e-MEC"
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              name="nivelAcademico"
              value={form.nivelAcademico}
              handleChange={props.handleChange}
              label="Nível acadêmico"
              options={[
                { key: 'Graduação', label: 'Graduação' },
                {
                  key: 'Sequencia de formação específica',
                  label: 'Sequencia de formação específica',
                },
              ]}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={4}>
            <Select
              name="grauAcademico"
              value={form.grauAcademico}
              handleChange={props.handleChange}
              label="Grau acadêmico"
              options={[
                { key: 'Bacharelado', label: 'Bacharelado' },
                { key: 'Licenciatura', label: 'Licenciatura' },
                { key: 'Tecnológo', label: 'Tecnológo' },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              name="atributoIngresso"
              value={form.atributoIngresso}
              handleChange={props.handleChange}
              label="Atributo de ingresso"
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
          </Grid>
          <Grid item xs={4}>
            <Select
              name="modalidadeEnsino"
              value={form.modalidadeEnsino}
              handleChange={props.handleChange}
              label="Modalidade de ensino"
              options={[
                { key: 'Presencial', label: 'Presencial' },
                { key: 'Curso a distância', label: 'Curso a distância' },
              ]}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={4}>
            <Select
              name="alunoVinculado"
              value={form.alunoVinculado}
              handleChange={props.handleChange}
              label="Curso com Aluno vinculado"
              options={[
                { key: 'Sim', label: 'Sim' },
                { key: 'Não', label: 'Não' },
                { key: 'Não Atualizado', label: 'Não Atualizado' },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              name="situacaoFuncionamento"
              value={form.situacaoFuncionamento}
              handleChange={props.handleChange}
              label="Situação de Funcionamento"
              options={[
                { key: 'Extinto', label: 'Extinto' },
                { key: 'Em atividade', label: 'Em atividade' },
                { key: 'Em extinção', label: 'Em extinção' },
              ]}
            />
          </Grid>
          <Grid item xs={4}>
            <Select
              name="tipoOferta"
              value={form.tipoOferta}
              handleChange={props.handleChange}
              label="Tipo de oferta"
              options={[
                { key: 'Regular', label: 'Regular' },
                { key: 'Especial', label: 'Especial' },
              ]}
            />
          </Grid>
        </Grid>

        <Grid container>
          <Grid item xs={4}>
            <Select
              name="teveAlunoVinculado"
              value={form.teveAlunoVinculado}
              handleChange={props.handleChange}
              label="Curso teve aluno vinculado em 2019?"
              options={[
                { key: 'Sim', label: 'Sim' },
                { key: 'Não', label: 'Não' },
              ]}
            />
          </Grid>
        </Grid>

      </Paper>
    </React.Fragment>
  );
} 
