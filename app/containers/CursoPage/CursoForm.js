import React from 'react';
import './style.scss';
import { Fade } from '@material-ui/core';
import CursoVagas from './CursoVagas';
import CursoLabs from './CursoLabs';
import CursoAccessibilityResources from './CursoAccessibilityResources';
import CursoDetails from './CursoDetails';

function withFade(Component) {
  return function({ open, ...props }) {
    return (
      <Fade in={open}>
        <Component {...props} />
      </Fade>
    );
  };
}

function CursoForm(props) {
  const {
    step,
    form,
    updateField,
    nextStep,
    canSee,
    canEdit,
    handleChangeVagas,
    resourcesOptions,
    handleChangeRecursosAcessibilidade,
    handleChangeLaboratorio,
  } = props;

  const CursoDetailsWithFade = withFade(CursoDetails);
  const CursoVagasWithFade = withFade(CursoVagas);
  const CursoLabsWithFade = withFade(CursoLabs);
  const CursoAccessibilityResourcesWithFade = withFade(
    CursoAccessibilityResources,
  );

  return (
    <form autoComplete="off">
      {step === 1 && (
        <CursoDetailsWithFade
          form={form}
          handleChange={updateField}
          nextStep={nextStep}
          hasPermission={canSee}
          canEdit={canEdit}
          open={step === 1 ? true : false}
        />
      )}

      {step === 2 && (
        <CursoVagasWithFade
          vagas={form.vagas}
          handleChangeVagas={handleChangeVagas}
          hasPermission={canSee}
          canEdit={canEdit}
          open={step === 2 ? true : false}
        />
      )}

      {step === 3 && (
        <CursoAccessibilityResourcesWithFade
          tableLabel="Recursos de tecnologia assistiva disponíveis às pessoas com deficiência "
          options={resourcesOptions}
          recursosAcessibilidade={form.recursosAcessibilidade}
          handleChangeRecursosAcessibilidade={
            handleChangeRecursosAcessibilidade
          }
          open={step === 3 ? true : false}
        />
      )}

      {step === 4 && (
        <CursoLabsWithFade
          laboratorios={form.laboratorios}
          handleChange={handleChangeLaboratorio}
          label="Laboratórios"
          open={step === 4 ? true : false}
        />
      )}
    </form>
  );
}

export default CursoForm;
