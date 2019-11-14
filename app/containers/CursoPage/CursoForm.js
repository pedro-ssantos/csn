import React from 'react';
import './style.scss';
import { Fade } from '@material-ui/core';
import TableVagas from './../../components/TableVagas';
import ChipSelect from './../../components/ChipSelect';
import TableAccessibilityResources from './../../components/TableAccessibilityResources';
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
  const TableVagasWithFade = withFade(TableVagas);
  const TableAccessibilityResourcesWithFade = withFade(
    TableAccessibilityResources,
  );
  const ChipSelectWithFade = withFade(ChipSelect);

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
        <TableVagasWithFade
          vagas={form.vagas}
          handleChangeVagas={handleChangeVagas}
          hasPermission={canSee}
          canEdit={canEdit}
          open={step === 2 ? true : false}
        />
      )}

      {step === 3 && (
        <TableAccessibilityResourcesWithFade
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
        <ChipSelectWithFade
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
