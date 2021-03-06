import React, { useState } from 'react';
import './style.scss';
import { Fade } from '@material-ui/core';
import TableVagas from './../../components/TableVagas';
import ChipSelect from './../../components/ChipSelect';
import TableAccessibilityResources from './../../components/TableAccessibilityResources';
import CursoDetails from './CursoDetails';

function CursoForm(props) {
  const [show, setShow] = useState(false);
  const {
    step,
    form,
    updateField,
    nextStep,
    canSee,
    canEdit,
    handleChangeVagas,
    resourcesOptions,
    handleChangeAccessibilityResources,
    handleChangeLaboratorio,
    errors,
  } = props;

  if (props.profile === 'colegiado' && step === 1) {
    nextStep();
  }

  return (
    <form autoComplete="off">
      <React.Fragment>
      <h3>{`Informações do curso ${form.nome}`}</h3>
        <Fade in={step === 1 ? true : false}>
          <div>
            {step === 1 && (
              <React.Fragment>
                <CursoDetails
                  form={form}
                  handleChange={updateField}
                  nextStep={nextStep}
                  hasPermission={canSee}
                  canEdit={canEdit}
                />
              </React.Fragment>
            )}
          </div>
        </Fade>

        <Fade in={step === 2 ? true : false}>
          <div>
            {step === 2 && (
              <TableVagas
                vagas={form.vagas}
                handleChangeVagas={handleChangeVagas}
                hasPermission={canSee}
                canEdit={canEdit}
              />
            )}
          </div>
        </Fade>

        <Fade in={step === 3 ? true : false}>
          <div>
            {step === 3 && (
              <TableAccessibilityResources
                tableLabel="Recursos de tecnologia assistiva disponíveis às pessoas com deficiência "
                options={resourcesOptions}
                accessibilityResources={form.accessibilityResources}
                handleChangeAccessibilityResources={
                  handleChangeAccessibilityResources
                }
                errors={errors}
              />
            )}
          </div>
        </Fade>

        <Fade in={step === 4 ? true : false}>
          <div>
            {step === 4 && (
              <ChipSelect
                laboratorios={form.laboratorios}
                handleChange={handleChangeLaboratorio}
                label="Laboratórios"
              />
            )}
          </div>
        </Fade>
      </React.Fragment>
    </form>
  );
}

export default CursoForm;
