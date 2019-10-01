import React from 'react';
import TextField from './../../components/TextField';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { Paper, FormControl, FormLabel } from '@material-ui/core';

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
        <TextField
          name="nome"
          value={form.nome}
          onChange={updateField}
          label="Nome do curso"
        />
        <br />
        <TextField
          name="codigoMec"
          value={form.codigoMec}
          onChange={updateField}
          label="Código do curso e-MEC"
        />
        <br />
        <FormControl>
          <FormLabel>Nível acadêmico:</FormLabel>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              Graduação
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              Sequencia de formação específica
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
        <br />
        <FormControl>
          <FormLabel>Grau acadêmico:</FormLabel>
          <ToggleButtonGroup
            value={alignment}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
          >
            <ToggleButton value="left" aria-label="left aligned">
              Bacharelado
            </ToggleButton>
            <ToggleButton value="center" aria-label="centered">
              Licenciatura
            </ToggleButton>
            <ToggleButton value="right" aria-label="left aligned">
              Tecnológo
            </ToggleButton>
          </ToggleButtonGroup>
        </FormControl>
      </Paper>
    </React.Fragment>
  );
}
