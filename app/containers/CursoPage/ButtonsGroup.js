import React, { Fragment } from 'react';
import './style.scss';
import {
  Button,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles({
  buttonsSteps: {
    padding: '10px 0 10px',
  },
  buttonStep: {
    marginRight: '10px',
  },
});

export default function ButtonsGroup(props) {
  const classes = useStyles();
  const { prevStep, nextStep, step, stepMax, save, isLast } = props;
  return (
    <Fragment>
      <Button
        variant="contained"
        onClick={prevStep}
        disabled={step <= 1}
        className={classes.buttonStep}
      >
        Voltar
      </Button>
      <Button
        variant="contained"
        onClick={nextStep}
        disabled={step == stepMax || isLast()}
        className={classes.buttonStep}
      >
        Próximo
      </Button>
      <Button
        variant="contained"
        color="primary"
        disabled={step != stepMax && !isLast()}
        className={classes.buttonStep}
        onClick={save}
      >
        Salvar
      </Button>
    </Fragment>
  );
}
