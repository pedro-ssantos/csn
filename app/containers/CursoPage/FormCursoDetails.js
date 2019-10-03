import React from 'react';
import TextField from './../../components/TextField';
import Select from './../../components/Select';
import { Paper } from '@material-ui/core';

export default function FormCursoDetails(props) {
  const [alignment, setAlignment] = React.useState('left');
  const { form, updateField } = props;

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const next = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  return (
    <React.Fragment>
      <Paper>
        <h2>Informações do Curso</h2>
        <div>
          <TextField
            name="nome"
            value={form.nome}
            handleChange={updateField}
            label="Nome do curso"
          />
        </div>
        <div>
          <TextField
            name="codigoMec"
            value={form.codigoMec}
            handleChange={updateField}
            label="Código do curso e-MEC"
          />
        </div>
        <div>
          <Select
            name="nivelAcademico"
            value={form.nivelAcademico}
            handleChange={updateField}
            label="Nível acadêmico"
            options={[
              { key: 'Graduação', label: 'Graduação' },
              {
                key: 'Sequencia de formação específica',
                label: 'Sequencia de formação específica',
              },
            ]}
          />
        </div>
        <div>
          <Select
            name="grauAcademico"
            value={form.grauAcademico}
            handleChange={updateField}
            label="Grau acadêmico"
            options={[
              { key: 'Bacharelado', label: 'Bacharelado' },
              { key: 'Licenciatura', label: 'Licenciatura' },
              { key: 'Tecnológo', label: 'Tecnológo' },
            ]}
          />
        </div>
        <div>
          <Select
            name="atributoDeIngresso"
            value={form.atributoDeIngresso}
            handleChange={updateField}
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
        </div>
        <div>
          <Select
            name="modalidadeDeEnsino"
            value={form.modalidadeDeEnsino}
            handleChange={updateField}
            label="Modalidade de ensino"
            options={[
              { key: 'Presencial', label: 'Presencial' },
              { key: 'Curso a distância', label: 'Curso a distância' },
            ]}
          />
        </div>
        <div>
          <Select
            name="CursoAlunoVinc"
            value={form.CursoAlunoVinc}
            handleChange={updateField}
            label="Curso com Aluno vinculado"
            options={[
              { key: 'Sim', label: 'Sim' },
              { key: 'Não', label: 'Não' },
              { key: 'Não Atualizado', label: 'Não Atualizado' },
            ]}
          />
        </div>
        <div>
          <Select
            name="situacaoFuncionamto"
            value={form.situacaoFuncionamto}
            handleChange={updateField}
            label="Situação de Funcionamento"
            options={[
              { key: 'Extinto', label: 'Extinto' },
              { key: 'Em atividade', label: 'Em atividade' },
              { key: 'Em extinção', label: 'Em extinção' },
            ]}
          />
        </div>
        <div>
          <Select
            name="tipoDeOferta"
            value={form.tipoDeOferta}
            handleChange={updateField}
            label="Tipo de oferta"
            options={[
              { key: 'Regular', label: 'Regular' },
              { key: 'Especial', label: 'Especial' },
            ]}
          />
        </div>
        <div>
          <Select
            name="CursoAlunoVinc2019"
            value={form.CursoAlunoVinc2019}
            handleChange={updateField}
            label="Curso teve aluno vinculado em 2019?"
            options={[
              { key: 'Sim', label: 'Sim' },
              { key: 'Não', label: 'Não' },
            ]}
          />
        </div>
      </Paper>
    </React.Fragment>
  );
}
